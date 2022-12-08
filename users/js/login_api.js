const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"




async function handleLogin() {

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value


    const response = await fetch(`${backEndBaseUrl}/users/api/token/`, { 
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })
    

    const response_json = await response.json()    // responser 값을 json 화

    console.log(response_json)
    if (response.status == 200){
        localStorage.setItem("access", response_json.access);  // 로컬스토리지안에 access값 저장
        localStorage.setItem("refresh", response_json.refresh); // 로컬스토리지안에 refresh값 저장
    

        const base64Url = response_json.access.split('.')[1];  // 로컬스토리지에 JWT값 저장
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        alert("로그인 성공!")
            window.location.replace(`${frontEndBaseUrl}/`);

    }else {
        //로그인 실패시
        alert(response_json["non_field_errors"])
        // window.location.reload();
    }
}




