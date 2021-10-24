Back-End Nodejs
---------------------------------
For the Back-End Customer side, we will use node.js to connect Front-End and Database by sending or receiving the data via MQTT and MongoDB, Node.js will handle all the necessary things in the Customer side Example. request data from Database and send API to show it in Front-End or registry some information to Database

---------------------------------

**Progress**

- QR-Code

    1. Receive Table number from Front-End 
    2. Generate token
    3. Process The data and send it via MQTT in this form {datatype:1, table:85, token:"123456"}
    4. Send URL with the token back to The Front-End like this “https://www.ordishes.com/?token=as#pf” 

- Orders

    1. recieve order and send to mqtt
    2. send list of Customer all order to FrontEnd

- Checktoken
    
    1. Checktoken in in database and send back the signal to Frontend

---------------------------------
**TASK LIST**

- [x] QR-Code
    - [x] recieve table data
    - [x] generate token
    - [x] send data to MQTT
    - [x] send url API
- [X] Orders
    - [x] recieve order
    - [x] list of order
- [x] send List of Menu to FrontEnd
- [x] Connect to MongoDB to read data

- [ ]  Kitchen


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
