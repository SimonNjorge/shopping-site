import { getDeliveryOption } from "../data/deliveryOptions.js";
import { getOrder, orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { cart } from "../data/cart-oop.js";
//console.log(today)

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const order = getOrder(orderId);

const productId = url.searchParams.get('productId');
const { orderPlacementDate } = order;

const orderItem = getOrderItem(productId);

const product = getProduct(productId);
const deliveryOption = getDeliveryOption(orderItem.deliveryOptionId);
const itemArrivalDate = orderItem.deliveryDate;
console.log(itemArrivalDate)

let oM;
let iM; 

function extract (){
    let exp = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;
    iM = exp.exec(itemArrivalDate);
    oM = exp.exec(orderPlacementDate);
}
extract()

function updateCartQuantity () {
    let quantity = cart.calculateCartQuantity();
    document.querySelector('.js-cart-quantity')
    .innerHTML = quantity;
}

updateCartQuantity();

function progressBarCalculator () {
    let currentTime = new Date().getTime();
    let deliveryTime = new Date(
        Number(iM[1]), Number(iM[2]) - 1, Number(iM[3]), Number(iM[4]), Number(iM[5]) )
        .getTime();
    let orderTime = new Date(
        Number(oM[1]), Number(oM[2]) - 1, Number(oM[3]), Number(oM[4]), Number(oM[5]))
        .getTime();
    return Math.floor(((currentTime - orderTime)
            /(deliveryTime - orderTime))*100);
}

function getOrderItem (productId) { 
    let matchingItem;
    order.orderItems.forEach( item => {
        if(productId === item.productId){
            matchingItem = item
        }
    });
    return matchingItem;
}

let trackingPageHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
    </a>
    <div class="delivery-date">
        Arriving on ${itemArrivalDate}
    </div>

    <div class="product-info">
       ${product.name}
    </div>

    <div class="product-info">
        Quantity: ${orderItem.quantity}
    </div>

    <img class="product-image" src=${product.image}>

    <div class="progress-labels-container">
        <div class="progress-label">
        Preparing
        </div>
        <div class="progress-label current-status">
        Shipped
        </div>
        <div class="progress-label">
        Delivered
        </div>
    </div>

    <div class="progress-bar-container">
        <div class="progress-bar"></div>
    </div>
`
document.querySelector('.js-order-tracking')
 .innerHTML = trackingPageHTML;

document.querySelector('.progress-bar')
 .style.width = `${progressBarCalculator()}%`