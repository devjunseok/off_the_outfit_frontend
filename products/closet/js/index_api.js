

// 내가 팔로우 한 유저 조회
async function getUserFollowInfo(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/followings/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    response_json = await response.json()
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

// 유저 기준 옷장 조회
async function getClosetProductList(){
    search = location.search.replace("?user_id=", "").replace("?name_tag=", "").split("&")
    user_id = search[0];
    name_tag = search[1];
    const response = await fetch(`${backEndBaseUrl}/products/product/closet/${user_id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}


// 옷장 사용자 정보 가져오기
async function getUser(){
    search = location.search.replace("?user_id=", "").replace("?name_tag=", "").split("&")
    user_id = search[0];
    name_tag = search[1];

    const response = await fetch(`${backEndBaseUrl}/users/${user_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
    return response_json
}


// 옷장 기반 유저 추천
async function getClosetRecommendUser(){
    search = location.search.replace("?user_id=", "").replace("?name_tag=", "").split("&")
    user_id = search[0];
    name_tag = search[1];

    const response = await fetch(`${backEndBaseUrl}/recommend/closet/user/${user_id}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
    return response_json
}

// 옷장 기반 유저 추천
async function getAllUserList(){
    search = location.search.replace("?user_id=", "").replace("?name_tag=", "").split("&")
    user_id = search[0];
    name_tag = search[1];

    const response = await fetch(`${backEndBaseUrl}/users/`, {
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


// 옷장 상품 등록
async function closetProductAdd(product_id) {

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontend_base_url}/users/login.html`;
        
        
    } else {


        const response = await fetch(`${backEndBaseUrl}/products/product/${product_id}/closet/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        }); 
        if (response.status == 200) {
        alert("옷장 상품 등록");
        window.location.replace(`${frontEndBaseUrl}/products/closet/`);
        }
    }
}

// 옷장 상품 제거
async function closetProductDelete(product_id, closet_id) {

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/products/product/${product_id}/closet/${closet_id}/`, {
        headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });

    if(response.status == 204){
        alert("옷장 상품 제거 완료!")
        window.location.reload(); // 삭제가 되고나면 인덱스로 다시 이동하게함
    }
    else {
        alert(response.status);
    }
}


// 네임태그 입력 박스
async function recommentInputFlex() {
    let con = document.querySelector('.nametag_input_box');

    if(con.style.display == 'none'){
        con.style.display = 'flex';
        }else{
        con.style.display = 'none';
    }
}

// 네임 태그 입력 API
async function closetNametagCreate() {

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontend_base_url}/users/login.html`;
        
    } else {

        name_tag = document.getElementById("name_tag").value;
        
        const response = await fetch(`${backEndBaseUrl}/products/product/nametag/`, {
            headers: {
                'content-type': 'application/json',
                "Authorization":"Bearer " + localStorage.getItem("access")
            },
            method: 'POST',
            body: JSON.stringify({
                "tag_name":name_tag
            })
        })
        const response_json = await response.json()
    
        if (response.status == 200){
            alert(response_json["message"])
        }
        window.location.reload()   
        return response_json
    }
}


// 네임 태그 상품 등록 API
async function NametagProdCreate(product_number, closet_id, Input_tag_name) {

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontend_base_url}/users/login.html`;
        
    } else {

        name_tag = document.getElementById(Input_tag_name).value;

        const response = await fetch(`${backEndBaseUrl}/products/product/${product_number}/closet/${closet_id}/`, {
            headers: {
                'content-type': 'application/json',
                "Authorization":"Bearer " + localStorage.getItem("access")
            },
            method: 'PUT',
            body: JSON.stringify({
                "name_tag":name_tag
            })
        })
        const response_json = await response.json()
    
        if (response.status == 200){
            alert(response_json["message"])
        }
        window.location.reload()   
        return response_json
    }
}
    

// 네임태그 상품 입력 박스
async function nametagProdInputFlex(nametagProdInput) {
    let con = document.querySelector(nametagProdInput);

    if(con.style.display == 'none'){
        con.style.display = 'flex';
        }else{
        con.style.display = 'none';
    }
}


window.onload = async function getIndex_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontEndBaseUrl}/users/login.html`;
        
        
    } else {
        //회원정보 리스트 조회
        profile_list = await getUser()
        //팔로우 회원정보 리스트 조회
        follow_list = await getUserFollowInfo()

        if(User_payload.user_id != profile_list.pk){
            
        //팔로우 출력
        var follow_wrap = document.getElementsByClassName('follow_box')[0];

        //팔로우 버튼 반복 출력
        counts =0
        follow_list.forEach(user=>{

            

            if(user.pk == profile_list.pk){
                counts = 1   
            }
            else{
                counts = 0
            }
            })
            if(counts ==1){
                follow_wrap.innerHTML += `<button class="profile_follow" id ="profile_follow" onclick="handleFollow(${profile_list.pk})">팔로우 취소</button>`
            }
            else{
                follow_wrap.innerHTML += `<button class="profile_follow" id ="profile_follow" onclick="handleFollow(${profile_list.pk})">팔로우</button>`
            }

        }
        

        
        
            
        

        
        // 전체 상품 조회
        product_list = await getClosetProductList()

        search = location.search.replace("?user_id=", "").replace("?name_tag=", "").replace("?category=", "").split("&")
        user_id = search[0];
        name_tag = search[1];
        category = search[2];

        // 전체 상품 반복 출력
        var product_wrap = document.getElementsByClassName('product_list_box')[0];

        // 네임태그가 선택 안된경우
        if(name_tag == undefined || name_tag == ""){
            // 유저 아이디가 본인 아이디인 경우
            if(user_id == User_payload.user_id){
                product_list.forEach(prod => {
                    if(category == undefined || decodeURI(category) == "" || decodeURI(category) == "전체" || decodeURI(category) == prod.product.category[0].main_category_name){
                    brand_name = prod.product.brand_name_en
                    brand_name_first = brand_name.substr(0, 1).toUpperCase()
                    product_image_500 = prod.product.product_image.replace("_125.jpg", "_500.jpg")
                    product_wrap.innerHTML += `
                    <div class="product_box">
                        <div class="product_image_box">
                            <img src="${product_image_500}" onclick="location.href='/products/detail/?product_number=${prod.product.product_number}'">
                        </div>
                        <div class="info_top_section horizontal_alignment">
                            <div class="product_brand" onclick="location.href='/products/?key=${brand_name_first}&?brand_id=${prod.product.brand}'">${prod.product.brand_name_en}</div>
                            <div class="product_review">review:${prod.product.review_count}</div>
                        </div>
                        <div class="info_middle_section">
                            <div class="product_name">${prod.product.product_name}</div>
                            <div class="horizontal_alignment">
                                <div class="product_price">${prod.product.discount_price} ~ ${prod.product.original_price}</div>
                                <div class="name_tag_add_prod" onclick="nametagProdInputFlex('#info_Input_section_${prod.pk}')">Add</div>
                                <div class="closet_delete_button" onclick="closetProductDelete(${prod.product.product_number}, ${prod.pk})">Delete</div>
                            </div>
                        </div>
                        <div class="info_bottom_section horizontal_alignment">
                            <div class="product_category" onclick="location.href='/products/category/?category_id=${prod.product.category[0].id}'">${prod.product.category[0].main_category_name} > ${prod.product.category[0].sub_category_name}</div>
                            <div class="product_number">No.${prod.product.product_number}</div>
                        </div>
                        <div class="info_Input_section horizontal_alignment" id="info_Input_section_${prod.pk}" style="display:none;">
                            <input class="nametag_prod_input" id="tag_name_${prod.pk}" type="text" placeholder="네임태그..." />
                            <button class="nametag_prod_add_button" type="submit" onclick="NametagProdCreate(${prod.product.product_number}, ${prod.pk}, 'tag_name_${prod.pk}')">등록</button>
                        </div>
                    </div>
                    `
                }
            // 유저 아이디가 본인 유저가 아닌 경우 
            })} else {
                product_list.forEach(prod => {
                    if(category == undefined || decodeURI(category) == "" || decodeURI(category) == "전체" || decodeURI(category) == prod.product.category[0].main_category_name){
                        brand_name = prod.product.brand_name_en.trim().toLowerCase().replace(' ', '')
                        brand_name_first = brand_name.substr(0, 1).toUpperCase()
                        product_image_500 = prod.product.product_image.replace("_125.jpg", "_500.jpg")
                        product_wrap.innerHTML += `
                        <div class="product_box">
                            <div class="product_image_box">
                                <img src="${product_image_500}" onclick="location.href='/products/detail/?product_number=${prod.product.product_number}'">
                            </div>
                            <div class="info_top_section horizontal_alignment">
                                <div class="product_brand" onclick="location.href='/products/?key=${brand_name_first}&?brand_id=${prod.brand}'">${prod.product.brand_name_en}</div>
                                <div class="product_review">review:${prod.product.review_count}</div>
                            </div>
                            <div class="info_middle_section">
                                <div class="product_name">${prod.product.product_name}</div>
                                <div class="horizontal_alignment">
                                    <div class="product_price">${prod.product.discount_price} ~ ${prod.product.original_price}</div>
                                </div>
                            </div>
                            <div class="info_bottom_section horizontal_alignment">
                                <div class="product_category" onclick="location.href='/products/category/?category_id=${prod.product.category[0].id}'">${prod.product.category[0].main_category_name} > ${prod.product.category[0].sub_category_name}</div>
                                <div class="product_number">No.${prod.product.product_number}</div>
                            </div>
                        </div>
                        `
                    }
            })}
        // 네임태그가 선택된 경우
        } else {
            product_list.forEach(prod => {
            if(prod.name_tag != null){
            if(prod.name_tag.tag_name == decodeURI(name_tag)){
                if(category == undefined || decodeURI(category) == "" || decodeURI(category) == "전체" || decodeURI(category) == prod.product.category[0].main_category_name){
                    brand_name = prod.product.brand_name_en.trim().toLowerCase().replace(' ', '')
                    brand_name_first = brand_name.substr(0, 1).toUpperCase()
                    product_image_500 = prod.product.product_image.replace("_125.jpg", "_500.jpg")
                    product_wrap.innerHTML += `
                    <div class="product_box">
                        <div class="product_image_box">
                            <img src="${product_image_500}" onclick="location.href='/products/detail/?product_number=${prod.product.product_number}'">
                        </div>
                        <div class="info_top_section horizontal_alignment">
                            <div class="product_brand" onclick="location.href='/products/?key=${brand_name_first}&?brand_id=${prod.brand}'">${prod.product.brand_name_en}</div>
                            <div class="product_review">review:${prod.product.review_count}</div>
                        </div>
                        <div class="info_middle_section">
                            <div class="product_name">${prod.product.product_name}</div>
                            <div class="horizontal_alignment">
                                <div class="product_price">${prod.product.discount_price} ~ ${prod.product.original_price}</div>
                                <div class="closet_add_button" onclick="closetProductDelete(${prod.product.product_number}, ${prod.pk})">Delete</div>
                            </div>
                        </div>
                        <div class="info_bottom_section horizontal_alignment">
                            <div class="product_category" onclick="location.href='/products/category/?category_id=${prod.product.category[0].id}'">${prod.product.category[0].main_category_name} > ${prod.product.category[0].sub_category_name}</div>
                            <div class="product_number">No.${prod.product.product_number}</div>
                        </div>
                    </div>
                    `
                }
            }}
        });
    }

        

        // 옷장 타이틀 출력
        var closet_name_tag_title = document.getElementsByClassName("ts_menu_title")[0];
        
        if (name_tag == undefined){
            closet_name_tag_title.innerText = `${profile_list.nickname}님의 옷장입니다.`
        } else {
            closet_name_tag_title.innerText = `${decodeURI(name_tag)}`
        }


        //마이페이지 HAEDER 부분 출력
        var main_profile_image = document.getElementsByClassName('main_profile_image')[0];
        var profile_nickname = document.getElementsByClassName('profile_nickname')[0];
        var profile_tier_info = document.getElementsByClassName('profile_tier_info')[0];
        var profile_next_tier_info = document.getElementsByClassName('profile_next_tier_info')[0];
        var follow_value = document.getElementById('follow_value_count')
        var follower_value = document.getElementById('follower_value_count')
        var feed_value = document.getElementById('feed_value_count')
        var closet_count_value = document.getElementById('closet_value_count')

        
        profile_nickname.innerText = `${profile_list.nickname}`
        profile_next_tier_info.innerText = `현재 ${profile_list.nickname}님의 포인트는 ${profile_list.point} 포인트 입니다`
        follow_value.innerText = `${profile_list.followings_count}`
        follower_value.innerText = `${profile_list.followers_count}`
        feed_value.innerText = `${profile_list.feeds_count}`
        closet_count_value.innerText = `${profile_list.closet_set_count}`




        // 일반 or 소셜 유저 프로필 이미지 처리
        profile_image_default = profile_list.profile_image.replace('/media/imgs/default.png', `/static/img/default.png`)
        kakao_check = profile_list.username.substr(0, 2);
        if(kakao_check == "k@"){
            profile_image_kakao = profile_list.profile_image.replace('/media/http%3A/', 'https://');
            main_profile_image.setAttribute("src", `${profile_image_kakao}`)
        } else if (profile_list.profile_image == '/media/imgs/default.png') {
            main_profile_image.setAttribute("src", `${profile_image_default}`)
        } else {
            main_profile_image.setAttribute("src", `${backEndBaseUrl}${profile_list.profile_image}`)
        }

        
        //마이페이지 등급 조건문
        if(profile_list.point>=0&&profile_list.point <31){
            profile_tier_info.innerText =`LV.1 브론즈`
        }
        if(profile_list.point>=31&&profile_list.point <51){
            profile_tier_info.innerText =`LV.2 실버`
        }
        if(profile_list.point>=51&&profile_list.point <101){
            profile_tier_info.innerText =`LV.3 골드`
        }
        if(profile_list.point>=101&&profile_list.point <201){
            profile_tier_info.innerText =`LV.4 플레티넘`
        }
        if(profile_list.point >=201){
            profile_tier_info.innerText =`LV.5 VIP`
        }
        //출석하기 출력문
        var AttendanceCheck = document.getElementById('AttendanceCheck')
        AttendanceCheck.setAttribute('onclick',`AttendanceCheck(${User_payload.user_id})`)

        // 옷장 버튼
        var hd_closet_button = document.getElementById('header_closet_button')
        hd_closet_button.setAttribute('href', `/products/closet/?user_id=${User_payload.user_id}`)

        // 옷장 카테고리 목록
        var closet_all = document.getElementById('closet_all');
        var closet_outer = document.getElementById('closet_outer');
        var closet_top = document.getElementById('closet_top');
        var closet_bottom = document.getElementById('closet_bottom');
        var closet_sneakers = document.getElementById('closet_sneakers');

        closet_all.setAttribute('onclick', `location.href='/products/closet/?user_id=${user_id}&?name_tag=&?category=전체'`);
        closet_outer.setAttribute('onclick', `location.href='/products/closet/?user_id=${user_id}&?name_tag=&?category=아우터'`);
        closet_top.setAttribute('onclick', `location.href='/products/closet/?user_id=${user_id}&?name_tag=&?category=상의'`);
        closet_bottom.setAttribute('onclick', `location.href='/products/closet/?user_id=${user_id}&?name_tag=&?category=바지'`);
        closet_sneakers.setAttribute('onclick', `location.href='/products/closet/?user_id=${user_id}&?name_tag=&?category=스니커즈'`);


        // NAV 네임태그 반복
        user_info = await getUser()
        name_tag_list = user_info.nametag_set

        var closet_list_name_tag = document.getElementsByClassName('closet_list_name_tag')[0];
        name_tag_list.forEach(name_tag => {
            closet_list_name_tag.innerHTML += `
            <li onclick="location.href='/products/closet/?user_id=${user_info.pk}&?name_tag=${name_tag.tag_name}'">${name_tag.tag_name}</li>
            `
        })

        // 네임 태그 본인 옷장에서만 생성
        var name_tag_add_button = document.getElementsByClassName('name_tag_add_button')[0];
        if(search[0] != User_payload.user_id) {
            name_tag_add_button.innerText = ''
        }

        // NAV 옷장 추천
        closet_user_list = await getClosetRecommendUser()
        if(closet_user_list['message'] != undefined ){
            closet_user_list = [user_id]
        }
        closet_user_list.sort(function(){return Math.random() - Math.random();})
        // 전체 유저 불러오기
        all_user_list = await getAllUserList()

        // 전체 유저 랜덤 리스트 제작
        all_user_list.sort(function(){return Math.random() - Math.random();})

        var closet_recommend_list = document.getElementById('closet_recommend_user_list')
        for_count = 0

        if(closet_user_list.length == 1){
            all_user_list.forEach(closet_user => {
                // 목록 리스트 제한
                if(for_count < 10){
                    if(closet_user.pk != user_id && closet_user.closet_set_count != 0){
                        kakao_check = closet_user.username.substr(0, 2);
                        if(kakao_check == "k@"){
                            profile_image_kakao = closet_user.profile_image.replace('/media/http%3A/', 'https://');
                        closet_recommend_list.innerHTML += `
                        <div class="closet_recommend_user_box horizontal_alignment">
                            <img src="${profile_image_kakao}" class="nav_mini_profile_image">
                            <div class="nav_mini_box vertical_alignment">
                                <span class="nav_mini_nickname" onclick="location.href='/products/closet/?user_id=${closet_user.pk}'">${closet_user.nickname}님의 옷장</span>
                                <span class="nav_mini_info">보유 상품 수 : ${closet_user.closet_set_count}</span>
                            </div>
                        </div>
                        `
                        for_count += 1
                        } else if (closet_user.profile_image == '/media/imgs/default.png'){
                            profile_image_default = closet_user.profile_image.replace('/media/imgs/default.png', `/static/img/default.png`)
                            closet_recommend_list.innerHTML += `
                        <div class="closet_recommend_user_box horizontal_alignment">
                            <img src="${profile_image_default}" class="nav_mini_profile_image">
                            <div class="nav_mini_box vertical_alignment">
                                <span class="nav_mini_nickname" onclick="location.href='/products/closet/?user_id=${closet_user.pk}'">${closet_user.nickname}님의 옷장</span>
                                <span class="nav_mini_info">보유 상품 수 : ${closet_user.closet_set_count}</span>
                            </div>
                        </div>
                        `
                        for_count += 1
                        } else {
                            closet_recommend_list.innerHTML += `
                        <div class="closet_recommend_user_box horizontal_alignment">
                            <img src="${backEndBaseUrl}${closet_user.profile_image}" class="nav_mini_profile_image">
                            <div class="nav_mini_box vertical_alignment">
                                <span class="nav_mini_nickname" onclick="location.href='/products/closet/?user_id=${closet_user.pk}'">${closet_user.nickname}님의 옷장</span>
                                <span class="nav_mini_info">보유 상품 수 : ${closet_user.closet_set_count}</span>
                            </div>
                        </div>
                        `
                        for_count += 1
                        }
                    }
                }
            })
        } else {
            closet_user_list.forEach(closet_user => {
                // 목록 리스트 제한
                if(for_count < 10){
                    if(closet_user.pk != user_id){
                        kakao_check = closet_user.username.substr(0, 2);
                        if(kakao_check == "k@"){
                            profile_image_kakao = closet_user.profile_image.replace('/media/http%3A/', 'https://');
                        closet_recommend_list.innerHTML += `
                        <div class="closet_recommend_user_box horizontal_alignment">
                            <img src="${profile_image_kakao}" class="nav_mini_profile_image">
                            <div class="nav_mini_box vertical_alignment">
                                <span class="nav_mini_nickname" onclick="location.href='/products/closet/?user_id=${closet_user.pk}'">${closet_user.nickname}님의 옷장</span>
                                <span class="nav_mini_info">보유 상품 수 : ${closet_user.closet_set_count}</span>
                            </div>
                        </div>
                        `
                        for_count += 1
                        } else if (closet_user.profile_image == '/media/imgs/default.png'){
                            profile_image_default = closet_user.profile_image.replace('/media/imgs/default.png', `/static/img/default.png`)
                            closet_recommend_list.innerHTML += `
                        <div class="closet_recommend_user_box horizontal_alignment">
                            <img src="${profile_image_default}" class="nav_mini_profile_image">
                            <div class="nav_mini_box vertical_alignment">
                                <span class="nav_mini_nickname" onclick="location.href='/products/closet/?user_id=${closet_user.pk}'">${closet_user.nickname}님의 옷장</span>
                                <span class="nav_mini_info">보유 상품 수 : ${closet_user.closet_set_count}</span>
                            </div>
                        </div>
                        `
                        for_count += 1
                        } else {
                            closet_recommend_list.innerHTML += `
                        <div class="closet_recommend_user_box horizontal_alignment">
                            <img src="${backEndBaseUrl}${closet_user.profile_image}" class="nav_mini_profile_image">
                            <div class="nav_mini_box vertical_alignment">
                                <span class="nav_mini_nickname" onclick="location.href='/products/closet/?user_id=${closet_user.pk}'">${closet_user.nickname}님의 옷장</span>
                                <span class="nav_mini_info">보유 상품 수 : ${closet_user.closet_set_count}</span>
                            </div>
                        </div>
                        `
                        for_count += 1
                        }
                    }
                }
            })
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
