const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"

// 게시글 전체 리스트 조회
async function getIndexFeedList(){
    const response = await fetch(`${backEndBaseUrl}/communities/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

// 로그인 사용자 정보 가져오기
async function getUser(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
    return response_json
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



window.onload = async function getIndex_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontEndBaseUrl}/users/login.html`;
        
        
    } else {
  
        //게시글 전체 리스트 조회
        feed_list = await getIndexFeedList()
        console.log(feed_list)
        


        //게시글 출력 반복문 부분
        var wrap = document.getElementsByClassName('new_feedbox')[0];
        last_login_time = timeForToday()

        feed_list.forEach(feed => {
            
            //태그 출력반복문
            feed.tags.forEach(tags=>{
                

            wrap.innerHTML += `
                <img src=${backEndBaseUrl}/${feed.image} alt="" style="width: 90px; height: 90px; border-radius: 10px; margin: 10px 5px 0 5px;"></img>
                <div class ="new_feed_user">${feed.user}</div>
                <div class = "new_feed_content">${feed.content}</div>
                <div class = "new_feed_unlike_count">싫어요갯수${feed.unlike_count}개</div>
                <div class = "new_feed_like_count">좋아요갯수${feed.like_count}개</div>
                <div class = "new_feed_tags">태그: ${tags}</div>
                <div class = "new_feed_tags">${timeForToday(feed.updated_at)}</div>
                `

        

            })    
        })

}
}
