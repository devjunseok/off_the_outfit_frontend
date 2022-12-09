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
        var wrap = document.getElementsByClassName('main_feed_list_box')[0];

        feed_list.slice(0, 3).forEach(feed => {
            console.log(feed)
            //태그 출력반복문
            feed.tags.forEach(tags=>{
                
            wrap.innerHTML += `
            <div class="new_feed_box vertical_alignment">
                <div class="nf_image_box">
                    <img class="nf_image" src="${backEndBaseUrl}${feed.image}"/>
                </div>
                <div class="nf_info_box horizontal_alignment">
                    <div class="left_section vertical_alignment">
                        <div class="nf_nickname">${feed.user}</div>
                        <div class="nf_content">${feed.content}</div>
                        <div class="nf_tag">${tags}</div>
                    </div>
                    <div class="right_section vertical_alignment">
                        <div class="like_box horizontal_alignment">
                            <div class="nf_like">${feed.like_count}</div>
                            <div class="nf_unlike">${feed.unlike_count}</div>
                        </div>
                        <div class="right_section_middle"></div>
                        <div class="nf_create_at">${timeForToday(feed.updated_at)}</div>
                    </div>
                </div>
            </div>
            `
            })    
        })
}
}
