export const cart = [];
export function addToCart (productId){
    let matchingItem;
        cart.forEach(item =>{
            if(productId === item.productId){
                matchingItem = item;
        }});
        
        let selEl = document.querySelector(`.js-quantity-selector-${productId}`);
        let quantityIncrmnt = Number(selEl.value);
          if (matchingItem){
                matchingItem.quantity += quantityIncrmnt;
            } else {
            cart.push({
             productId: productId,
             quantity: quantityIncrmnt
           });}   
}