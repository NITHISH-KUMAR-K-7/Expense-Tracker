import express from 'express'
import { createExpense,getExpense,DeleteExpense } from '../controllers/expenseControllers.js'

const router = express.Router()

router.post('/',createExpense)
router.get('/',getExpense)
router.delete("/:id",DeleteExpense)


export default router;
