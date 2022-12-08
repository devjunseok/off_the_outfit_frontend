const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"

console.log("hi")

async function getIndexFeedDetail(id){
    const response = await fetch(`${backEndBaseUrl}/communities/${id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}



window.onload = async function getIndexDetail_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontEndBaseUrl}/users/login.html`;
        
        
    } else {
        const id = location.search.replace("?id=", "")
        feed = await getIndexFeedDetail(id)
        comments = feed.comments
        created_at = timeForToday(feed.created_at)
        like_List = await getLike()

        // var wrap = document.getElementsByClassName('FeedDetailBox')[0];
        // var like_wrap = document.getElementsByClassName('like_box')[0];
        // var like_count = document.getElementById('like_count')
        var comment_wrap = document.getElementsByClassName('CommentDetailList')[0];
        // var feed_nickname = document.getElementsByClassName('FeedDetailUserNickname')[0];
        var feed_image = document.getElementsByClassName('image')[0];
        var feed_content = document.getElementsByClassName('FeedDetailFeedContent')[0];
        var feed_tag = document.getElementsByClassName('FeedDetailFeedCategory')[0];
        var feed_created_at = document.getElementsByClassName('FeedDetailFeedCreated')[0];
        var feed_profile_image = document.getElementsByClassName('FeedDetailFeedProfileImage')[0];
        var feed_update = document.getElementsByClassName('FeedDetailFeedupdate')[0];
        feed_update.setAttribute("href",`${frontEndBaseUrl}/articles/update.html?id=${feed.pk}`)

        if(like_List.like.length == 0){
            // console.log("좋아요 한 유저가 없을때")
            like_wrap.innerHTML +=`<button style="border: none; background: none; margin-top: 3px;"><img onclick="handleLike()" style="width: 20px; height: 20px; margin: 5px 10px 0 0;" src="../static/icon/heart.png" /></button>`
            }
            else{
                // console.log("좋아요 한 유저가 있을때")
                counts = 0
            // 게시물 좋아요 유무를 체크하는 조건문 부분
                like_List.like.forEach(liker => {
    
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
                    like_wrap.innerHTML +=`<button style="border: none; background: none; margin-top: 3px;"><img onclick="handleLike()" style="width: 20px; height: 20px; margin: 5px 10px 0 0;" src="../static/icon/heart_bk.png" /></button>`
                }
                else{
                    // console.log(`${like_List.pk}번 게시물을 이 유저가 좋아요 중이 아닙니다`)
                    like_wrap.innerHTML +=`<button style="border: none; background: none; margin-top: 3px;"><img onclick="handleLike()" style="width: 20px; height: 20px; margin: 5px 10px 0 0;" src="../static/icon/heart.png" /></button>`
                }
            }
            like_count.innerText = `좋아요${like_List.like_count}개`

        // wrap.innerHTML = ``

       // wrap.innerHTML = ``
    comments.forEach(cmt => {            
        comment_wrap.innerHTML += `<div style="display: flex; flex-direction: row; justify-content: space-between ;">
                                    <div style="display: flex; flex-direction: row;">
                                        <div style="margin-left: 5px; font-weight: bold;">${cmt.user}</div>
                                        <div style="margin-left: 5px;">${cmt.comment}</div>
                                    </div>
                                    <!-- 댓글 수정, 삭제 부분 -->                                        
                                        <input type="submit" value='수정' onclick="handleCommentUpdate(${cmt.id})" style="background-color: transparent; border: none; margin-right: 10px; color: red;">
                                        <input type="submit" value='X' onclick="handleCommentDelete(${cmt.id})" style="background-color: transparent; border: none; margin-right: 10px; color: red;">                                        
                                </div>`            
    });

        feed_nickname.innerText = `${feed.user}`
        feed_transfer_image.innerHTML = `<img style="cursor: pointer; width: 1000px; min-width: 1000px; height: 600px; min-height: 600px; object-fit: contain; background-color: black;" src="${backEndBaseUrl}${feed.transfer_image}">`
        feed_title.innerText = `${feed.title}`
        feed_content.innerText = `${feed.content}`
        feed_category.innerText = `${feed.category}`
        feed_created_at.innerText = `${created_at}`
        feed_profile_image.setAttribute("src", `${backEndBaseUrl}/${feed.profile_image}` )
    }







    }

    console.log("hi")