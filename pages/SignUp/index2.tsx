import React, { type ChangeEvent, useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "antd";
import { DaumPostcodeEmbed } from "react-daum-postcode";
import type { Address } from "react-daum-postcode";
import axios from "axios";

const Body = styled.div`
  height: 1000px; // 높이를 고정
  overflow: hidden;
  background: url("https://blog.kakaocdn.net/dn/sZ7ux/btqDSzwx1NN/c0FYKBDM9WacVK61NpYar1/img.jpg");
  margin: 0px;
  font-family: "Ubuntu", sans-serif;
  background-size: 100% 110%;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a {
    margin: 0;
    padding: 0;
  }
`;

const Login = styled.div`
  // 원하는 스타일을 적용하세요.
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 500px;
  height: 90vh;
`;

const LoginHeader = styled.div`
  // 원하는 스타일을 적용하세요.
  color: #fff;
  text-align: center;
  font-size: 300%;
`;

const LoginForm = styled.div`
  // 원하는 스타일을 적용하세요.
  border: 0.5px solid #fff;
  background: #722ed117;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #000;
  box-sizing:border-box;
  padding-top:15px;
  padding-bottom:10%;
  margin:5% auto;
  text-align:center;
  width: 350px;
  height: 600px;

  h4 {
    text-align: left;
    margin-left: 40px;
    color: #fff;

    @media only screen and (min-width : 500px) and (max-width : 600px){
      h4 {
        text-align:center;
        margin:0;
      }
      .sign-up, .no-access {
        margin:10px 0;
      }
      .login-button {
        margin-bottom:10px;
      }
    }
`;

const Input = styled.input`
  max-width: 400px;
  width: 80%;
  line-height: 3em;
  font-family: "Ubuntu", sans-serif;
  margin: 1em 2em;
  border-radius: 5px;
  border: 2px solid #f2f2f2;
  outline: none;
  padding-left: 10px;

  &[type="password"],
  &[type="text"] {
    outline: none;
    padding-left: 10px;
  }
`;

const SubmitButton = styled.button`
  // 원하는 스타일을 적용하세요.
  height: 30px;
  width: 100px;
  background: #fff;
  border: 1px solid #f2f2f2;
  border-radius: 20px;
  color: slategrey;
  text-transform: uppercase;
  font-family: "Ubuntu", sans-serif;
`;
const Error = styled.div`
  color: #9e00ff;
`;

// 라디오 버튼 스타일

const RadioButtonLabel = styled.label`
  position: relative;
  padding-left: 35px;
  margin-right: 15px;
  color: white;
  cursor: pointer;
  
  & input {
    position: absolute;
    visibility: hidden;

    &:checked ~ span {
      background-color: #4A90E2;

      &::after {
        visibility: visible;
      }
    }
  }

  & span {
    position: absolute;
    top: -2px; // Adjust these values for your needs
    left: -2px; // Adjust these values for your needs
    height: 24px; // Adjust these values for your needs
    width: 24px; // Adjust these values for your needs
    border-radius :50%;
    
   
   
   border :1px solid #000;

   &::after{
     content:"";
     position:absolute ;
     visibility:hidden ;
     top :5px ; 
     left :5px ;
     width :12px ; 
     height :12px ; 
     
     
     border-radius :50% ;
     
     
     
   background-color: ivory ;



}
`;

const RadioWrapper = styled.div`
  margin-top: 10px;
`;

export default function LoginPage(): JSX.Element {
  const [ID, setID] = useState("");
  const [IDError, setIDError] = useState("");

  const [gender, setGender] = useState("");
  const [gendererror, setGenderError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");

  const [address, setAddress] = useState(""); // 주소를 관리할 상태 변수
  const [isOpen, setIsOpen] = useState(false); // 모달의 열림/닫힘을 관리할 상태 변수

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleComplete = (data: Address): void => {
    setAddress(data.address);
    console.log(data.address);
    setIsOpen(false);
  };

  const showModal = (): void => {
    setIsOpen(true);
  };

  const handleOk = (): void => {
    setIsOpen(false);
  };

  const handleCancel = (): void => {
    setIsOpen(false);
  };

  const onChangeID = (event: ChangeEvent<HTMLInputElement>): void => {
    setID(event.target.value);
    if (event.target.value !== "") {
      setIDError("");
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordError("");
    }
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);

    if (!validateEmail(event.target.value)) {
      setEmailError("유효하지 않은 이메일 주소입니다.");
    } else {
      setEmailError("");
    }
  };
  const onChangeGender = (event: ChangeEvent<HTMLInputElement>): void => {
    setGender(event.target.value);
    if (event.target.value !== "") {
      setGenderError("");
    }
  };

  const onClickSubmit = async (): Promise<void> => {
    if (ID === "") {
      setIDError("작성자를 입력해주세요.");
    }
    if (password === "") {
      setPasswordError("비밀번호를 입력해주세요.");
    }

    if (gender === "") {
      setGenderError("성별을 선택해주세요.");
    }

    if (Email === "" || !validateEmail(Email)) {
      setEmailError("유효하지 않은 이메일 주소입니다.");
      return; // 추가: 이메일이 유효하지 않으면 함수를 종료합니다.
    }

    // 모든 필드가 채워졌다면, 상태 값을 콘솔에 출력합니다.
    if (ID !== "" && password !== "" && Email !== "") {
      console.log({
        ID,
        password,
        Email,
        address,
        gender,
      });

      try {
        await axios.post("http://localhost:8080/api/users/signup", {
          userid: ID,
          password,
          email: Email,
          gender,
          address,
        });
      } catch (error) {
        console.error("회원가입 실패", error);
      }
    }
  };

  return (
    <Body>
      <Login>
        <LoginHeader>
          <h1>Sign Up</h1>
        </LoginHeader>
        <LoginForm>
          <h4>ID:</h4>
          <Input type="text" placeholder="Username" onChange={onChangeID} />
          <Error>{IDError}</Error>
          <h4>Password:</h4>
          <Input
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
          />
          <Error>{passwordError}</Error>
          <br />
          <h4>Email:</h4>
          <Input type="text" placeholder="Email" onChange={onChangeEmail} />
          <Error>{EmailError}</Error>

          <h4>gender:</h4>

          <RadioWrapper>
            <RadioButtonLabel>
              <Input
                type="radio"
                name="gender"
                value="male"
                onChange={onChangeGender}
              />
              <span></span> 남성
            </RadioButtonLabel>

            <RadioButtonLabel>
              <Input
                type="radio"
                name="gender"
                value="female"
                onChange={onChangeGender}
              />
              <span></span> 여성
            </RadioButtonLabel>
          </RadioWrapper>
          <Error>{gendererror}</Error>
          <br />
          <h4>Address:</h4>
          <Input
            type="text"
            placeholder="Address"
            value={address}
            onClick={showModal} // 클릭하면 모달이 열립니다.
            readOnly // 주소는 직접 수정하지 못하게 읽기 전용으로 설정합니다.
          />

          {/* 모달 */}
          {isOpen && (
            <Modal open={isOpen} onOk={handleOk} onCancel={handleCancel}>
              <DaumPostcodeEmbed onComplete={handleComplete} />
            </Modal>
          )}

          <br />
          <SubmitButton onClick={onClickSubmit}>가입하기</SubmitButton>

          <br />

          <br />
        </LoginForm>

        {/* You can add the ErrorPage component here when you need it */}
      </Login>
    </Body>
  );
}
