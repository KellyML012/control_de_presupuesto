import { useState, useEffect } from 'react'
import Message from './Message'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({ 
    setModal, 
    animateModal, 
    setAnimateModal, 
    holdExpense, 
    editExpense,
    setEditExpense
}) => {
    
    const [budgetName, setBudgetName] = useState('')
    const [budgetAmount, setBudgetAmount] = useState('')
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')
    const [date, setDate] = useState('')
    const [id, setId] = useState('')
    
    useEffect( () => {
        if(Object.keys(editExpense).length > 0) {
            setBudgetName(editExpense.budgetName)
            setBudgetAmount(editExpense.budgetAmount)
            setCategory(editExpense.category)
            setId(editExpense.id)
            setDate(editExpense.date)
        }
    }, [])

    const hideModal = () => {
        setAnimateModal(false)
        setEditExpense({})
        setTimeout( () => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        if([ budgetName, budgetAmount, category ].includes('')) {
            setMessage('Todos los campos son obligatorios')
            
            setTimeout( () => {
                setMessage('')
            }, 3000)
            return
        }
        holdExpense( {budgetName, budgetAmount, category, id, date} )
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'l>
                <img
                    src={CerrarBtn}
                    alt='Cerrar Modal'
                    onClick={hideModal}
                    style={{cursor: 'pointer'}}
                />
            </div>

        <form
            onSubmit={handleSubmit}
            className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
        >
            <legend>{editExpense.budgetName ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

            <div className='campo'>
                <label htmlFor='nombre'>Nombre</label>

                <input
                    id='nombre'
                    type='text'
                    placeholder='Añade el Nombre del Gasto'
                    value={budgetName}
                    onChange={ e => setBudgetName(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad</label>

                <input
                    id='cantidad'
                    type='number'
                    placeholder='Añade la cantidad del Gasto. Ej.: 300'
                    value={budgetAmount}
                    onChange={ e => setBudgetAmount(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor='categoria'>Categoría</label>

                <select
                    id='categoria'
                    value={category}
                    onChange={ e => setCategory(e.target.value)}
                >
                    <option value=''>-- Seleccione --</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='casa'>Casa</option>
                    <option value='gastos'>Gastos Varios</option>
                    <option value='ocio'>Ocio</option>
                    <option value='salud'>Salud</option>
                    <option value='suscripciones'>Suscripciones</option>
                </select>
            </div>

            <input
                type='submit'
                value={editExpense.budgetName ? 'Guardar Cambios' : 'Añadir Gasto'}
            />
            
            {message && <Message type='error'>{message}</Message>}

        </form>

        </div>
    )
}

export default Modal