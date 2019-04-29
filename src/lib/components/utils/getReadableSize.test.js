const getReadableSize = require('./getReadableSize');

describe('verify returning value', () => {
    test('return something', () => {
        expect(getReadableSize(Math.round(Math.random()*1000))).toBeDefined()
    });
    test('return string', () => {
        expect(typeof getReadableSize(Math.round(Math.random()*1000))).toBe('string')
    });
    test('return right number #1', () => {
        expect(getReadableSize(2019)).toBe('1.97168 kB')
    });
    test('return right number #2', () => {
        expect(getReadableSize(1000)).not.toBe('1.00000 kB')
    });
    test('return right round number', () => {
        expect(getReadableSize(2048)).toBe('2.00000 kB')
    });
    test('return bytes', () => {
        expect(getReadableSize(Math.round((Math.random()+1)*10)).split(' ')[1]).toBe('B')
    });
    test('return kilobytes', () => {
        expect(getReadableSize(Math.round((Math.random()+1)*10000)).split(' ')[1]).toBe('kB')
    });
    test('return terabytes', () => {
        expect(getReadableSize(Math.round((Math.random()+1)*10000000000000)).split(' ')[1]).toBe('TB')
    });
});

describe('verify types', () => {
    test('input can not be string', () => {
        expect(getReadableSize('10000')).not.toBe(true)
    });
    test('input can not be array', () => {
        expect(getReadableSize([10000])).toBe(false)
    });
    test('input can not be object', () => {
        expect(getReadableSize({10000: 10000})).toBe(false)
    });
    test('input can not be undefined', () => {
        expect(() => getReadableSize()).toThrow('No arguments were passed');
    });
    test('input can not be negative number', () => {
        expect(getReadableSize(-5)).toBe(false);
    });
    test('input can not be float', () => {
        expect(getReadableSize(6.85)).toBe(false);
    });
})
