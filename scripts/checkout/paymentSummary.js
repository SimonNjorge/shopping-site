
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { cart } from "../../data/cart-oop.js";

export function renderPaymentSummary() {
     //first part is saving the data
    let totalQuantity = 0;
    let productsPriceCents = 0;
    let shippingPriceCents = 0;

    cart.cartItems.forEach(cartItem  => {
        let product = getProduct(cartItem.productId)
        let option = getDeliveryOption(cartItem.deliveryOptionId);

        productsPriceCents += cartItem.quantity * product.priceCents;
        shippingPriceCents += option.priceCents;
        totalQuantity += cartItem.quantity;
    });
    
   const totalBeforeTaxCents = productsPriceCents + shippingPriceCents;
   const taxCents = totalBeforeTaxCents * 0.1;
   const totalCents = taxCents + totalBeforeTaxCents;

    //2nd part is generating the html
   const paymentSummaryHTML = `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">
              $${formatCurrency(productsPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
              $${formatCurrency(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
              $${formatCurrency(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
               $${formatCurrency(taxCents)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
              $${formatCurrency(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

   `

   document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}