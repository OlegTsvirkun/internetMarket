const ApiErrors = require('../helpers/ApiErrors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthUser = require('../models/authUser');
const AuthRole = require('../models/authRole');

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}
const userRegistration = async (req, res, next) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password) return next(ApiErrors.badRequest('Некоректний пароль чи логін'))
        const candidate = await AuthUser
            .findOne({ email: email })
        if (candidate) {
            return next(ApiErrors.badRequest("Користувач з такою поштою вже є"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const userRole = await AuthRole.findOne({ value: 'USER' })
        !role ? role = userRole.value : role
        const user = await AuthUser.create({ email: email, password: hashPassword, role: [role] })
        const token = generateJwt(user._id, user.email, user.role)
        res.json({ token })
    }
    catch (error) {
        next(ApiErrors.badRequest(error.message))
    }
}

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await AuthUser.findOne({ email: email })
        if (!user) {
            return next(ApiErrors.internal("Користувача з такою поштою немає"))
        }
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return next(ApiErrors.internal("Вказан невірний пароль"))
        }
        const token = generateJwt(user._id, user.email, user.role)
        res.json({ token })
    } catch (error) {
        res.json({ messege: error })

    }

}

const userCheck = async (req, res, next) => {
    try {
        const token = generateJwt(req.user._id, req.user.email, req.user.role)
        // console.log('token>>',token)
        return res.json({ token })
    } catch (error) {
        res.json({ messege: error })

    }

}

module.exports = {
    userRegistration,
    userLogin,
    userCheck,
}