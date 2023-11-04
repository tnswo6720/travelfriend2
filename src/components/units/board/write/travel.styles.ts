import styled from "@emotion/styled";

export const PageContainer = styled.div`

  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; // 화면 너비에 맞게 설정
  calc(100vh - 60px)
  height: 100vh; // 전체 화면 높이를 차지하도록 설정
`;

export const Wrapper = styled.div`
  background-image: url("/traveltravel.jpg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px; // 전체 페이지에 패딩 추가
  background-color: #fff; // 내용 배경색 추가
  border-radius: 50px;
  width: 100%; // 화면 너비의 80%로 설정
  max-width: 1200px; // 최대 너비를 1200px로 설정

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // 내용에 그림자 추가
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #7b68ee; // 제목 텍스트 색상을 중간 슬레이트 블루로 설정
  margin-bottom: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row; // 변경된 부분
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #7b68ee; // 제목 텍스트 색상을 중간 슬레이트 블루로 설정
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
  font-weight: bold;
  background-color: #f8f8f8; // 입력 필드 배경색을 밝은 회색으로 설정
  color: #7b68ee; // 제목 텍스트 색상을 중간 슬레이트 블루로 설정
`;

export const Error = styled.p`
  color: red;
  font-size: 12px;
`;

export const Subject = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8; // 입력 필드 배경색 추가
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none; // 버튼 테두리 제거
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  margin-top: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin: 0 auto; // 추가
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    // FlexContainer의 직접적인 자식인 div 요소에만 스타일 적용
    flex: 0 0 25%; // flex-grow, flex-shrink, flex-basis를 한 번에 설정. flex-basis를 25%로 설정하여 한 줄에 4개씩 배치.
    box-sizing: border-box; // padding, border 등이 width, height에 포함되도록 설정.
    padding: 0 10px; // 좌우 padding 설정. 이를 통해 요소 간 간격을 조절.
  }
`;
