# The Film
### 📽️ 영화 커뮤니티 사이트

- [The Film→](https://the-film-q8kc.vercel.app/)
- [후기→](https://velog.io/@kangmin01/The-Film-%EC%A0%9C%EC%9E%91-%ED%9B%84%EA%B8%B0)
- 제작 기간 : 2024.01.07~2024.03.12 (약 2달)

![329d5790-8a5b-4493-9795-501e93960c01](https://github.com/kangmin01/the-film/assets/57487175/1564c642-1f58-452c-b820-78499ef0d2b2)

## 🔸개요
더 필름은 영화 커뮤니티 사이트로서, 다양한 영화에 대한 평가와 리뷰를 확인하고 공유할 수 있습니다. 사용자는 별점을 매기고 자기 생각을 나눌 수 있으며, 토론방을 통해 다른 이용자들과의 양방향 소통도 가능합니다. 관심 있는 주제에 대해 이미 개설된 토론방에 참여하거나, 새로운 토론방을 만들어 직접 대화를 이끌 수도 있습니다.

## 🔸기술 스택
|기능|기술 스택|
|--|--|
|프레임워크| Next.js|
|언어|TypeScript|
|스타일| Tailwind CSS|
|데이터베이스| MongoDB|
|서버 상태관리| SWR |
|이미지 업로드 및 관리| Cloudinary|
|배포/호스팅| Vercel|


## 🔸기능

### 회원가입 및 로그인
- 이메일과 비밀번호를 이용한 회원가입 및 로그인
- 소셜 로그인 기능 지원 (구글/카카오톡/깃허브) : 소셜 로그인을 통해 가입 시 유저명은 고유하게 랜덤으로 생성
![2244f28c-e644-4a57-bbc8-46199a5411c5](https://github.com/kangmin01/the-film/assets/57487175/448804f0-aff2-47f4-87fd-9122824af044)

### 관리자 기능
- 영화를 등록
![cnrk-Clipchamp로-제작](https://github.com/kangmin01/the-film/assets/57487175/3dea0b21-b12f-41cd-9c49-da8059991b22)

### 영화 페이지
- 영화 제목이나 감독 이름으로 검색 가능
![775543f4-ab35-4c3a-a573-5cc2f42f8c75](https://github.com/kangmin01/the-film/assets/57487175/490f157d-27d4-4808-9549-b382276018ca)
- 영화 카드 클릭 시, 상세 페이지로 이동
- 해당 영화에 등록된 리뷰와 토론방을 확인 가능 
- 리뷰를 등록하고 토론방을 개설 가능 

### 리뷰
- 리뷰 작성, 조회, 수정, 삭제 기능을 제공
![제목-없는-동영상-Clipchamp로-제작-_4_](https://github.com/kangmin01/the-film/assets/57487175/e576e62f-228c-492f-a281-d58ce772e40c)

### 토론방
- 토론방 개설, 조회, 수정, 삭제 기능을 제공
- 자세한 내용은 카드 클릭 시 모달을 통해 확인 가능
- 다른 사용자가 개설한 토론방에 참여 가능 
- 마감 기한이 임박한 토론방은 디데이로 표시
![246df1c8-4902-40e9-909b-f0f915fe997b](https://github.com/kangmin01/the-film/assets/57487175/77b9804e-b899-4fd9-a12e-ee9f0ffcc326)



### 마이 페이지
- 본인이 작성한 리뷰를 최신 순으로 확인 및 수정, 삭제 가능하다. 
- 본인이 개설한 토론방과 참여한 토론방을 분리하여 확인 가능하다. 개설한 토론방은 수정 및 삭제 가능, 종료된 토론방은 목록 하단에 위치한다.
