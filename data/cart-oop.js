
class Cart  {
    //# makes this property private and it
    //can only be  accessed and modified inside the
    //class
    #localStorageKey;
    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage();
    }
    loadFromStorage () {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || 
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
    saveToStorage () {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    calculateCartQuantity () {
        let cartQuantity = 0;
        this.cartItems.forEach(item => {
        cartQuantity += item.quantity;
        });
        return cartQuantity;
   }
   addToCart (productId) {
        let matchingItem;
        this.cartItems.forEach(item =>{
            if(productId === item.productId){
                matchingItem = item;
            }
        });
        let selEl = document.querySelector(`.js-quantity-selector-${productId}`) || 1;
        let quantityIncrmnt = Number(selEl.value);
        //let quantityIncrmnt = Number(selEl.innerHTML)
        if (matchingItem){
                matchingItem.quantity += quantityIncrmnt || 1;
            } else {
            this.cartItems.push({
                productId: productId,
                quantity: quantityIncrmnt || 1,
                deliveryOptionId: '1'
            });
        };
        this.saveToStorage();
   }
    removeFromCart (productId){
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
   }
    updateCartQuantity (productId, newQuantity) {
        this.cartItems.forEach(item => {
            if(productId == item.productId) {
                item.quantity = newQuantity;
            }
        })
        this.saveToStorage();
   }
    updateDeliveryOption (productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach(item =>{
            if(productId === item.productId){
                matchingItem = item;
        }});
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

export const cart = new Cart('cart-oop');
