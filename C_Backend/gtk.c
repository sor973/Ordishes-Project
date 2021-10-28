// Compile
// $ gcc -o gtk gtk.c -lpaho-mqtt3c -I/usr/include/json-c -ljson-c $(pkg-config --cflags --libs libmongoc-1.0 --cflags gtk+-3.0 --libs gtk+-3.0 )
// $ gcc -o gtk gtk.c $(pkg-config --cflags gtk+-3.0 --libs gtk+-3.0 )
// $ ./gtk

//////////////////////////////////////////////////////////////////////

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// GTK
#include <gtk/gtk.h>

// MONGO
#include <mongoc/mongoc.h>
#include <bson/bson.h>

//json
#include <json-c/json.h>

// paho_MQTT
#include "MQTTClient.h"

#define ADDRESS     "tcp://192.168.42.201:1883"
#define CLIENTID    "ClientSub_kitchen"
#define TOPIC       "/ordish/"
#define QOS         1
#define TIMEOUT     10000L

volatile MQTTClient_deliveryToken deliveredtoken;

//////////////////////////////////////////////////////////////////////

/* Create enum for display all columns */
enum{
  COL_T_QUEUE,
  COL_ORDER,
  COL_TABLE,
  COL_MENU,
  COL_AMOUT,
  COL_STATUS,
  COL_T_STATUS,
  COL_DETAIL,
  COL_COUNTS};

GtkWidget *tree;  //order
GtkWidget *tree1; //finish
GtkWidget *tree2; //cancel

//////////////////////////////////////////////////////////////////////
//GtkWidget *list;
void append_item(GtkWidget *widget, char *str) { 
  json_object *json_obj;
  json_object *tmp;

  GtkTreeIter iter1, iter2;
  GtkTreeStore *store = GTK_TREE_STORE(gtk_tree_view_get_model(GTK_TREE_VIEW(tree)));

  json_obj = json_tokener_parse(str);
  //** t_q
  json_object_object_get_ex(json_obj,"time",&tmp);
  const gchar *t_q = json_object_get_string(tmp);
  //g_print("time : %s\n", t_q);

  //** table
  json_object_object_get_ex(json_obj,"table",&tmp);
  int table = json_object_get_int64(tmp);
  const gchar *stable[20];   
  sprintf(stable, "%d", table);   // int => str
  //g_print("table : %s\n", stable);

  //** order
  json_object_object_get_ex(json_obj,"order",&tmp);
  int order = json_object_get_int64(tmp);
  const gchar *sorder[20];   
  sprintf(sorder, "%d", order);   // int => str
  //g_print("order : %s\n", sorder);

  gtk_tree_store_append(store, &iter1, NULL); 
  gtk_tree_store_set(store, &iter1, 
    COL_T_QUEUE,  t_q, 
    COL_ORDER,    sorder, 
    COL_TABLE,    stable, 
    -1 );

  // in array : list
  json_object *tmpa;
  json_object_object_get_ex(json_obj,"menu",&tmpa);
  // get_len_list
  const gint len = json_object_array_length(tmpa);
  //g_print("len : %d\n", len);

  for (int i = 0; i < len; ++i) {
    json_object *ary = json_object_array_get_idx(tmpa, i);
    json_object_object_get_ex(ary,"name",&tmp);
    const gchar *name = json_object_get_string(tmp);
    //g_print("name : %s\n", name);

    json_object_object_get_ex(ary,"num",&tmp);
    int num = json_object_get_int64(tmp);
    const gchar *snum[20];   
    sprintf(snum, "%d", num);   // int => str
    //g_print("amout : %s\n", snum);

    json_object_object_get_ex(ary,"status",&tmp);
    const gchar *sta = json_object_get_string(tmp);
    //g_print("status : %s\n", sta);

    json_object_object_get_ex(ary,"detail",&tmp);
    const gchar *deta = json_object_get_string(tmp);
    //g_print("detail : %s\n", deta);

    gtk_tree_store_append(store, &iter2, &iter1);
    gtk_tree_store_set(store, &iter2,  
      COL_MENU,     name,
      COL_AMOUT,    snum, 
      COL_STATUS,   sta, 
      COL_DETAIL,   deta, 
      -1 );
  }
  gtk_tree_view_expand_all(tree);
}

//* finish *//

