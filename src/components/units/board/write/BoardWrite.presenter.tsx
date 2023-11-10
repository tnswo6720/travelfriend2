import React from "react";
import * as S from "./BoardWrite.styles1";
import type { IBoardWriteUIProps } from "./BoardWrite.types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill의 스타일 시트를 추가해줍니다.
// import MyQuillEditor from '../../../CustomEditor/MyQuillEditor';
import dynamic from "next/dynamic";
const MyQuillEditor = dynamic(
  () => import("../../../CustomEditor/MyQuillEditor"),
  { ssr: false }
);
export default function BoardWriteUI({
  formData,
  errors,
  handleChange,
  handleSubmit,
  handleEditorChange,
  loggedInUser,
}: IBoardWriteUIProps): JSX.Element {
  return (
    <S.Wrapper>
      <S.Title>게시글 등록</S.Title>
      <form onSubmit={handleSubmit}>
        {loggedInUser ? (
          <input type="hidden" name="author" value={loggedInUser.id} />
        ) : (
          <div>
            <S.Label>작성자</S.Label>
            <S.InputWrapper>
              <S.Writer
                type="text"
                name="author"
                placeholder="이름을 적어주세요."
                value={formData.author}
                onChange={handleChange}
              />
              <S.Error>{errors.authorError}</S.Error>
            </S.InputWrapper>
          </div>
        )}
        {loggedInUser ? (
          <div style={{ display: "none" }}>
            <S.Label>비밀 번호</S.Label>
            <S.InputWrapper>
              <S.Password
                type="password"
                name="password"
                placeholder="비밀번호를 작성해주세요."
                value={formData.password}
                onChange={handleChange}
              />
              <S.Error>{errors.passwordError}</S.Error>
            </S.InputWrapper>
          </div>
        ) : (
          <div>
            <S.Label>비밀 번호</S.Label>
            <S.InputWrapper>
              <S.Password
                type="password"
                name="password"
                placeholder="비밀번호를 작성해주세요."
                value={formData.password}
                onChange={handleChange}
              />
              <S.Error>{errors.passwordError}</S.Error>
            </S.InputWrapper>
          </div>
        )}
        <S.Label>제목</S.Label>
        <S.InputWrapper>
          <S.Subject
            type="text"
            name="title"
            placeholder="제목을 작성해주세요."
            value={formData.title}
            onChange={handleChange}
          />
          <S.Error>{errors.titleError}</S.Error>
        </S.InputWrapper>
        <S.Label>내용</S.Label>
        <S.InputWrapper>
          {/* <S.Contents
            name="contents"
            placeholder="내용을 작성해주세요."
            value={formData.contents}
            onChange={handleChange}
            /> */}
          <MyQuillEditor
            onChange={handleEditorChange}
            value={formData.contents}
          />
          <S.Error>{errors.contentsError}</S.Error>
        </S.InputWrapper>
        <br></br>
        <br></br>
        <S.YotubeLabel>유튜브</S.YotubeLabel>
        <S.InputWrapper>
          <S.Youtube
            type="text"
            name="youtubeUrl"
            placeholder="링크를 복사해주세요."
            value={formData.youtubeUrl}
            onChange={handleChange}
          />
        </S.InputWrapper>
        <S.InputWrapper></S.InputWrapper>
        <S.ButtonWrapper>
          <S.SubmitButton type="submit">등록하기</S.SubmitButton>
        </S.ButtonWrapper>
      </form>
    </S.Wrapper>
  );
}
