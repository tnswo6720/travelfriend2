import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

// ... (스타일링 코드 생략) ...

const Page = styled.div`
  background-color: #7b3fb63d;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.div`
  width: 540px;
  height: auto; // changed to auto to fit content
  padding: 2em; // added padding
  background-color: #ffffff; // white color for contrast with page background
  box-shadow: 0px 0.5rem 0.5rem rgba(0, 0, 0, 0.2); // shadow for depth
`;

// 추가된 UserPosts 컴포넌트 스타일링
const UserPosts = styled(Profile)``;

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
        console.log("Fetched user info:", response.data);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    void fetchUserInfo();
  }, []);

  const [page, setPage] = useState<string>("profile");

  const handleInputChange = (field: string, value: string) => {
    setUserInfo({
      ...userInfo,
      [field]: value,
    });
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      {page === "profile" ? (
        <Profile>
          <h1>이용자 개인정보 수정</h1>

          {/* ID */}
          <Section>
            <h2>닉네임</h2>
            <Input
              type="text"
              value={userInfo.userid || ""}
              onChange={(e) => handleInputChange("userid", e.target.value)}
            />
          </Section>

          {/* Password */}
          <Section>
            <h2>비밀번호</h2>
            <Input
              type="password"
              value={userInfo.password || ""}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </Section>

          {/* Email */}
          <Section>
            <h2>Email</h2>
            <Input
              type="text"
              value={userInfo.userEmail || ""}
              onChange={(e) => handleInputChange("userEmail", e.target.value)}
            />
          </Section>

          {/* Gender */}
          <Section>
            <h2>Gender</h2>
            <Input
              type="text"
              value={userInfo.usergender || ""}
              onChange={(e) => handleInputChange("usergender", e.target.value)}
            />
          </Section>

          {/* Update Button */}
          <Section>
            <Button
              onClick={() => {
                console.log(`Updated user info to ${JSON.stringify(userInfo)}`);
                // 서버에 전체 정보 업데이트 요청을 보내는 코드...
              }}
            >
              update
            </Button>
          </Section>

          {/* 추가된 버튼으로 페이지 전환 */}
          <Button
            onClick={() => {
              setPage("posts");
            }}
          >
            내가 작성한 글 보기
          </Button>
        </Profile>
      ) : page === "posts" ? (
        /* 사용자가 작성한 글 보기 페이지 */
        <UserPosts>
          <h1>홍길동님 작성 글 목록</h1>

          <p>Post1...</p>
          <p>Post2...</p>

          {/* 프로필 수정 페이지로 돌아가는 버튼 */}
          <Button
            onClick={() => {
              setPage("profile");
            }}
          >
            프로필로 이동
          </Button>
        </UserPosts>
      ) : null}
    </Page>
  );
}
