import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Modal } from "antd";

const Page = styled.div`
  background-color: #7b3fb63d;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.div`
  width: 540px;
  height: auto;
  padding: 2em;
  background-color: #ffffff;
  box-shadow: 0px 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
`;

const Section = styled.div`
  border-top: solid #7b3fb680;
  padding: 0.5em;
`;

const Button = styled.button`
  background-color: #7b3fb680;
  border: none;
  color: white;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.7em;
`;

const Input = styled.input`
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export default function App(): JSX.Element {
  const [userInfo, setUserInfo] = useState({});
  const [address, setAddress] = useState(""); // 주소를 관리할 상태 변수
  const [isOpen, setIsOpen] = useState(false); // 모달의 열림/닫힘을 관리할 상태 변수

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/userinfo",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        const fetchedUserInfo = response.data;
        setAddress(fetchedUserInfo.address); // 주소 설정

        if (!fetchedUserInfo.dateOfBirth) {
          fetchedUserInfo.dateOfBirth = new Date().toISOString().split("T")[0]; // 현재 날짜로 설정
        }

        if (!fetchedUserInfo.userage) {
          fetchedUserInfo.userage = 0; // 기본값으로 0 설정
        }

        setUserInfo(fetchedUserInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    console.log(
      `handleInputChange called with field = ${field}, value = ${value}`
    );
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
    console.log(userInfo);
  };

  const updateUserInfo = async () => {
    try {
      const data = {
        ...userInfo,
        email: userInfo.userEmail,
        address, // 주소 추가
      };
      delete data.userEmail;

      const response = await axios.put(
        `http://localhost:8080/api/users/update/${userInfo.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("User info updated:", response.data);
    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };
  return (
    <Page>
      <Profile>
        <h1>이용자 개인정보 수정</h1>

        <Section>
          <h2>닉네임</h2>
          <Input
            type="text"
            value={userInfo ? userInfo.userid : ""}
            onChange={(e) => {
              handleInputChange("userid", e.target.value);
            }}
          />
        </Section>

        <Section>
          <h2>비밀번호</h2>
          <Input
            type="password"
            value={userInfo ? userInfo.password : ""}
            onChange={(e) => {
              handleInputChange("password", e.target.value);
            }}
          />
        </Section>

        <Section>
          <h2>Email</h2>
          {userInfo && (
            <Input
              type="text"
              value={userInfo ? userInfo.userEmail : ""}
              onChange={(e) => handleInputChange("userEmail", e.target.value)}
            />
          )}
        </Section>

        <Section>
          <h2>Gender</h2>
          <Input
            type="text"
            value={userInfo ? userInfo.usergender : ""}
            onChange={(e) => handleInputChange("usergender", e.target.value)}
          />
        </Section>

        <Section>
          <h2>Address</h2>
          <Input
            type="text"
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
        </Section>

        <Section>
          <h2>Birth Date</h2>
          <Input
            type="date"
            value={userInfo ? userInfo.dateOfBirth : ""}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          />
        </Section>

        <Section>
          <Button
            onClick={() => {
              void updateUserInfo();
            }}
          >
            update
          </Button>
        </Section>
      </Profile>
    </Page>
  );
}
