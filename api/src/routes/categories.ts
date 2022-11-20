import express from 'express'
import categories from '../controllers/categories'
import { verifyIfExistsCategorie } from '../middlewares'

const router = express.Router()

router.get('/', categories.index)
router.post('/', categories.create)
router.put('/:id', verifyIfExistsCategorie, categories.update)
router.delete('/:id', verifyIfExistsCategorie, categories.delete)

export default router
