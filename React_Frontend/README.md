# Front-End side (update at 30/09/2021)
ในฝั่ง front-end เราแบ่งขั้นตอนหลัก ๆ สองอย่างคือ 
1. User interface design.
2. Coding button function to connect to back-end side.

## Progress of Front-End side 
### User interface design.
- User interface design (client) by using React.
    - [x] Create Navbar to navigate to other page (menu page, confirm page, check bill page).
    - [x] Design user interface **menu page**.
    - [x] Design user interface **confirm menu page**.
    - [x] Design user interface **check bill page**.
    - [x] Design **token login page**.
    - [ ] Design user interface **status page**.
- User interface design (cashier) by using React.
    - [x] Design user interface **cashier page**.
    - [x] Design user interface **qr code generate page**.
- User interface design (kitchen) by using GTK C language.
    - [ ] Design user interface kitchen window application.
***
### Coding button function.
- Coding button function to connect to back-end side.
    - **menu page** (client).
        - [ ] Coding button `choose` menu. 
    - **confirm menu page** (client).   
        - [ ] Coding button `confirm` menu.
    - **token login page** (client).
        - [ ] Coding button `submit`.
    - **cashier page** (cashier).
        - [ ] Coding button `commit`. 
    - **qr code generate page** (cashier).
        - [ ] Coding button `generate QR code`.
    - **kitchen application** (kitchen).
        - [ ] Coding some function in kitchen application.
***





----------------------------------------
INSTALL NODE_MODULES BEFORE RUNNING 
----------------------------------------
LIST OF NODE_MODULES
- axios
- react
- qrcode
- react-router-dom
- react-uuid
----------------------------------------

You can istall NODE_MODULES BY usig this command  **ps.cd to frontend folder first** \
`npm install`

----------------------------------------

You can start backend server BY usig this command 
`npm start`

----------------------------------------
sever will start at port 3000
you can access by go to 'http://localhost:3000/menu' or 'http://localhost:3000/qrcode'
