import { IconButton } from "@mui/material";
import style from "./Welcome.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DoubleArrowOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    navigate(route);
  };

  return (
    <div className={style.cardWelcome}>
      <h1 className={style.title}>
        Bem-vindo
        <p className={style.subtitle}>
          INICIAR MINHA GESTÃO FINANCEIRA
          <IconButton
            className={style.iconButton}
            onClick={() => handleNavigate("/wallet")}
          >
            <i>
              <DoubleArrowOutlined />
            </i>
          </IconButton>
        </p>
      </h1>
    </div>
  );
}

export { Welcome };
