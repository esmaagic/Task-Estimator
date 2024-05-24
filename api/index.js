const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const app = express()
const cors = require('cors')
require('dotenv').config()



const authRouter = require('./routes/auth')
const taskRouter = require('./routes/task')
const userRouter = require('./routes/user')
const {isAuth} = require('./middleware/auth')

const env = process.env.NODE_ENV || 'development';



//database connection
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const secretKey = process.env.SECRET_KEY;
const originRoute = process.env.CLIENT_ORIGIN


mongoose.connect(mongoURI)

//setting up sessions
const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'userSession',
})

app.set('trust proxy', 1);

app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            secure: env === 'production',
            domain:process.end.CLIENT_ORIGIN,
            httpOnly: true,
            sameSite: 'None'
          },
    }))


const corsOptions = {
    origin: originRoute, // Your frontend's origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    };

    

    app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}))
app.use(express.json())

//routes

app.use('/auth', authRouter)
app.use(isAuth)
//all routes below require authentication
app.use('/tasks', taskRouter)
app.use('/users', userRouter)


app.listen(port, ()=> console.log('server is listening'))
