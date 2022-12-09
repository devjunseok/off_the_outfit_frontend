const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


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
            window.location.replace(`${frontEndBaseUrl}/`);
    }else {
        alert(response_json["detail"])
        
    }
    

        
        return response_json
        }

function handleUpdate_nickname() {

    const edit_nickname = document.getElementById("edit_nickname")
    
    
    const updateInput1 = document.createElement("input",[ edit_nickname]);
    
    

    edit_nickname.style.visibility = "hidden"
    
    

    updateInput1.setAttribute("id","update-input1")
    
    

    updateInput1.value = edit_nickname.innerHTML
    
    

    edit_nickname.parentNode.insertBefore(updateInput1, edit_nickname)
    
    

    const updateNickButton = document.getElementById("edit_nick_button")
    
    

    updateNickButton.setAttribute("onclick", "handleUpdateConfirm_nick()")
    
    

}

function handleUpdateConfirm_nick(){

    const updateInput1 =document.getElementById('update-input1')
    
    
    const edit_nickname = document.getElementById("edit_nickname")
    
    

    updateNickname(updateInput1.value)
    
    

    edit_nickname.style.visibility = "visible"
    
    

    const updateNickButton = document.getElementById("edit_nick_button")
    
    

    updateNickButton.setAttribute("onclick", "handleUpdate_nickname()")
    
    

    updateInput1.remove()
    
    
}

async function updateAddress(value){
    
    let User_payload = JSON.parse(localStorage.getItem('payload'))

    const address = value
    const response = await fetch(`${backEndBaseUrl}/users/`, {
        headers: {
        'content-type': 'application/json',
        "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body: JSON.stringify({

            "address":address
        
    
        })

    })
    const response_json = await response.json()
    if (response.status == 200){
        alert(response_json["message"])
            window.location.replace(`${frontEndBaseUrl}/`);
    }else {
        alert(response_json["detail"])
        
    }
    

        
        return response_json
        }


        function handleUpdate_address(){

            const edit_address = document.getElementById("edit_address")
        
            const updateInput3 = document.createElement("input",[ edit_address]);
        
            edit_address.style.visibility = "hidden"
        
            updateInput3.setAttribute("id","update-input3")
        
            updateInput3.value = edit_address.innerHTML
        
            edit_address.parentNode.insertBefore(updateInput3, edit_address)
        
            const updateAddressButton = document.getElementById("edit_address_button")
        
            updateAddressButton.setAttribute("onclick", "handleUpdateConfirm_address()")
        
        }

        function handleUpdateConfirm_address(){

            const updateInput3 =document.getElementById('update-input3')
        
            const edit_address = document.getElementById("edit_address")
        
            updateAddress(updateInput3.value)
        
            edit_address.style.visibility = "visible"
        
            const updateAddressButton = document.getElementById("edit_address_button")
        
            updateAddressButton.setAttribute("onclick", "handleUpdate_address()")
        
            updateInput3.remove()
        
            
        }

        async function updateBody(value){
            
    
            let User_payload = JSON.parse(localStorage.getItem('payload'))
        
            const response = await fetch(`${backEndBaseUrl}/users/`, {
                headers: {
                'content-type': 'application/json',
                "Authorization":"Bearer " + localStorage.getItem("access")
                },
                method: 'PUT',
                body: JSON.stringify({

                    "height":value.height,
                    "weight":value.weight

                })
        
            })
            const response_json = await response.json()
            if (response.status == 200){
                alert(response_json["message"])
                    window.location.replace(`${frontEndBaseUrl}/`);
            }else {
                alert(response_json["detail"])
                
            }
            
        
                
                return response_json
                }

function handleUpdate_Body(){

    const edit_body_height = document.getElementById("edit_body_height")
    const edit_body_weight = document.getElementById("edit_body_weight")

    const updateInputHeight = document.createElement("input",[edit_body_height]);
    const updateInputWeight = document.createElement("input",[edit_body_weight]);

    edit_body_height.style.visibility = "hidden"
    edit_body_weight.style.visibility = "hidden"

    updateInputHeight.setAttribute("id","update-InputHeight")
    updateInputWeight.setAttribute("id","update-InputWeight")

    updateInputHeight.value = edit_body_height.innerHTML
    updateInputHeight.value = edit_body_weight.innerHTML


    edit_body_height.parentNode.insertBefore(updateInputHeight, edit_body_height)
    edit_body_weight.parentNode.insertBefore(updateInputWeight, edit_body_weight)

    const updateBodyButton = document.getElementById("edit_body_button")


    updateBodyButton.setAttribute("onclick", "handleUpdateConfirm_Body()")

}





function handleUpdateConfirm_Body(){

    const updateInputHeight =document.getElementById('update-InputHeight')
    const updateInputWeight =document.getElementById('update-InputWeight')

    const edit_body_height = document.getElementById("edit_body_height")
    const edit_body_weight = document.getElementById("edit_body_weight")
    
    values = {
        "height":updateInputHeight.value,
        "weight":updateInputWeight.value
    }

    updateBody(values)
    


    edit_body_height.style.visibility = "visible"
    edit_body_weight.style.visibility = "visible"

    const updateBodyButton = document.getElementById("edit_body_button")

    updateBodyButton.setAttribute("onclick", "handleUpdate_Body()")

    updateInputHeight.remove()
    updateInputWeight.remove()
    
}
                


    window.onload = async function getProfile_API(){
        //회원정보 리스트 조회
        profile_list = await getUserDetailInfo()
        console.log(profile_list.profile_image)
        
        //회원정보 출력 반복문 부분
        var edit_image_view = document.getElementsByClassName('edit_image_view')[0];
        var edit_view_username = document.getElementsByClassName('edit_view_username')[0];
        var edit_view_nickname = document.getElementsByClassName('edit_view_nickname')[0];
        var edit_view_dob = document.getElementsByClassName('edit_view_dob')[0];
        var edit_view_body_height = document.getElementsByClassName('edit_view_body_height')[0];
        var edit_view_body_weight = document.getElementsByClassName('edit_view_body_weight')[0];
        var edit_view_gender = document.getElementsByClassName('edit_view_gender')[0];
        var edit_view_address = document.getElementsByClassName('edit_view_address')[0];
        var edit_view_email = document.getElementsByClassName('edit_view_email')[0];

        edit_view_email.innerText = `${profile_list.email}`
        edit_image_view.setAttribute("src", `${backEndBaseUrl}${profile_list.profile_image}`)
        edit_view_dob.innerText = `${profile_list.date_of_birth}`
        edit_view_username.innerText = `${profile_list.username}`
        edit_view_nickname.innerText = `${profile_list.nickname}`
        edit_view_gender.innerText = `${profile_list.gender}`
        edit_view_body_height.innerText =`${profile_list.height}cm `
        edit_view_body_weight.innerText =` ${profile_list.weight}kg`
        edit_view_address.innerText = `${profile_list.address}`


 }