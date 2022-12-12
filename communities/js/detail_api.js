const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


// 게시글 상세보기 API
async function getIndexFeedDetail(feed_id){
    const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}


//좋아요 실행
async function handleLike(){

    feed_id = location.search.replace("?id=","")
    const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/like/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify({
    
            })
        })
        window.location.reload()

}


// 시간 변형 코드 (value 시간을 현재 시간이랑 비교하여 '~ 전' 출력)
function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}
async function deleteFeed(){

    feed_id =location.search.replace("?id=","")
    const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/`, {
        headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });

    if(response.status == 204){
        alert("게시글삭제완료!")
        window.location.replace(`${frontEndBaseUrl}/`); // 삭제가 되고나면 인덱스로 다시 이동하게함
    }
    else {
        alert(response.status);
    }
}



// 게시글 상세보기 출력 부분
window.onload = async function getIndexDetail_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontEndBaseUrl}/users/login.html`;
        
        
    } else {
        const feed_id = location.search.replace('?id=', '')
        feed = await getIndexFeedDetail(feed_id)
        console.log(feed.like.length)

        var feed_image = document.getElementsByClassName('feed_image')[0];
        var profile_image = document.getElementsByClassName('profile_image')[0];
        var nickname = document.getElementsByClassName('nickname')[0];
        var feed_like = document.getElementsByClassName('feed_like')[0];
        var feed_unlike = document.getElementsByClassName('feed_unlike')[0];
        var feed_content = document.getElementsByClassName('feed_content')[0];
        var feed_tags = document.getElementsByClassName('feed_tags')[0];
        var feed_create_at = document.getElementsByClassName('feed_create_at')[0];
        var feed_update_go = document.getElementsByClassName('feed_update_go')[0];
        var like_wrap = document.getElementsByClassName('like_button')[0];

        // 피드 상세보기 프로필 이미지, 싫어요 카운트, 
        feed_image.setAttribute('src', `${backEndBaseUrl}${feed.image}`)
        // profile_image.setAttribute('src', `${backEndBaseUrl}${feed.profile_image}`)
        nickname.innerText = `${feed.user}`
        feed_like.innerText = `${feed.like_count}`
        feed_unlike.innerText = `${feed.unlike_count}`
        feed_content.innerText = `${feed.content}`
        feed_tags.innerText = `${feed.tags}`
        feed_create_at.innerText = `${timeForToday(feed.updated_at)}`
        // 업데이트 html로 id값 같이 보내기
        feed_update_go.setAttribute("href",`${frontEndBaseUrl}/communities/update.html?id=${feed_id}`)

        if(feed.like.length == 0){
            console.log("좋아요 한 유저가 없을때")
            like_wrap.innerHTML +=`<img class="feed_heart_view" src="/static/img/heart.png" onclick="handleLike()"/>`
            }
            else{
                // console.log("좋아요 한 유저가 있을때")
                counts = 0
            // 게시물 좋아요 유무를 체크하는 조건문 부분
                feed.like.forEach(liker => {
    
                    if(liker==User_payload.user_id){
                    // console.log(`${liker}유저가 이 게시물을 좋아요 중입니다`)
                    counts = +1
                }
                    else{
                    // console.log(`${liker}유저가 이 게시물을 좋아요 중이 아닙니다`)
                    }
                })
            // 체크한 부분을 토대로 출력해주는 부분
                if(counts==1){
                    // console.log(`${like_List.pk}번 게시물을 이 유저가 좋아요 중입니다`)
                    like_wrap.innerHTML +=`<img class="feed_heart_view" src="/static/img/heart_bk.png" onclick="handleLike()">`
                }
                else{
                    // console.log(`${like_List.pk}번 게시물을 이 유저가 좋아요 중이 아닙니다`)
                    like_wrap.innerHTML +=`<img class="feed_heart_view" src="/static/img/heart.png" onclick="handleLike()"/>`
                }
            }
        
    }
}

