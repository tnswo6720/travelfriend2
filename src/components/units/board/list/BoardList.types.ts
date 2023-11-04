import type { MouseEvent } from "react";
import type { Post } from "../../../../commons/types/generated/types.rest";

export interface IBoardListUIProps {
  count: number | undefined;
  refetch: (
    variables: Partial<IQueryFetchBoardsArgs>
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
  data?: Post;
  onClickMoveToBoardNew: () => void;
  onClickMoveToBoardDetail: (event: MouseEvent<HTMLDivElement>) => void;
}
