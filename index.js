import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import { registerValidation, loginValidation, goodsCreateValidation } from './validation.js'
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as GoodsController from './controllers/GoodsController.js'
import handleValidationErrors from './utils/handleValidationErrors.js'


gitmongoose.connect('')
    .then(() => console.log('BD OK'))
    .catch(err => console.log('DB error', err))

const app = express()
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }    
})

const upload = multer({storage})
app.use('/uploads', express.static('uploads'))
app.use('/favicon.ico', express.static('public/favicon.ico'))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hellooo')
    res.end()
})

app.get('/auth/me', checkAuth, UserController.getMe) // find me
app.post('/auth/login',  loginValidation, handleValidationErrors, UserController.login) // авторизация
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register) // регистрация

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`
    })
})

app.post('/goods', checkAuth, goodsCreateValidation, handleValidationErrors, GoodsController.create) // create goods
app.get('/goods', GoodsController.getAll) //find All
app.get('/goods/:id', GoodsController.getOne) // find One 
app.delete('/goods/:id', checkAuth, GoodsController.remove) // delete one
app.patch('/goods/:id', checkAuth, goodsCreateValidation, handleValidationErrors, GoodsController.update) // update goods


app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Servser OK')
})