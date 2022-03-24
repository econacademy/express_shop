# express_shop
express로 생성하는 shop 입니다.
*주의*
mysql 아이디는 root 비밀번호는 mysql 이고 로컬에서만 접속가능합니다.
EXPRESS_SHOP_SQL.txt 를 root 계정으로 로그인한 후 붙여넣어야 db가 생성됩니다.
로컬에 node module 로 mysql, express를 꼭 인스톨하셔야 합니다. 
admin_routing.js or service_routing을 node or nodemon으로 실행해야 서버에 구동됩니다.  

1.관리자 페이지 관리 (port : 1234)
    실제 반환되는 페이지가 있는 url
    get  "/admin/mem/list/:page" : 회원 리스트
    get  "/admin/mem/read/:id/form" 회원 상세 && 관리폼
    get  "/admin/mem/create/form" 회원 등록폼 

    서비스(페이지 반환 없음)
    get  "/admin/mem/read/:id :  id 중복 확인 
    get  "/admin/mem/read/:phone : 전화번호 중복확인 
    put  "/admin/mem/update/" (header 본문) :회원수정
    delete  "/admin/mem/delete/:id" : 회원 삭제
    post  "/admin/mem/create/" (header 본문) :회원 등록 

2.서비스되는 주소 관리 (port : 9876)
    post "/mem/sign/in" (파라미터 해더 본문)
    post "/mem/sign/up" (파라미터 해더 본문)

