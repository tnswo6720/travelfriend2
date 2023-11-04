// BoardWriteUI.js

import React from "react";
// import * as S from "../../../src/components/units/board/write/BoardWrite.styles";
import type { IBoardWriteUIProps } from "../../../src/components/units/board/write/BoardWrite.types"; // 여기에 따옴표 추가
import {
  Wrapper,
  Title,
  InputWrapper,
  Label,
  Input,
  Error,
  SubmitButton,
  Subject,
  ButtonWrapper,
  PageContainer,
  GridContainer,
  FlexContainer,
} from "../../../src/components/units/board/write/travel.styles"; // 스타일드 컴포넌트 임포트
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Rate } from "antd";

const MyQuillEditor = dynamic(
  () => import("../../../src/components/CustomEditor/MyQuillEditor"),
  { ssr: false }
);

export default function BoardWriteUI({
  formData,
  errors,
  handleChange,
  handleSubmit,
  handleEditorChange,
}) {
  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <Title>여행지 리뷰</Title>
          <Label>여행지</Label>
          <InputWrapper>
            <Input
              type="text"
              name="name"
              placeholder="여행지의 명칭을 적어주세요."
              value={formData.name}
              onChange={handleChange}
            />
            <Error>{errors.nameError}</Error>
          </InputWrapper>
          <Label>어느 지역에 여행가셨어요?</Label>
          <FlexContainer>
            <InputWrapper>
              <input
                type="radio"
                name="region"
                value="서울"
                checked={formData.region === "서울"}
                onChange={handleChange}
              />
              <Label>서울</Label>

              {/* 나머지 지역에 대한 라디오 버튼도 동일한 방식으로 추가 */}
              <Error>{errors.regionError}</Error>
            </InputWrapper>

            <InputWrapper>
              <input
                type="radio"
                name="region"
                value="경기도"
                checked={formData.region === "경기도"}
                onChange={handleChange}
              />
              <Label>경기도</Label>

              {/* 나머지 지역에 대한 라디오 버튼도 동일한 방식으로 추가 */}
              <Error>{errors.regionError}</Error>
            </InputWrapper>

            <InputWrapper>
              <input
                type="radio"
                name="region"
                value="충청도"
                checked={formData.region === "충청도"}
                onChange={handleChange}
              />
              <Label>충청도</Label>

              {/* 나머지 지역에 대한 라디오 버튼도 동일한 방식으로 추가 */}
              <Error>{errors.regionError}</Error>
            </InputWrapper>

            <InputWrapper>
              <input
                type="radio"
                name="region"
                value="강원도"
                checked={formData.region === "강원도"}
                onChange={handleChange}
              />
              <Label>강원도</Label>

              {/* 나머지 지역에 대한 라디오 버튼도 동일한 방식으로 추가 */}
              <Error>{errors.regionError}</Error>
            </InputWrapper>

            <InputWrapper>
              <input
                type="radio"
                name="region"
                value="전라도"
                checked={formData.region === "전라도"}
                onChange={handleChange}
              />
              <Label>전라도</Label>

              {/* 나머지 지역에 대한 라디오 버튼도 동일한 방식으로 추가 */}
              <Error>{errors.regionError}</Error>
            </InputWrapper>

            <InputWrapper>
              <input
                type="radio"
                name="region"
                value="경상도"
                checked={formData.region === "경상도"}
                onChange={handleChange}
              />
              <Label>경상도</Label>

              {/* 나머지 지역에 대한 라디오 버튼도 동일한 방식으로 추가 */}
              <Error>{errors.regionError}</Error>
            </InputWrapper>

            <InputWrapper>
              <input
                type="radio"
                name="region"
                value="제주도"
                checked={formData.region === "제주도"}
                onChange={handleChange}
              />
              <Label>제주도</Label>

              {/* 나머지 지역에 대한 라디오 버튼도 동일한 방식으로 추가 */}
              <Error>{errors.regionError}</Error>
            </InputWrapper>

            <InputWrapper>
              <input
                type="radio"
                name="region"
                value="해외"
                checked={formData.region === "해외"}
                onChange={handleChange}
              />
              <Label>해외</Label>

              {/* 나머지 지역에 대한 라디오 버튼도 동일한 방식으로 추가 */}
              <Error>{errors.regionError}</Error>
            </InputWrapper>
          </FlexContainer>
          <InputWrapper>
            {/* <Label>내용</Label> */}
            <MyQuillEditor
              onChange={handleEditorChange}
              value={formData.contents}
            />
            <Error>{errors.contentsError}</Error>
          </InputWrapper>
          <br></br>
          <br></br>

          {/*  */}
          <Label>여행지 해시태그</Label>
          <InputWrapper>
            <Subject
              type="text"
              name="featuresString"
              placeholder="해시태그를 입력해주세요.(ex: #기쁨 #아름다움)"
              value={formData.featuresString}
              onChange={handleChange}
            />
            <Error>{errors.featuresStringError}</Error>
          </InputWrapper>
          {/*  */}
          <Label>해당 여행지는 어느 계절에 가면 가장 좋을까요?</Label>
          <InputWrapper>
            <input
              type="checkbox"
              name="recommendedSeason"
              value="봄"
              checked={formData.recommendedSeason.includes("봄")}
              onChange={handleChange}
            />
            <Label>봄</Label>
            <input
              type="checkbox"
              name="recommendedSeason"
              value="여름"
              checked={formData.recommendedSeason.includes("여름")}
              onChange={handleChange}
            />
            <Label>여름</Label>
            <input
              type="checkbox"
              name="recommendedSeason"
              value="가을"
              checked={formData.recommendedSeason.includes("가을")}
              onChange={handleChange}
            />
            <Label>가을</Label>
            <input
              type="checkbox"
              name="recommendedSeason"
              value="겨울"
              checked={formData.recommendedSeason.includes("겨울")}
              onChange={handleChange}
            />
            <Label>겨울</Label>
            <Error>{errors.recommendedSeasonError}</Error>
          </InputWrapper>
          <Label>평점을 먜겨주세요</Label>
          <InputWrapper>
            <Rate
              value={formData.userRating}
              onChange={(value) =>
                handleChange({ target: { name: "userRating", value } })
              }
              style={{
                color: "#FFD700", // 선택된 별의 색상을 골드로 설정
                opacity: formData.userRating === 0 ? 0.8 : 1, // 선택되지 않은 별의 투명도를 0.5로 설정
              }}
            />

            <Error>{errors.userRatingError}</Error>
          </InputWrapper>
          <ButtonWrapper>
            <SubmitButton type="submit">등록하기</SubmitButton>
          </ButtonWrapper>
        </Wrapper>
      </form>
    </PageContainer>
  );
}
