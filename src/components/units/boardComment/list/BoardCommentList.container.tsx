import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import BoardCommentListUI from "./BoardCommentList.presenter";

export default function BoardCommentList(): JSX.Element {
  const router = useRouter();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [boardCommentId, setBoardCommentId] = useState("");
  const [password, setPassword] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (typeof router.query.boardId !== "string") return;
    const fetchComments = async () => {
      try {
        const commentIds: any[] = [
          /* 게시글에 달린 모든 댓글의 id를 여기에 입력하세요 */
        ];
        const commentPromises = commentIds.map(
          async (id) =>
            await axios.get(`http://localhost:8080/api/comments/read/${id}`)
        );
        const responses = await Promise.all(commentPromises);
        const comments = responses.map((response) => response.data);
        console.log(comments); // 이 부분 추가
        setComments(comments);
      } catch (error) {
        if (error instanceof Error) alert(error.message);
      }
    };
    void fetchComments();
  }, [router.query.boardId]);

  const onClickDelete = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/comments/read/${router.query.boardId}`
      );
      console.log(response);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickOpenDeleteModal = (
    event: MouseEvent<HTMLImageElement>
  ): void => {
    setBoardCommentId(event.currentTarget.id);
    setIsOpenDeleteModal(true);
  };

  const onChangeDeletePassword = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
  };

  return (
    <BoardCommentListUI
      data={comments}
      onClickDelete={onClickDelete}
      isOpenDeleteModal={isOpenDeleteModal}
      onClickOpenDeleteModal={onClickOpenDeleteModal}
      onChangeDeletePassword={onChangeDeletePassword}
    />
  );
}