void finish_item(GtkWidget *widget, gpointer selection) 
{
  GtkTreeModel  *model;
  GtkTreeIter   iter, parent;
  GtkTreePath   *sel_path;

  if (gtk_tree_selection_get_selected(selection, &model, &iter)){

    const gchar *t_queue, *menu, *status, *t_status, *detail;
    const gchar *order, *table, *amout;

    int n ;

    parent = iter;

    //parent
    if (gtk_tree_model_iter_parent(model, &parent, &iter)){
      gtk_tree_model_get(model, &parent, COL_T_QUEUE, 
                      &t_queue, -1);
      gtk_tree_model_get(model, &parent, COL_ORDER, 
                      &order, -1); 
      gtk_tree_model_get(model, &parent, COL_TABLE, 
                      &table, -1);
    }

    //child
    gtk_tree_model_get(model, &iter, COL_MENU, 
                      &menu, -1);
    gtk_tree_model_get(model, &iter, COL_AMOUT, 
                      &amout, -1);
    gtk_tree_model_get(model, &iter, COL_STATUS, 
                      &status, -1);
    gtk_tree_model_get(model, &iter, COL_T_STATUS, 
                      &t_status, -1);
    gtk_tree_model_get(model, &iter, COL_DETAIL, 
                      &detail, -1);

    //header
    if (menu == NULL){
      printf("it's header\n");
    }
    //list
    else if(menu != NULL){
      sel_path = gtk_tree_model_get_path(model, &iter);
      const gchar *path_str = gtk_tree_path_to_string(sel_path);
      const gchar *iter_str = gtk_tree_model_get_string_from_iter(model, &iter);

      g_print("///\nbutton finish\n");
      g_print("order: %s\ntable: %s\nmenu: %s\namout: %s\ndetail: %s\n", order, table, menu, amout, detail);

      //**update**//

      //mongo
      mongoc_collection_t *mcoll;
      mongoc_client_t *mclient;
      mongoc_init ();

      //bson
      bson_error_t error;
      bson_oid_t oid;
      bson_t *update;
      bson_t *query;

      //kitchen
      mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
      mcoll = mongoc_client_get_collection (mclient, "ordishes", "Order_for_Kitchen");

      int ntable = atoi(table);
      int norder = atoi(order);

      //time 
      time_t rawtime;
      struct tm* timeinfo;
      char tbuffer[80];

      time(&rawtime);
      timeinfo = localtime(&rawtime);
      strftime(tbuffer, 80,
              "%H:%M",
              timeinfo);

      // find key:value
      query = BCON_NEW( "time",
                        BCON_UTF8 (t_queue),
                        "table",
                        BCON_INT32 (ntable),
                        "order",
                        BCON_INT32 (norder),
                        "menu.name",
                        BCON_UTF8 (menu),
                        "menu.detail",
                        BCON_UTF8 (detail)
                      );
      // update key:value   
      update = BCON_NEW ("$set", 
                          "{",
                          "menu.$.status",
                          BCON_UTF8 ("finished"),
                          "menu.$.time_status",
                          BCON_UTF8 (tbuffer),
                          "}" );

      if (!mongoc_collection_update_one(
            mcoll, query, update, NULL, NULL, &error)) {
          fprintf (stderr, "%s\n", error.message);
          goto fail;
      } else {
          printf("**update finish success**\n");
      }

      fail:
      if (query)
          bson_destroy (query);
      if (update)
          bson_destroy (update);
          
      mongoc_collection_destroy (mcoll);
      mongoc_client_destroy (mclient);
      mongoc_cleanup ();

      //remove child//
      gtk_tree_store_remove(GTK_TREE_STORE(model), &iter);   

      n = gtk_tree_model_iter_n_children(model, &parent);
      //remove parent when haven't child
      if(n == 0)
        gtk_tree_store_remove(GTK_TREE_STORE(model), &parent);

      //add finish view//
      GtkTreeIter iterf;
      GtkTreeStore *store1 = GTK_TREE_STORE(gtk_tree_view_get_model(GTK_TREE_VIEW(tree1)));

      gtk_tree_store_append(store1, &iterf, NULL); 
      gtk_tree_store_set(store1, &iterf, 
      COL_T_QUEUE,  t_queue, 
      COL_ORDER,    order, 
      COL_TABLE,    table, 
      COL_MENU,     menu,
      COL_AMOUT,    amout, 
      COL_STATUS,   "finished", 
      COL_T_STATUS, tbuffer,
      COL_DETAIL,   detail, 
      -1 );
    }

  }  
}
  
//* cancel *//

