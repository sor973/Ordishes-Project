# Ordishes Project - C Backend first_week
### main in work
- publish data.JSON from MQTT
- tranform data.JSON to data.BSON/BCON
- sent data.BSON/BCON to MongoDB

## Progress of C Backend
in first week C Backend
- MQTT
    - [ ] publish data.JSON.
-------------------------------------
- Mongo C driver
    - [x] learn MongoDB.
    - [x] compile Mongo C driver.
-------------------------------------
- learn Mongo C driver.
    - [x] **Connect** Mongo C driver.
    - [x] **Inserting** a Document Mongo C driver.
    - [x] **Finding** a Document Mongo C driver.
    - [x] **Look for** a specific document Mongo C driver.
    - [x] **Updating** a Document Mongo C driver.
    - [x] **Deleting** a Document Mongo C driver.
    - [x] **Counting** a Document Mongo C driver.
    - [x] **collStats** a Document Mongo C driver.

-------------------------------------
## flow for first week.
```mermaid
graph TD
    A[Mongo C driver] -->|mongoDB v.4.4| B(learn MongoDB)
    B --> |compile Mongo C driver| C[learn Mongo C driver]
    C --> D[Connect]
    C --> E[Inserting]
    C --> F[Finding]
    C --> G[Look for]
    C --> H[Updating]
    C --> I[Deleting]
    C --> J[Counting]
    C --> K[collStats]
```
-------------------------------------
## Installing the MongoDB C Driver (libmongoc) and BSON library (libbson) .
- Install libmongoc with a Package Manager.\
`$ sudo apt-get install libmongoc-1.0-0`

## Installtion Mongo C Driver.
```
$ git clone https://github.com/mongodb/mongo-c-driver.git
$ cd mongo-c-driver
$ git checkout 1.19.0
$ python build/calc_release_version.py > VERSION_CURRENT
$ mkdir cmake-build
$ cd cmake-build
$ cmake -DENABLE_AUTOMATIC_INIT_AND_CLEANUP=OFF ..
$ cmake --build .
$ sudo cmake --build . --target install
```

## Connect to MongoDB Atlas 
code from : https://docs.mongodb.com/drivers/c/
```c
#include <mongoc/mongoc.h>
int main (int argc, char *argv[])
{
   mongoc_database_t *database;
   mongoc_client_t *client;
   mongoc_init ();
   // Replace the uri string with your MongoDB deployment's connection string.
   client = mongoc_client_new(
      "mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority"
   );
   database = mongoc_client_get_database (client, "test");
   mongoc_database_destroy (database);
   mongoc_client_destroy (client);
   mongoc_cleanup ();
   return 0;
}

```
-------------------------------------
# Ordishes Project - C Backend second_week
### main in work
- publish data.JSON from MQTT
- tranform data.JSON to data.BSON/BCON
- sent data.BSON/BCON to MongoDB

## Progress of C Backend
in second week C Backend
- MQTT
    - [x] test publish datajson.string. 
    - [x] test submit datajson.string. 
-------------------------------------
- MongoDB for database
    - [x] get string from MQTT_publish. 
    - [x] edit datajson.string to data.BSON/BCON.
    - [x] insert data in MongoDB.
-------------------------------------
- MongoDB for help kitchen
    - [x] edit datajson.string to data.BSON/BCON.
    - [X] lookfor data in MongoDB.
    - [X] update data in MongoDB.
    - [X] count data in MongoDB.
    - [X] count data in MongoDB.
-------------------------------------
## flow for second week.
```mermaid
graph TD
    A[c-backend_secondweek] --> B(MQTT)  
    B --> |get datajson.string| a[is order?] 
    a --> |yes| b[count by token]
    b --> |get number order| e[edit data add number order]
    e --> |send datajson.string| D[insert data in MongoDB]
    e --> |now data is json_obj| f[parse data]
    f --> |get token| j[inttoken] --> c[show list order to chef will see]
    f --> |get order| i[int order] --> c
    f --> |get list order| k[char list order] -->c
    c --> d[GTK Dynamic List view] 
    d --> |select list| m[get string parse string for what token & order]
    m --> |when chef finish order| E[Finish]
    m --> |when chef cancel order| F[Cancel]
    E -->|status : finish| K[update : dataBSON by token & order]
    F -->|status : cancel| K -->  I[update data in MongoDB]
```
-------------------------------------
# Ordishes Project - C Backend third_week
### main in work
- publish data.JSON from web customer
- sent data.BSON/BCON to MongoDB 

## Progress of C Backend
in third week C Backend
- MongoDB for database
    - [x] get string from MQTT_broken main web customer. 
    - [x] edit datajson.string to data.BSON/BCON.
    - [x] insert datatype in some MongoDB.
-------------------------------------
- MongoDB for help kitchen
    - [x] cancel delete data collection(orderfornode).
-------------------------------------
## flow for third week.
```mermaid
graph TD
    A[c-end] --> B(MQTT)  
    B --> |get datajson.string| C[datatype?] 
    C --> |datatpye:2| D[list order]
    D --> |insert data to| E[collection.kitchen]
    E --> |show list| F[GUI GTK_C to show Chef]
    C --> |datatpye:7| G[list order]
    G --> |insert data to| H[collection.node]
    H --> |use in| I[NodeJS]
    C --> |datatpye:1| J[collect token]
    J --> |insert data to| K[collection.token]
    C --> |datatpye:9| L[when customer paid]
    L --> M[clear add customer]
    M --> |delete data| E
    M --> |delete data| H
    M --> |delete data| K
    F --> N[when Chef cancel list order]
    N --> |update data| E
    N --> |delete data| H
```
