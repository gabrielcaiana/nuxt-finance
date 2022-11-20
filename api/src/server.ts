import express from 'express'
import cors from 'cors'

// middlewares
import {
  verifyIfExistsCategorie,
  verifyIfExistsAccount,
  verifyIfExistsTransaction,
} from './middlewares'

// controllers
import account from './controllers/account'
import transactions from './controllers/transactions'
import categories from './controllers/categories'
import balance from './controllers/balance'

const app = express()
app.use(express.json())
app.use(cors())

// account
app.get('/account', account.index)
app.get('/account/:cpf', account.indexByDocument)
app.post('/account', account.create)
app.delete('/account/:cpf', verifyIfExistsAccount, account.delete)

// transactions
app.get('/transactions', transactions.index)
app.post(
  '/transactions',
  verifyIfExistsCategorie,
  verifyIfExistsAccount,
  transactions.create
)
app.put(
  '/transactions/:id',
  verifyIfExistsAccount,
  verifyIfExistsCategorie,
  transactions.update
)
app.delete('/transactions/:id', verifyIfExistsTransaction, transactions.delete)

// categories
app.get('/categories', categories.index)
app.post('/categories', categories.create)
app.put('/categories/:id', verifyIfExistsCategorie, categories.update)
app.delete('/categories/:id', verifyIfExistsCategorie, categories.delete)

// balance
app.get('/balance/:cpf', balance.index)
app.post('/balance/:cpf', balance.create)
app.delete('/balance/:cpf', balance.delete)

// server
app.listen('3333')
