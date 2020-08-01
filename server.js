const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const users = require('./user-db.js');
require('dotenv').config();

const server = jsonServer.create();
const middlewares = jsonServer.defaults({ noCors: true });
server.use(middlewares);
server.use(cors());
const router = jsonServer.router('db.json');
const port = process.env.PORT || 8080;
const SECRET_KEY = process.env.SECRET_ANDERSONFLIX;
const expiresIn = '1h';

// Criar o token apartir do payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verificar o Token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

// Verificar se o usuário existe
function isAuthenticated({ email, password }) {
  return users.findIndex((user) => user.email === email && user.password === password) !== -1;
}

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json({}));

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = 'Email e (ou) senha incorretos';
    res.status(status).json({ status, message });
    return;
  }
  const accessToken = createToken({ email, password });
  // eslint-disable-next-line no-console
  console.log(`Access Token:${accessToken}`);
  res.status(200).json({ accessToken });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401;
    const message = 'Você não possui autorização.';
    res.status(status).json({ status, message });
    return;
  }
  try {
    const verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = 'Token de acesso não fornecido';
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = 'Token de acesso revogado.';
    res.status(status).json({ status, message });
  }
});

server.use('/api', router);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`JSON Server is running in ${port}`);
});
