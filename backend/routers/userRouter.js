const router = require('express').Router();
const { SignIn, SignUp } = require('../controllers/userControllers');


router.route('/signup').post(SignUp);
router.route('/signin').post(SignIn);

module.exports = router;