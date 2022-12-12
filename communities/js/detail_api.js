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


// 인기 검색어 랭킹 조회
async function getHeaderSearchWordRanking(){
    const response = await fetch(`${backEndBaseUrl}/communities/search/word/ranking/`,{
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

//싫어요 실행

async function handleUnLike(){

    feed_id = location.search.replace("?id=","")
    const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/unlike/`,{
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
//게시글 삭제
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
        console.log(feed.comments)

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
        var unlike_wrap = document.getElementsByClassName('unlike_button')[0];
        var cmt_wrap = document.getElementsByClassName('comment_middle_section')[0];
        var rcomt_wrap = document.getElementsByClassName('recomment_box')[0];

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

        // 댓글 닉네임과 내용 반복문
        feed.comments.forEach(comt=>{
            console.log(comt)
        cmt_wrap.innerHTML += `
        <div class="comment_box horizontal_alignment">
            <div class="cmt_user horizontal_alignment">  
                <div class="cmt_nickname">${comt.user}</div>
                <div class="cmt_comment">${comt.comment}</div>
            </div>
            <div class="cmt_button_box horizontal_alignment">
                <div class="cmt_reco_button">대댓글</div>
                <div class="cmt_like_button">O</div>
            </div>
        </div>
        `
        comt.recomment.forEach(reco=>{
            cmt_wrap.innerHTML +=`
            <div class="recomment_box horizontal_alignment">
                <div class="reco_user horizontal_alignment">  
                    <div class="reco_nickname">┗ ${reco.user}</div>
                    <div class="reco_recomment">${reco.recomment}</div>
                </div>
            </div>
            `
        })
        })
        // 좋아요 부분
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
        //싫어요 부분
        if(feed.unlike.length == 0){
            console.log("싫어요 한 유저가 없을때")
            unlike_wrap.innerHTML +=`<img class="feed_umji_view" src="/static/img/unlike.png" onclick="handleUnLike()"/>`
            }
            else{
                // console.log("싫어요 한 유저가 있을때")
                Ucounts = 0
            // 게시물 싫어요 유무를 체크하는 조건문 부분
                feed.unlike.forEach(unliker => {
    
                    if(unliker==User_payload.user_id){
                    // console.log(`${liker}유저가 이 게시물을 싫어요 중입니다`)
                    Ucounts = +1
                }
                    else{
                    // console.log(`${liker}유저가 이 게시물을 싫어요 중이 아닙니다`)
                    }
                })
            // 체크한 부분을 토대로 출력해주는 부분
                if(Ucounts==1){
                    // console.log(`${like_List.pk}번 게시물을 이 유저가 싫어요 중입니다`)
                    unlike_wrap.innerHTML +=`<img class="feed_umji_view" src="/static/img/unlike_bk.png" onclick="handleUnLike()">`
                }
                else{
                    // console.log(`${like_List.pk}번 게시물을 이 유저가 싫어요 중이 아닙니다`)
                    unlike_wrap.innerHTML +=`<img class="feed_umji_view" src="/static/img/unlike.png" onclick="handleUnLike()"/>`
                }
            }

        
        
        // 검색어 랭킹 조회
        search_word_list = await getHeaderSearchWordRanking()
        if (search_word_list.length > 9) {
            search_word_list = search_word_list.sort((a, b) => b.count - a.count)

            var word_rank_01 = document.getElementsByClassName('rank_01')[0];
            var word_rank_02 = document.getElementsByClassName('rank_02')[0];
            var word_rank_03 = document.getElementsByClassName('rank_03')[0];
            var word_rank_04 = document.getElementsByClassName('rank_04')[0];
            var word_rank_05 = document.getElementsByClassName('rank_05')[0];
            var word_rank_06 = document.getElementsByClassName('rank_06')[0];
            var word_rank_07 = document.getElementsByClassName('rank_07')[0];
            var word_rank_08 = document.getElementsByClassName('rank_08')[0];
            var word_rank_09 = document.getElementsByClassName('rank_09')[0];
            var word_rank_10 = document.getElementsByClassName('rank_10')[0];

            word_rank_01.innerText = `1등 : ${search_word_list[0]['word']}`
            word_rank_02.innerText = `2등 : ${search_word_list[1]['word']}`
            word_rank_03.innerText = `3등 : ${search_word_list[2]['word']}`
            word_rank_04.innerText = `4등 : ${search_word_list[3]['word']}`
            word_rank_05.innerText = `5등 : ${search_word_list[4]['word']}`
            word_rank_06.innerText = `6등 : ${search_word_list[5]['word']}`
            word_rank_07.innerText = `7등 : ${search_word_list[6]['word']}`
            word_rank_08.innerText = `8등 : ${search_word_list[7]['word']}`
            word_rank_09.innerText = `9등 : ${search_word_list[8]['word']}`
            word_rank_10.innerText = `10등 : ${search_word_list[9]['word']}`
        }
    }
}

