import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

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
  const [userInfo, setUserInfo] = useState(null);

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
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
  };
  const updateUserInfo = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/update/${userInfo.id}`, // 'userId' 대신 'id' 사용
        userInfo,
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
            onChange={(e) => handleInputChange("userid", e.target.value)}
          />
        </Section>

        <Section>
          <h2>비밀번호</h2>
          <Input
            type="password"
            value={userInfo ? userInfo.password : ""}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </Section>

        <Section>
          <h2>Email</h2>
          <Input
            type="text"
            value={userInfo ? userInfo.userEmail : ""}
            onChange={(e) => handleInputChange("userEmail", e.target.value)}
          />
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
