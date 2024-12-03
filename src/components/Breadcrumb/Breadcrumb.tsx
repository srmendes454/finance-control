import { useNavigate } from "react-router-dom";
import style from "./Breadcrumb.module.scss";
import classNames from "classnames";

interface BreadcrumbProps {
  name: string;
  icon: string;
  route: string;
}

function Breadcrumb(props: BreadcrumbProps) {
  const { name, icon, route } = props;
  const navigate = useNavigate();
  
  return (
    <div className={classNames(style.active, style.container)} onClick={() => navigate(route)}>
      <i className={icon}></i>
      <p>{name}</p>
    </div>
  );
}

export { Breadcrumb };
