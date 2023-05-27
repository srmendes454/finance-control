interface WelcomeProps {
    name?: string;
  }

function Welcome(Props: WelcomeProps){
    return(
        <div>
            <p>Bem vindo ao seu Controle Financeiro</p>
        </div>
    )
}

export {Welcome}