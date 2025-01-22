import style from "./CardAuth.module.scss";

interface CardAuthProps {
  form: any;
}

export default function CardAuth(props: CardAuthProps) {
  const { form } = props;

  return (
    <div className={style.card}>
      <div className={style.form}>
        {form}
      </div>
    </div>
  );
}
