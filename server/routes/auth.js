const authController = require('../controllers/auth');
const { Router } = require("express");

const router = new Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

router.post("/auth/signup", authController.signup);

router.post("/auth/signin", authController.signin);

router.get("/auth/auth/confirm/:token", authController.verifyUser);

module.exports = router;