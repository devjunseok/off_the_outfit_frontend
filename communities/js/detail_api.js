const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"

// 출석 하기
async function AttendanceCheck(user_id){

    const response = await fetch(`${backEndBaseUrl}/users/point/${user_id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
    })
    if (response.status == 200){
        alert("출석이 완료 되었습니다. 5 포인트 획득!")
    }else {
        alert("이미 출석 하셨습니다")
    }   
return response_json
}

//팔로우 하기,취소하기
async function handleFollow(user_id){

    const response = await fetch(`${backEndBaseUrl}/users/follow/${user_id}/`, {
    headers: {
        'content-type': 'application/json',
        "Authorization":"Bearer " + localStorage.getItem("access")
    },
    method: 'POST',
    body: JSON.stringify({

        })
    })
    
    const response_json = await response.json()
    window.location.reload();

    return response_json
}
// 나를 팔로우 한 유저 조회 (팔로워)
async function getFollowerUserInfo(feed_user_id){

    const response = await fetch(`${backEndBaseUrl}/users/${feed_user_id}/followers/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    response_json = await response.json()
    return response_json
}



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
//댓글 등록
async function postComment(feed_id){

    const comment = document.getElementById('comment_content').value;
    const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/comment/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify({
            "comment":comment
        })
    })
    const response_json = await response.json()

    if (response.status == 200){
        alert(response_json["message"])
    }else {
        alert(response_json["detail"])
    }
    window.location.reload()   
    
    return response_json
}


//대댓글 등록
async function postRecomment(feed_id, comment_id, Input_Box){

    const recomment = document.getElementById(Input_Box).value;
    const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/comment/${comment_id}/recomment/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'POST',
        body: JSON.stringify({
            "recomment":recomment
        })
    })
    const response_json = await response.json()

    if (response.status == 200){
        alert(response_json["message"])
    }else {
        alert(response_json["detail"])
    }
    window.location.reload()   
    
    return response_json
}


// 대댓글 입력 박스
async function recommentInputFlex(Input_Box) {
    let con = document.querySelector(Input_Box);

    if(con.style.display == 'none'){
        con.style.display = 'flex';
        }else{
        con.style.display = 'none';
    }
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


// 게시글 삭제
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

// 댓글 삭제
async function deleteComment(comment_id){
    
    feed_id =location.search.replace("?id=","")
    const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/comment/${comment_id}`, {
        headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });

    if(response.status == 204){
        alert("댓글 삭제완료!")
        window.location.reload(); // 삭제가 되고나면 인덱스로 다시 이동하게함
    }
    else {
        alert(response.status);
    }
}


// 대댓글 삭제
async function deleteRecomment(comment_id, recomment_id){
    
    feed_id =location.search.replace("?id=","")
    const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/comment/${comment_id}/recomment/${recomment_id}/`, {
        headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });

    if(response.status == 204){
        alert("대댓글 삭제완료!")
        window.location.reload(); // 삭제가 되고나면 인덱스로 다시 이동하게함
    }
    else {
        alert(response.status);
    }
}

