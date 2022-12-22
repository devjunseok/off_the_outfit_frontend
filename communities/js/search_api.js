async function getSearch(search){
    const response = await fetch(`${backEndBaseUrl}/communities/search/?search=${search}`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method:'GET',
    })

    response_json = await response.json()
    return response_json
}

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

// 상품 검색 API
async function getProdSearchAPI(search){
    
    const response = await fetch(`${backEndBaseUrl}/products/search/?search=${search}`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
    return response_json
}

// 유저 검색 API
async function getUserSearchAPI(search){
    
    const response = await fetch(`${backEndBaseUrl}/users/search/?search=${search}`, {
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    const response_json = await response.json()
    return response_json
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

// 나를 팔로우한 유저 조회
async function getFollowerUserInfo(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/followers/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    response_json = await response.json()
    return response_json
}

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
   
// 회원 상세 정보 조회 API
async function getUserDetailInfo(){

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    const response = await fetch(`${backEndBaseUrl}/users/${User_payload.user_id}/`,{
        headers: {
            'content-type': 'application/json',
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    response_json = await response.json()
    return response_json
}

window.onload = async function getSearch_api(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontEndBaseUrl}/users/login.html`;
        
        
    } else {
        const search_word = location.search.replace('?search=', '')
        search_list = await getSearch(search_word)
        prod_search_list = await getProdSearchAPI(search_word)
        user_search_list = await getUserSearchAPI(search_word)

        //팔로우,팔로워 회원정보 리스트 조회
        follower_list = await getFollowerUserInfo()
        follow_list = await getUserFollowInfo()
        //회원정보 상세 조회
        profile_list = await getUserDetailInfo()

        //검색어 확인
        var search_word_box = document.getElementById('search_word_box');
        search_word_box.innerText = `'${decodeURI(search_word)}' 검색 결과 입니다.`

// 전체 게시글 출력 반복문 부분
wrap = document.getElementsByClassName('sub_feed_list_box')[0];

search_list.forEach(feed => {
    //태그 출력 반복문
    tag_list = [];
    feed.tags.forEach(tag => {
        tag = `#${tag}`
        tag_list.push(tag)
    })

    if(tag_list.length == 0){
        tag_list = []
    } else if(tag_list.length == 1){
        tag_list = tag_list
    } else if(tag_list.length == 2){
        tag_list = `${tag_list[0]} ${tag_list[1]}`
    } else if(tag_list.length == 3){
        tag_list = `${tag_list[0]} ${tag_list[1]} ${tag_list[2]}`
    } else if(tag_list.length == 4){
        tag_list = `${tag_list[0]} ${tag_list[1]} ${tag_list[2]} ${tag_list[3]}`
    } else {
        tag_list = `${tag_list[0]} ${tag_list[1]} ${tag_list[2]} ${tag_list[3]} ${tag_list[4]}`
    }

        server_feed_image = feed.image.replace("http://backend:8000/", "https://api.offtheoutfit.com/")
        wrap.innerHTML += `
        <div class="sub_feed_box vertical_alignment">
            <div class="sub_feed_image_box">
                <img class="feed_image" src="${server_feed_image}" onclick="location.href='${frontEndBaseUrl}/communities/detail.html?id=${feed.pk}'"/>
            </div>
            <div class="sub_feed_info_box">
                <div class="info_top_section horizontal_alignment">
                    <div class="sub_nickname" onclick="location.href='/products/closet/?user_id=${feed.user_id}'">${feed.user}</div>
                    <div class="sub_like">좋아요 ${feed.like_count}개</div>
                </div>
                <div class="info_middle_section">
                    <div class="sub_content">${feed.content}</div>
                </div>
                <div class="info_bottom_section horizontal_alignment">
                    <div class="sub_tags">${tag_list}</div>
                    <div class="sub_created_at">${timeForToday(feed.updated_at)}</div>
                </div>
            </div>
        </div>
        `
    })

    // 전체 상품 반복 출력
    var product_wrap = document.getElementsByClassName('product_list_box')[0];
    prod_search_list.forEach(prod => {
        brand_name = prod.brand_name_en.trim().toLowerCase().replace(' ', '')
        brand_name_first = brand_name.substr(0, 1).toUpperCase()
        product_image_500 = prod.product_image.replace("_125.jpg", "_500.jpg")
        product_wrap.innerHTML += `
            <div class="product_box">
                <div class="product_image_box">
                    <img src="${product_image_500}" onclick="location.href='/products/detail/?product_number=${prod.product_number}'"/>
                </div>
                <div class="info_top_section horizontal_alignment">
                    <div class="product_brand" onclick="location.href='/products/?key=${brand_name_first}&?brand_id=${prod.brand}'">${prod.brand_name_en}</div>
                    <div class="product_review">review:${prod.review_count}</div>
                </div>
                <div class="info_middle_section">
                    <div class="product_name">${prod.product_name}</div>
                    <div class="horizontal_alignment">
                        <div class="product_price">${prod.discount_price} ~ ${prod.original_price}</div>
                        <div class="closet_add_button" onclick="closetProductAdd(${prod.product_number})">closet</div>
                    </div>
                </div>
                <div class="info_bottom_section horizontal_alignment">
                    <div class="product_category" onclick="location.href='/products/category/?category_id=${prod.category[0].id}'">${prod.category[0].main_category_name} > ${prod.category[0].sub_category_name}</div>
                    <div class="product_number">No.${prod.product_number}</div>
                </div>
            </div>
        `
    });


    //회원정보 출력 반복문 부분
    var follow_wrap = document.getElementsByClassName('follow_list')[0];
    counts = 0
    user_search_list.forEach(user =>{
        follow_list.forEach(Fuser =>{
            if(Fuser.pk==user.pk){
                counts=1
            }
            else{
                counts=0
            }

        })
        if(User_payload.user_id != user.pk){
        user_profile_image_default = user.profile_image.replace(`${backEndBaseUrl}/media/imgs/default.png`, `/static/img/default.png`)
        console.log()
        user_kakao_check = user.username.substr(0, 2);
        user_image_kakao = user.profile_image.replace('http://127.0.0.1:8000/media/http%3A/', 'https://');
        if(user_kakao_check == "k@"){
            if(counts == 0 || counts == []){
            follow_wrap.innerHTML += `
            <div class="user_box_main horizontal_alignment">
                <div class="left_info_section horizontal_alignment">
                    <div class="user_profile_image"><img class="image_view" src="${user_image_kakao}"></div>
                    <div class="user_profile_nickname">${user.nickname}</div>
                </div>
                <div class="middle_info_section horizontal_alignment">
                    <div class="summary_box vertical_alignment">
                        <div class="summary_title">팔로우</div>
                        <div class="summary_value">${user.followings_count}</div>
                    </div>
                    <div class="summary_box vertical_alignment">
                        <div class="summary_title ">팔로워</div>
                        <div class="summary_value">${user.followers_count}</div>
                    </div>
                    <div class="summary_box vertical_alignment">
                        <div class="summary_title ">피드</div>
                        <div class="summary_value">${user.feeds_count}</div>
                    </div>
                    <div class="summary_box vertical_alignment">
                        <div class="summary_title ">옷장</div>
                        <div class="summary_value">${user.closet_set_count}</div>
                    </div>
                </div>
                <div class="right_info_section vertical_alignment">
                    <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 하기</button></div>
                    <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                </div>
            </div>
            `
            } else {
            
                follow_wrap.innerHTML += `
                    <div class="user_box_main horizontal_alignment">
                        <div class="left_info_section horizontal_alignment">
                            <div class="user_profile_image"><img class="image_view" src="${user_image_kakao}"></div>
                            <div class="user_profile_nickname">${user.nickname}</div>
                        </div>
                        <div class="middle_info_section horizontal_alignment">
                            <div class="summary_box vertical_alignment">
                                <div class="summary_title">팔로우</div>
                                <div class="summary_value">${user.followings_count}</div>
                            </div>
                            <div class="summary_box vertical_alignment">
                                <div class="summary_title ">팔로워</div>
                                <div class="summary_value">${user.followers_count}</div>
                            </div>
                            <div class="summary_box vertical_alignment">
                                <div class="summary_title ">피드</div>
                                <div class="summary_value">${user.feeds_count}</div>
                            </div>
                            <div class="summary_box vertical_alignment">
                                <div class="summary_title ">옷장</div>
                                <div class="summary_value">${user.closet_set_count}</div>
                            </div>
                        </div>
                        <div class="right_info_section vertical_alignment">
                            <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 취소</button></div>
                            <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                        </div>
                    </div>
                    `

                }
        } else if(user.profile_image == `${backEndBaseUrl}/media/imgs/default.png`) {
            if(counts == 1){
                follow_wrap.innerHTML += `
                <div class="user_box_main horizontal_alignment">
                    <div class="left_info_section horizontal_alignment">
                        <div class="user_profile_image"><img class="image_view" src="${user_profile_image_default}"></div>
                        <div class="user_profile_nickname">${user.nickname}</div>
                    </div>
                    <div class="middle_info_section horizontal_alignment">
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title">팔로우</div>
                            <div class="summary_value">${user.followings_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">팔로워</div>
                            <div class="summary_value">${user.followers_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">피드</div>
                            <div class="summary_value">${user.feeds_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">옷장</div>
                            <div class="summary_value">${user.closet_set_count}</div>
                        </div>
                    </div>
                    <div class="right_info_section vertical_alignment">
                        <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 취소</button></div>
                        <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                    </div>
                </div>
                `
                }
                else{
                    follow_wrap.innerHTML += `
                <div class="user_box_main horizontal_alignment">
                    <div class="left_info_section horizontal_alignment">
                        <div class="user_profile_image"><img class="image_view" src="${user_profile_image_default}"></div>
                        <div class="user_profile_nickname">${user.nickname}</div>
                    </div>
                    <div class="middle_info_section horizontal_alignment">
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title">팔로우</div>
                            <div class="summary_value">${user.followings_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">팔로워</div>
                            <div class="summary_value">${user.followers_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">피드</div>
                            <div class="summary_value">${user.feeds_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">옷장</div>
                            <div class="summary_value">${user.closet_set_count}</div>
                        </div>
                    </div>
                    <div class="right_info_section vertical_alignment">
                        <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 하기</button></div>
                        <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                    </div>
                </div>
                `
    
                }

        } else {
            if(counts == 1){
                follow_wrap.innerHTML += `
                <div class="user_box_main horizontal_alignment">
                    <div class="left_info_section horizontal_alignment">
                        <div class="user_profile_image"><img class="image_view" src="${user.profile_image}"></div>
                        <div class="user_profile_nickname">${user.nickname}</div>
                    </div>
                    <div class="middle_info_section horizontal_alignment">
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title">팔로우</div>
                            <div class="summary_value">${user.followings_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">팔로워</div>
                            <div class="summary_value">${user.followers_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">피드</div>
                            <div class="summary_value">${user.feeds_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">옷장</div>
                            <div class="summary_value">${user.closet_set_count}</div>
                        </div>
                    </div>
                    <div class="right_info_section vertical_alignment">
                        <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 취소</button></div>
                        <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                    </div>
                </div>
                `
                }
                else{
                    follow_wrap.innerHTML += `
                <div class="user_box_main horizontal_alignment">
                    <div class="left_info_section horizontal_alignment">
                        <div class="user_profile_image"><img class="image_view" src="${user.profile_image}"></div>
                        <div class="user_profile_nickname">${user.nickname}</div>
                    </div>
                    <div class="middle_info_section horizontal_alignment">
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title">팔로우</div>
                            <div class="summary_value">${user.followings_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">팔로워</div>
                            <div class="summary_value">${user.followers_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">피드</div>
                            <div class="summary_value">${user.feeds_count}</div>
                        </div>
                        <div class="summary_box vertical_alignment">
                            <div class="summary_title ">옷장</div>
                            <div class="summary_value">${user.closet_set_count}</div>
                        </div>
                    </div>
                    <div class="right_info_section vertical_alignment">
                        <div class="follow_button"><button onclick="handleFollow(${user.pk})">팔로우 하기</button></div>
                        <div class="feed_list_button"><button onclick="location.href='/products/closet/?user_id=${user.pk}'">옷장 보기</button></div>
                    </div>
                </div>
                `
                }
        } 
    }
    })





// HEADER 부분
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

// 옷장 버튼
var hd_closet_button = document.getElementById('header_closet_button')
hd_closet_button.setAttribute('href', `/products/closet/?user_id=${User_payload.user_id}`)

// NAV 브랜드 리스트 조회
brand_list = await getNavBrandList()

alphabet = location.search.replace('?key=', '')
if(alphabet.length == 0){
brand_list = brand_list.slice(0, 20).sort(function(){return Math.random() - Math.random();})
}
var brand_wrap = document.getElementsByClassName('nav_brand_list_area')[0];
brand_list.forEach(br => {
if(br.brand_name_en.startsWith(alphabet, 1)){
brand_wrap.innerHTML += `
<div class="brand_box">
    <div class="brand_name_en" onclick="location.href='${frontEndBaseUrl}/products/?key=${alphabet}&?brand_id=${br.id}'">${br.brand_name_en}</div>
    <div class="brand_name_kr">${br.brand_name_kr} (${br.product_set_count})</div>
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
