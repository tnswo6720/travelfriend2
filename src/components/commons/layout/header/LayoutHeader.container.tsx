import { useRouter } from "next/router";
import LayoutHeaderUI from "./LayoutHeader.presenter";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LayoutHeader(): JSX.Element {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      fetchUserInfo();
    }
  }, []);

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

      if (response.status === 200) {
        console.log("회원 정보:", response.data);
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error("회원 정보 가져오기 실패:", error);
      setUserInfo(null);
    }
  };

  const onClickLogo = (): void => {
    void router.push("/boards");
  };

  const handleClick = (): void => {
    void router.push("/"); // 메인 페이지로 이동
  };

  const onClickMoveToLogin = (): void => {
    void router.push("/login");
  };

  const onClickMoveToSignup = (): void => {
    void router.push("/SignUp");
  };

  const onClickMoveToLogout = (): void => {
    localStorage.removeItem("authToken");
    setUserInfo(null); // 로그아웃 후 userInfo를 null로 설정
  };

  return (
    <LayoutHeaderUI
      onClickLogo={onClickLogo}
      onClickMoveToLogin={onClickMoveToLogin}
      onClickMovetoSignUp={onClickMoveToSignup}
      onClickMainPage={handleClick}
      onClickMoveToLogout={onClickMoveToLogout}
      userInfo={userInfo} // 로그인 상태에 따라 화면을 업데이트하기 위해 userInfo 상태를 넘김
    />
  );
}
