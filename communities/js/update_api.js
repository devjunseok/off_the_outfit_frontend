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

//  게시글 수정
async function updatePost() {

    const feed_id = location.search.replace("?id=", "")
    

    content = document.getElementById("content").value;
    tags = document.getElementById("tags").value;
    feed_image = document.getElementById("feed_image").files[0];

    const formData = new FormData();
    
    formData.append("content", content);
    formData.append("tags", tags);
    formData.append("image", feed_image);
    
    const response = await fetch(`${backEndBaseUrl}/communities/${feed_id}/`, {
        headers: {
            "Authorization":"Bearer " + localStorage.getItem("access")
        },
        method: 'PUT',
        body:formData,    
        
    })
    const response_json = await response.json()
    if (response.status ==200){
        alert(response_json["message"])
        window.location.replace(`${frontEndBaseUrl}/communities/detail.html?id=${feed_id}`);
    }
}


window.onload = async function getUpdate_API(){

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