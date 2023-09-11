import Expense from "./Expense"

const ExpensesList = ( {
        expenses, 
        setEditExpense, 
        deleteExpense,
        filter,
        expensesFiltered
    } ) => {
    return (
        <div className="listado-gastos contenedor">

            {
                filter ? (
                    <>
                        <h2>{expensesFiltered.length ? 'Gastos' : 'No hay Gastos en esta categoría'}</h2>
                        {expensesFiltered.map( expense => (
                            <Expense
                                key={expense.id}
                                expense={expense}
                                setEditExpense={setEditExpense}
                                deleteExpense={deleteExpense}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2>{expenses.length ? 'Gastos' : 'No hay Gastos aún'}</h2>
                        {expenses.map( expense => (
                            <Expense
                                key={expense.id}
                                expense={expense}
                                setEditExpense={setEditExpense}
                                deleteExpense={deleteExpense}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}

export default ExpensesList