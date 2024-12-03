import { useNavigate } from 'react-router-dom';
import style from './MyWallets.module.scss';
import { FormInsertWallet } from './form-insert/FormInsertWallet';
import { LayoutCardInfo } from '../../components/LayoutCardInfo/LayoutCardInfo';
import React, { useState } from 'react';
import iconWallet from '../../assets/img/iconWallet.svg';
import { TooltipSidebar } from '../../utils/Tootips/TootipSidebar';
import { Zoom } from "@mui/material";
import { toast } from 'react-toastify';
import { useMain } from '../../store/MainProvider';
import { MenuToggle } from '../../components/MenuToggle/MenuToggle';
import { FormEditWallet } from './form-edit/FormEditWallet';


function MyWallets() {
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const { setIsGlobalLoading } = useMain();

    const test = [
        {
            id: 1,
            name: "God is very good!",
            color: "#F39200",
            PaymentDate: 12,
            price: 9240,
        },
        {
            id: 2,
            name: "Testando",
            color: "#1875FF",
            PaymentDate: 12,
            price: 10,
        },
        {
            id: 3,
            name: "Testando 1",
            color: "#BD2323",
            PaymentDate: 12,
            price: -100,
        },
        {
            id: 4,
            name: "Testando 2",
            color: "#6F766F",
            PaymentDate: 12,
            price: 7000,
        },
        {
            id: 5,
            name: "Testando 3",
            color: "#5212A5",
            PaymentDate: 12,
            price: 15000,
        },
        {
            id: 6,
            name: "Meta",
            color: "#FFF",
            PaymentDate: 12,
            price: 120000,
        },
        {
            id: 7,
            name: "Teste 10",
            color: "#000",
            PaymentDate: 12,
            price: 8000000,
        },
        {
            id: 8,
            name: "Teste 2",
            color: "#E31DDB",
            PaymentDate: 12,
            price: 75000000,
        },
        {
            id: 9,
            name: "Teste 1",
            color: "#E74C3C",
            PaymentDate: 12,
            price: -150000000,
        }
    ];

    const navigate = useNavigate();
    const handleNavigate = (route: string, borderColor: string, name: string, value: number) => {
        localStorage.setItem('borderColor', borderColor ?? '#2C7333')
        localStorage.setItem('name', name)
        localStorage.setItem('value', value.toFixed(2))
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
                theme: "dark",
                onClose: () => window.location.href = "/wallet"
            });
        }
        else {
            toast.warning('Erro interno, contate o administrador ou tente novamente em alguns minutos.', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 5000,
                theme: "dark"
            });
        }
        setIsGlobalLoading(false);
    }

    async function Delete() {
        setIsGlobalLoading(true);
        toast.success('Registro Excluido com sucesso!', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            theme: "dark"
        });
        setIsGlobalLoading(false);
    }

    return (
        <>
            <div className={style.logout}>
                <TooltipSidebar TransitionComponent={Zoom} title="Sair" placement="right">
                    <i className="bi bi-box-arrow-right" onClick={() => Logoff()}></i>
                </TooltipSidebar>
            </div>
            <FormInsertWallet open={openAdd} onClose={(() => setOpenAdd(false))} />
            <LayoutCardInfo
                hideBreadcrumb={true}
                onAddClick={() => {
                    setOpenAdd(!openAdd);
                }}
                title="Minhas Carteiras"
                functionAdd={true}
                functionReload={true}
                informations={test?.map((wallet, key) => {
                    return (
                        <div className={style.container} key={key}>
                            <div className={style.card}>
                                <div className={style.image_content}>
                                    <span className={style.overlay} style={{ backgroundColor: wallet.color ?? '#2C7333', '--overlay-color': wallet.color } as React.CSSProperties}></span>

                                    <div className={style.card_image} onClick={() => handleNavigate('/wallet', wallet.color, wallet.name, wallet.price)}>
                                        <span className={style.card_img} style={{ '--overlay-color': wallet.color === '#FFF' ? '#000' : wallet.color } as React.CSSProperties}>
                                            <img src={iconWallet} alt="image" />
                                        </span>
                                    </div>
                                </div>

                                <div className={style.card_content}>
                                    <div className={style.options}>
                                        <h2 className={style.name}>{wallet.name}</h2>
                                        <FormEditWallet open={openEdit} onClose={(() => setOpenEdit(!openEdit))} />
                                        <MenuToggle onEditClick={() => { setOpenEdit(!openEdit) }} onSave={Delete} backgroundColor={wallet.color} />
                                    </div>
                                    <p className={style.description}>Recebo todo dia {wallet.PaymentDate} de cada mês</p>

                                    <h1 className={style.price} style={{ color: wallet.price < 0 ? '#BD2323' : '#2C7333' }}>R$ {wallet.price.toFixed(2)}</h1>
                                </div>
                            </div>
                        </div>
                    );
                })}
            />
        </>
    );
}

export { MyWallets };