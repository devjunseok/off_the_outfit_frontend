

async function handleSignup() {
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const username = document.getElementById("username").value
    const nickname = document.getElementById("nickname").value
    const email = document.getElementById("email").value
    const address = document.getElementById("address").value
    const gender = document.getElementById("gender").value
    const height = document.getElementById("height").value
    const weight = document.getElementById("weight").value
    const date_of_birth = document.getElementById("date_of_birth").value    
    var term_agree = document.querySelector("input[name=term_agree]").checked

    const response = await fetch(`${backEndBaseUrl}/users/`, {
        
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            
            "username": username,
            "nickname": nickname,
            "password": password,
            "password2": password2,
            "email": email,
            "address": address,
            "gender": gender,
            "height": height,
            "weight": weight,
            "date_of_birth": date_of_birth,
            "term_agree": term_agree
            
            
        })
    })

    const response_json = await response.json()

    if (response.status == 201){
        alert(response_json["message"])
            window.location.replace(`${frontEndBaseUrl}/users/login.html`);
    }else if(response.status == 400){
        if(Object.keys(response_json).includes('username')){
            message = response_json['username']
        } else if (Object.keys(response_json).includes('password')){
            message = response_json['password']
        } else if (Object.keys(response_json).includes('password2')){
            message = '비밀번호 재입력을 확인해주세요.'
        } else if (Object.keys(response_json).includes('email')){
            message = response_json['email']
        } else if (Object.keys(response_json).includes('nickname')){
            message = response_json['nickname']
        } else if (Object.keys(response_json).includes('address')){
            message = response_json['address']
        } else if (Object.keys(response_json).includes('gender')){
            message = '성별을 선택해주세요.'
        } else if (Object.keys(response_json).includes('date_of_birth')){
            message = response_json['date_of_birth'] 
        } else if (Object.keys(response_json).includes('height')){
            message = response_json['height']
        } else if (Object.keys(response_json).includes('weight')){
            message = response_json['weight']
        } else if (Object.keys(response_json).includes('term_agree')){
            message = response_json['term_agree']
        }
        alert(message)
    }
}


function showPopup(){
    var options = 'top=300, left=500, width=700, height=600, status=no, menubar=no, toolbar=no, resizable=no';
    window.open("term.html","팝업 테스트",options);
}


function WinClose()

 {

   window.open('','_self').close();     

}


