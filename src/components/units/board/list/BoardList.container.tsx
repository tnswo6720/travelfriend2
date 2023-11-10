import BoardListUI from "./BoardList.presenter";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function BoardList(): JSX.Element {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/posts")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the boards data:", error);
      });
  }, []);

  const onClickMoveToBoardNew = (): void => {
    void router.push("/boards/new");
  };

  const onClickMoveToBoardDetail = (
    event: MouseEvent<HTMLDivElement>
  ): void => {
    void router.push(`/boards/${event.currentTarget.id}`);
  };

  return (
    <BoardListUI
      data={data}
      currentPage={currentPage}
      postsPerPage={postsPerPage}
      onClickMoveToBoardNew={onClickMoveToBoardNew}
      onClickMoveToBoardDetail={onClickMoveToBoardDetail}
      setCurrentPage={setCurrentPage}
    />
  );
}
