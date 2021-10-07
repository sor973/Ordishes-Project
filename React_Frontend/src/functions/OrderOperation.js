import uuid from 'react-uuid'
function getOrder(){
    let OrderObjectString = localStorage.getItem("order");
    if(!OrderObjectString) return {};
    try{
        let OrderObject = JSON.parse(OrderObjectString);
        return OrderObject;
    }catch{
        return {};
    }
}
function setPersistOrder(){
    localStorage.setItem("order", JSON.stringify(Order.order));
}
function addOrder(menuid,quantity){
    Order.order[uuid()]={menuid,quantity};
    setPersistOrder();
}
function delOrder(orderid){
    delete Order.order[orderid];
    setPersistOrder();
}
function clearOrder(){
    localStorage.removeItem("order");
}
export const Order = {
    order:getOrder(),
    addOrder,
    delOrder,
    clearOrder
}