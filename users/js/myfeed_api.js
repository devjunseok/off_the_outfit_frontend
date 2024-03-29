// 전체 게시글 조회
async function getIndexFeedList(){
    const response = await fetch(`${backEndBaseUrl}/communities/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

// 회원 상세 정보 조회 API
async function getUserDetailInfo(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    response_json = await response.json()
    return response_json
}

// 출석 하기
async function AttendanceCheck(user_id){

    const response = await fetch(`${backEndBaseUrl}/users/point/${user_id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
    })
    if (response.status == 200){
        alert("출석이 완료 되었습니다. 5 포인트 획득!")
    }else {
        alert("이미 출석 하셨습니다")
    }   
return response_json
}


// 인기 검색어 랭킹 조회
async function getHeaderSearchWordRanking(){
    const response = await fetch(`${backEndBaseUrl}/communities/search/word/ranking/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

// 시간 변형 코드 (value 시간을 현재 시간이랑 비교하여 '~ 전' 출력)
function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}



window.onload = async function getIndex_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontEndBaseUrl}/users/login.html`;
    
        
    } else {
        // 잔체 게시글 조회
        feed_list = await getIndexFeedList()
        
    
        //회원정보 상세 조회
    profile_list = await getUserDetailInfo()

    // 나의 게시글 출력 반복문 부분
    my_feed_wrap = document.getElementsByClassName('myfeed_list_box')[0];
    feed_list.forEach(feed =>{

        //태그 출력 반복문
        tag_list = [];
        feed.tags.forEach(tag => {
            tag = `#${tag}`
            tag_list.push(tag)
        })

        if(tag_list.length == 0){
            tag_list = []
        } else if(tag_list.length == 1){
            tag_list = tag_list
        } else if(tag_list.length == 2){
            tag_list = `${tag_list[0]} ${tag_list[1]}`
        } else if(tag_list.length == 3){
            tag_list = `${tag_list[0]} ${tag_list[1]} ${tag_list[2]}`
        } else if(tag_list.length == 4){
            tag_list = `${tag_list[0]} ${tag_list[1]} ${tag_list[2]} ${tag_list[3]}`
        } else {
            tag_list = `${tag_list[0]} ${tag_list[1]} ${tag_list[2]} ${tag_list[3]} ${tag_list[4]}`
        }



        if(feed.user_id == User_payload.user_id)
        
            my_feed_wrap.innerHTML+=`<div class="sub_feed_box vertical_alignment">
            <div class="sub_feed_image_box">
                <img class="feed_image" src="${backEndBaseUrl}${feed.image}" onclick="location.href='${frontEndBaseUrl}/communities/detail.html?id=${feed.pk}'"/>
            </div>
            <div class="sub_feed_info_box">
                <div class="info_top_section horizontal_alignment">
                    <div class="sub_nickname" onclick="location.href='/products/closet/?user_id=${feed.user_id}'">${feed.user}</div>
                    <div class="sub_like">좋아요 ${feed.like_count}개</div>
                </div>
                <div class="info_middle_section">
                    <div class="sub_content">${feed.content}</div>
                </div>
                <div class="info_bottom_section horizontal_alignment">
                    <div class="sub_tags">${tag_list}</div>
                    <div class="sub_created_at">${timeForToday(feed.updated_at)}</div>
                </div>
            </div>
        </div>
            `
        
    })

    }

     //마이페이지 HAEDER 부분 출력
     var main_profile_image = document.getElementsByClassName('main_profile_image')[0];
     var profile_nickname = document.getElementsByClassName('profile_nickname')[0];
     var profile_tier_info = document.getElementsByClassName('profile_tier_info')[0];
     var profile_created_at = document.getElementsByClassName('profile_created_at')[0];
     var profile_next_tier_info = document.getElementsByClassName('profile_next_tier_info')[0];
     var follow_value = document.getElementById('follow_value_count')
     var follower_value = document.getElementById('follower_value_count')
     var feed_value = document.getElementById('feed_value_count')
     var closet_count_value = document.getElementById('closet_value_count')
 

     profile_nickname.innerText = `${profile_list.nickname}`
     profile_next_tier_info.innerText = `현재 ${profile_list.nickname}님의 포인트는 ${profile_list.point} 포인트 입니다`
     follow_value.innerText = `${profile_list.followings_count}`
     follower_value.innerText = `${profile_list.followers_count}`
     feed_value.innerText = `${profile_list.feeds_count}`
     closet_count_value.innerText = `${profile_list.closet_set_count}`
     

    // 일반 or 소셜 유저 프로필 이미지 처리
    kakao_check = profile_list.username.substr(0, 2);
    if(kakao_check == "k@"){
        console.log("카카오")
        profile_image_kakao = profile_list.profile_image.replace('/media/http%3A/', 'https://');
        main_profile_image.setAttribute("src", `${profile_image_kakao}`)
    } else if (profile_list.profile_image == '/media/imgs/default.png') {
        console.log("디폴트")
        profile_image_default = profile_list.profile_image.replace('/media/imgs/default.png', `/static/img/default.png`)
        main_profile_image.setAttribute("src", `${profile_image_default}`)
    } else {
        console.log("기본")
        main_profile_image.setAttribute("src", `${backEndBaseUrl}${profile_list.profile_image}`)
    }


      //마이페이지 등급 조건문
      if(profile_list.point>=0&&profile_list.point <31){
         profile_tier_info.innerText =`LV.1 브론즈`
     }
     if(profile_list.point>=31&&profile_list.point <51){
         profile_tier_info.innerText =`LV.2 실버`
     }
     if(profile_list.point>=51&&profile_list.point <101){
         profile_tier_info.innerText =`LV.3 골드`
     }
     if(profile_list.point>=101&&profile_list.point <201){
         profile_tier_info.innerText =`LV.4 플레티넘`
     }
     if(profile_list.point >=201){
         profile_tier_info.innerText =`LV.5 VIP`
     }
 
     //출석하기 출력문
     var AttendanceCheck = document.getElementById('AttendanceCheck')
     AttendanceCheck.setAttribute('onclick',`AttendanceCheck(${User_payload.user_id})`)
 
     // 옷장 버튼
     var hd_closet_button = document.getElementById('header_closet_button')
     hd_closet_button.setAttribute('href', `/products/closet/?user_id=${User_payload.user_id}`)
 
 
     // 검색어 랭킹 조회
     search_word_list = await getHeaderSearchWordRanking()
     if (search_word_list.length > 9) {
         search_word_list = search_word_list.sort((a, b) => b.count - a.count)
 
         var word_rank_01 = document.getElementsByClassName('rank_01')[0];
         var word_rank_02 = document.getElementsByClassName('rank_02')[0];
         var word_rank_03 = document.getElementsByClassName('rank_03')[0];
         var word_rank_04 = document.getElementsByClassName('rank_04')[0];
         var word_rank_05 = document.getElementsByClassName('rank_05')[0];
         var word_rank_06 = document.getElementsByClassName('rank_06')[0];
         var word_rank_07 = document.getElementsByClassName('rank_07')[0];
         var word_rank_08 = document.getElementsByClassName('rank_08')[0];
         var word_rank_09 = document.getElementsByClassName('rank_09')[0];
         var word_rank_10 = document.getElementsByClassName('rank_10')[0];
 
         word_rank_01.innerText = `1등 : ${search_word_list[0]['word']}`
         word_rank_02.innerText = `2등 : ${search_word_list[1]['word']}`
         word_rank_03.innerText = `3등 : ${search_word_list[2]['word']}`
         word_rank_04.innerText = `4등 : ${search_word_list[3]['word']}`
         word_rank_05.innerText = `5등 : ${search_word_list[4]['word']}`
         word_rank_06.innerText = `6등 : ${search_word_list[5]['word']}`
         word_rank_07.innerText = `7등 : ${search_word_list[6]['word']}`
         word_rank_08.innerText = `8등 : ${search_word_list[7]['word']}`
         word_rank_09.innerText = `9등 : ${search_word_list[8]['word']}`
         word_rank_10.innerText = `10등 : ${search_word_list[9]['word']}`
     }

}