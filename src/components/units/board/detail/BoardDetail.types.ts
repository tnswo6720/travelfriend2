import { type MouseEventHandler } from "react";
import type { Post } from "../../../../commons/types/generated/types.rest";

export interface IBoardDetailUIProps {
  passwordEntered: string | undefined;
  handlePasswordChange: ChangeEventHandler<HTMLInputElement> | undefined;
  loggedInUser: any;
  onClickMoveToBoardList: MouseEventHandler<HTMLButtonElement> | undefined;
  onClickDelete: MouseEventHandler<HTMLButtonElement> | undefined;
  data?: Post;
  onClickMoveToBoardEdit: () => void;
}
