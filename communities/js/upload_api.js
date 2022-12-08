const frontEndBaseUrl = "http://127.0.0.1:5500"
const backEndBaseUrl = "http://127.0.0.1:8000"


//게시글 생성
async function createPost() {

    let User_payload = JSON.parse(localStorage.getItem('payload'))
    if (User_payload === undefined ||  User_payload === null){
        location.href=`${frontend_base_url}/users/login.html`;
        
        
    } else {
        const payload = localStorage.getItem("payload");
        const parsed_payload = await JSON.parse(payload);
        console.log(parsed_payload);

        content = document.getElementById("content").value;
        tags = document.getElementById("tags").value;
        feed_image = document.getElementById("feed_image").files[0];

        const formData = new FormData();

        formData.append("tags", tags);
        formData.append("content", content);
        formData.append("image", feed_image);
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

        
    }
}