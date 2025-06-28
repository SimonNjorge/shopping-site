import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
//import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js';

//async makes a function return a promise
async function loadPage(){
    await loadProductsFetch();

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

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

/*
loadPage().then((value) => {
    console.log('next step');
     console.log(value);

})
*/

/*
loadProductsFetch().then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/
/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/
