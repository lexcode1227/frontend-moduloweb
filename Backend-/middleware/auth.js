const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json( {message: 'Token requerido para la sesión'});
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json( {message: 'Token inválido'});
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
