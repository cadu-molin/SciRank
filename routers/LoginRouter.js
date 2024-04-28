const express = require("express");
const router = express.Router();

const controllerLogin = require('../controllers/controllerLogin')

router.get('/', controllerLogin.getLogin)
router.post('/', controllerLogin.postLogin)

router.get('/logout', controllerLogin.postLogOut)

module.exports = router