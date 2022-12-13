const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


// 회원 정보 조회 API
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



// 닉네임 변경 API
async function updateNickname(value){
    
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const nickname = value
    const response = await fetch(`${backEndBaseUrl}/users/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({
            "nickname":nickname
        })
    })
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
        window.location.reload();
    }else {
        alert(response_json["detail"])
    }   
return response_json
}

// 닉네임 변경 버튼 01
function handleUpdate_nickname() {

    const edit_nickname = document.getElementById("edit_nickname")
    const updateInputNickname = document.createElement("input",[edit_nickname]);
    
    edit_nickname.style.visibility = "hidden"
    edit_nickname.style.width = "0"
    updateInputNickname.setAttribute("id","update-InputNickname")
    updateInputNickname.value = edit_nickname.innerHTML
    edit_nickname.parentNode.insertBefore(updateInputNickname, edit_nickname)

    const updateNickButton = document.getElementById("edit_nick_button")

    updateNickButton.setAttribute("onclick", "handleUpdateConfirm_nick()")
}

// 닉네임 변경 버튼 02
function handleUpdateConfirm_nick(){

    const updateInputNickname = document.getElementById('update-InputNickname')
    const edit_nickname = document.getElementById("edit_nickname")
    
    updateNickname(updateInputNickname.value)
    
    edit_nickname.style.visibility = "visible"
    edit_nickname.style.width = "400px"

    const updateNickButton = document.getElementById("edit_nick_button")
 
    updateNickButton.setAttribute("onclick", "handleUpdate_nickname()")
    updateInputNickname.remove()
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
window.onload = async function getProfile_API(){
    
    profile_list = await getUserDetailInfo()
    let User_payload = JSON.parse(localStorage.getItem('payload'))

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

    main_profile_image.setAttribute("src", `${backEndBaseUrl}${profile_list.profile_image}`)
    profile_nickname.innerText = `${profile_list.nickname}`
    // profile_created_at.innerText = `${profile_list.created_at}`
    profile_next_tier_info.innerText = `현재 ${profile_list.nickname}님의 포인트는 ${profile_list.point} 포인트 입니다`
    follow_value.innerText = `${profile_list.followings_count}`
    follower_value.innerText = `${profile_list.followers_count}`
    feed_value.innerText = `${profile_list.feeds_count}`
    closet_count_value.innerText = `${profile_list.closet_set_count}`
    
    //마이페이지 등급 조건문
    if(0<=profile_list.point||profile_list.point < 31){
        profile_tier_info.innerText =`LV.1 브론즈`
    }
    if(31<=profile_list.point||profile_list.point < 51){
        profile_tier_info.innerText =`LV.2 실버`
    }
    if(51<=profile_list.point||profile_list.point <101){
        profile_tier_info.innerText =`LV.3 골드`
    }
    if(101<=profile_list.point||profile_list.point <201){
        profile_tier_info.innerText =`LV.4 플레티넘`
    }
    if(profile_list.point >= 201){
        profile_tier_info.innerText =`LV.5 VIP`
    }

    //출석하기 출력문

    var AttendanceCheck = document.getElementById('AttendanceCheck')

    AttendanceCheck.setAttribute('onclick',`AttendanceCheck(${User_payload.user_id})`)


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


 async function updatePass(){
    
    
    const new_pass = document.getElementById("new_pass").value
    const new_pass2 = document.getElementById("new_pass2").value

    const response = await fetch(`${backEndBaseUrl}/users/passwordchange/`, {
        headers: {
        'content-type': 'application/json',
        "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({
            
            "password":new_pass,
            "password2":new_pass2,
        
    
        })

    })
    
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
        window.location.replace(`http://127.0.0.1:5500/users/account_edit.html`);
    }else {
        alert(response_json["password"])     
    }
    

}