void cancel_item(GtkWidget *widget, gpointer selection) 
{
  GtkTreeModel  *model;
  GtkTreeIter   iter, parent;
  GtkTreePath   *sel_path;

  if (gtk_tree_selection_get_selected(selection, &model, &iter)){

    const gchar *t_queue, *menu, *status, *t_status, *detail;
    const gchar *order, *table, *amout;

    int n ;

    parent = iter;

    //parent
    if (gtk_tree_model_iter_parent(model, &parent, &iter)){
      gtk_tree_model_get(model, &parent, COL_T_QUEUE, 
                      &t_queue, -1);
      gtk_tree_model_get(model, &parent, COL_ORDER, 
                      &order, -1); 
      gtk_tree_model_get(model, &parent, COL_TABLE, 
                      &table, -1);
      n = gtk_tree_model_iter_n_children(model, &parent);
    }

    //child
    gtk_tree_model_get(model, &iter, COL_MENU, 
                      &menu, -1);
    gtk_tree_model_get(model, &iter, COL_AMOUT, 
                      &amout, -1);
    gtk_tree_model_get(model, &iter, COL_STATUS, 
                      &status, -1);
    gtk_tree_model_get(model, &iter, COL_T_STATUS, 
                      &t_status, -1);
    gtk_tree_model_get(model, &iter, COL_DETAIL, 
                      &detail, -1);
    
    //header
    if (menu == NULL){
      printf("it's header\n");
    }
    //list
    else if(menu != NULL){
      sel_path = gtk_tree_model_get_path(model, &iter);
      const gchar *path_str = gtk_tree_path_to_string(sel_path);
      const gchar *iter_str = gtk_tree_model_get_string_from_iter(model, &iter);

      g_print("///\nbutton cancel\n");
      g_print("order: %s\ntable: %s\nmenu: %s\namout: %s\n", order, table, menu, amout);

       //**update**//

      //mongo
      mongoc_collection_t *mcoll;
      mongoc_client_t *mclient;
      mongoc_init ();

      //bson
      bson_error_t error;
      bson_oid_t oid;
      bson_t *update;
      bson_t *query;

      //kitchen
      mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
      mcoll = mongoc_client_get_collection (mclient, "ordishes", "Order_for_Kitchen");

      int ntable = atoi(table);
      int norder = atoi(order);

      //time 
      time_t rawtime;
      struct tm* timeinfo;
      char tbuffer[80];

      time(&rawtime);
      timeinfo = localtime(&rawtime);
      strftime(tbuffer, 80,
              "%H:%M",
              timeinfo);

      // find key:value
      query = BCON_NEW( "time",
                        BCON_UTF8 (t_queue),
                        "table",
                        BCON_INT32 (ntable),
                        "order",
                        BCON_INT32 (norder),
                        "menu.name",
                        BCON_UTF8 (menu),
                        "menu.detail",
                        BCON_UTF8 (detail)
                      );
      // update key:value   
      update = BCON_NEW ("$set", 
                          "{",
                          "menu.$.num",
                          BCON_INT32 (0),
                          "menu.$.status",
                          BCON_UTF8 ("canceled"),
                          "menu.$.time_status",
                          BCON_UTF8 (tbuffer),
                          "}" );

      if (!mongoc_collection_update_one(
            mcoll, query, update, NULL, NULL, &error)) {
          fprintf (stderr, "%s\n", error.message);
          goto fail;
      } else {
          printf("**update cancel success**\n");
      }

      fail:
      if (query)
          bson_destroy (query);
      if (update)
          bson_destroy (update);
          
      mongoc_collection_destroy (mcoll);
      mongoc_client_destroy (mclient);
      mongoc_cleanup ();

      //remove child
      gtk_tree_store_remove(GTK_TREE_STORE(model), &iter);   

      n = gtk_tree_model_iter_n_children(model, &parent);
      //g_print("parent removed n: %d\n", n);
      //remove parent when haven't child
      if(n == 0)
        gtk_tree_store_remove(GTK_TREE_STORE(model), &parent);

      //add finish view//
      GtkTreeIter iterc;
      GtkTreeStore *store2 = GTK_TREE_STORE(gtk_tree_view_get_model(GTK_TREE_VIEW(tree2)));

      gtk_tree_store_append(store2, &iterc, NULL); 
      gtk_tree_store_set(store2, &iterc, 
      COL_T_QUEUE,  t_queue, 
      COL_ORDER,    order, 
      COL_TABLE,    table, 
      COL_MENU,     menu,
      COL_AMOUT,    amout, 
      COL_STATUS,   "canceled", 
      COL_T_STATUS, tbuffer,
      COL_DETAIL,   detail, 
      -1 );
    }
  }
}

