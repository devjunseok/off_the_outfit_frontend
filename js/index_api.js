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


window.onload = async function getIndex_API(){
  
        //게시글 전체 리스트 조회
        feed_list = await getIndexFeedList()
        console.log(feed_list)
        


        //게시글 출력 반복문 부분
        var wrap = document.getElementsByClassName('new_feedbox')[0];

        feed_list.forEach(feed => {
            console.log(feed.content)

        wrap.innerHTML += `<div class="FeedBox" style="background-color: #fafafa; border: solid 1px #aaaaaa; box-shadow: 1px 1px 1px 1px #aaaaaa;">
        <div style="width: 300px; min-width: 300px; height: 400px; min-height: 400px;">
            <div style="display: flex; flex-direction: row; justify-content: space-between; height: 40px;"><div style="display: flex; flex-direction: row;">
            <div>
            <img src=${backEndBaseUrl}/${feed.image} alt="" style="width: 90px; height: 90px; border-radius: 10px; margin: 10px 5px 0 5px;"></img>
            </div>
            <div class = "new_feed_user">${feed.user}</div>
            </div>
            <div>
             ${feed.content}
            </div>`

    


        })

}
