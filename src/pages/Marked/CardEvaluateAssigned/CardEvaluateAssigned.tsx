import { useState } from 'react';
import style from './CardEvaluateAssigned.module.scss';
import { Disapprove } from './ModalsForEvaluate/Disapprove/Disapprove';
import { Approve } from './ModalsForEvaluate/Approve/Approve';

interface CardEvaluateAssignedProps {
    markedBy: string;
    name: string;
    price: string
}

function CardEvaluateAssigned(Props: CardEvaluateAssignedProps) {
    const { markedBy, name, price } = Props;
    const [openAddDisapprove, setOpenAddDisapprove] = useState<boolean>(false);
    const [openAddApprove, setOpenAddApprove] = useState<boolean>(false);

    return (
        <>
            <div className={style.container}>
                <div className={style.markedBy}>
                    <p>Marcado por</p>
                    <h5>{markedBy}</h5>
                </div>
                <div className={style.icon}>
                    <div className={style.circle}><i className="bi bi-at"></i></div>
                </div>
                <div className={style.info}>
                    <h3>{name}</h3>
                    <h5>{price}</h5>
                    <div className={style.button}>
                        <button className={style.cancel} type='button' onClick={() => { setOpenAddDisapprove(true) }}><i className="bi-x-circle"></i> Reprovar</button>
                        <button className={style.save} type='submit' onClick={() => { setOpenAddApprove(true) }}><i className="bi bi-check-circle"></i> Aprovar</button>
                    </div>
                </div>
            </div>
            {openAddDisapprove && <Disapprove onClosedClick={() => { setOpenAddDisapprove(false) }}/>}
            {openAddApprove && <Approve onClosedClick={() => { setOpenAddApprove(false) }}/>}
        </>
    )
}

export { CardEvaluateAssigned }