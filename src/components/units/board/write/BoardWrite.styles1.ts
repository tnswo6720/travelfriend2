import styled from "@emotion/styled";
import { Modal } from "antd";
import type { ISubmitButtonProps } from "./BoardWrite.types";
import DaumPostcode from "react-daum-postcode";

export const Wrapper = styled.div`
  // background-image: url("/talk.png");
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  background-color: #fff;
  border-radius: 50px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto; // 추가된 부분
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #7b68ee;
  margin-bottom: 20px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  margin: 10px 0; // 위아래로 10px의 마진을 추가합니다.
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #7b68ee;
`;

export const YotubeLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #7b68ee;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
  font-weight: bold;
  background-color: #f8f8f8;
  color: #7b68ee;
`;

export const Error = styled.p`
  color: red;
  font-size: 12px;
`;

export const Subject = styled(Input)``;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
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
  margin: 0 auto;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    flex: 0 0 25%;
    box-sizing: border-box;
    padding: 0 10px;
  }
`;

export const Youtube = styled(Input)`
  margin-top: 0px; // 원하는 마진값을 설정하세요.
`;

// 추가로 필요한 스타일
export const Writer = styled(Input)``;

export const Password = styled(Input)``;

export const Contents = styled(Input)``;

export const AddressModal = styled(Modal)``;

export const AddressSearchInput = styled(DaumPostcode)``;
