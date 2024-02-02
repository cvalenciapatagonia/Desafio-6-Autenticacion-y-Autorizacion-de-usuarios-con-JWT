const express = require('express');
const cors = require('cors');
const app = express();
const message = require('./src/helper/message');
const indexRoutes = require('./src/routes/indexRoutes');
const PORT = process.env.PORT || 3000;

// Middleware para registrar las consultas recibidas
const requestLoggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

// middleware global para todas las solicitudes
app.use(requestLoggerMiddleware);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/', indexRoutes);

app.listen(PORT, () => {
    message(PORT);
});
