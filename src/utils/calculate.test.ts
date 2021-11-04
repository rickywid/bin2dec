import calculate from './calculate';

// write test
describe('calculate', () => {
    it('should convert binary string to a binary of values', () => {
        expect(calculate('001')).toEqual([0,0,4]);
    });
})