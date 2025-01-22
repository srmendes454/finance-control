import { ReactNode, useEffect, useState } from "react";
import style from "./ExternalLayout.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

interface ExternalLayoutProps {
  children: ReactNode;
}

export const ExternalLayout = ({ children }: ExternalLayoutProps) => {
  const navigate = useNavigate();
  const [route, setRoute] = useState("");
  const [button, setButton] = useState("");
  const [message, setMessage] = useState("");
  const [union, setUnion] = useState("");
  const [slogan, setSlogan] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [animate, setAnimate] = useState(false);
  const [sendCodeEmail, setSendCodeEmail] = useState(false);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("/login")) {
      setMessage("Olá! Bem vindo de volta");
      setUnion("ao seu ");
      setHighlightedText("Controle Financeiro ");
      setSlogan("Ainda não e cadastrado ? Clique no botão abaixo para se inscrever");
      setButton("Inscrever-se");
      setRoute("/register");
      setSendCodeEmail(false);
    }
    else if (location.pathname.includes("/register")) {
      setMessage("Nos informe seus dados para");
      setUnion("se cadastrar no ");
      setHighlightedText("Controle Financeiro ");
      setSlogan("Caso já esteja cadastrado, clique no botão abaixo para poder fazer login");
      setButton("Entrar");
      setRoute("/login");
      setSendCodeEmail(false);
    }
    else if (location.pathname.includes("/send-code-email")) {
      setMessage("Esqueceu a senha");
      setUnion("do seu ");
      setHighlightedText("Controle Financeiro ");
      setSlogan("Sem problemas, nos informe seu email cadastrado, que iremos te ajudar!");
      setButton("Cancelar");
      setRoute("/login");
      setSendCodeEmail(true);
    }
    else if (location.pathname.includes("/validate-code")) {
      setMessage("Nos informe o código recebido");
      setUnion("no seu ");
      setHighlightedText("Email");
      setSlogan("Caso não tenha recebido o código, verifique sua caixa de span.");
      setButton("Cancelar");
      setRoute("/login");
      setSendCodeEmail(false);
    }
    else if (location.pathname.includes("/reset-password")) {
      setMessage("Agora sim! Escolha sua");
      setUnion("nova ");
      setHighlightedText("Senha");
      setSlogan("Certifique-se de escolher uma senha forte, contendo letras e numeros");
      setButton("Cancelar");
      setRoute("/login");
      setSendCodeEmail(false);
    }

    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className={style.container}>
      <div className={`${style.containerInfo} ${animate ? style.animate : ""}`}>
        <span className={style.row}></span>
        <h2>{message}<br></br>{union}<span>{highlightedText}</span>{sendCodeEmail ? "?" : ""}</h2>
        <p>{slogan}</p>
        <button className={style.button} onClick={() => navigate(route)}>
          {button}
        </button>
      </div>
      {children}
    </div>
  );
};
