require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI_PROD = process.env.MONGO_URI_PROD;

mongoose.connect(MONGO_URI_PROD)
.then(() => {
  console.log('Conectado a MongoDB Atlas');
}).catch((err) => {
  console.error('Error conectando a MongoDB', err);
});

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}, visita: http://localhost:${PORT}`);
});