void view_selected(GtkTreeSelection *sel, gpointer data){
  GtkTreeIter iter, parent;
  GtkTreePath *sel_path;
  GtkTreeModel *model;
  if (gtk_tree_selection_get_selected(sel, &model, &iter)){

    const gchar *t_queue, *menu, *status, *t_status, *detail;
    const gchar *queue, *table, *amout;

    int n;
    parent = iter;

    //parent
    if (gtk_tree_model_iter_parent(model, &parent, &iter)){
      gtk_tree_model_get(model, &parent, COL_T_QUEUE, 
                      &t_queue, -1);
      gtk_tree_model_get(model, &parent, COL_ORDER, 
                      &queue, -1); 
      gtk_tree_model_get(model, &parent, COL_TABLE, 
                      &table, -1);
    }

    //child
    gtk_tree_model_get(model, &iter, COL_MENU, 
                      &menu, -1);
    gtk_tree_model_get(model, &iter, COL_AMOUT, 
                      &amout, -1);
    gtk_tree_model_get(model, &iter, COL_STATUS, 
                      &status, -1);
    gtk_tree_model_get(model, &iter, COL_T_STATUS, 
                      &t_status, -1);
    gtk_tree_model_get(model, &iter, COL_DETAIL, 
                      &detail, -1);

    if(menu != NULL){
      sel_path = gtk_tree_model_get_path(model, &iter);
      const gchar *path_str = gtk_tree_path_to_string(sel_path);
      const gchar *iter_str = gtk_tree_model_get_string_from_iter(model, &iter);

      g_print("///\nselection\n");
      g_print("parent n: %d\n", n);
      g_print("Path: %s\n", path_str);
      g_print("queue: %s\ntable: %s\nmenu: %s\n", queue, table, menu);
    }
  }
}

void view_dbclicked(GtkTreeView *treeview, GtkTreePath *path, GtkTreeViewColumn *column, gpointer data){
  //GtkTreeModel *model = gtk_tree_view_get_model(GTK_TREE_VIEW(widget));
  GtkTreeModel *model = gtk_tree_view_get_model(treeview);
  GtkTreeIter iter;
  //GtkTreePath *path = gtk_tree_model_get_path(model, &iter);
  
 
  if (gtk_tree_model_get_iter(model, &iter, path)){
    if (gtk_tree_view_row_expanded(treeview, path)){
      gtk_tree_view_collapse_row(treeview, path);
    }else{
      gtk_tree_view_expand_row(treeview, path, TRUE);
    }
    //g_print("Double Clicked\n");
  }
}

void gtk_tree_view_expand_all (GtkTreeView* tree_view);

static gboolean 
delete_event(GtkWidget *widget, gpointer parent){
  GtkWidget *dialog = gtk_dialog_new_with_buttons("Exit program", 
    GTK_WINDOW(parent), GTK_DIALOG_MODAL, 
    "YES", 1, "NO", 0, NULL);
  GtkWidget *label = gtk_label_new(
    "Are you sure you want to exit?");

  gtk_container_set_border_width(GTK_CONTAINER(dialog), 10);
  gtk_container_add(
    GTK_CONTAINER(gtk_dialog_get_content_area(GTK_DIALOG(dialog))),  
    label);
  gtk_widget_show(label);
  int result = gtk_dialog_run(GTK_DIALOG(dialog));
  gtk_widget_destroy(dialog);
  if (result == 1){
    gtk_main_quit();
    return FALSE;
  }
  else{
    g_print("***\ncancel eixt program\n***\n");
    return TRUE;
  }
}

//////////////////////////////////////////////////////////////////////
// function_Mongo
void insertdata(char *str, int mc) {
    //mongo
    mongoc_client_t *mclient;
    mongoc_collection_t *mcoll;

    mongoc_init ();

  if (mc == 2){
    //kitchen
   mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
   mcoll = mongoc_client_get_collection (mclient, "ordishes", "Order_for_Kitchen");
  }
  else if (mc == 8){
    //orderfornode
   mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
   mcoll = mongoc_client_get_collection (mclient, "ordishes", "Order_Customer");  
  }
  else if (mc == 1){
    //token
   mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
   mcoll = mongoc_client_get_collection (mclient, "ordishes", "token");  
  }
    //bson
    bson_t *b;
    bson_error_t error;

    /* start function */
    b = bson_new_from_json (str, -1, &error);
    if (!b) {
        printf ("Error: %s\n", error.message);
    } 

    if (!mongoc_collection_insert_one (
           mcoll, b, NULL, NULL, &error)) {
        fprintf (stderr, "%s\n", error.message);
        printf ("can't insert\n");
    } else {
        printf("insert success\n");
    }

    //clear
    bson_destroy (b);
    mongoc_collection_destroy (mcoll);
    mongoc_client_destroy (mclient);
    mongoc_cleanup ();
}

int checkc(char *token, int mc) 
{
    //mongo
    mongoc_client_t *mclient;
    mongoc_collection_t *mcoll;
 
    mongoc_init ();

  if (mc == 2){
    //kitchen
   mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
   mcoll = mongoc_client_get_collection (mclient, "ordishes", "Order_for_Kitchen");
  }
  else if (mc == 8){
    //orderfornode
   mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
   mcoll = mongoc_client_get_collection (mclient, "ordishes", "Order_Customer");  
  }
  else if (mc == 1){
    //token
   mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
   mcoll = mongoc_client_get_collection (mclient, "ordishes", "token");  
  }

    //bson
    bson_error_t error;
    bson_t *b;
    int64_t count;

    /* start function */

    b = BCON_NEW("token",
                  BCON_UTF8 (token)
                  );

   count = mongoc_collection_count (mcoll, MONGOC_QUERY_NONE, b, 0, 0, NULL, &error);

    //clear
    bson_destroy (b);
    mongoc_collection_destroy (mcoll);
    mongoc_client_destroy (mclient);
    mongoc_cleanup ();

    return count;
}

