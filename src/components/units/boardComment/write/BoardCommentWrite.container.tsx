import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import type { ChangeEvent } from "react";
import BoardCommentWriteUI from "./BoardCommentWrite.presenter";

export default function BoardCommentWrite(): JSX.Element {
  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [star, setStar] = useState(0);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>): void => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setContents(event.target.value);
  };

  const onClickWrite = async (): Promise<void> => {
    try {
      if (typeof router.query.boardId !== "string") {
        alert("시스템에 문제가 있습니다.");
        return;
      }

      const data = {
        post: {
          id: Number(router.query.boardId),
        },
        content: contents,
        author: writer,
        createdAt: new Date().toISOString(),
        rating: star,
      };

      await axios.post(`http://localhost:8080/api/comments/create`, data);

      setWriter("");
      setPassword("");
      setContents("");
      setStar(0);
      alert("댓글이 성공적으로 작성되었습니다.");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <BoardCommentWriteUI
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      writer={writer}
      password={password}
      contents={contents}
      setStar={setStar}
    />
  );
}
