import { getDeliveryOption } from "../data/deliveryOptions.js";
import { getOrder, orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { getProductArrivalDate } from "./ordersPage.js";
import { today } from "../data/dates.js";
console.log(today)

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const order = getOrder(orderId);
const productId = url.searchParams.get('productId');
const { orderPlacementDate } = order;
const orderItem = getOrderItem();
const product = getProduct(productId);
const deliveryOption = getDeliveryOption(orderItem.deliveryOptionId);

console.log(orderPlacementDate)
function getOrderItem () { 
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
        Arriving on ${
            getProductArrivalDate(deliveryOption.deliveryDays)}
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