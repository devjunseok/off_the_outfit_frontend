# off_the_outfit_backend

## 프로젝트

![title](https://user-images.githubusercontent.com/111295065/207591435-39d46ea9-f8df-4fd2-b8c9-2b1b1bbabe1e.png)

### 오프더아웃핏 (off the outfit)

배포 사이트 :

[https://www.offtheoutfit.com/](https://www.offtheoutfit.com/)

시연 영상 :

[https://youtu.be/WbKLup-Qcuk/](https://youtu.be/WbKLup-Qcuk/)

프로젝트 일정 : 2022.11.30 ~ 2022.12.29

![https://user-images.githubusercontent.com/111295065/207312572-c009cd12-3a73-44f4-a5ed-4d89ff7ff246.png](https://user-images.githubusercontent.com/111295065/207312572-c009cd12-3a73-44f4-a5ed-4d89ff7ff246.png)

프론트엔드 Repository : [https://github.com/devjunseok/off_the_outfit_frontend](https://github.com/devjunseok/off_the_outfit_frontend)

백엔드  Repository :[https://github.com/devjunseok/off_the_outfit_backend](https://github.com/devjunseok/off_the_outfit_backend)

S.A 링크 : [B1팀 최종 프로젝트](https://www.notion.so/B1-27932c8fdffb4308901a7ecdabade724)

## 1. 프로젝트 주제

### 무신사 기반 패션 플랫폼

사용자의 지역에 따라서 옷을 추천해주고, 자신의 스타일 정보를 공유하는 패션 플랫폼

## 2. 기술 스택

- 백엔드
    - Python 3.10
    - Django 4.1.4
    - Django Rest Framework 3.14
    - Django Rest Framework simple-jwt 5.2.2
    - Docker 20.10.12
    - Nginx 1.22.0
    - Gunicorn 20.1.0
- 프론트엔드
    - HTML5
    - Javascript
    - JQuery
    - CSS
- 데이터베이스
    - AWS RDS PostgreSQL
    - AWS S3
- 배포
    - AWS EC2
    - AWS Route 53
    - AWS CloudFront

## 3. 싸지방 팀 팀원 및 역할

### 박준석 - [devjunseok - Overview](https://github.com/devjunseok)

팀장 / 프로젝트 기획 / 테스트 코드 작성 / user 기능/ DB 모델링 / EC2, CloudFront, S3를 이용한 프로젝트 배포 총괄

### 노우석 - [WooSeok-Nho - Overview](https://github.com/WooSeok-Nho/)

팀원 / 프로젝트 기획 / user기능 / 날씨추천기능 / 포인트적립기능 / FrontEnd 제작,API연결

### 성창남 - [SungChangNam - Overview](https://github.com/SungChangNam)

팀원 / 프로젝트 기획 / communities 기능/ DB 모델링 / FrontEnd 제작,API연결

### 양기철 - [hanmariyang - Overview](https://github.com/hanmariyang)

팀원 / 프로젝트 기획 / products, recommend 기능 / 상품정보 크롤링 / DB모델링 / 추천 서비스 기능 / FrontEnd 템플릿 제작 및 API연결

### 이태겸 - [poro625 - Overview](https://github.com/poro625)

팀원 / 프로젝트 기획 / communites 기능, products 기능, weather 기능/크롤링/ DB 모델링 /태그 기능/ 검색 기능/상세보기 수정 및 삭제

## 4. 프로젝트 기능

### User 기능(회원가입/로그인 - simple jwt 사용)

- 회원가입 시, 아이디, 닉네임, 비밀번호 정규표현식 필터링 적용 ( 회원정보 수정 시에도 적용)
- extra_kwargs 처리로 에러 메세지 세분화 처리
- 로그인 시 발급되는 페이로드에 유저 pk값, username 값 저장
- 회원정보 CRUD 기능
- 회원가입 시 약관동의 기능
- 마지막 로그인 365일 경과된 아이디 삭제 기능
- 포인트 기능, 출석, 게시글 작성 등 활동으로 획득 가능
- 팔로우, 팔로워
- 유저 권한 변경 기능( 권한에 따라 사이트 관리 가능)

### Communities 기능 (게시글, 댓글, 대댓글)

- 게시글 CRUD 기능
- 게시글, 유저 검색 기능
- 실시간 검색어 순위 기능
- 태그
- 게시글 신고 기능 (super 계정이 처리)

### Manager 기능 ( 사이트 관리 페이지)

- 권한을 받은 유저가 접근 가능, 권한은 admin이 부여
- 해당 페이지에서 무신사 상품 정보, 날씨 정보 업데이트 가능
- 신고당한 게시글 검토 후 처리 가능, 삭제 or 신고 횟수 초기화
- 유저 삭제 기능

### Products, Recommend, Weather 기능

- 무신사 데이터 크롤링
- 네이버 지역별 날씨 크롤링
- 사용자의 지역에 맞춰서, 해당 지역 날씨에 맞게 무신사 상품 추천
- 무신사 상품들 내 옷장에 추가 가능
- 내 옷장에 담긴 상품들 기준으로 유사한 상품이 옷장에 담겨있는 유저 추천

 

## 4-1. 트러블 슈팅

### 박준석

**문제 : 프론트엔드 보수 시, AWS s3 버킷에 파일을 업로드 하였는데, 연동된 CloudFront에서 업로드 된 파일이 갱신이 안돼는 상황 발생**

**원인 : CloudFront는 관리형 캐시 정책 사용 중, 때문에 업로드 된 파일이 바로 업로드 되지 않고 캐시가 업데이트 될 때까지 갱신이 되지 않음.**

**해결 : CloudFront에서 무효화 처리를 해줌으로써 해결** 

**참조: [https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)**

### 양기철

**문제 : Serializer를 사용하지않고 ManyToMany 필드를 사용하는 대량 DB 저장시 각 필드끼리 연결되지 않는 문제 발생**

**원인 : 크롤링한 외부 데이터를 가져와서 DB에 저장시키려다보니 각각 알맞는 필드를 연결시키지 못함**

**해결 : ManyToMany 필드에 맞는 로직으로 저장하여 해결**
### 노우석

**문제 : 출석버튼을 눌렀을 때 db에 저장되어 있는 point가 증가하게 설계해놓았다.**

**다만 코드 로직 자체를 하루에 한번 포인트가 증가하게 할 수 있게 datetime.today()와 버튼을 클릭했을 때의 현재 날짜를 저장하는 click_time의 값을 비교해서 값이 같으면 기능이 작동하지 않게 작성해놓았는데 제대로 작동하지 않는 상황 발생**

**해결 : 두개의 값이 완전히 같게 보여도 타입이 달랐기 때문에 타입을 모델에서 변경해주어 같게 만들어주었더니 해결.**

### 이태겸

**문제 : 태그 기능을 게시글에 작성 시 여러개를 저장하더라도 각각 DB에 저장이 되도록 해야 하는데 각각 저장이 되지 않는 상황 발생**

**원인 : 원인은 Serializer 사용 시 ManyToMany 관계를 의식하지 않고 태그 기능을 구현하였기 때문에 생긴 현상.**

**해결 :ManyToMany 관계 Serializer를 사용하여 기존 Serializer를 수정 보완하여서 해결**

### 성창남

**문제 : 연동 하여 관리자가 신고 게시글 삭제 기능 구현 할 때 백엔드 정보가 프로트엔드에 구현되지 않은 오류가 발생 하는 문제가 발생. 처음에는 await fetch 만 사용 하여 원치않는 정보도 같이 들어와서 오류 발생.**

**해결 : 이중 반복문 을 활용하여 해결.**

## 5. 유저 피드백 반영

### 1. 좋아요 싫어요 버튼이 같이 눌리는 현상이 있습니다.

- 프론트 자체 로직에서 조건을 줄때 내 유저정보와 게시물을 좋아하는 유저목록안에 유저 정보를 비교하면서
내 유저 id가 게시물을 좋아하는 유저 id목록 안에 있을때 와 없을때 count라는 변수안에 숫자를 줘서 그 숫자에 
따라함수가 작동하거나 작동하지 않게 끔 로직을 재작성했다

### 2. 유저 포인트 활용하는 기능이 있었으면 좋겠습니다.

- 포인트 활용하는 부분이 없는 부분에 대해서 피드백이 많이 들어와 해당 부분 대해서 고민을 해보고 유저 랭킹 페이지를 신설하여, 임시적으로라도 유저 포인트를 가지고 활용되는부분을 만들어서 피드백 반영 완료

### 3. 상품이 존재하지 않는 브랜드 카테고리를 누를시에 아무것도 뜨지 않아 사용자가 헷갈립니다.

- 브랜드 탭에서 상품이 없는 브랜드는 에러가 뜨는 상황이 있는데 해당부분은 자바스크립트 window.onload 부분에서 실행되어야 할 코드가 상품이 없는 관계로 실행되지 못하는 코드로 예외 처리를 해주었고 브랜드탭에 상품 카운트를 보여줌으로써 상품이 존재하지 않는 브랜드를 처리함으로써 피드백 반영 완료.

### 4. 피드에 좋아요 싫어요 카운트 아이콘이 댓글 갯수 아이콘인지 좋아요 갯수 아이콘인지  헷갈립니다.

-  좋아요 싫어요 갯수를 원래 아이콘으로 보여줬었는데, html을 수정하여 한글로 보이게 해둬서 직관성을 높임. 피드백 반영 완료

### 5. 게시글 작성 시, 필수내용을 한 가지라도 넣지 않았을 때, 안내 메세지가 뜨지 않아 사용자 입장에서는 왜 게시글이 작성이 안되는지 모르겠습니다.
 
- 프론트엔드 js에서 게시글을 등록했을 때, http status code에 따라 if문을 줘서 사용자에게 왜 안되는지 안내하는 alert창 제공, 이 부분 뿐만 아니라 모든 부분에 적용. 피드백 반영 완료

## 6. 와이어프레임

[https://www.figma.com/file/hgtTToRaWbfP87GfNvHaMa/Off_the_Outfit?node-id=0%3A1&t=xw7FNe87Jr8IecaC-1](https://www.figma.com/file/hgtTToRaWbfP87GfNvHaMa/Off_the_Outfit?node-id=0%3A1&t=xw7FNe87Jr8IecaC-1)

![https://user-images.githubusercontent.com/111295065/207312359-91bb78a9-c108-4897-8cc3-e0cbb1f00cd0.png](https://user-images.githubusercontent.com/111295065/207312359-91bb78a9-c108-4897-8cc3-e0cbb1f00cd0.png)

## 7. Architecture

![https://user-images.githubusercontent.com/111295065/207308569-1f6531bf-c8b1-4ff7-b6cf-442bcbe5cfb9.png](https://user-images.githubusercontent.com/111295065/207308569-1f6531bf-c8b1-4ff7-b6cf-442bcbe5cfb9.png)

## 8. API 명세서

[off_the_outfit (getpostman.com)](https://documenter.getpostman.com/view/24913558/2s8YzWRfo4)

## 9. DB 설계 ERD

![https://user-images.githubusercontent.com/111295065/207309475-759e6e8d-8265-4c49-8c8f-9f83478c329d.png](https://user-images.githubusercontent.com/111295065/207309475-759e6e8d-8265-4c49-8c8f-9f83478c329d.png)
