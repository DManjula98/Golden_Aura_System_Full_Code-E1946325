const express = require('express');
const {dbConnect} =require('./utils/db')
const app = express()
const cors = require('cors');
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('dotenv').config();
const socket = require('socket.io')
const server = http.createServer(app)

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}))

const io = socket(server, {
    cors: {
        origin: '*',
        credentials: true
    }
})

var allCustomer = []
var allSeller = []

const addUser = (customerId, socketId, userInformation) => {
    const checkUser = allCustomer.some(u => u.customerId === customerId)
    if (!checkUser) {
        allCustomer.push({
            customerId,
            socketId,
            userInformation
        })
    }
}

const addSeller = (sellerId, socketId, userInformaion) => {
    const chaeckSeller = allSeller.some(u => u.sellerId === sellerId)
    if (!chaeckSeller) {
        allSeller.push({
            sellerId,
            socketId,
            userInformaion
        })
    }
}

const findCustomer = (customerId) => {
    return allCustomer.find(c => c.customerId === customerId)
}

const findSeller = (sellerId) => {
    return allSeller.find(c => c.sellerId === sellerId)
}

const remove = (socketId) => {
    allCustomer = allCustomer.filter(c => c.socketId !== socketId)
    allSeller = allSeller.filter(c => c.socketId !== socketId)
}

let admin = {}

const removeAdmin = (socketId) => {
    if (admin.socketId === socketId) {
        admin = {}
    }
}

io.on('connection', (soc) => {
    console.log('socket server is connected...')

    soc.on('add_user', (customerId, userInformation) => {
        //console.log(userInformation)
        addUser(customerId, soc.id, userInformation)
        io.emit('activeSeller', allSeller)
        io.emit('activeCustomer', allCustomer)
    })

    soc.on('add_seller', (sellerId, userInformaion) => {
        //console.log(userInformaion)
        addSeller(sellerId, soc.id, userInformaion)
        io.emit('activeSeller', allSeller)
        io.emit('activeCustomer', allCustomer)
        io.emit('activeAdmin', { status: true })

    })

    soc.on('add_admin', (adminInfo) => {
        if (adminInfo && typeof adminInfo === 'object') {
            delete adminInfo.email; 
            admin = { ...adminInfo, socketId: soc.id }; 
            io.emit('activeSeller', allSeller); 
            io.emit('activeAdmin', { status: true });
            
        } else {
            console.error("Invalid adminInfo received:", adminInfo);
        }
    });

    soc.on('send_seller_message', (msg) => {
        const customer = findCustomer(msg.receverId)
        //console.log(customer)
        if (customer !== undefined) {
           soc.to(customer.socketId).emit('seller_message', msg)
       }
   })

   soc.on('send_customer_message', (msg) => {
    const seller = findSeller(msg.receverId)
    //console.log(seller)
    if (seller !== undefined) {
        soc.to(seller.socketId).emit('customer_message', msg)
    }
    })

 soc.on('send_message_admin_to_seller', msg => {
   // console.log(msg)
    const seller = findSeller(msg.receverId)
    if (seller !== undefined) {
        soc.to(seller.socketId).emit('receved_admin_message', msg)
    }
})

soc.on('send_message_seller_to_admin', msg => {
    if (admin.socketId) {
        soc.to(admin.socketId).emit('receved_seller_message', msg)
    }
})

soc.on('disconnect', () => {
    console.log('user disconnect')
    remove(soc.id)
    removeAdmin(soc.id)
    io.emit('activeAdmin', { status: false })
    io.emit('activeSeller', allSeller)
    io.emit('activeCustomer', allCustomer)

   })

})

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', require('./routes/chatRoutes'))

app.use('/api', require('./routes/bannerRoutes'));

app.use('/api', require('./routes/paymentRoutes'));

app.use('/api', require('./routes/dashboard/dashboardIndexRoutes'));

app.use('/api', require('./routes/contactMailRoutes'));

app.use('/api/home', require('./routes/home/homeRoutes'));
app.use('/api', require('./routes/order/orderRoutes'));
app.use('/api', require('./routes/home/CustomerAuthRoutes'))
app.use('/api', require('./routes/home/cartRoutes'))
app.use('/api', require('./routes/authroutes'));
app.use('/api', require('./routes/dashboard/sellerRoutes'));
app.use('/api', require('./routes/dashboard/categoryRoutes'));
app.use('/api', require('./routes/dashboard/productRoutes'));
app.use('/api', require('./routes/dashboard/blogRoutes'));
app.get('/', (req, res) => res.send('Hello World'));

const port = process.env.PORT 
dbConnect()
server.listen(port, () => console.log(`Server is running on port ${port}!`));