void deldata(char *token, int mc) 
{
    //mongo
    mongoc_client_t *mclient;
    mongoc_collection_t *mcoll;
 
    mongoc_init ();

  if (mc == 2){
    //kitchen
   mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
   mcoll = mongoc_client_get_collection (mclient, "ordishes", "Order_for_Kitchen");
  }
  else if (mc == 8){
    //orderfornode
   mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
   mcoll = mongoc_client_get_collection (mclient, "ordishes", "Order_Customer");  
  }
  else if (mc == 1){
    //token
   mclient = mongoc_client_new ("mongodb://cpre_softdev:xh8Av6Qqe6goj66Ms7gr9nxiv4N6J4ZZ@192.168.42.201:27017/?authSource=cpreauth&ssl=false");
   mcoll = mongoc_client_get_collection (mclient, "ordishes", "token");  
  }

    //bson
    bson_t *b;
    bson_error_t error;

    /* start function */
    char *str[50];
    snprintf(str, sizeof(str), 
            "{\"token\":\"%s\"}",token);

    b = bson_new_from_json (str, -1, &error);
    if (!b) {
        printf ("Error: %s\n", error.message);
    } 

   if (!mongoc_collection_delete_one (mcoll, b, NULL, NULL, &error)) {
      fprintf (stderr, "Delete failed: %s\n", error.message);
   }

    //clear
    bson_destroy (b);
    mongoc_collection_destroy (mcoll);
    mongoc_client_destroy (mclient);
    mongoc_cleanup ();
}

//////////////////////////////////////////////////////////////////////
// MQTT
void delivered(void *context, MQTTClient_deliveryToken dt)
{
    printf("Message with token value %d delivery confirmed\n", dt);
    deliveredtoken = dt;
}

//***//

int msgarrvd(void *context, char *topicName, int topicLen, MQTTClient_message *message, GtkWidget *window, GtkWidget *sw)
{
    char* payloadptr;
    char* var;

    g_print("New message\n");
    g_print("     topic: %s\n", topicName);
    g_print("   message: \n");

    payloadptr = message->payload;
    g_print("%s\n///\n", payloadptr);

    json_object *json_obj;
    json_object *tmp;
    
    enum json_tokener_error error;

    // add collection token //
    if (strstr(payloadptr, "\"datatype\":1")){
      // insert_database
      insertdata(payloadptr,1);
    }

    // when order //
    else if (strstr(payloadptr, "\"datatype\":2")){
      // tranf str => json
      json_obj = json_tokener_parse(payloadptr);
      //** token
      json_object_object_get_ex(json_obj,"token",&tmp);
      const char *token = json_object_get_string(tmp);
      //g_print("token : %s\n",token);

      // check data table/order
      int c = checkc(token,2) + 1;  // order : c

      // append "order":c in json_obj
      json_object_object_add( json_obj, "order", json_object_new_int64(c));
      //** order
      json_object *tmp;
      json_object_object_get_ex(json_obj,"order",&tmp);
      int order = json_object_get_int64(tmp);
      //g_print("order : %d\n",order);

      // json_obj => json_str
      const char*read = json_object_to_json_string(json_obj);
      // append_list
      append_item(window, read);
      // insert_database
      insertdata(read,2); 
    }

    // when order //
    else if (strstr(payloadptr, "\"datatype\":8")){
      // insert_database
      insertdata(payloadptr,8);
    }

    // when paid clear data by token //
    else if (strstr(payloadptr, "\"datatype\":9,")){
      // tranf str => json
      json_obj = json_tokener_parse(payloadptr);
      //** token
      json_object_object_get_ex(json_obj,"token",&tmp);
      const char *token = json_object_get_string(tmp);
      printf("token : %s\n",token);
      //kitchen
      int c = checkc(token,2);  // count
      for (int i = 0; i < c; ++i) {
        deldata(token,2);
      }
      //customer
      c = checkc(token,8);  // count
      for (int i = 0; i < c; ++i) {
        deldata(token,8);
      }
      //token
      deldata(token,1); 

      g_print("token:%s is paid\n",token);
    }

    MQTTClient_freeMessage(&message);
    MQTTClient_free(topicName);
    return 1;
}

//***//

void connlost(void *context, char *cause)
{
    printf("\nConnection lost\n");
    printf("     cause: %s\n", cause);
}

