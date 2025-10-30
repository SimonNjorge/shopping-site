import { orders } from "../data/orders.js";
import { today } from "../data/dates.js";
import { formatCurrency } from "./utils/money.js";
import { products, getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import { cart } from "../data/cart-oop.js";

//import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
//console.log(today.format('ddd MMM DD hh : mm A'))
export function getProductArrivalDate(order, orderItem, deliveryDays){
    let date = today.add(deliveryDays, 'days');
    let arrivalDate = date.format('dddd, MMMM D'); 
    localStorage.setItem(`arrivalDate-${order.id}-${orderItem.productId}`,
        JSON.stringify(arrivalDate));
    return arrivalDate;
}

function updateCartQuantity () {
    let quantity = cart.calculateCartQuantity();
    document.querySelector('.js-cart-quantity')
    .innerHTML = quantity;
}

updateCartQuantity();

function renderOrderProductsDetailsHTML (order) {
    let orderProductsDetailsHTML = '';
    order.orderItems.forEach(orderItem => {

        let matchingItem = getProduct(orderItem.productId);
        let deliveryOption = getDeliveryOption(orderItem.deliveryOptionId);
        //getProductArrivalDate(orderItem, deliveryOption.deliveryDays);
        let arrivalDateString = JSON.parse(
            localStorage.getItem(`arrivalDate-${order.id}-${orderItem.productId}`)) || 
               getProductArrivalDate(order, orderItem, deliveryOption.deliveryDays);
            
        orderProductsDetailsHTML += `
            <div class="product-image-container">
                <img src=${matchingItem.image}>
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingItem.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${arrivalDateString}
                </div>
                <div class="product-quantity">
                    Quantity: ${orderItem.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-btn"
                  data-product-id=${orderItem.productId} data-order-id=${order.id} >
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                    <div class="buy-again-success-msg js-success-msg-${order.id}-${orderItem.productId}">
                        <img src="../images/icons/checkmark.png">
                        <p>successful, added to cart</p>
                    </div>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${matchingItem.id}">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
                </a>
            </div>
        `
    });
    
    return orderProductsDetailsHTML;
}
//console.log(orders);

function orderPlacementDate (order) {
    let date = today.format('MMMM D hh[:]mm A'); 
    localStorage.setItem(
        `orderPlcmntDate-${order.id}`, JSON.stringify(date))
    return date;
}

function renderOrdersPage(){
    let ordersHTML = '';

    orders.forEach((order) => {
        let orderPlacementDateString = JSON.parse(localStorage.getItem(
            `orderPlcmntDate-${order.id}`)) || orderPlacementDate(order);

        ordersHTML += `
        <div class="order-container"> 
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderPlacementDateString}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>

            <div class="order-details-grid">
                ${renderOrderProductsDetailsHTML(order)}
            </div>
        </div>
    `
    });
    
    document.querySelector('.js-orders-grid')
     .innerHTML = ordersHTML;
    
    let buyAgainTimeoutId;
    document.querySelectorAll('.js-buy-again-btn')
     .forEach( button => {
        button.addEventListener('click', (event) => {
            let { productId, orderId } = button.dataset;
            cart.addToCart(productId);
            updateCartQuantity();
            let successMsg = document.querySelector(`.js-success-msg-${orderId}-${productId}`);
            successMsg.classList.add('buy-again-success-msg-active');
            clearTimeout(buyAgainTimeoutId);
            buyAgainTimeoutId = setTimeout(() => {
                successMsg.classList.remove('buy-again-success-msg-active');
            }, 2000)
        })
    })
}
//renderOrdersPage();
window.onload = () => {
    renderOrdersPage()
}