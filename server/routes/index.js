const { Router } = require('express');
const router = Router();

const storiesRoutes = require('./storiesRoutes')

router.use('/', storiesRoutes)


module.exports = router;