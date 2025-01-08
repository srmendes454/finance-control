import { useState } from "react";
import { LayoutCardInfo } from "../../components/LayoutCardInfo/LayoutCardInfo";
import { WalletService } from "../../services/Wallet.service";
import { useMain } from "../../store/MainProvider";
import { toast } from "react-toastify";
import IWalletResponse from "../../models/WalletResponseModel";
import { FormInsertWallet } from "../MyWallets/form-insert/FormInsertWallet";
import { CardOption } from "./CardOption/CardOption";
import style from './Wallet.module.scss';
import { useNavigate } from "react-router-dom";
import { MaskReal } from "../../utils/Masks/MaskReal";

interface WalletProps {
  onClosedClick?: () => void;
}

function Wallet(props: WalletProps) {
  const { onClosedClick } = props;
  const { setIsGlobalLoading } = useMain();
  const [wallets, setWallets] = useState([] as IWalletResponse[]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const walletName = localStorage.getItem('name')


  async function GetAll() {
    setIsGlobalLoading(true);
    const result = await WalletService.GetAll();
    if (result.data.success === true) {
      setWallets(result.data.data);
    } else {
      toast.warning(result.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
        theme: "dark",
      });
    }
    setIsGlobalLoading(false);
  }


  const test = [
    {
      id: 1,
      name: "Receita Mensal",
      description: "Valores recebidos mensalmente",
      color: "#2C7333",
      value: 9240.00,
    },
    {
      id: 2,
      name: "Despesa Mensal",
      description: "Valores a pagar mensalmente",
      color: "#BD2323",
      PaymentDate: 12,
      value: 7147.89,
    },
    {
      id: 3,
      name: "Valores Pagos",
      description: "Valores pagos até o momento",
      color: "#1875FF",
      PaymentDate: 12,
      value: 6200.11,
    },
    {
      id: 4,
      name: "Valores à Pagar",
      description: "Valores que faltam pagar",
      color: "#DB771A",
      PaymentDate: 12,
      value: 853.37,
    },
  ];

  const value = Number(localStorage.getItem('value'));
  const navigate = useNavigate();
  const handleNavigate = (route: string) => {
    localStorage.setItem("nameCardPai", "")
    navigate(route);
  };

  return (
    <>
      {/* <FormInsertWallet open={openAdd} onClose={() => setOpenAdd(false)} /> */}
      <LayoutCardInfo
        onAddClick={() => {
          setOpenAdd(!openAdd);
        }}
        title={walletName as string}
        functionReload={true}
        informations={
          <>
            <div className={style.balanceTotal}>
              <p>Saldo Total:</p>
              <h1 style={{ color: value > 0 ? '#2C7333' : '#BD2323' }}><span>R$ </span>{MaskReal(value, 2)}</h1>
            </div>
            {test?.map((option, index) => (
              <CardOption
                key={index}
                title={option.name}
                description={option.description}
                value={option.value}
                color={option.color}
              />
            ))}
            <div className={style.container}>
              <div className={style.cardWallet} onClick={() => handleNavigate('/wallet/transactions')}>
                <h1>Gerenciar transações desta carteira</h1>
              </div>
              <div className={style.cardLimit} onClick={() => handleNavigate('/limits')}>
                <h1>Gerenciar meus Limites</h1>
              </div>
            </div>
          </>
        }
      />
    </>
  );

}

export { Wallet };
