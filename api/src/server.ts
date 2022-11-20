import express from 'express'
import cors from 'cors'

import categoriesRouter from './routes/categories'
import accountRouter from './routes/account'
import transactionsRouter from './routes/transactions'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/categories', categoriesRouter)
app.use('/account', accountRouter)
app.use('/transactions', transactionsRouter)

app.listen('3333')
