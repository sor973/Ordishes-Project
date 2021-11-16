Back-End Nodejs
---------------------------------
For the Back-End Customer side, we will use node.js to connect Front-End and Database by sending or receiving the data via MQTT and MongoDB, Node.js will handle all the necessary things in the Customer side Example. request data from Database and send API to show it in Front-End or registry some information to Database

---------------------------------
### Cashier
- Url
    - [x] Get **table** data  from Cashier Front-End 
    - [x] Generate token
    - [x] Check data in database and send it via MQTT 
    - [x] Send url login response back to Cashier Front-End 
- Checkout
    - [x] Get **paid order** data from Cashier Front-End 
    - [x] send data via MQTT 
- Orderlist
    - [x] read All Orderlist in database 
    - [x] send All Orderlist data APi 

### Customer
- Table
    - [x] Get request & data **token** from Customer Front-End
    - [x] Send table data response back to Customer Front-End 
- Menu
    - [x] read Menu from database
    - [x] send Menu data APi
- Checktoken
    - [x] Get request & data **token** from Customer Front-End
    - [x] Checktoken in in database and send back the signal to Frontend
- Orders
    - [x] Get request & data from Customer Front-End
    - [x] Check datatype Ex. request status, request order, request checkout
    - [x] if request order Send order to MQTT
    - [x] if request status Read status in database and send back status response
    - [x] if request checkout Read Orderlist from database and send back OrderList response
- Checkout
    - [x] Get request & data **Checkout** from Customer Front-End
    - [x] send data via MQTT  

----------------------------------------
INSTALL NODE_MODULES BEFORE RUNNING 
----------------------------------------
LIST OF NODE_MODULES
- nodemon
- mqtt
- generate-password
- express
- cors
- lodash
- mongodb
- uuid
----------------------------------------

You can istall NODE_MODULES BY usig this command **PS. cd to BackEnd folder first** \
`npm install`

----------------------------------------

You can start backend server BY usig this command 
`npx nodemon`

----------------------------------------
sever will start at port 8000
you can access by go to 'http://localhost:8000/urlapi'
