import style from './Disapprove.module.scss';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

interface ModalDisapproveProps {
    onClosedClick?: () => void;
    data?: any;
}

const DisapproveFormSchema = z.object({
    reason: z.string().nonempty('O motivo da recusa é obrigatório!')
})

type DisapproveFormData = z.infer<typeof DisapproveFormSchema>

function Disapprove(props: ModalDisapproveProps) {
    const { onClosedClick, data } = props;

    const { register, handleSubmit, formState: { errors } } = useForm<DisapproveFormData>({
        resolver: zodResolver(DisapproveFormSchema)
    })

    return (
        <>
            <div className={style.container}>
                <div className={style.modal}>
                    <div className={style.title}>
                        <h5>Motivo da recusa</h5>
                    </div>
                    <div className={style.reason}>
                        <form className={style.form}>
                            <textarea
                                placeholder='Descreva o motivo da recusa...'
                                className={style.input}
                                {...register('reason')}
                            />
                            {errors.reason && <span className={style.validation}>{errors.reason.message}</span>}
                        </form>
                    </div>
                    <div className={style.button}>
                        <button className={style.cancel} type='button' onClick={onClosedClick}><i className="bi-x-circle"></i> Cancelar</button>
                        <button className={style.save} type='submit' onClick={() => data}><i className="bi bi-check-circle"></i> Salvar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Disapprove }