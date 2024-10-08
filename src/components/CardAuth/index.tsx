import { IconButton } from "@mui/material";
import style from "./CardAuth.module.scss";
import { DoubleArrowOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface CardAuthProps {
  isLogin: boolean;
  form: any;
}

export default function CardAuth(props: CardAuthProps) {
  const { isLogin, form } = props;
  const navigate = useNavigate();

  return (
    <div className={style.card}>
      <div className={style.title}>
        <h6>{isLogin ? "Inscrever-se" : "Entrar"}</h6>
      </div>
      <div className={style.icon}>
        <div className={style.circle}>
          <IconButton
            size="large"
            onClick={() => navigate(isLogin ? "/register" : "/login")}
          >
            <DoubleArrowOutlined />
          </IconButton>
        </div>
      </div>
      <div className={style.form}>{form}</div>
    </div>
  );
}
