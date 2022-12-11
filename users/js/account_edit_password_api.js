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