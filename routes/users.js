const router = require('express').Router()
const controller = require('../controllers/users')
const validateToken = require('../middlewares/validateToken')
const permission = require('../middlewares/permission')

router.get('/', validateToken, permission.isAdmin, controller.getAllUsers)
router.get('/:id', validateToken, permission.checkUserId, controller.getUserById)
router.post('/', validateToken, permission.isAdmin, controller.register)
router.put('/:id', validateToken, permission.checkUserId, controller.updateUserById)
router.delete('/:id', validateToken, permission.isAdmin, controller.deleteUserById)

module.exports = router
