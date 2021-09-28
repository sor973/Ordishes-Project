# Ordishes Project

## Project Overview
This project featured an online food ordering system powered by NodeJS and C. For Customer side, we will use React for front-end and NodeJS for backend. For kitchen side, we will use GTK in C language to make the GUI and make the connection to the MQTT broker for transferring data. For restaurant side, we will use script powered by C language to make a process most of the data that is begin passed into MQTT broker. The Restaurant side C language script will also be use to write, delete and update MongoDB. To send data between NodeJS and C Language Script, we use MQTT Broker.

## Server Side
### Overview
In this server we will use FreeBSD for our server operating system to install MongoDB and Mosquitto as it is a light weight operating system. And for development purpose, we will use OpenVPN for our development network. All of the systems are self-managed.

### Progress
1. [x] MongoDB Server
    1. [x] Create FreeBSD Jail
    2. [x] Install MongoDB version 4.4 Package
    3. [x] Configure MongoDB and enable authorization system.
    4. [x] Start and deploy the server.
2. [x] Mosquitto Server(Broker)
    1. [x] Create FreeBSD Jail
    2. [x] Install Moquitto Package 
    3. [x] Configure Moquitto and enable authorization system.
    4. [x] Start and deploy the server.
3. [x] OpenVPN Server

<!-- ### Progress Timing Graph -->
```mermaid
gantt
dateFormat  YYYY-MM-DD-HH.mm
title Server Deployment Timeline
%%excludes weekdays 2021-09-24-00.00
axisFormat  %Y-%m-%d %H:%M


section VPN Server
Finalize and Deploy OpenVPN Server           :done,    des11, 2021-09-25-15.00,2021-09-25-16.00
section MongoDB Server
Create FreeBSD Jail           :done,    des21, 2021-09-25-16.15,2021-09-25-16.30
Install all necessary packages            :done,    des22, 2021-09-25-16.45,2021-09-25-17.30
Initialize and Configure MongoDB            :done,    des23, 2021-09-25-17.30,2021-09-25-17.45
Enable Authentication System            :done,    des24, 2021-09-25-17.30,2021-09-25-17.45
Finalize MongoDB Server           :done,    des25, 2021-09-25-17.45,2021-09-25-18.00
Deploy MongoDB Server           :done,    des26, 2021-09-25-18.00,2021-09-25-18.01
section Mosquitto Server(Broker)
Create FreeBSD Jail           :done,    des31, 2021-09-25-16.15,2021-09-25-16.30
Install all necessary packages            :done,    des32, 2021-09-25-18.30,2021-09-25-18.45
Initialize and Configure Mosquitto            :done,    des33, 2021-09-25-18.45,2021-09-25-21.00
Enable Authentication System            :done,    des34, 2021-09-25-21.30,2021-09-25-22.00
Finalize Mosquitto           :done,    des35, 2021-09-25-22.15,2021-09-26-00.00
Deploy Mosquitto Server(Broker)           :done,    des36, 2021-09-26-00.00,2021-09-26-00.01
```