const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"



//  게시글 수정
async function updatePost() {

    const feed_id = location.search.replace("?id=", "")
    

    content = document.getElementById("content").value;
    tags = document.getElementById("tags").value;
    feed_image = document.getElementById("feed_image").files[0];

    const formData = new FormData();
    console.log(tags,content,feed_image)
    
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
        // window.location.replace(`${frontEndBaseUrl}/communities/detail.html?id=${feed_id}`);
    }
}