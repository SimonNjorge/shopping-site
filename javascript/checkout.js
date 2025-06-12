import {updateCartQuantity, calculateCartQuantity, cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency} from "./utils/money.js";

let cartSummaryHTML = '';
cart.forEach((cartItem) => {
    let productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
        if (productId === product.id) {
            matchingProduct = product;
        }
    })
    cartSummaryHTML += `
     <div class="cart-item-container 
       js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                   ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span data-product-id="${matchingProduct.id}" class="update-quantity-link link-primary js-update-link">
                      Update
                    </span>
                    <input type="text" class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span  class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">
                      save
                    </span>
                    <span class="delete-quantity-link link-primary js-del-link" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                    <p class="update-validation js-update-validation">Please enter a number 1-1000</p>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                    <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                    <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                    <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
    `;
});

function updateCheckoutItems(){
    let quantity = calculateCartQuantity();
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

updateCheckoutItems();

document.querySelector('.js-order-summary')
 .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-del-link')
 .forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`
            .js-cart-item-container-${productId}`);
        container.remove();
        updateCheckoutItems();
    });
 });
 
document.querySelectorAll('.js-update-link')
 .forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        document.querySelector(`.js-cart-item-container-${productId}`)
          .classList.add('is-editing-quantity');
       // updateCheckoutItems();
    });
});

function updateValidationDialogue(){
    let dialogueCont = document.querySelector('.js-update-validation');
    dialogueCont.classList.add('update-validation-on');
    setTimeout(() => {
        dialogueCont.classList.remove('update-validation-on');
    }, 2000)
}

document.querySelectorAll('.js-save-quantity-link')
 .forEach( link => {
  link.addEventListener('click', () => {
    let productId  = link.dataset.productId;
    document.querySelector(`.js-cart-item-container-${productId}`)
     .classList.remove('is-editing-quantity');
    let updateInput = document.querySelector(`.js-quantity-input-${productId}`);
    let newQuantity = Number(updateInput.value);
    if (newQuantity > 0 && newQuantity <=  1000) {
        updateCartQuantity(productId, newQuantity);
        updateCheckoutItems();
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    } else{
        updateValidationDialogue();
    } 
  });
});
