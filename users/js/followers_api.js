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

// 나를 팔로우한 유저 조회
async function getFollowerUserInfo(){

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

// 내가 팔로우 한 유저 조회
async function getUserFollowInfo(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/followings/`,{
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
//팔로우 하기,취소하기
async function handleFollow(user_id){

    const response = await fetch(`${backEndBaseUrl}/users/follow/${user_id}/`, {
    headers: {
        'content-type': 'application/json',
        "Authorization":"Bearer " + localStorage.getItem("access")
    },
    method: 'POST',
    body: JSON.stringify({

        })
    })
    
    const response_json = await response.json()
    window.location.reload();

    return response_json
}
                

// 회원 정보 출력 API
window.onload = async function getUserInfo_API(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    //팔로우,팔로워 회원정보 리스트 조회
    follower_list = await getFollowerUserInfo()
    follow_list = await getUserFollowInfo()
    //회원정보 상세 조회
    profile_list = await getUserDetailInfo()


    //회원정보 출력 반복문 부분
    var follow_wrap = document.getElementsByClassName('follow_list')[0];
    counts = 0
    follower_list.forEach(user =>{
        follow_list.forEach(Fuser =>{
            if(Fuser.pk==user.pk){
                counts=1
            }
            else{
                counts=0
            }

        })
        user_profile_image_default = user.profile_image.replace('/media/imgs/default.png', `/static/img/default.png`)
        user_kakao_check = user.username.substr(0, 2);
        user_image_kakao = user.profile_image.replace('/media/http%3A/', 'https://');
        if(user_kakao_check == "k@"){

            if(counts == 0 || counts == []){
            follow_wrap.innerHTML += `
            <div class="user_box_main horizontal_alignment">
                <div class="left_info_section horizontal_alignment">
                    <div class="user_profile_image"><img class="image_view" src="${user_image_kakao}"></div>
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
                    <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 하기</button></div>
                    <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                </div>
            </div>
            `
            } else {
            
                follow_wrap.innerHTML += `
                    <div class="user_box_main horizontal_alignment">
                        <div class="left_info_section horizontal_alignment">
                            <div class="user_profile_image"><img class="image_view" src="${user_image_kakao}"></div>
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
                            <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 취소</button></div>
                            <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                        </div>
                    </div>
                    `

                }
        } else if(user.profile_image == '/media/imgs/default.png') {
            if(counts == 1){
                follow_wrap.innerHTML += `
                <div class="user_box_main horizontal_alignment">
                    <div class="left_info_section horizontal_alignment">
                        <div class="user_profile_image"><img class="image_view" src="${user_profile_image_default}"></div>
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
                        <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 취소</button></div>
                        <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                    </div>
                </div>
                `
                }
                else{
                    follow_wrap.innerHTML += `
                <div class="user_box_main horizontal_alignment">
                    <div class="left_info_section horizontal_alignment">
                        <div class="user_profile_image"><img class="image_view" src="${user_profile_image_default}"></div>
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
                        <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 하기</button></div>
                        <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                    </div>
                </div>
                `
    
                }

        } else {
            if(counts == 1){
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
                        <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 취소</button></div>
                        <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                    </div>
                </div>
                `
                }
                else{
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
                        <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 하기</button></div>
                        <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                    </div>
                </div>
                `
    
                }

        }
    })

    //마이페이지 HAEDER 부분 출력
    var main_profile_image = document.getElementsByClassName('main_profile_image')[0];
    var profile_nickname = document.getElementsByClassName('profile_nickname')[0];
    var profile_tier_info = document.getElementsByClassName('profile_tier_info')[0];
    var profile_next_tier_info = document.getElementsByClassName('profile_next_tier_info')[0];
    var follow_value = document.getElementById('follow_value_count')
    var follower_value = document.getElementById('follower_value_count')
    var feed_value = document.getElementById('feed_value_count')
    var closet_count_value = document.getElementById('closet_value_count')

    profile_nickname.innerText = `${profile_list.nickname}`
    // profile_created_at.innerText = `${profile_list.created_at}`
    profile_next_tier_info.innerText = `현재 ${profile_list.nickname}님의 포인트는 ${profile_list.point} 포인트 입니다`
    follow_value.innerText = `${profile_list.followings_count}`
    follower_value.innerText = `${profile_list.followers_count}`
    feed_value.innerText = `${profile_list.feeds_count}`
    closet_count_value.innerText = `${profile_list.closet_set_count}`
    

    // 일반 or 소셜 유저 프로필 이미지 처리
    profile_image_default = profile_list.profile_image.replace('/media/imgs/default.png', `/static/img/default.png`)
    kakao_check = profile_list.username.substr(0, 2);
    if(kakao_check == "k@"){
        profile_image_kakao = profile_list.profile_image.replace('/media/http%3A/', 'https://');
        main_profile_image.setAttribute("src", `${profile_image_kakao}`)
    } else if (profile_list.profile_image == '/media/imgs/default.png') {
        main_profile_image.setAttribute("src", `${profile_image_default}`)
    } else {
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