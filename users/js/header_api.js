// window.onload =()=>  {
//     const payload = localStorage.getItem("payload");
//     const payload_parse =JSON.parse(payload)
//     console.log(payload_parse.nickname)

//     const profile_nickname = document.getElementById("profile_nickname")
//     profile_nickname.innerText = payload_parse.nickname
// }

// async function detailUser(){

// const nav_nickname = document.getElementsByClassName('NavUserInfoBoxNickname')[0];
// const nav_name = document.getElementsByClassName('NavUserInfoBoxName')[0];
// const nav_name2 = document.getElementsByName('NavUserInfoBoxName2')[0];
// const nav_email = document.getElementsByClassName('NavUserInfoBoxEmail')[0];
// const nav_follow = document.getElementsByClassName('summary_value')[0];
// const nav_login = document.getElementsByClassName('NavUserInfoBoxLogin')[0];
// last_login_time = timeForToday(nav_user_info.last_login)
// const nav_profile_image = document.getElementsByClassName('NavUserInfoBoxProfileImage')[0];
// // const nav_profile_link = document.getElementsByClassName('NavUserInfoBoxProfileLink')[0];
// const nav_feed_count = document.getElementsByClassName('NavUserInfoBoxFeedCount')[0];


// nav_nickname.innerText = `${nav_user_info.nickname}`
// nav_name.innerText = `${nav_user_info.name}`
// nav_name2.innerText = `${nav_user_info.name}님 반갑습니다!`
// nav_email.innerText = `${nav_user_info.email}`
// nav_follow.innerText = `팔로잉 ${nav_user_info.follow_count} 명  |  팔로워 ${nav_user_info.followee_count} 명`
// nav_login.innerText = `현재 접속 시간 : ${last_login_time}`
// // nav_profile_link.setAttribute("onclick", `${frontEndBaseUrl}/users/profile.html?id=${nav_user_info.id}`)
// nav_profile_image.setAttribute("src", `${backEndBaseUrl}${nav_user_info.profile_image}`)
// nav_feed_count.innerText = `작성한 글 : ${nav_user_info.feed_set_count} 개`


// }