// 브랜드 리스트 조회
async function getNavBrandList(){
    const response = await fetch(`${backEndBaseUrl}/products/brand/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

// 카테고리 리스트 조회
async function getCategorylist(){
    const response = await fetch(`${backEndBaseUrl}/products/category/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

// NAV 카테고리 + 메뉴 버튼 
async function categoryNavMenu(Input_Box) {
    let con = document.querySelector(Input_Box);

    if(con.style.display == 'none'){
        con.style.display = 'grid';
        }else{
        con.style.display = 'none';
    }
}


// 품목, 브랜드 온/오프
function brandOn(){
    console.log("brandOn 클릭")
    if($("#nav_main_brand_right").is(":visible")){
        // 브랜드 오프
        $("#nav_main_brand_right").css("display", "none");
        $("#nav_main_bt_right").css("background-color", "#ffffff");
        $("#nav_main_bt_right").css("color", "#000000");

        $("#nav_main_category_left").css("display", "flex");
        $("#nav_main_bt_left").css("background-color", "#000000");
        $("#nav_main_bt_left").css("color", "#ffffff");
    }else{
        // 브랜드 온
        $("#nav_main_brand_right").css("display", "flex");
        $("#nav_main_bt_right").css("background-color", "#000000");
        $("#nav_main_bt_right").css("color", "#ffffff");

        $("#nav_main_category_left").css("display", "none");
        $("#nav_main_bt_left").css("background-color", "#ffffff");
        $("#nav_main_bt_left").css("color", "#000000");
    }
}

// 품목, 브랜드 온/오프
function categoryOn(){
    console.log("categoryOn 클릭")
    if($("#nav_main_category_left").is(":visible")){
        // 카테고리 오프
        $("#nav_main_category_left").css("display", "none");
        $("#nav_main_bt_left").css("background-color", "#ffffff");
        $("#nav_main_bt_left").css("color", "#000000");

        $("#nav_main_brand_right").css("display", "flex");
        $("#nav_main_bt_right").css("background-color", "#000000");
        $("#nav_main_bt_right").css("color", "#ffffff");
    }else{
        // 카테고리 온
        $("#nav_main_category_left").css("display", "flex");
        $("#nav_main_bt_left").css("background-color", "#000000");
        $("#nav_main_bt_left").css("color", "#ffffff");

        $("#nav_main_brand_right").css("display", "none");
        $("#nav_main_bt_right").css("background-color", "#ffffff");
        $("#nav_main_bt_right").css("color", "#000000");
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
        follower_list = await getFollowerUserInfo(feed.user_id)

        var feed_image = document.getElementsByClassName('feed_image')[0];
        var profile_image = document.getElementsByClassName('profile_image')[0];
        var nickname = document.getElementsByClassName('nickname')[0];
        var feed_content = document.getElementsByClassName('feed_content')[0];
        var feed_tags = document.getElementsByClassName('feed_tags')[0];
        var feed_create_at = document.getElementsByClassName('feed_create_at')[0];
        var feed_update_go = document.getElementsByClassName('feed_update_go')[0];
        var like_wrap = document.getElementsByClassName('like_button')[0];
        var unlike_wrap = document.getElementsByClassName('unlike_button')[0];
        var cmt_wrap = document.getElementsByClassName('comment_middle_section')[0];
        var comment_onclick = document.getElementsByClassName('comment_create_button')[0];
        var like_info = document.getElementsByClassName('like_info')[0];
        var etc_list = document.getElementsByClassName('etc_list')[0];
        var detail_follow = document.getElementsByClassName('detail_follow_box')[0];

        // folo = []
        // follower_list.forEach(follower=>{
        //     folo.push(follower.pk)
        // })
        // console.log(folo)
        //     if(folo.includes(User_payload.user_id)) {
        //         detail_follow.innerHTML += `<button id ="detail_follow" onclick="handleFollow(${feed.user_id})">팔로우취소</button>`

        //     }
        //     else if(!folo.includes(User_payload.user_id)){
        //         detail_follow.innerHTML += `<button id ="detail_follow" onclick="handleFollow(${feed.user_id})">팔로우</button>`
        //     }
        Fcount = 0

        if(feed.user_id != User_payload.user_id){

            follower_list.forEach(follower=>{
                console.log(follower)
                if(follower.length != 0){
                    if(follower.pk == User_payload.user_id){
                        console.log("내가 팔로우 하고 있을 때")
                        Fcount +=1
                        }
                    }
                
                })
                if(Fcount == 0){
                    detail_follow.innerHTML += `<button id ="detail_follow" onclick="handleFollow(${feed.user_id})">팔로우</button>`
                }
                else if(Fcount == 1){
                    console.log("내가 팔로우 하고 있지 않을 때")
                    detail_follow.innerHTML += `<button id ="detail_following" onclick="handleFollow(${feed.user_id})">팔로잉</button>`
                }
            }

        if(feed.user_id == User_payload.user_id){
            etc_list.innerHTML += `
            <a href="${frontEndBaseUrl}/communities/update.html?id=${feed_id}">수정</a>
            <a onclick="deleteFeed()" >삭제</a>
            `
        }
        like_info.innerText = `좋아요 ${feed.like_count}개`
        comment_onclick.setAttribute('onclick', `postComment(${feed.pk})`)
        // 피드 상세보기 프로필 이미지, 싫어요 카운트, 
        feed_image.setAttribute('src', `${backEndBaseUrl}${feed.image}`)
        profile_image.setAttribute('src', `${backEndBaseUrl}${feed.profile_image}`)
        nickname.innerText = `${feed.user}`
        feed_content.innerText = `${feed.content}`
        feed_create_at.innerText = `${timeForToday(feed.updated_at)}`






        //태그 반복
        tag_list = []
        feed.tags.forEach(tag => {
            feed_tags.innerHTML += `<a class="tag" href="${frontEndBaseUrl}/communities/search.html?search=${tag}">#${tag}</a>`
        })
        

        // 댓글 닉네임과 내용 반복문
        feed.comments.forEach(comt=>{
            // 댓글 삭제 유무
            if(comt.user_id == User_payload.user_id){
            cmt_wrap.innerHTML += `
            <div class="vertical_alignment">
                <div class="comment_box horizontal_alignment">
                    <div class="cmt_user horizontal_alignment">  
                        <div class="cmt_nickname">${comt.user}</div>
                        <div class="cmt_comment">${comt.comment}</div>
                    </div>
                    <div class="cmt_button_box horizontal_alignment">
                        <div class="cmt_reco_button" onclick="recommentInputFlex('#recomment_input_box_${comt.pk}')">대댓글</div>
                        <div class="cmt_like_button"><img class="comment_heart_view" src="/static/img/heart.png" onclick=""></div>
                        <div class="cmt_delete_button" onclick="deleteComment(${comt.pk})">X</div>
                    </div>
                </div>
                <div class="recomment_input_box horizontal_alignment" id="recomment_input_box_${comt.pk}" style="display: none;">
                    <textarea class="reco_input" id="recomment_content_${comt.pk}" type="text" placeholder="대댓글..." cols="5"rows="5"></textarea>
                    <button class="recomment_create_button" type="submit" onclick="postRecomment(${feed_id}, ${comt.pk}, 'recomment_content_${comt.pk}')">댓글작성</button>
                </div>
            </div>
            `
        } else {
            cmt_wrap.innerHTML += `
            <div class="vertical_alignment">
                <div class="comment_box horizontal_alignment">
                    <div class="cmt_user horizontal_alignment">  
                        <div class="cmt_nickname">${comt.user}</div>
                        <div class="cmt_comment">${comt.comment}</div>
                    </div>
                    <div class="cmt_button_box horizontal_alignment">
                        <div class="cmt_reco_button" onclick="recommentInputFlex('#recomment_input_box_${comt.pk}')">대댓글</div>
                        <div class="cmt_like_button"><img class="comment_heart_view" src="/static/img/heart.png" onclick=""></div>
                    </div>
                </div>
                <div class="recomment_input_box horizontal_alignment" id="recomment_input_box_${comt.pk}" style="display: none;">
                    <textarea class="reco_input" id="recomment_content_${comt.pk}" type="text" placeholder="대댓글..." cols="5"rows="5"></textarea>
                    <button class="recomment_create_button" type="submit" onclick="postRecomment(${feed_id}, ${comt.pk}, 'recomment_content_${comt.pk}')">댓글작성</button>
                </div>
            </div>
            `

        }
        comt.recomment.forEach(reco=>{
            // 대댓글 삭제 부분
            if(reco.user_id == User_payload.user_id){
                cmt_wrap.innerHTML +=`
                <div class="recomment_box horizontal_alignment">
                    <div class="reco_user horizontal_alignment">  
                        <div class="reco_nickname">┗ ${reco.user}</div>
                        <div class="reco_recomment">${reco.recomment}</div>
                    </div>
                    <div class="reco_delete_button" onclick="deleteRecomment(${comt.pk}, ${reco.pk})">X</div>
                </div>
                `
            } else {
                cmt_wrap.innerHTML +=`
                <div class="recomment_box horizontal_alignment">
                    <div class="reco_user horizontal_alignment">  
                        <div class="reco_nickname">┗ ${reco.user}</div>
                        <div class="reco_recomment">${reco.recomment}</div>
                    </div>
                </div>
                `
            }
        })
        })
        // 좋아요 부분
        if(feed.like.length == 0){
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


        // NAV 브랜드 리스트 조회
        brand_list = await getNavBrandList()
        alphabet = location.search.replace('?key=', '')
        if(alphabet.length == 0){
            brand_list = brand_list.slice(0, 20)
        }
        var brand_wrap = document.getElementsByClassName('nav_brand_list_area')[0];
        brand_list.forEach(br => {
            if(br.brand_name_en.startsWith(alphabet, 1)){
            brand_wrap.innerHTML += `
            <div class="brand_box">
                <div class="brand_name_en" onclick="location.href='${frontEndBaseUrl}/products/?key=${alphabet}&?brand_id=${br.id}'">${br.brand_name_en}</div>
                <div class="brand_name_kr">${br.brand_name_kr}</div>
            </div>
            `
            }
        })

        // 옷장 버튼
        var hd_closet_button = document.getElementById('header_closet_button')
        hd_closet_button.setAttribute('href', `/products/closet/?user_id=${User_payload.user_id}`)

        // NAV 브랜드 리스트 조회
        brand_list = await getNavBrandList()

        alphabet = location.search.replace('?key=', '')
        if(alphabet.length == 0){
            brand_list = brand_list.slice(0, 20)
        }
        var brand_wrap = document.getElementsByClassName('nav_brand_list_area')[0];
        brand_list.forEach(br => {
            if(br.brand_name_en.startsWith(alphabet, 1)){
            brand_wrap.innerHTML += `
            <div class="brand_box">
                <div class="brand_name_en" onclick="location.href='${frontEndBaseUrl}/products/?key=${alphabet}&?brand_id=${br.id}'">${br.brand_name_en}</div>
                <div class="brand_name_kr">${br.brand_name_kr}</div>
            </div>
        `
        }
    })

        //출석하기 출력문
        var AttendanceCheck = document.getElementById('AttendanceCheck')
        AttendanceCheck.setAttribute('onclick',`AttendanceCheck(${User_payload.user_id})`)
    

        // NAV 카테고리 리스트 조회
        category_list = await getCategorylist()
        
        // 메인 카테고리명 중복 제거 및 정렬
        let unique_category = [];
        category_list.forEach(category => {
            if(!unique_category.includes(category.main_category_name)) {
                unique_category.push({"main":category.main_category_name, "number":category.main_category_number});
            }
        });

        let main_category_list = unique_category.filter((thing, index) => {
            const cate = JSON.stringify(thing);
            return index === unique_category.findIndex(obj => {
            return JSON.stringify(obj) === cate;
            });
        });
        
        main_category = main_category_list.sort((a, b) => a.number - b.number)
        var sub_category_outer = document.getElementById('sub_category_area_outer')
        var sub_category_top = document.getElementById('sub_category_area_top')
        var sub_category_bottom = document.getElementById('sub_category_area_bottom')
        category_list.forEach(cate => {
            if('아우터' == cate.main_category_name) {
                sub_category_outer.innerHTML += `
                <div class="sub_info horizontal_alignment">
                    <div class="sub_category_name" onclick="location.href='/products/category/?category_id=${cate.id}'">
                        ${cate.sub_category_name}
                    </div>
                    <div class="sub_count">
                    </div>
                </div>
                `
            } else if ('상의' == cate.main_category_name){
                sub_category_top.innerHTML += `
                <div class="sub_info horizontal_alignment">
                    <div class="sub_category_name" onclick="location.href='/products/category/?category_id=${cate.id}'">
                        ${cate.sub_category_name}
                    </div>
                    <div class="sub_count">
                    </div>
                </div>
                `
            } else if ('바지' == cate.main_category_name){
                sub_category_bottom.innerHTML += `
                <div class="sub_info horizontal_alignment">
                    <div class="sub_category_name" onclick="location.href='/products/category/?category_id=${cate.id}'">
                        ${cate.sub_category_name}
                    </div>
                    <div class="sub_count">
                    </div>
                </div>
                `
            }
        })
    }
}

