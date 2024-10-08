import { ReactNode } from "react";
import style from "./ExternalLayout.module.scss";

interface ExternalLayoutProps {
  children: ReactNode;
}

export const ExternalLayout = ({ children }: ExternalLayoutProps) => {
  return (
    <div className={style.container}>
      {children}
      <ul className={style.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
