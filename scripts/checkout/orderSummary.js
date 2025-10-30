
import { cart } from "../../data/cart-oop.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { deliveryDateCalculator } from "../../data/dates.js";

function updateValidationDialogue (productId) {
    let dialogueCont = document.querySelector(`.js-update-validation-${productId}`);
    dialogueCont.classList.add('update-validation-on');
    setTimeout(() => {
        dialogueCont.classList.remove('update-validation-on');
    }, 2000);
}

function updateCheckoutItems(){
    let quantity = cart.calculateCartQuantity();
    let checkoutContainer = document.querySelector('.js-checkout-items');
    if(quantity == 0){
    checkoutContainer.innerHTML = 'No items';
    } else{
        if(quantity == 1){
            checkoutContainer.innerHTML = '1 item';
        } else{
            checkoutContainer.innerHTML = `${quantity} items`;
        } 
    }
}

function deliveryOptionsHTML (matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach(deliveryOption => {
    const priceString = deliveryOption.priceCents === 0 ?
            'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;
        
    const isChecked = deliveryOption.id == cartItem.deliveryOptionId;

    html +=  `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" 
            ${isChecked ? 'checked': ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${deliveryDateCalculator(deliveryOption)}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>
        </div>
        `
    })
    return html;
}

export function renderOrderSummary () {
    let cartSummaryHTML = '';
    cart.cartItems.forEach( cartItem => {
        let productId = cartItem.productId;
        const matchingProduct = getProduct(productId);

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        cartSummaryHTML += `
        <div class="cart-item-container 
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${deliveryDateCalculator(deliveryOption)}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                   ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity
                  js-product-quantity-${matchingProduct.id}">
                    <span>
                    Quantity: <span class="quantity-label 
                      js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span data-product-id="${matchingProduct.id}" class="update-quantity-link link-primary js-update-link">
                      Update
                    </span>
                    <input type="text" class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span  class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">
                      save
                    </span>
                    <span class="delete-quantity-link link-primary
                      js-del-link js-del-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                    <p class="update-validation js-update-validation-${matchingProduct.id}">
                      Please enter a number 1-1000
                    </p>
                </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
                </div>
            </div>
         </div>
        </div>
        `;
    });

   updateCheckoutItems();

    document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-del-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            cart.removeFromCart(productId);
            renderOrderSummary();
            updateCheckoutItems();
            renderPaymentSummary();
        });
    });
    
    document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            document.querySelector(`.js-cart-item-container-${productId}`)
            .classList.add('is-editing-quantity');
            let updateInput = document.querySelector(
                `.js-quantity-input-${productId}`);
            updateInput.addEventListener('keydown', (event) => {
                if (event.key == "Enter"){
                    updateItemInCart(link)
                }
            })
       // updateCheckoutItems();
        });
    });

    function updateItemInCart (link) {
        let productId  = link.dataset.productId;
        document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove('is-editing-quantity');
        let updateInput = document.querySelector(`.js-quantity-input-${productId}`);
        let newQuantity = Number(updateInput.value);
        if (newQuantity > 0 && newQuantity <=  1000) {
            cart.updateCartQuantity(productId, newQuantity);
            updateCheckoutItems();
            renderPaymentSummary();
            document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
        } else {
            updateValidationDialogue(productId);
        } 
    }

    document.querySelectorAll('.js-save-quantity-link')
    .forEach( link => {
        link.addEventListener('click', () => {
            updateItemInCart(link)
        });
    });

    document.querySelectorAll('.js-delivery-option')
     .forEach( element => {
        element.addEventListener('click', () => {
            let { productId, deliveryOptionId } = element.dataset;
            cart.updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}

