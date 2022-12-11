// /header.html

// 로그아웃 버튼
async function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    alert("로그아웃 되었습니다");
    window.location.replace(`${frontEndBaseUrl}/users/login.html`);
}


// 검색 버튼
async function searchButton(){
    const search_id = document.getElementById("search").value
    location.href = `${frontEndBaseUrl}/communities/search.html?search=${search_id}`
}



// // 유저 네임 보이기
// window.onload =()=>  {
//     const payload = localStorage.getItem("payload");
//     const payload_parse =JSON.parse(payload)
//     console.log(payload_parse.username)


//     const intro = document.getElementById("intro")
//     intro.innerText = `${payload_parse.username}`



// } 


