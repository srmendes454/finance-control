import { useEffect, useState } from 'react';
import { LayoutCardInfo } from '../../components/LayoutCardInfo/LayoutCardInfo';
import { useMain } from '../../store/MainProvider';
import { Card } from '../../components/Card/Card';
import IBreadcrumb from '../../models/BreadcrumbModel';
import ICardResponse from '../../models/CardResponseModel';
import { CardService } from '../../services/Card.service';
import { toast } from 'react-toastify';
import { Theme } from '../../utils/LocalStorage/Theme';
import { FormInsertCard } from './form-insert/FormInsertCard';
import { FormEditCard } from './form-edit/FormEditCard';

function Cards() {
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [cardResponse, setCardResponse] = useState<ICardResponse>();
    const { setIsGlobalLoading } = useMain();

    const breadcrumb: IBreadcrumb[] = [
        {
            name: localStorage.getItem('name') ?? "",
            icon: "bi bi-wallet",
            route: "/wallet"
        }
    ]

    const [cards, setCards] = useState([] as ICardResponse[]);
    async function GetAll() {
        setIsGlobalLoading(true);
        const result = await CardService.GetAll();
        if (result.data.success === true) {
            setCards(result.data.data.records);
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

    async function Delete(cardId: string) {
        setIsGlobalLoading(true);
        const result = await CardService.Delete(cardId);
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

    return (
        <>
            <FormInsertCard reloadCards={GetAll} open={openAdd} onClose={(() => setOpenAdd(false))} />
            <LayoutCardInfo
                onAddClick={() => {
                    setOpenAdd(!openAdd);
                }}
                breadcrumb={breadcrumb}
                title="Meus Cartões"
                functionAdd={true}
                functionReload={true}
                functionSearch={true}
                informations={cards?.map((card, key) => {
                    return (
                        <Card
                            key={key}
                            onEditClick={() => { setOpenEdit(!openEdit); setCardResponse(card) }}
                            onExclude={() => Delete(card.cardId)}
                            isDebit={false}
                            color={card.color}
                            title={card.name}
                            typeCard={card.type}
                            purchaseDate={card.expirationDay}
                            price={card.value}
                            status={card.statusCardBill}
                            route='/cards/transactions'
                        />
                    )
                })}
            />
            <FormEditCard card={cardResponse!} open={openEdit} onClose={(() => setOpenEdit(!openEdit))} reloadCards={GetAll} />
        </>
    )
}

export { Cards }