import express from 'express'
import {
  verifyIfExistsCategorie,
  verifyIfExistsAccount,
  verifyIfExistsTransaction,
} from '../middlewares'

import transactions from '../controllers/transactions'

const router = express.Router()

router.get('/', transactions.index)
router.post(
  '/',
  verifyIfExistsCategorie,
  verifyIfExistsAccount,
  transactions.create
)
router.put(
  '/:id',
  verifyIfExistsAccount,
  verifyIfExistsCategorie,
  transactions.update
)
router.delete('/:id', verifyIfExistsTransaction, transactions.delete)

export default router
