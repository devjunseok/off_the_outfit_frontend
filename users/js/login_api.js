async function handleKakao() {
    let code = new URL(window.location.href).searchParams.get('code')
    if (code) {
        const response = await fetch(`${backEndBaseUrl}/users/kakao/callback/`, {
            
            headers: {
                'content-type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                "code": code
            })
        })
        const response_json = await response.json()

        if(response.status == 200){

            localStorage.setItem("access", response_json.access_token);
            localStorage.setItem("refresh", response_json.refresh_token);

            const base64Url = response_json.access_token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);

            }).join(''));

            localStorage.setItem("payload", jsonPayload);

            alert("카카오 로그인 성공!")
                window.location.href = '/index.html'
        } else if(response.status == 400){
            alert("이미 가입된 이메일 입니다.")
            window.location.replace(`${frontEndBaseUrl}/users/login.html`);
        }
    }
}
window.onload  = function(){
    handleKakao()
}

async function kakaologin() {

    KAKAO_CONFIG = {
        "KAKAO_REST_API_KEY": "75756f04ae592ba908cfcfcdac87df17",
        "KAKAO_REDIRECT_URI": `${frontEndBaseUrl}/users/login.html`
    };
  
      kakao_login_uri = "https://kauth.kakao.com/oauth/authorize"
      kakao_token_uri = "https://kauth.kakao.com/oauth/token"
  
      client_key = KAKAO_CONFIG["KAKAO_REST_API_KEY"]
      redirect_uri = KAKAO_CONFIG["KAKAO_REDIRECT_URI"]
  
      uri = `${kakao_login_uri}?client_id=${client_key}&redirect_uri=${redirect_uri}&response_type=code`
  
      location.replace(uri)
  
  }


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
            window.location.replace(`${frontEndBaseUrl}`);

    } else if(response.status == 400){
        if(Object.keys(response_json).includes('username')){
            message = '아이디를 입력해주세요.'
        } else if(Object.keys(response_json).includes('password')){
            message = '비밀번호를 입력해주세요.'
        }
        alert(message)
    } else if(response.status == 401){
        if(Object.keys(response_json).includes('detail')){
            message = response_json['detail']
        }
        alert(message)
    }
} 
