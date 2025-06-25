import { addToCart, cart, loadFromStorage, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    beforeEach(() => {
         //the code below mocks the setitem method so that any action 
        //performed on the setitem method  in the test code will not 
        //affect the real code. here it prevents the addtocart function
        //from saving the fake cart using its savetostorage F call
        spyOn(localStorage, 'setItem');
    });

    it('adds an existing product to the cart', () => {
         spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([{
                    productId: '6e43638ce-6aa0-4b85-b27f-e1d07eb678c',
                    quantity: 1,
                    DeliveryOptionId: '1'
                }]);
        });

        loadFromStorage();
        addToCart('6e43638ce-6aa0-4b85-b27f-e1d07eb678c');
        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('6e43638ce-6aa0-4b85-b27f-e1d07eb678c');
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds an new product to the cart', () => {
        //MOCKS: allows us to replace a method with a 
        //fake version, in this instance we'll spyOn localstorage
        //and replace the getitem method with a fake version to 
        //simulate an  empty cart

        //the code below overwrites the original getitem with whatever
        //that is returnd by the outcome of spyon
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        //expect any call to localstorage.getitem to return an empty array
        //console.log(localStorage.getItem('cart'));
        loadFromStorage();
        addToCart('6e43638ce-6aa0-4b85-b27f-e1d07eb678c');
        expect(cart.length).toEqual(1);

        //only works if the method in question has been mocked
        //using spyon
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{productId: '6e43638ce-6aa0-4b85-b27f-e1d07eb678c',
            quantity: 1,
            deliveryOptionId: '1'}]));
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('6e43638ce-6aa0-4b85-b27f-e1d07eb678c');
        console.log(cart)
        expect(cart[0].quantity).toEqual(1);
    });
});