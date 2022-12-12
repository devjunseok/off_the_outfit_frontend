
// 로그인 확인

console.log("api")

async function checkLogin() {
    const payload = localStorage.getItem("payload");
    if (payload) {
        window.location.replace(`${frontEndBaseUrl}`)
    }

}


checkLogin();





