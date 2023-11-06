import { useState } from "react";
import type { MouseEvent } from "react";
import Paginations01UI from "./Paginations01.presenter";
import type { IPaginations01Props } from "./Paginations01.types";

export default function Paginations01(props: IPaginations01Props): JSX.Element {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  // const lastPage = Math.ceil((props.count ?? 10) / 10);
  const postsPerPage = 15;
  const lastPage = Math.ceil((props.count ?? postsPerPage) / postsPerPage);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    const activedPage = Number(event.currentTarget.id);
    props.setCurrentPage(activedPage);
    setActivedPage(activedPage); // 액티브 페이지 갱신
  };
  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    const newPage = startPage - 10;
    setStartPage(newPage);
    setActivedPage(newPage);
  };

  const onClickNextPage = (): void => {
    if (startPage + 10 <= lastPage) {
      const newPage = startPage + 10;
      setStartPage(newPage);
      setActivedPage(newPage);
    }
  };
  return (
    <Paginations01UI
      startPage={startPage}
      lastPage={lastPage}
      activedPage={activedPage}
      onClickPage={onClickPage}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
    />
  );
}
