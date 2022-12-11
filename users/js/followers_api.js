const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


// 본인 정보 제외 유저 조회
async function getUserInfo(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/followers/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    response_json = await response.json()
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
                

// 회원 정보 출력 API
window.onload = async function getUserInfo_API(){
    //회원정보 리스트 조회
    profile_list = await getUserInfo()
    console.log(profile_list)
    //회원정보 출력 반복문 부분
    var follow_wrap = document.getElementsByClassName('follow_list')[0];

    profile_list.forEach(user => {
        follow_wrap.innerHTML += `
        <div class="user_box_main horizontal_alignment">
            <div class="left_info_section horizontal_alignment">
                <div class="user_profile_image"><img class="image_view" src="${backEndBaseUrl}${user.profile_image}"></div>
                <div class="user_profile_nickname">${user.nickname}</div>
            </div>
            <div class="middle_info_section horizontal_alignment">
                <div class="summary_box vertical_alignment">
                    <div class="summary_title">팔로우</div>
                    <div class="summary_value">${user.followings_count}</div>
                </div>
                <div class="summary_box vertical_alignment">
                    <div class="summary_title ">팔로워</div>
                    <div class="summary_value">${user.followers_count}</div>
                </div>
                <div class="summary_box vertical_alignment">
                    <div class="summary_title ">피드</div>
                    <div class="summary_value">${user.feeds_count}</div>
                </div>
                <div class="summary_box vertical_alignment">
                    <div class="summary_title ">옷장</div>
                    <div class="summary_value">${user.closet_set_count}</div>
                </div>
            </div>
            <div class="right_info_section vertical_alignment">
                <div class="follow_button"><button>팔로우</button></div>
                <div class="feed_list_button"><button>피드 보기</button></div>
            </div>
        </div>
        `
    })





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