export const getBalance = (statement) => {
  const balance = statement.reduce((acc, operation) => {
    return operation.type === 'deposit'
      ? acc + operation.amount
      : acc - operation.amount
  }, 0)

  const deposits = statement.filter((deposit) => deposit.type === 'deposit')
  const calculateDeposit = deposits.reduce((acc, operation) => {
    return acc + operation.amount
  }, 0)

  const expenses = statement.filter((deposit) => deposit.type === 'expense')
  const calculateExpenses = expenses.reduce((acc, operation) => {
    return acc + operation.amount
  }, 0)

  return {
    balance,
    deposit: calculateDeposit,
    expense: calculateExpenses,
  }
}
