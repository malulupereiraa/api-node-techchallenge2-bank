const express = require('express');
const connectDB = require('./config/db');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
// const userRoutes = require('./routes/userRoutes');
// const transactionRoutes = require('./routes/transactionRoutes');
const generalRoutes = require('./routes/generalRoutes');

const app = express();

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
// app.use('/api/users', userRoutes);
// app.use('/api/users/transactions', transactionRoutes);
app.use('/api/users', generalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor Rodando na Porta: ${PORT}`));
