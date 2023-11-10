import { getDate } from "../../../../commons/libraries/utils";
import Paginations01 from "../../../commons/paginations/01/Paginations01.container";
import * as S from "./BoardList.styles";
import type { IBoardListUIProps } from "./BoardList.types";

export default function BoardListUI(props: IBoardListUIProps): JSX.Element {
  const currentPosts = props.data?.slice(
    (props.currentPage - 1) * props.postsPerPage,
    props.currentPage * props.postsPerPage
  );

  return (
    <S.Wrapper>
      <S.TableTop />
      <S.Row>
        <S.ColumnHeaderBasic>Index</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
      </S.Row>
      {currentPosts?.map((el) => (
        <S.Row key={el.id}>
          <S.ColumnBasic>{String(el.id).slice(-4).toUpperCase()}</S.ColumnBasic>
          <S.ColumnTitle id={el.id} onClick={props.onClickMoveToBoardDetail}>
            {el.title}
          </S.ColumnTitle>
          <S.ColumnBasic>{el.author}</S.ColumnBasic>
          <S.ColumnBasic>{getDate(el.createdAt)}</S.ColumnBasic>
        </S.Row>
      ))}
      <S.TableBottom />
      <S.Footer>
        <Paginations01
          setCurrentPage={props.setCurrentPage}
          count={props.data?.length}
        />
        <S.Button onClick={props.onClickMoveToBoardNew}>
          <S.PencilIcon src="/images/board/list/write.png" />
          게시물 등록하기
        </S.Button>
      </S.Footer>
    </S.Wrapper>
  );
}
