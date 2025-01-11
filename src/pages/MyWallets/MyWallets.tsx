import { useNavigate } from 'react-router-dom';
import style from './MyWallets.module.scss';
import { FormInsertWallet } from './form-insert/FormInsertWallet';
import { LayoutCardInfo } from '../../components/LayoutCardInfo/LayoutCardInfo';
import React, { useEffect, useState } from 'react';
import iconWallet from '../../assets/img/iconWallet.svg';
import { TooltipSidebar } from '../../utils/Tootips/TootipSidebar';
import { Zoom } from "@mui/material";
import { toast } from 'react-toastify';
import { useMain } from '../../store/MainProvider';
import { MenuToggle } from '../../components/MenuToggle/MenuToggle';
import { FormEditWallet } from './form-edit/FormEditWallet';
import { MaskReal } from '../../utils/Masks/MaskReal';
import { WalletService } from '../../services/Wallet.service';
import IWalletResponse from '../../models/WalletResponseModel';
import { Theme } from '../../utils/LocalStorage/Theme';

function MyWallets() {
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [walletResponse, setWalletResponse] = useState<IWalletResponse>();
    const { setIsGlobalLoading } = useMain();

    const navigate = useNavigate();
    const handleNavigate = (route: string, borderColor: string, name: string, value: number, walletId: string) => {
        localStorage.setItem('borderColor', borderColor ?? '#2C7333');
        localStorage.setItem('name', name);
        localStorage.setItem('value', value.toFixed(2));
        localStorage.setItem('currentWalletId', walletId);
        navigate(route);
    };

    async function Logoff() {
        setIsGlobalLoading(true);
        const result = localStorage.getItem('token');
        if (result !== null) {
            localStorage.removeItem('token');
            toast.success('Até breve!', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2500,
                theme: Theme() === "dark" ? "dark" : "light",
                onClose: () => window.location.href = "/login"
            });
        }
        else {
            toast.warning('Erro interno, contate o administrador ou tente novamente em alguns minutos.', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: Theme() === "dark" ? "dark" : "light"
            });
        }
        setIsGlobalLoading(false);
    }

    async function Delete(walletId: string) {
        setIsGlobalLoading(true);
        const result = await WalletService.Delete(walletId);
        if (result.data.success === true) {
            GetAll()
            toast.success(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2500,
                theme: Theme() === "dark" ? "dark" : "light"
            });
        }
        else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: Theme() === "dark" ? "dark" : "light"
            });
        }
        setIsGlobalLoading(false);
    }

    const [wallets, setWallets] = useState([] as IWalletResponse[]);
    async function GetAll() {
        setIsGlobalLoading(true);
        const result = await WalletService.GetAll();
        if (result.data.success === true) {
            setWallets(result.data.data);
        } else {
            toast.warning(result.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: Theme() === "dark" ? "dark" : "light"
            });
        }
        setIsGlobalLoading(false);
    }

    useEffect(() => { GetAll() }, [])

    return (
        <>
            <div className={style.logout}>
                <TooltipSidebar TransitionComponent={Zoom} title="Sair" placement="right">
                    <i className="bi bi-box-arrow-right" onClick={() => Logoff()}></i>
                </TooltipSidebar>
            </div>
            <FormInsertWallet getAll={GetAll} open={openAdd} onClose={(() => setOpenAdd(false))} />
            <LayoutCardInfo
                hideBreadcrumb={true}
                onAddClick={() => {
                    setOpenAdd(!openAdd);
                }}
                title="Minhas Carteiras"
                functionAdd={true}
                functionReload={true}
                informations={wallets?.map((wallet, key) => {
                    return (
                        <div className={style.container} key={key}>
                            <div className={style.card}>
                                <div className={style.image_content}>
                                    <span className={style.overlay} style={{ backgroundColor: wallet.color ?? '#2C7333', '--overlay-color': wallet.color } as React.CSSProperties}></span>

                                    <div className={style.card_image} onClick={() => handleNavigate('/wallet', wallet.color, wallet.name, wallet.price, wallet.walletId)}>
                                        <span className={style.card_img} style={{ '--overlay-color': wallet.color === '#FFF' ? '#000' : wallet.color } as React.CSSProperties}>
                                            <img src={iconWallet} alt="image" />
                                        </span>
                                    </div>
                                </div>

                                <div className={style.card_content}>
                                    <div className={style.options}>
                                        <h2 className={style.name}>{wallet.name}</h2>
                                        <MenuToggle onEditClick={() => { setOpenEdit(!openEdit); setWalletResponse(wallet) }} onSave={() => Delete(wallet.walletId)} backgroundColor={wallet.color} />
                                    </div>
                                    <p className={style.description}></p>

                                    <h1 className={style.price} style={{ color: wallet.price < 0 ? '#BD2323' : '#2C7333' }}>R$ {MaskReal(wallet.price, 2)}</h1>
                                </div>
                            </div>
                        </div>
                    );
                })}
            />
            <FormEditWallet wallet={walletResponse!} open={openEdit} onClose={(() => setOpenEdit(!openEdit))} getAll={GetAll} />
        </>
    );
}

export { MyWallets };