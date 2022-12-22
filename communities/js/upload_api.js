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

// 텍스트 미리보기
$(document).ready(function(){

    $("#content").keyup(function(){
        $("#out_content").text($("#content").val());
    });

    $("#tags").keyup(function(){
        $("#out_tags").text($("#tags").val());
    });
});


// 게시글 작성 이미지 미리보기
let fileTag = document.querySelector("input[name=feed_image]");

fileTag.onchange = function() {

    let imgTag = document.querySelector("#PreviewImg");

    if(fileTag.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function(data) {
            imgTag.src = data.target.result;
        }
        reader.readAsDataURL(fileTag.files[0]);
    }
    else {
        imgTag.src = "/static/img/default.png"
    }
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


//게시글 생성
async function createPost() {

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontend_base_url}/users/login.html`;
        
        
    } else {
        const payload = localStorage.getItem("payload");
        const parsed_payload = await JSON.parse(payload);

        content = document.getElementById("content").value;
        tags = document.getElementById("tags").value;
        feed_image = document.getElementById("feed_image").files[0];
        product = document.getElementById("product").value;

        const formData = new FormData();

        formData.append("tags", tags);
        formData.append("content", content);
        formData.append("image", feed_image);
        formData.append("product", product);
        const response = await fetch(`${backEndBaseUrl}/communities/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: formData,
        }); 
        if (response.status == 200) {
        alert("게시물 등록");
        window.location.replace(`${frontEndBaseUrl}/`);
        }
        else if (response.status == 400){
            alert("사진, 내용, 태그를 전부 입력해주세요!")
        }
    }
}

// 상품 검색 박스
async function prodSearchInputFlex() {
    let search = document.querySelector('.search_prod_box');
    let image = document.querySelector('.feed_image_box');

    if(search.style.display == 'none'){
        search.style.display = 'flex';
        image.style.display = 'none';
    }else{
        search.style.display = 'none';
        image.style.display = 'flex';
    }
}

// 상품 검색 API
async function getProdSearchAPI(search){
    
    console.log(search)
    const response = await fetch(`${backEndBaseUrl}/products/search/?search=${search}`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
    var result_section = document.getElementsByClassName('result_section')[0];
    response_json.slice(0, 100).forEach(prod => {
        product_image_500 = prod.product_image.replace('_125.jpg', '_500.jpg')
        result_section.innerHTML += `
            <div class="result_box horizontal_alignment" id="result_box">
                <div class="left_image_section">
                    <img src="${product_image_500}">
                </div>
                <div class="center_info_section">
                    <div class="info_title_box horizontal_alignment">
                        <div class="section_title_en">Product Info</div>
                        <div class="section_title_kr">상품 정보</div>
                    </div>
                    <div class="prod_detail_info_box horizontal_alignment">
                        <div class="prod_info_title">브랜드</div>
                        <div class="prod_info_desc">${prod.brand_name_en} / ${prod.brand_name_kr}</div>
                    </div>
                    <div class="prod_detail_info_box horizontal_alignment">
                        <div class="prod_info_title">상품번호</div>
                        <div class="prod_info_desc">${prod.product_number}</div>
                    </div>
                    <div class="prod_detail_info_box horizontal_alignment">
                        <div class="prod_info_title">상품명</div>
                        <div class="prod_info_desc">${prod.product_name}</div>
                    </div>
                    <div class="prod_detail_info_box horizontal_alignment">
                        <div class="prod_info_title">카테고리</div>
                        <div class="prod_info_desc">${prod.category[0].main_category_name} > ${prod.category[0].sub_category_name}</div>
                    </div>
                </div>
                <div class="right_button_section vertical_alignment">
                    <button class="result_buttons" onclick="location.href='/products/detail/?product_number=${prod.product_number}'">상품 보기</button>
                    <button class="result_buttons" onclick="closetProductAdd(${prod.product_number})">옷장 추가</button>
                    <button class="result_buttons" onclick="prodSelectButton('${prod.product_number}')">선택</button>
                </div>
            </div>
        `
    })
    return response_json
}

// 검색시 div 새로고침 
async function refrashSearch(){
    $("#result_section").load(location.href+' #result_box');
    search = document.getElementById('search_prod').value;
    getProdSearchAPI(search)
}

// 상품 선택시 input에 값 넣어주기
async function prodSelectButton(product_number){
    var value_input = document.getElementById('product').value;
    if(value_input == ''){
        $("#product").attr('value', `${product_number}`);
    } else {
        $("#product").attr('value', `${value_input}, ${product_number}`);
    }
}

// input 초기화
async function refrashInput(){
    var prod_input = document.getElementById('product');
    $("#product").attr('value', ``);
}

// 옷장 상품 등록
async function closetProductAdd(product_number) {

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontend_base_url}/users/login.html`;
        
        
    } else {
        const response = await fetch(`${backEndBaseUrl}/products/product/${product_number}/closet/`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        }); 
        if (response.status == 200) {
        alert("옷장 상품 등록");
        }
    }
}


window.onload = async function getUpload_API(){
    
    let User_payload = JSON.parse(localStorage.getItem('payload'))

    // 사용자 정보 가져오기
    user_info = await getUser()
    var user_nickname = document.getElementsByClassName('nickname')[0];
    var user_profile_image = document.getElementById('profile_image');
    user_nickname.innerText = `${user_info.nickname}`

    //출석하기 출력문
    var AttendanceCheck = document.getElementById('AttendanceCheck')
    AttendanceCheck.setAttribute('onclick',`AttendanceCheck(${User_payload.user_id})`)

    // 옷장 버튼
    var hd_closet_button = document.getElementById('header_closet_button')
    hd_closet_button.setAttribute('href', `/products/closet/?user_id=${User_payload.user_id}`)


    // 일반 or 소셜 유저 프로필 이미지 처리
    
    kakao_check = user_info.username.substr(0, 2);
    if(kakao_check == "k@"){
        profile_image_kakao = user_info.profile_image.replace('/media/http%3A/', 'https://');
        user_profile_image.setAttribute("src", `${profile_image_kakao}`)
    } else if (user_info.profile_image == '/media/imgs/default.png') {
        profile_image_default = user_info.profile_image.replace('/media/imgs/default.png', `/static/img/default.png`)
        user_profile_image.setAttribute("src", `${profile_image_default}`)
    } else {
        user_profile_image.setAttribute("src", `${backEndBaseUrl}${user_info.profile_image}`)
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