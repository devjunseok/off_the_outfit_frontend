

async function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("payload");
    alert("로그아웃 되었습니다");
    window.location.replace(`${frontEndBaseUrl}/users/login.html`);
}


window.onload =()=>  {
    const payload = localStorage.getItem("payload");
    const payload_parse =JSON.parse(payload)
    console.log(payload_parse.username)


    const intro = document.getElementById("intro")
    intro.innerText = `${payload_parse.username}`


} 