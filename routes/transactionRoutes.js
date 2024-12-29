const express = require('express');
const router = express.Router();
const { createTransaction, getBankStatement, getTransactions, getTransactionById, deleteTransaction, updateTransaction } = require('../controllers/transactionController');
const jwtAuth = require('../middleware/jwtAuth');

// Transaction Routes

/**
 * @swagger
 * /api/transactions/{userId}:
 *   get:
 *     summary: Busca Transações
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do Usuário
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de Transações Cadastradas
 */
router.get('/:userId', getTransactions)

/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Obtém Transação pelo ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da Transação
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transação Encontrada
 *       401:
 *         description: Token invalido
 */
router.get('/:id', getTransactionById)

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Cria uma Nova Transação
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              userId: 
 *                  type: string
 *              amount: 
 *                 type: number
 *              type: 
 *                  type: string
 *              description: 
 *                  type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Transação Criada com Sucesso
 */
router.post('/', jwtAuth, createTransaction);  // Create transaction

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Atualizar os Dados da Transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da Transação
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              userId: 
 *                  type: string
 *              amount: 
 *                 type: number
 *              type: 
 *                  type: string
 *              description: 
 *                  type: string
 *     responses:
 *       201:
 *         description: Transação Atualizado com Sucesso
 */
router.put('/:id', updateTransaction)

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Deletar Transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da Transação
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Transação Removida com Sucesso
 */
router.delete('/:id', deleteTransaction)

router.get('/statement', jwtAuth, getBankStatement);  // Get bank statement

module.exports = router;
