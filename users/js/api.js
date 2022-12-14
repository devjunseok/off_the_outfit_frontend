
// 로그인 확인


async function checkLogin() {
    const payload = localStorage.getItem("payload");
    if (payload) {
        window.location.replace(`${frontEndBaseUrl}`)
    }

}


checkLogin();





