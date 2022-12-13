
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