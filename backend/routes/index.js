const router = require('express').Router();
const auth = require('../middlewares/auth');
const { registrationUser, loginUser } = require('../controllers/users');
const PageNotFound = require('../errors/PageNotFound');
const userRouter = require('./users');
const movieRouter = require('./movies');

const {
  loginUserValidator,
  registrationUserValidator,
} = require('../middlewares/validation');

router.post('/signup', registrationUserValidator, registrationUser);

router.post('/signin', loginUserValidator, loginUser);

router.use(auth);

router.use('/', userRouter);

router.use('/', movieRouter);

router.use('*', (req, res, next) => {
  next(new PageNotFound('Страница не найдена'));
});

module.exports = router;
