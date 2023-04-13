const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const uploadExpress = require('express-fileupload')


app.use(uploadExpress())
app.use(cors())
app.use(bodyParser.json())

const usersRoute = require('./router/usersRouter.js')
const transactionRoute = require('./router/transactionRouter.js')
const tiketsRoute = require('./router/tiketsRouter.js')
const ordersRoute = require('./router/ordersRouter.js')
const dashboardRoute = require('./router/dashboardRouter.js')
const newsRoute = require('./router/newsRouter.js')
const servicesRoute = require('./router/servicesRouter.js')
const registerRoute = require('./router/registerRouter.js')
const adminRouter = require('./router/adminRouter.js')

app.use('/api/admin-users', usersRoute)
app.use('/api/admin-transactions', transactionRoute)
app.use('/api/admin-tikets', tiketsRoute)
app.use('/api/admin-orders', ordersRoute)
app.use('/api/admin-dashboard', dashboardRoute)
app.use('/api/admin-news', newsRoute)
app.use('/api/admin-services', servicesRoute)
app.use('/api/admin-register', registerRoute)
app.use('/api/admin-info', adminRouter)




app.listen(4000)