import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 70px;
  background-color: #f5f2fc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const LogoAndTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const SiteTitle = styled.h3`
  white-space: nowrap;
  color: plum; // 기본 색상을 연보라색으로 설정
  font-size: 24px; // 글씨 크기를 조절
  font-weight: bold; // 글씨를 더 진하게
  text-shadow: 2px 2px 4px #d8bfd8; // 글씨에 연보라색 계열의 그림자 추가
  transition: 0.5s;

  &:hover {
    color: mediumpurple; // 마우스 호버 시 색상 변경
  }
`;

export const InnerWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* 수정된 부분 */
  align-items: center;
  font-size: 18px;
`;

export const InnerLogo = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-family: "live";
  font-style: italic;
  color: #5729ff;
  cursor: pointer;
`;

export const h1 = styled.div``;

export const InnerButton = styled.span`
  white-space: nowrap;
  color: plum; // 기본 색상을 연보라색으로 설정
  font-size: 18px; // 글씨 크기를 조절
  font-weight: bold; // 글씨를 더 진하게
  text-shadow: 2px 2px 4px #d8bfd8; // 글씨에 연보라색 계열의 그림자 추가
  transition: 0.5s;

  &:hover {
    color: mediumpurple; // 마우스 호버 시 색상 변경
  }
`;

export const InnerButton1 = styled.span`
  white-space: nowrap;
  color: plum; // 기본 색상을 연보라색으로 설정
  font-size: 18px; // 글씨 크기를 조절
  font-weight: bold; // 글씨를 더 진하게
  text-shadow: 2px 2px 4px #d8bfd8; // 글씨에 연보라색 계열의 그림자 추가
  transition: 0.5s;
  margin-right: 30px; // 버튼 간 간격 조절

  &:hover {
    color: mediumpurple; // 마우스 호버 시 색상 변경
  }
`;

export const ButtonAndWeatherWrapper = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  width: 200px; /* 필요에 따라 이 값을 조정하세요. */
  margin-left: 940px; /* 왼쪽 마진을 자동으로 설정하여 오른쪽으로 밀어냅니다. */
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
`;
