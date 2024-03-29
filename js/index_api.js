

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


// NAV 카테고리 + 메뉴 버튼 
async function categoryNavMenu(Input_Box) {
    let con = document.querySelector(Input_Box);

    if(con.style.display == 'none'){
        con.style.display = 'grid';
        }else{
        con.style.display = 'none';
    }
}


window.onload = async function getIndex_API(){
    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontEndBaseUrl}/users/login.html`;
        
        
    } else {
  
        //게시글 전체 리스트 조회
        feed_list = await getIndexFeedList()

        // 인기 게시글
        best_feed_list = await getIndexFeedList()
        if (best_feed_list.length > 3 ) {
            best_feed_list = best_feed_list.sort((a, b) => b.like_count - a.like_count).slice(0,3);
        }

        //인기 게시글 출력 반복문 부분
        var best_wrap = document.getElementsByClassName('main_feed_list_box')[0];

        best_feed_list.forEach(best_feed => {
            //태그 출력 반복문
            tag_list = [];
            best_feed.tags.forEach(tag => {
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
            best_wrap.innerHTML += `
            <div class="new_feed_box vertical_alignment">
                <div class="nf_image_box">
                    <img class="nf_image" src="${backEndBaseUrl}${best_feed.image}" onclick="location.href='${frontEndBaseUrl}/communities/detail.html?id=${best_feed.pk}'"/>
                </div>
                <div class="nf_info_box horizontal_alignment">
                    <div class="left_section vertical_alignment">
                        <div class="nf_nickname" onclick="location.href='/products/closet/?user_id=${best_feed.user_id}'">${best_feed.user}</div>
                        <div class="nf_content">${best_feed.content}</div>
                        <div class="nf_tag">${tag_list}</div>
                    </div>
                    <div class="right_section vertical_alignment">
                        <div class="like_box vertical_alignment">
                            <div class="nf_like">좋아요 ${best_feed.like_count}개</div>
                            <div class="nf_unlike">싫어요 ${best_feed.unlike_count}개</div>
                        </div>
                        <div class="right_section_middle"></div>
                        <div class="nf_create_at">${timeForToday(best_feed.created_at)}</div>
                    </div>
                </div>
            </div>
            `
        })    


        // 전체 게시글 출력 반복문 부분
        wrap = document.getElementsByClassName('sub_feed_list_box')[0];

        feed_list.forEach(feed => {
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
                wrap.innerHTML += `
                <div class="sub_feed_box vertical_alignment">
                    <div class="sub_feed_image_box">
                        <img class="feed_image" src="${backEndBaseUrl}${feed.image}" onclick="location.href='${frontEndBaseUrl}/communities/detail.html?id=${feed.pk}'"/>
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
            <div class="brand_name_en" style = "cursor:pointer;" onclick="location.href='${frontEndBaseUrl}/products/?key=${alphabet}&?brand_id=${br.id}'">${br.brand_name_en}</div>
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