//////////////////////////////////////////////////////////////////////
// CSS_GTK
void myCSS(void){
    GtkCssProvider *provider;
    GdkDisplay *display;
    GdkScreen *screen;

    provider = gtk_css_provider_new ();
    display = gdk_display_get_default ();
    screen = gdk_display_get_default_screen (display);
    gtk_style_context_add_provider_for_screen (screen, GTK_STYLE_PROVIDER (provider), GTK_STYLE_PROVIDER_PRIORITY_APPLICATION);

    const gchar *myCssFile = "mystyle1.css";
    GError *error = 0;

    gtk_css_provider_load_from_file(provider, g_file_new_for_path(myCssFile), &error);
    g_object_unref (provider);
}

//////////////////////////////////////////////////////////////////////

int main(int argc, char *argv[]){
  // paho_MQTT_sub
  MQTTClient client;
  MQTTClient_connectOptions conn_opts = MQTTClient_connectOptions_initializer;

  int rc;
  int ch;

  MQTTClient_create(&client, ADDRESS, CLIENTID,
      MQTTCLIENT_PERSISTENCE_NONE, NULL);
  conn_opts.keepAliveInterval = 20;
  conn_opts.cleansession = 1;

  MQTTClient_setCallbacks(client, NULL, connlost, msgarrvd, delivered);

  if ((rc = MQTTClient_connect(client, &conn_opts)) != MQTTCLIENT_SUCCESS)
  {
      printf("Failed to connect, return code %d\n", rc);
      exit(EXIT_FAILURE);
  }

  printf("Subscribing to topic %s\nfor client %s \n\n", TOPIC, CLIENTID);
  MQTTClient_subscribe(client, TOPIC, QOS);

  //////////////////////////////


  // GTK
  GtkWidget *window;
  GtkWidget *sw, *sw1, *sw2;  // tree: order, finish, cancel

  GtkWidget *finish;
  GtkWidget *cancel;
  GtkWidget *exit;

  GtkTreeSelection *selection; 

  gtk_init(&argc, &argv);

  /* Create win */
  myCSS();  // use CSS
  window = gtk_window_new(GTK_WINDOW_TOPLEVEL);

  gtk_window_set_title(GTK_WINDOW(window), "IN THE KITCHEN");
  gtk_widget_set_size_request (GTK_WIDGET(window), 1366-40, 768-133);  //Run บน Linux จึงต้อง -40 เพื่อให้พอดีหน้าจอ

  /* Create store order*/
  GtkTreeStore *store = gtk_tree_store_new(
    COL_COUNTS,
    G_TYPE_STRING,      //t_queue
    G_TYPE_STRING,      //order
    G_TYPE_STRING,      //table
    G_TYPE_STRING,      //menu
    G_TYPE_STRING,      //amout
    G_TYPE_STRING,      //status
    G_TYPE_STRING,      //t_status
    G_TYPE_STRING       //detail
    );     
    /* Create store finish*/
  GtkTreeStore *store1 = gtk_tree_store_new(
    COL_COUNTS,
    G_TYPE_STRING,      //t_queue
    G_TYPE_STRING,      //order
    G_TYPE_STRING,      //table
    G_TYPE_STRING,      //menu
    G_TYPE_STRING,      //amout
    G_TYPE_STRING,      //status
    G_TYPE_STRING,      //t_status
    G_TYPE_STRING       //detail
    );   
    /* Create store cancel*/
  GtkTreeStore *store2 = gtk_tree_store_new(
    COL_COUNTS,
    G_TYPE_STRING,      //t_queue
    G_TYPE_STRING,      //order
    G_TYPE_STRING,      //table
    G_TYPE_STRING,      //menu
    G_TYPE_STRING,      //amout
    G_TYPE_STRING,      //status
    G_TYPE_STRING,      //t_status
    G_TYPE_STRING       //detail
    );   

  /* Creaete tree to contain store and keep tree widget to win */
  tree  = gtk_tree_view_new_with_model(GTK_TREE_MODEL(store));
  tree1 = gtk_tree_view_new_with_model(GTK_TREE_MODEL(store1));
  tree2 = gtk_tree_view_new_with_model(GTK_TREE_MODEL(store2));
  
  sw = gtk_scrolled_window_new(NULL, NULL);
  gtk_container_add(GTK_CONTAINER(sw), tree);
  sw1 = gtk_scrolled_window_new(NULL, NULL);
  gtk_container_add(GTK_CONTAINER(sw1), tree1);
  sw2 = gtk_scrolled_window_new(NULL, NULL);
  gtk_container_add(GTK_CONTAINER(sw2), tree2);

  gtk_tree_view_expand_all(tree1);
  gtk_tree_view_expand_all(tree2);
  
  /* Renderer data to view */
  GtkCellRenderer *renderer;
  GtkTreeViewColumn *column, *status;

  //tree  : order
  renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Time Queue", 
    renderer, 
    "text", COL_T_QUEUE, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree), column);
  gtk_tree_view_column_set_fixed_width (column, 200);

  renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Order", 
    renderer, 
    "text", COL_ORDER, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree), column);
  gtk_tree_view_column_set_fixed_width (column, 100);

  renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Table", 
    renderer, 
    "text", COL_TABLE, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree), column);
  gtk_tree_view_column_set_fixed_width (column, 100);

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Menu", 
    renderer, 
    "text", COL_MENU, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree), column);
  gtk_tree_view_column_set_fixed_width (column, 200);

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Amout", 
    renderer, 
    "text", COL_AMOUT, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree), column);
  gtk_tree_view_column_set_fixed_width (column, 100);

    renderer = gtk_cell_renderer_text_new();
  status = gtk_tree_view_column_new_with_attributes(
    "Status", 
    renderer, 
    "text", COL_STATUS, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree), status);
  gtk_tree_view_column_set_fixed_width (status, 100);

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Time Status", 
    renderer, 
    "text", COL_T_STATUS, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree), column);
  gtk_tree_view_column_set_fixed_width (column, 200);    

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Detail", 
    renderer, 
    "text", COL_DETAIL, NULL);
    gtk_tree_view_append_column(GTK_TREE_VIEW(tree), column);
    gtk_tree_view_column_set_fixed_width (column, 200);

    //tree1 : finish
  renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Time Queue", 
    renderer, 
    "text", COL_T_QUEUE, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree1), column);
  gtk_tree_view_column_set_fixed_width (column, 200);

  renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Order", 
    renderer, 
    "text", COL_ORDER, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree1), column);
  gtk_tree_view_column_set_fixed_width (column, 100);

  renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Table", 
    renderer, 
    "text", COL_TABLE, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree1), column);
  gtk_tree_view_column_set_fixed_width (column, 100);

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Menu", 
    renderer, 
    "text", COL_MENU, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree1), column);
  gtk_tree_view_column_set_fixed_width (column, 200);

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Amout", 
    renderer, 
    "text", COL_AMOUT, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree1), column);
  gtk_tree_view_column_set_fixed_width (column, 100);

    renderer = gtk_cell_renderer_text_new();
  status = gtk_tree_view_column_new_with_attributes(
    "Status", 
    renderer, 
    "text", COL_STATUS, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree1), status);
  gtk_tree_view_column_set_fixed_width (status, 100);

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Time Status", 
    renderer, 
    "text", COL_T_STATUS, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree1), column);
  gtk_tree_view_column_set_fixed_width (column, 200);    

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Detail", 
    renderer, 
    "text", COL_DETAIL, NULL);
    gtk_tree_view_append_column(GTK_TREE_VIEW(tree1), column);
    gtk_tree_view_column_set_fixed_width (column, 200);

    //tree2 : cancel
  renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Time Queue", 
    renderer, 
    "text", COL_T_QUEUE, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree2), column);
  gtk_tree_view_column_set_fixed_width (column, 200);

  renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Order", 
    renderer, 
    "text", COL_ORDER, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree2), column);
  gtk_tree_view_column_set_fixed_width (column, 100);

  renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Table", 
    renderer, 
    "text", COL_TABLE, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree2), column);
  gtk_tree_view_column_set_fixed_width (column, 100);

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Menu", 
    renderer, 
    "text", COL_MENU, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree2), column);
  gtk_tree_view_column_set_fixed_width (column, 200);

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Amout", 
    renderer, 
    "text", COL_AMOUT, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree2), column);
  gtk_tree_view_column_set_fixed_width (column, 100);

    renderer = gtk_cell_renderer_text_new();
  status = gtk_tree_view_column_new_with_attributes(
    "Status", 
    renderer, 
    "text", COL_STATUS, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree2), status);
  gtk_tree_view_column_set_fixed_width (status, 100);

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Time Status", 
    renderer, 
    "text", COL_T_STATUS, NULL);
  gtk_tree_view_append_column(GTK_TREE_VIEW(tree2), column);
  gtk_tree_view_column_set_fixed_width (column, 200);    

    renderer = gtk_cell_renderer_text_new();
  column = gtk_tree_view_column_new_with_attributes(
    "Detail", 
    renderer, 
    "text", COL_DETAIL, NULL);
    gtk_tree_view_append_column(GTK_TREE_VIEW(tree2), column);
    gtk_tree_view_column_set_fixed_width (column, 200);

  ///
    
    //set_selection
  selection = gtk_tree_view_get_selection(GTK_TREE_VIEW(tree));
  gtk_tree_selection_set_mode(GTK_TREE_SELECTION(selection), GTK_SELECTION_SINGLE);

  g_signal_connect(G_OBJECT(tree), "row-activated", 
                   G_CALLBACK(view_dbclicked), NULL);
  g_signal_connect(G_OBJECT(selection), "changed", 
                   G_CALLBACK(view_selected), NULL);

    GtkWidget *vbox, *vbox0, *vbox1, *vboxR, *vboxRR;
    GtkWidget *hbox, *hbox1, *hbox0;

    vbox    = gtk_vbox_new(FALSE, 0);
    hbox    = gtk_hbox_new(FALSE, 0);

    vbox0   = gtk_vbox_new(FALSE, 0);
    vbox1   = gtk_vbox_new(FALSE, 0);
    hbox0   = gtk_hbox_new(FALSE, 0);
    hbox1   = gtk_hbox_new(FALSE, 0);

    vboxR   = gtk_vbox_new(FALSE, 0);
    vboxRR  = gtk_vbox_new(FALSE, 0);

    GtkWidget *notebook, *tab1, *tab2, *tab3 ;
    notebook = gtk_notebook_new ();
    gtk_notebook_set_tab_pos (GTK_NOTEBOOK (notebook), GTK_POS_TOP);
    gtk_box_pack_start(GTK_BOX(hbox), notebook, TRUE, TRUE, 0);
    gtk_widget_set_size_request(notebook, 1366-146, 0);

    tab1 = gtk_label_new("Order");
    gtk_widget_show (tab1);
    gtk_notebook_append_page (GTK_NOTEBOOK (notebook), vbox, tab1); // tab1 show vbox

    tab2 = gtk_label_new("Finished");
    gtk_widget_show (tab2);
    gtk_notebook_append_page (GTK_NOTEBOOK (notebook), vbox0, tab2);// tab2 show vbox0

    tab3 = gtk_label_new("Cancel");
    gtk_widget_show (tab3);
    gtk_notebook_append_page (GTK_NOTEBOOK (notebook), vbox1, tab3);// tab3 show vbox1

    gtk_box_pack_start(GTK_BOX(vbox),   sw,   TRUE, TRUE, 0); 
    gtk_box_pack_start(GTK_BOX(vbox0),  sw1,  TRUE, TRUE, 0);
    gtk_box_pack_start(GTK_BOX(vbox1),  sw2,  TRUE, TRUE, 0);

    /* text buttom */
    finish  = gtk_button_new_with_label("Finish");
    gtk_widget_set_name(finish, "Finish_button");

    cancel  = gtk_button_new_with_label("Cancel");
    gtk_widget_set_name(cancel, "Cancel_button");

    exit    = gtk_button_new_with_label("Exit");
    gtk_widget_set_name(exit, "Exit_button");
    
    gtk_widget_set_size_request(finish, 100, 100);
    gtk_widget_set_size_request(cancel, 100, 100);
    gtk_widget_set_size_request(exit,   100, 100);

    gtk_container_add(GTK_CONTAINER(window),  hbox);
    gtk_container_add(GTK_CONTAINER(hbox),    hbox0);

    gtk_box_pack_start(GTK_BOX(vboxR), finish,  FALSE, FALSE, 0);
    gtk_box_pack_start(GTK_BOX(vboxR), cancel,  FALSE, FALSE, 10);
    gtk_box_pack_start(GTK_BOX(vboxR),   exit,  FALSE, TRUE,  0);

    GtkWidget *halign;
    halign = gtk_alignment_new(0, 0, 0, 0);
    gtk_container_add(GTK_CONTAINER(halign),  vboxR);
    gtk_box_pack_start(GTK_BOX(hbox0), halign, FALSE, FALSE, 0);
/*     
    GtkWidget *lalign;
    lalign = gtk_alignment_new(1, 1, 0, 0);
    gtk_container_add(GTK_CONTAINER(lalign),  vboxRR);
    gtk_box_pack_start(GTK_BOX(hbox0), lalign, FALSE, FALSE, 0); 
 */
  /* buttom to function_buttom */
    //finish
  g_signal_connect(G_OBJECT(finish),  "clicked",
                   G_CALLBACK(finish_item), selection);
    //cancel
  g_signal_connect(G_OBJECT(cancel),  "clicked",
                   G_CALLBACK(cancel_item), selection);
    //exit
  g_signal_connect(G_OBJECT(exit),    "clicked",
                   G_CALLBACK(delete_event), NULL);
  g_signal_connect(G_OBJECT(window),  "destroy",
                   G_CALLBACK(delete_event), NULL);

  /* Show all widget */
  gtk_widget_show_all(window);
  gtk_main();

  return 0;
}