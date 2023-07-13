import { IconButton } from "@mui/material";
import style from "./CardAuth.module.scss";
import { DoubleArrowOutlined } from '@mui/icons-material';
interface CardAuthProps {
  isLogin: boolean;
  form: any;
}

export default function CardAuth(props: CardAuthProps) {
  const { isLogin, form } = props;
  return (
    <div className={style.card}>
      <div className={style.title}>
        <h6>{isLogin ? 'Inscrever-se' : 'Entrar'}</h6>
      </div>
      <div className={style.icon}>
        <div className={style.circle}>
          <IconButton size="large" href={isLogin ? '/register' : '/login'}>
            <DoubleArrowOutlined />
          </IconButton>
        </div>
      </div>
      <div className={style.form}>
        {form}
      </div>
    </div>
  )
}