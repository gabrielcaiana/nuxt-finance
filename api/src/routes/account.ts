import express from 'express'
import account from '../controllers/account'

import { verifyIfExistsAccount } from '../middlewares'

const router = express.Router()

router.get('/', account.index)
router.get('/:cpf', account.indexByDocument)
router.post('/', account.create)
router.delete('/:cpf', verifyIfExistsAccount, account.delete)

export default router
