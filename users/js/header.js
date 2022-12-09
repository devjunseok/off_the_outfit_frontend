document.addEventListener('DOMContentLoaded', ()=>{
    var interval = window.setInterval(rollingCallback, 3000);
})
function rollingCallback(){
    //.prev 클래스 삭제
    document.querySelector('.rolling_box .prev').classList.remove('prev');

    //.current -> .prev
    let current = document.querySelector('.rolling_box .current');
    current.classList.remove('current');
    current.classList.add('prev');

    //.next -> .current
    let next = document.querySelector('.rolling_box .next');
    //다음 목록 요소가 널인지 체크
    if(next.nextElementSibling == null){
        document.querySelector('.rolling_box ul li:first-child').classList.add('next');
    }else{
    	//목록 처음 요소를 다음 요소로 선택
        next.nextElementSibling.classList.add('next');
    }
    next.classList.remove('next');
    next.classList.add('current');
}
