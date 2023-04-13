const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const uploadExpress = require('express-fileupload')


const userRouter = require('./router/usersRoute.js');
const userOrderStatusRoute = require('./router/userOrderStatusRoute.js');
const userTiketRoute = require('./router/userTiketsRoute.js');
const transactionRoute = require('./router/transactionRoute.js')
const servciesRoute = require('./router/servicesRoute.js')
const userOrdersRoute = require('./router/userOrderRoutes.js');
const newsRoute = require('./router/newsRoute.js')

const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(uploadExpress())
app.use(cors())
app.use(bodyParser.json())

app.use(cookieParser());

app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}));


app.use('/api/users', userRouter);
app.use('/api/user-orders-status', userOrderStatusRoute)
app.use('/api/tikets', userTiketRoute)
app.use('/api/transaction', transactionRoute)
app.use('/api/services', servciesRoute);
app.use('/api/orders', userOrdersRoute);
app.use('/api/news', newsRoute)



app.listen(3000)





