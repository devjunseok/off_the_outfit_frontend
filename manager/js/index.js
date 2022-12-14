const frontEndBaseUrl = "http://127.0.0.1:5500";
const backEndBaseUrl = "http://127.0.0.1:8000";

// 브랜드 업데이트
async function brandUpdate() {
  const response = await fetch(`${backEndBaseUrl}/products/brand/update/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
  });

  response_json = await response.json();

  if (response.status == 200) {
    alert(response_json["message"]);
  }
  return response_json;
}

// 카테고리 업데이트
async function categoryUpdate() {
  const response = await fetch(`${backEndBaseUrl}/products/category/update/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
  });

  response_json = await response.json();

  if (response.status == 200) {
    alert(response_json["message"]);
  }
  console.log("hi");
  return response_json;
}

// 무신사 제품정보 업데이트
async function productUpdate() {
  const response = await fetch(`${backEndBaseUrl}/products/product/update/`, {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "POST",
  });

  response_json = await response.json();

  if (response.status == 200) {
    alert(response_json["message"]);
  }
  console.log("hi");
  return response_json;
}

// 신고된 글 전체 리스트 조회

async function getIndexReportList() {
    const response = await fetch(`${backEndBaseUrl}/manager/reportfeed/`, {
    headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
    },
    });

    if (response.status == 200) {
        const response_json = await response.json();
    return response_json;
        } else {
        alert("정보 불러오기 실패");
    }
}

// 신고된 글 상세 조회
window.onload = async function loadReports() {
    report_feed_list = await getIndexReportList();
    // console.log(report_feed_list[0].reports);

    const report_list_box_wrap = document.getElementsByClassName("table")[0];

    report_feed_list.forEach(report_feed =>{

    report_feed.reports.forEach(rt =>{
        report_list_box_wrap.innerHTML +=` 
        <tr class="report-body" id="report-list">
            <td class="report" id="report">${rt.report}</td>
            <td class="user" id="user">${rt.user}</td>
            <td class="create_time" id="create_time">${rt.created_at}<a class="header-link"  href="#" onclick="deleteReport(${rt.feed})">삭제</a>
            </td>
        </tr>
        `
        console.log(rt)

    })

    });
    

    


};
    

// 유저 전체 조회
async function getAdminUser() {
    const response = await fetch(`${backEndBaseUrl}/manager/usermanage/`, {
    headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
    },
    });

    if (response.status == 200) {
        const response_json = await response.json();
    return response_json;
        } else {
        alert("정보 불러오기 실패");
    }
}


// 유저 정보 
async function loadUsers() {
    whole_user = await getAdminUser();
    console.log(whole_user);

    const user_list_box_wrap = document.getElementsByClassName("table_user")[0];

    

    whole_user.forEach(td =>{
        user_list_box_wrap.innerHTML +=` 
        <tr class="report_body" id="report-list">
            <td class="username" id="report">${td.username}</td>
            <td class="nick" id="user">${td.nickname}</td>
            <td class="date" id="create_time">${td.date_of_birth}<a class="header-link" href="#" onclick="deleteUser(${td.pk})" >삭제</a> </td>
        </tr>
        `
        
    })
    

    };
    

    loadUsers()


    
async function deleteReport(feed_id){


        const response = await fetch(`${backEndBaseUrl}/manager/feedmanage/${feed_id}/`, {
            headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
            },
            method: "DELETE",
        });
    
        if(response.status == 204){
            alert("게시글삭제완료!")
            window.location.reload();
        }
        else {
            alert(response.status);
        }
    }


// 유저 삭제
async function deleteUser(user_id){
    
    const response = await fetch(`${backEndBaseUrl}/manager/usermanage/${user_id}/`, {
        headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });

    if(response.status == 204){
        alert("유저삭제 완료")
        window.location.reload();
    }
    else {
        alert(response.status);
    }
}








