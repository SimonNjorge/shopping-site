import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
//import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js';
/*
Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value 1');
        })
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve()
        })
    })
]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

loadProductsFetch().then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/
