
// 로그인 확인

console.log("api")

async function checkLogin() {
    const payload = localStorage.getItem("payload");
    if (payload) {
        window.location.replace(`${frontEndBaseUrl}`)
    }

}



checkLogin();


// 로그 아웃
async function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    alert("로그아웃 되었습니다");
    window.location.replace(`${frontEndBaseUrl}/users/login.html`);
}




