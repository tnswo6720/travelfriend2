// BoardWriteUI.js

import React from "react";
import * as S from "../../../src/components/units/board/write/BoardWrite.styles";
import type { IBoardWriteUIProps } from "../../../src/components/units/board/write/BoardWrite.types"; // 여기에 따옴표 추가
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
  setFormData,
  handleChange,
  handleSubmit,
  handleEditorChange,
}: IBoardWriteUIProps): JSX.Element {
  return (
    <S.Wrapper>
      <S.Title>게시글 등록</S.Title>
      <form onSubmit={handleSubmit}>
        <S.InputWrapper>
          <S.Label>여행지 이름</S.Label>
          <S.Writer
            type="text"
            name="name"
            placeholder="여행지 이름을 입력하세요."
            value={formData.name}
            onChange={handleChange}
          />
          <S.Error>{errors.nameError}</S.Error>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>지역</S.Label>
          <input
            type="radio"
            name="region"
            value="서울"
            checked={formData.region === "서울"}
            onChange={handleChange}
          />
          <S.Label>서울</S.Label>

          {/* 나머지 지역에 대한 라디오 버튼도 동일한 방식으로 추가 */}
          <S.Error>{errors.regionError}</S.Error>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>내용</S.Label>
          <MyQuillEditor
            onChange={handleEditorChange}
            value={formData.contents}
          />
          <S.Error>{errors.contentsError}</S.Error>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>평점</S.Label>
          <Rate
            value={formData.userRating}
            onChange={(value) =>
              setFormData({
                ...formData,
                userRating: value,
              })
            }
          />
          <S.Error>{errors.userRatingError}</S.Error>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>추천 계절</S.Label>
          <input
            type="checkbox"
            name="recommendedSeason"
            value="봄"
            checked={formData.recommendedSeason.includes("봄")}
            onChange={handleChange}
          />
          <S.Label>봄</S.Label>
          <input
            type="checkbox"
            name="recommendedSeason"
            value="여름"
            checked={formData.recommendedSeason.includes("여름")}
            onChange={handleChange}
          />
          <S.Label>여름</S.Label>
          <input
            type="checkbox"
            name="recommendedSeason"
            value="가을"
            checked={formData.recommendedSeason.includes("가을")}
            onChange={handleChange}
          />
          <S.Label>가을</S.Label>
          <input
            type="checkbox"
            name="recommendedSeason"
            value="겨울"
            checked={formData.recommendedSeason.includes("겨울")}
            onChange={handleChange}
          />
          <S.Label>겨울</S.Label>
          <S.Error>{errors.recommendedSeasonError}</S.Error>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label>여행지 해시태그</S.Label>
          <S.Subject
            type="text"
            name="featuresString"
            placeholder="#기쁨 #아름다움 처럼 해시태그를 입력하세요."
            value={formData.featuresString}
            onChange={handleChange}
          />
          <S.Error>{errors.featuresStringError}</S.Error>
        </S.InputWrapper>
        <S.ButtonWrapper>
          <S.SubmitButton type="submit">등록하기</S.SubmitButton>
        </S.ButtonWrapper>
      </form>
    </S.Wrapper>
  );
}
