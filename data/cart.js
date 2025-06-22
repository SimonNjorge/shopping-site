export let cart;

loadFromStorage();

export function loadFromStorage () {
    cart = JSON.parse(localStorage.getItem('cart')) || 
        [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId:  "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
         }];
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += item.quantity;
    });
    return cartQuantity;
}

export function addToCart (productId) {
    let matchingItem;
    cart.forEach(item =>{
        if(productId === item.productId){
            matchingItem = item;
        }
    });
    let selEl = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantityIncrmnt = Number(selEl.value);
    //let quantityIncrmnt = Number(selEl.innerHTML)
    if (matchingItem){
            matchingItem.quantity += quantityIncrmnt || 1;
        } else {
        cart.push({
            productId: productId,
            quantity: quantityIncrmnt || 1,
            deliveryOptionId: '1'
        });
    };
    saveToStorage();
};

export function removeFromCart (productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
};

export function updateCartQuantity (productId, newQuantity){
    cart.forEach(item => {
        if(productId == item.productId) {
            item.quantity = newQuantity;
        }
    })
    saveToStorage();
}

export function updateDeliveryOption (productId, deliveryOptionId){
    let matchingItem;
    cart.forEach(item =>{
        if(productId === item.productId){
            matchingItem = item;
    }});

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}