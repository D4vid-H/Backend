const {Router}  = require('express')
const router = Router();
const { routeContollers } = require('../controllers/routersControllers')
const { meterController } = require('../controllers/meterControllers')
const { getPersonas, addPersona } = require('../controllers/personasControllers')


router.get('/', routeContollers);

router.get('/data', meterController);

router.get('/datos', meterController);

router.get('/personas', getPersonas)
router.post('/personas', addPersona)


module.exports = router;