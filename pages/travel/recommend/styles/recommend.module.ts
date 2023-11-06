import styled from "@emotion/styled";

export const DestinationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; // 아이템들 사이에 공간 동일하게 배분
  width: 150%; // 컨테이너를 화면 넓이에 맞게 조정
  z-index: 1;
`;

export const DestinationCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  background: white;
  flex: 1 0 30%; // 아이템의 너비를 유동적으로 조정
  max-width: 300px; // 아이템의 최대 너비 설정
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;

export const DestinationImage = styled.img`
  width: 243px;
  height: 140px;
  border-radius: 10px;
  object-fit: contain;
`;

export const DestinationName = styled.h2`
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

export const UserInfo = styled.div`
  display: inline-block;
  background-color: #9370db; // 보라색
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
  color: #ffffff; // 흰색
`;

export const ButtonContainer = styled.div`
  display: flex;

  padding: 0px;

  button {
    background-color: #9370db; // 버튼 배경색을 보라색 계열로
    color: #ffffff; // 버튼 텍스트를 흰색으로
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease; // 배경색 변경을 부드럽게

    &:hover {
      background-color: #4b0082; // hover 시 배경색 변경
    }

    &:disabled {
      background-color: #d8bfd8; // 비활성화된 버튼의 배경색을 연한 보라색으로
      cursor: not-allowed;
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SearchButton = styled.button`
  height: 30px;
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
