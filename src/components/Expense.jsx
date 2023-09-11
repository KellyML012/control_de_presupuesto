import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatDate, amountFormat } from "../helpers/index"
import IconSave from '../img/icono_ahorro.svg'
import IconHouse from '../img/icono_casa.svg'
import IconFood from '../img/icono_comida.svg'
import IconExpenses from '../img/icono_gastos.svg'
import IconLeisure from '../img/icono_ocio.svg'
import IconHealth from '../img/icono_salud.svg'
import IconSuscrptions from '../img/icono_suscripciones.svg'

const iconsLibrary = {
    ahorro : IconSave,
    comida : IconFood,
    casa : IconHouse,
    gastos : IconExpenses,
    ocio : IconLeisure,
    salud : IconHealth,
    suscripciones : IconSuscrptions
}

const Expense = ( {expense, setEditExpense, deleteExpense} ) => {
    const { category, budgetName, budgetAmount, id, date } = expense

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setEditExpense(expense)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => deleteExpense(id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img 
                            src={iconsLibrary[category]}
                            alt="Expense Icon"
                        />
                        <div className="descripcion-gasto">
                            <p className="categoria">{category}</p>
                            <p className="nombre-gasto">{budgetName}</p>
                            <p className="fecha-gasto">
                                Agregado el: {''}
                                <span>{formatDate(date)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">{amountFormat(budgetAmount)}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expense