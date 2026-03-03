import { createContext, useReducer } from "react"
import { budgetReducer, initialState } from "../reducers/budget-reducer"

// Crear los contextos para state y dispatch separados
export const BudgetStateContext = createContext()
export const BudgetDispatchContext = createContext()

// Provider que envuelve la aplicación
export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  return (
    <BudgetStateContext.Provider value={state}>
      <BudgetDispatchContext.Provider value={dispatch}>
        {children}
      </BudgetDispatchContext.Provider>
    </BudgetStateContext.Provider>
  )
}
