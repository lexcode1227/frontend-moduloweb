require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const cors = require('cors')

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://modulo-web.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions))
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
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en vercel</title>
      </head>
      <body>
        <h1>Soy un proyecto back en vercel</h1>
      </body>
    </html>
  `
  res.send(htmlResponse);
});

// app.options('*', cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}, visita: http://localhost:${PORT}`);
});
