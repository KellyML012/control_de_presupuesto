import { useState, useEffect } from "react"
import { amountFormat } from '../helpers/index'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const BudgetControl = ( {
    expenses, 
    setExpenses, 
    budget, 
    setBudget, 
    setIsValidBudget
} ) => {

    const [percent, setPercent] = useState(0)
    const [available, setAvailable] = useState(0)
    const [spent, setSpent] = useState(0)

    useEffect( () => {
        const totalSpent = expenses.reduce( (total, expense) => total + expense.budgetAmount, 0)
        const totalAvailable = budget - totalSpent

        // Calculate percentage spent
        const newPercent = ( ( (budget - totalAvailable) / budget ) * 100 ).toFixed(2)
        
        setAvailable(totalAvailable)
        setSpent(totalSpent)
        setTimeout(() => {
            setPercent(newPercent)
        }, 1500)
    }, [expenses])
    
    const handleResetApp = () => {
        const response = confirm('¿Deseas reiniciar Presupuesto y Gasto?')

        if(response) {
            setExpenses([])
            setBudget(0)
            setIsValidBudget(false)
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    value={percent}
                    text={`${percent}% Gastado`}
                    styles={buildStyles({
                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 3,
                        pathColor: percent > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: percent > 100 ? '#DC2626' : '#3B82F6'
                    })}
                />
            </div>

            <div className="contenido-presupuesto">
                <button
                    className="reset-app"
                    type="button"
                    onClick={handleResetApp}
                >
                    Reiniciar App
                </button>
                <p>
                    <span>Presupuesto: </span>{amountFormat(budget)}
                </p>
                <p className={`${available < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span>{amountFormat(available)}
                </p>
                <p>
                    <span>Gastado: </span>{amountFormat(spent)}
                </p>
            </div>

        </div>
    )
}

export default BudgetControl