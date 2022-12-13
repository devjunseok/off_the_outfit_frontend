const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


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

window.onload = async function getUserHeader_API(){
    console.log("hi")
    feed_list = await getUserHeaderInfo()

    console.log(header_user)

    var profile_nickname = document.getElementsByClassName('profile_nickname')[0];
    var profile_tier_info = document.getElementsByClassName('profile_tier_info')[0];
    var profile_created_at = document.getElementsByClassName('profile_created_at')[0];
    var profile_next_tier_info = document.getElementsByClassName('profile_next_tier_info')[0];
    var follow_value = document.getElementsByClassName('follow_value')[0];
    var follower_value = document.getElementsByClassName('follower_value')[0];
    var feed_value = document.getElementsByClassName('feed_value')[0];
    var closet_value = document.getElementsByClassName('closet_value')[0];

    f










}