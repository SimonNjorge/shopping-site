import { formatCurrency } from "../javascript/utils/money.js";

describe('test suite: formatCurrency', () => {
    it('converts cents to dollars', () => {
        // a call to expect returns an object that has
        //several methods to compare values,
        //one of these methods is toEqual
        expect(formatCurrency(2095)).toEqual('20.95')
    })

    it('works with zero', () => {
        expect(formatCurrency(0)).toEqual('0.00')
    });

    describe('rounding', () => {
         it('rounds up to the nearest cents', () => {
            expect(formatCurrency(2000.5)).toEqual('20.01')
        });

        it('rounds down to the nearest cents', () => {
            expect(formatCurrency(2000.4)).toEqual('20.00')
        });
    });
})