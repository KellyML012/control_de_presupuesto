import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import ExpensesList from './components/ExpensesList'
import Modal from './components/Modal'
import { generateId } from './helpers/index'
import NewBudgetIcon from './img/nuevo-gasto.svg'

function App() {

  const initialExpense = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  const [expenses, setExpenses] = useState(initialExpense)

  const initialBudget = Number(localStorage.getItem('budget')) ?? 0
  const [budget, setBudget] = useState(initialBudget)
  const [isValidBudget, setIsValidBudget] = useState(false)

  const [modal, setModal] = useState(false)
  const [animateModal, setAnimateModal] = useState(false)

  const [editExpense, setEditExpense] = useState({})

  const [filter, setFilter] = useState('')
  const [expensesFiltered, setExpensesFiltered] = useState([])

  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true)
      setTimeout(() => {
        setAnimateModal(true)
      }, 250)
    }
  }, [editExpense])

  useEffect( () => {
    localStorage.setItem('budget', budget  ?? 0)
  }, [budget])

  useEffect( () => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? [])
  }, [expenses])

  useEffect( () => {
    if(filter) {
      const expenseFiltered = expenses.filter( expense => expense.category === filter )
      setExpensesFiltered(expenseFiltered)
    }
  }, [filter])

  useEffect( () => {
    if(initialBudget > 0) {
      setIsValidBudget(true)
    }
  }, [])

  const handleNewBudget = () => {
    setModal(true)
    setEditExpense({})

    setTimeout(() => {
      setAnimateModal(true)
    }, 250)
  }

  const holdExpense = expense => {
    if(expense.id) {
      // Update
      const expensesUpdated = expenses.map( expenseState => expenseState.id === expense.id ? expense : expenseState)
      setExpenses(expensesUpdated)
      setEditExpense({})
    } else {
      // New Expense
      expense.id = generateId()
      expense.date = Date.now()
      setExpenses([...expenses, expense])
    }

    setAnimateModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500)
  }

  const deleteExpense = id => {
    const updatedExpenses = expenses.filter( expense => expense.id !== id)
    setExpenses(updatedExpenses)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filter
              filter={filter}
              setFilter={setFilter}
            />
            <ExpensesList 
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              expensesFiltered={expensesFiltered}
            />
          </main>

          <div className='nuevo-gasto'>
            <img
              src={NewBudgetIcon}
              alt='New Budget Icon'
              style={{ cursor: 'pointer' }}
              onClick={handleNewBudget}

            />
          </div>
        </>
      )}

      {modal && <Modal
        setModal={setModal}
        animateModal={animateModal}
        setAnimateModal={setAnimateModal}
        holdExpense={holdExpense}
        editExpense={editExpense}
        setEditExpense={setEditExpense}
      />
      }

    </div>
  )
}

export default App
