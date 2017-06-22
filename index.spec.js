const expect = require('expect');

const shapeNumber = require('./index.js');

describe('Shape numbers', () => {
  describe('changing decimal separator', () => {
    it('should support no separator value', () => {
      expect(shapeNumber(100, '0[.]0[]00')).toEqual('10000');
    });

    it('should support any single character', () => {
      expect(shapeNumber(100, '0[.]0[ ]00')).toEqual('100 00');
      expect(shapeNumber(100, '0[.]0[.]00')).toEqual('100.00');
      expect(shapeNumber(100, '0[.]0[,]00')).toEqual('100,00');
      expect(shapeNumber(100, '0[.]0[a]00')).toEqual('100a00');
      expect(shapeNumber(100, '0[.]0[1]00')).toEqual('100100');
    });

    it('should support multiple characters', () => {
      expect(shapeNumber(100, '0[.]0[  ]00')).toEqual('100  00');
      expect(shapeNumber(100, '0[.]0[..]00')).toEqual('100..00');
      expect(shapeNumber(100, '0[.]0[,,]00')).toEqual('100,,00');
      expect(shapeNumber(100, '0[.]0[aaaa]00')).toEqual('100aaaa00');
      expect(shapeNumber(100, '0[.]0[11]00')).toEqual('1001100');
    });
  });

  describe('changing thousand separator', () => {
    it('should support no separator value', () => {
      expect(shapeNumber(1000000, '0[]0[.]00')).toEqual('1000000.00');
    });

    it('should support any single character', () => {
      expect(shapeNumber(1000000, '0[ ]0[.]00')).toEqual('1 000 000.00');
      expect(shapeNumber(1000000, '0[.]0[.]00')).toEqual('1.000.000.00');
      expect(shapeNumber(1000000, '0[,]0[.]00')).toEqual('1,000,000.00');
      expect(shapeNumber(1000000, '0[a]0[.]00')).toEqual('1a000a000.00');
      expect(shapeNumber(1000000, '0[1]0[.]00')).toEqual('110001000.00');
    });

    it('should support multiple characters', () => {
      expect(shapeNumber(1000000, '0[  ]0[.]00')).toEqual('1  000  000.00');
      expect(shapeNumber(1000000, '0[..]0[.]00')).toEqual('1..000..000.00');
      expect(shapeNumber(1000000, '0[,,]0[.]00')).toEqual('1,,000,,000.00');
      expect(shapeNumber(1000000, '0[aaa]0[.]00')).toEqual('1aaa000aaa000.00');
      expect(shapeNumber(1000000, '0[11]0[.]00')).toEqual('11100011000.00');
    });
  });

  describe('changing number of decimals', () => {
    it('should support zero decimals', () => {
      expect(shapeNumber(1000000, '0[.]0[.]')).toEqual('1.000.000');
    });

    it('should support one decimal', () => {
      expect(shapeNumber(1000000, '0[.]0[.]0')).toEqual('1.000.000.0');
    });

    it('should support two decimals', () => {
      expect(shapeNumber(1000000, '0[.]0[.]00')).toEqual('1.000.000.00');
    });

    it('should support many decimals', () => {
      expect(shapeNumber(1000000, '0[.]0[.]0000000')).toEqual('1.000.000.0000000');
    });
  });

  describe('decimal values', () => {
    it('should add paddding of zero character for empty decimal value', () => {
      expect(shapeNumber(1000000, '0[.]0[.]0')).toEqual('1.000.000.0');
      expect(shapeNumber(1000000, '0[.]0[.]00')).toEqual('1.000.000.00');
      expect(shapeNumber(1000000, '0[.]0[.]00000')).toEqual('1.000.000.00000');
    });

    it('should add padding for a single decimal value', () => {
      expect(shapeNumber(1000000.4, '0[.]0[.]0')).toEqual('1.000.000.4');
      expect(shapeNumber(1000000.4, '0[.]0[.]00')).toEqual('1.000.000.40');
      expect(shapeNumber(1000000.4, '0[.]0[.]00000')).toEqual('1.000.000.40000');
    });

    it('should add padding for a multiple decimal values', () => {
      expect(shapeNumber(1000000.44, '0[.]0[.]000')).toEqual('1.000.000.440');
      expect(shapeNumber(1000000.444, '0[.]0[.]00000')).toEqual('1.000.000.44400');
      expect(shapeNumber(1000000.4444, '0[.]0[.]00000000')).toEqual('1.000.000.44440000');
    });
  });

  describe('round up decimal values (default)', () => {
    it('should round up decimal values', () => {
      expect(shapeNumber(99.9, '0[.]0[.]')).toEqual('100');
      expect(shapeNumber(1000000.5, '0[.]0[.]')).toEqual('1.000.001');
      expect(shapeNumber(1000000.55, '0[.]0[.]0')).toEqual('1.000.000.6');
      expect(shapeNumber(1000000.55555, '0[.]0[.]0000')).toEqual('1.000.000.5556');
    });

    it('should not round up any decimal values', () => {
      expect(shapeNumber(1000000.5, '0[.]0[.]', false)).toEqual('1.000.000');
      expect(shapeNumber(1000000.55, '0[.]0[.]0', false)).toEqual('1.000.000.5');
      expect(shapeNumber(1000000.55555, '0[.]0[.]0000', false)).toEqual('1.000.000.5555');
    })
  });

  describe('display various interegers', () => {
    it('should display smaller values (below 100)', () => {
      expect(shapeNumber(5, '0[.]0[.]', false)).toEqual('5');
      expect(shapeNumber(8, '0[.]0[.]', false)).toEqual('8');
      expect(shapeNumber(66, '0[.]0[.]', false)).toEqual('66');
      expect(shapeNumber(99.9, '0[.]0[.]', false)).toEqual('99');
    });

    it('should display bigger values (above 100.000.000)', () => {
      expect(shapeNumber(1000000004, '0[.]0[.]', false)).toEqual('1.000.000.004');
      expect(shapeNumber(8008800888, '0[.]0[.]', false)).toEqual('8.008.800.888');
      expect(shapeNumber(990000000000000, '0[.]0[.]', false)).toEqual('990.000.000.000.000');
    });
  });
});
