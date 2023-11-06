import { type MouseEventHandler } from "react";

export interface ILayoutHeaderProps {
  onClickMoveToLogout: MouseEventHandler<HTMLSpanElement> | undefined;
  onClickMainPage: MouseEventHandler<HTMLHeadingElement> | undefined;
  onClickLogo: () => void;
  onClickMoveToLogin: () => void;
  onClickMovetoSignUp: () => void;
}
