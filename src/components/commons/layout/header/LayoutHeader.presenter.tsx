import WeatherComponent from "../../../../../pages/Weather";

import {
  ButtonAndWeatherWrapper,
  ButtonWrapper,
  InnerButton,
  InnerButton1,
  InnerLogo,
  InnerWrapper,
  LogoAndTitleWrapper,
  SiteTitle,
  Wrapper,
} from "./LayoutHeader.styles";
import type { ILayoutHeaderProps } from "./LayoutHeader.types";
export default function LayoutHeaderUI(props: ILayoutHeaderProps): JSX.Element {
  return (
    <Wrapper>
      <InnerWrapper>
        <LogoAndTitleWrapper>
          <InnerLogo onClick={props.onClickLogo}>
            <img
              src="/travelfriendd.png"
              alt="여행친구"
              style={{ width: "100px", height: "100px" }}
            />{" "}
          </InnerLogo>
          <SiteTitle onClick={props.onClickMainPage}>여행친구</SiteTitle>
        </LogoAndTitleWrapper>

        <ButtonAndWeatherWrapper>
          {" "}
          {/* 새로 추가한 div의 이름을 ButtonAndWeatherWrapper로 변경하였습니다. */}
          <ButtonWrapper>
            {" "}
            {/* 이 부분을 추가하세요. */}
            {props.userInfo ? (
              <InnerButton1 onClick={props.onClickMoveToLogout}>
                로그아웃
              </InnerButton1>
            ) : (
              <InnerButton1 onClick={props.onClickMoveToLogin}>
                로그인
              </InnerButton1>
            )}
            <InnerButton onClick={props.onClickMovetoSignUp}>
              회원가입
            </InnerButton>
          </ButtonWrapper>
          <WeatherComponent />
        </ButtonAndWeatherWrapper>
      </InnerWrapper>
    </Wrapper>
  );
}
