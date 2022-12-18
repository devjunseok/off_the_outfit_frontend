
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

// 상품 정보 상세보기 API
async function getIndexProductDetail(product_number){
    const response = await fetch(`${backEndBaseUrl}/products/product/${product_number}/`,{
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


// //댓글 등록
// async function createPost(porduct_id){

//     const comment = document.getElementById('comment_content').value;
//     const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/comment/`, {
//         headers: {
//             'content-type': 'application/json',
//             "Authorization":"Bearer " + localStorage.getItem("access")
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             "comment":comment
//         })
//     })
//     const response_json = await response.json()

//     if (response.status == 200){
//         alert(response_json["message"])
//     }else {
//         alert(response_json["detail"])
//     }
//     window.location.reload()   
    
//     return response_json
// }


// //대댓글 등록
// async function postRecomment(feed_id, comment_id, Input_Box){

//     const recomment = document.getElementById(Input_Box).value;
//     const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/comment/${comment_id}/recomment/`, {
//         headers: {
//             'content-type': 'application/json',
//             "Authorization":"Bearer " + localStorage.getItem("access")
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             "recomment":recomment
//         })
//     })
//     const response_json = await response.json()

//     if (response.status == 200){
//         alert(response_json["message"])
//     }else {
//         alert(response_json["detail"])
//     }
//     window.location.reload()   
    
//     return response_json
// }



// // 대댓글 입력 박스
// async function recommentInputFlex(Input_Box) {
//     let con = document.querySelector(Input_Box);

//     if(con.style.display == 'none'){
//         con.style.display = 'flex';
//         }else{
//         con.style.display = 'none';
//     }
// }


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


// // 게시글 삭제
// async function deleteFeed(){
    
//     feed_id =location.search.replace("?id=","")
//     const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/`, {
//         headers: {
//         Authorization: "Bearer " + localStorage.getItem("access"),
//         },
//         method: "DELETE",
//     });

//     if(response.status == 204){
//         alert("게시글삭제완료!")
//         window.location.replace(`${frontEndBaseUrl}/`); // 삭제가 되고나면 인덱스로 다시 이동하게함
//     }
//     else {
//         alert(response.status);
//     }
// }

// // 댓글 삭제
// async function deleteComment(comment_id){
    
//     feed_id =location.search.replace("?id=","")
//     const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/comment/${comment_id}`, {
//         headers: {
//         Authorization: "Bearer " + localStorage.getItem("access"),
//         },
//         method: "DELETE",
//     });

//     if(response.status == 204){
//         alert("댓글 삭제완료!")
//         window.location.reload(); // 삭제가 되고나면 인덱스로 다시 이동하게함
//     }
//     else {
//         alert(response.status);
//     }
// }


// // 대댓글 삭제
// async function deleteRecomment(comment_id, recomment_id){
    
//     feed_id =location.search.replace("?id=","")
//     const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/comment/${comment_id}/recomment/${recomment_id}/`, {
//         headers: {
//         Authorization: "Bearer " + localStorage.getItem("access"),
//         },
//         method: "DELETE",
//     });

//     if(response.status == 204){
//         alert("대댓글 삭제완료!")
//         window.location.reload(); // 삭제가 되고나면 인덱스로 다시 이동하게함
//     }
//     else {
//         alert(response.status);
//     }
// }

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
        const product_number = location.search.replace('?product_number=', '')
        product_info = await getIndexProductDetail(product_number)
        console.log(product_info)

        // 브랜드 정보 - top_info
        var brand_image = document.getElementById('brand_image');
        brand_name = product_info.brand_name_en.trim().toLowerCase()
        brand_name_first = brand_name.substr(0, 1).toUpperCase()
        brand_image.setAttribute('src', `https://image.msscdn.net/mfile_s01/_brand/free_medium/${brand_name}.png`)
        brand_image.setAttribute('onclick', `location.href='/products/?key=${brand_name_first}&?brand_id=${product_info.brand}'`)

        // 상품명 - top_info
        var prod_name = document.getElementById('prod_name');
        prod_name.innerText = `${product_info.product_name}`


        // 상품 이미지 - left_info
        var product_image = document.getElementById('image');
        product_image_500 = product_info.product_image.replace('_125.jpg', '_500.jpg')
        product_image.setAttribute('src', `${product_image_500}`)

        // 상품 정보 - right_info - top
        var


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

