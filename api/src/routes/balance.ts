import express from 'express'
import balance from '../controllers/balance'

const router = express.Router()

router.get('/:cpf', balance.index)
router.post('/:cpf', balance.create)
router.delete('/:cpf', balance.delete)
