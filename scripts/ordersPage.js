import { orders } from "../data/orders.js";
import { today } from "../data/dates.js";
import { formatCurrency } from "./utils/money.js";
import { products, getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
//import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

function orderPlacementDate() {
    return today.format('MMMM D')
}

export function getProductArrivalDate(deliveryDays){
    let arrivalDate = today.add(deliveryDays, 'days');
    return arrivalDate.format('dddd, MMMM D')
}

function renderOrderProductsDetailsHTML (order) {
    let orderProductsDetailsHTML = '';
    order.orderItems.forEach(orderItem => {
        let matchingItem = getProduct(orderItem.productId);
        let deliveryOption = getDeliveryOption(orderItem.deliveryOptionId);
        orderProductsDetailsHTML += `
            <div class="product-image-container">
                <img src=${matchingItem.image}>
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingItem.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${getProductArrivalDate(deliveryOption.deliveryDays)}
                </div>
                <div class="product-quantity">
                    Quantity: ${orderItem.quantity}
                </div>
                <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
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
    })
    return orderProductsDetailsHTML;
}
console.log(orders)
function renderOrdersPage(){
    let ordersHTML = '';
    orders.forEach((order) => {
        ordersHTML += `
        <div class="order-container"> 
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderPlacementDate()}</div>
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
}
//renderOrdersPage();
window.onload = () => {
    renderOrdersPage()
}