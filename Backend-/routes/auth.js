require('dotenv').config();
const nodeMailer = require('nodemailer')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

router.post('/register', async (req, res) => {
  const { name, lastname, username, password, email } = req.body;

  try {
    const existedUser = await User.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    })
    if (existedUser) {
      return res.status(400).json({ message: 'El nombre de usuario o el correo electrónico ya están en uso' });
    }
  } catch (err) {
    res.status(400).send(`Error al verificar si el usuario esta registrado, ${err.message}`);
  }
  try {
    const newUser = new User({ name, lastname, username, password, email });
    await newUser.save();
    res.status(201).send('Usuario registrado');
  } catch (error) {
    res.status(400).send(`Error registrando usuario, ${error.message}`);
  }

});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).send('Credenciales inválidas');
    }
    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.SECRET_KEY, { expiresIn: '20m' });
     res.json({ token });
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

router.post('/forgotPassword', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(401).send('Email no agregado - campo obligatorio')
  }
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).send('Credenciales inválidas');
    }
    const resetToken = jwt.sign({id: user._id, username: user.username, email: user.email }, process.env.SECRET_KEY, { expiresIn: '7m' })

    const transporter = nodeMailer.createTransport({
      service: 'outlook',
      auth: {
          user: process.env.USERMAIL,
          pass: process.env.USERPASSWORD
      }
    });
  
    const mailOptions = {
    from: process.env.USERMAIL,
    to: `${user.email}`,
    subject: 'Recupera tu contraseña',
    text: `Crea tu nueva contraseña ingresando al siguiente link: http://localhost:3000?resetToken=${resetToken} 
  
    Si no solicitaste el cambio de contraseña, ignora este correo. Tu contraseña continuará siendo la misma.
    `
    };
  
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
    console.log('Correo enviado correctamente: ' + info.response);
    }
    });
    res.status(201).send('Token enviado a tu correo para cambiar contraseña');
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

router.put('/changePassword', verifyToken, async (req, res) => {
  const { newPassword } = req.body;
  const { email } = req.user;
  
  if (!email || !newPassword) {
    res.status(401).send('Faltan credenciales por completar')
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Usuario no encontrado');
    }
    user.password = newPassword
    await user.save();
    res.status(201).send('Contraseña cambiada existosamente');
  } catch (error) {
    res.status(500).send(`Error en el servidor: ${error.message}`);
  }
});

router.get('/protected', verifyToken, (req, res) => {
  res.send(`Hola ${req.user.username} con correo: ${req.user.email}, esta es una ruta protegida.`);
});

module.exports = router;
