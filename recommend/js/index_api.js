
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

// 지역 추천 상품 리스트 조회
async function getIndexProductList(city){

    const response = await fetch(`${backEndBaseUrl}/recommend/weather/${city}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
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



window.onload = async function getIndex_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontEndBaseUrl}/users/login.html`;
        
        
    } else {
        city = location.search.replace("?city=", "")

        // 지역 추천 상품 리스트 조회

        product_list = await getIndexProductList(city)

        // 지역 추천 상품 리스트 조회
        var outer_wrap = document.getElementById('outer')
        var top_wrap = document.getElementById('top')
        var bottom_wrap = document.getElementById('bottom')
        var outer_view = document.getElementById('view_outer_button_01')
        var top_view = document.getElementById('view_top_button_02')
        var bottom_view = document.getElementById('view_bottom_button_03')

        product_list.outer.forEach(prod => {
            outer_wrap.innerHTML += `
            <div class="product_box">
                <div class="product_image_box">
                    <img src="${prod.product_image}" alt="">
                </div>
                <div class="info_top_section horizontal_alignment">
                    <div class="product_brand">${prod.brand_name_en}</div>
                    <div class="product_review">review:${prod.review_count}</div>
                </div>
                <div class="info_middle_section">
                    <div class="product_name">${prod.product_name}</div>
                    <div class="product_price">${prod.discount_price} ~ ${prod.original_price}</div>
                </div>
                <div class="info_bottom_section horizontal_alignment">
                    <div class="product_category">${prod.category[0].main_category_name} > ${prod.category[0].sub_category_name}</div>
                    <div class="product_number">No.${prod.product_number}</div>
                </div>
            </div>
            `
        outer_view.innerText = `${prod.category[0].sub_category_name}`
            
        });
        product_list.top.forEach(prod =>{
        top_wrap.innerHTML += `
        <div class="product_box">
            <div class="product_image_box">
                <img src="${prod.product_image}" alt="">
            </div>
            <div class="info_top_section horizontal_alignment">
                <div class="product_brand">${prod.brand_name_en}</div>
                <div class="product_review">review:${prod.review_count}</div>
            </div>
            <div class="info_middle_section">
                <div class="product_name">${prod.product_name}</div>
                <div class="product_price">${prod.discount_price} ~ ${prod.original_price}</div>
            </div>
            <div class="info_bottom_section horizontal_alignment">
                <div class="product_category">${prod.category[0].main_category_name} > ${prod.category[0].sub_category_name}</div>
                <div class="product_number">No.${prod.product_number}</div>
            </div>
        </div>
        `
        top_view.innerText = `${prod.category[0].sub_category_name}`
        });
        product_list.bottom.forEach(prod =>{
        bottom_wrap.innerHTML += `
        <div class="product_box">
            <div class="product_image_box">
                <img src="${prod.product_image}" alt="">
            </div>
            <div class="info_top_section horizontal_alignment">
                <div class="product_brand">${prod.brand_name_en}</div>
                <div class="product_review">review:${prod.review_count}</div>
            </div>
            <div class="info_middle_section">
                <div class="product_name">${prod.product_name}</div>
                <div class="product_price">${prod.discount_price} ~ ${prod.original_price}</div>
            </div>
            <div class="info_bottom_section horizontal_alignment">
                <div class="product_category">${prod.category[0].main_category_name} > ${prod.category[0].sub_category_name}</div>
                <div class="product_number">No.${prod.product_number}</div>
            </div>
        </div>
        `
        bottom_view.innerText = `${prod.category[0].sub_category_name}`
        });

        
    //출석하기 출력문
    var AttendanceCheck = document.getElementById('AttendanceCheck')
    AttendanceCheck.setAttribute('onclick',`AttendanceCheck(${User_payload.user_id})`)

    // 옷장 버튼
    var hd_closet_button = document.getElementById('header_closet_button')
    hd_closet_button.setAttribute('href', `/products/closet/?user_id=${User_payload.user_id}`)


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
