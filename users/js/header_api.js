
// 회원 정보 조회 API
async function getUserHeaderInfo(){

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


// 로그아웃 버튼
async function handleLogout() {
    if (!confirm("로그아웃 하시겠습니까?")) {
        alert("로그아웃이 취소되었습니다");
    } else {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("payload");
        alert("로그아웃 되었습니다");
        window.location.replace(`${frontEndBaseUrl}/users/login.html`);

    }
}
