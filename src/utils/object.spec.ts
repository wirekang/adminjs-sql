import { lowerCaseProperty, undefinedToNull } from './object';

describe('object utility functions', () => {
  describe('undefinedToNull()', () => {
    it('should returns empty object', () => {
      expect(undefinedToNull({})).toEqual({});
    });

    it('should set undefined properties to null', () => {
      const before = {
        p1: undefined,
        p2: 1,
        p3: '',
        p4: false,
        p5: null,
      };
      const after = {
        p1: null,
        p2: 1,
        p3: '',
        p4: false,
        p5: null,
      };
      expect(undefinedToNull(before)).toEqual(after);
    });
  });

  describe('lowerCaseProperty', () => {
    it('should returns empty object', () => {
      expect(lowerCaseProperty({})).toEqual({});
    });

    it('should rename properties to lowercase', () => {
      const before = {
        asdf: 'Asdf',
        Qwer: 'QWER',
        ZXCV: 'Zxcv',
        Fff: undefined,
      };
      const after = {
        asdf: 'Asdf',
        qwer: 'QWER',
        zxcv: 'Zxcv',
        fff: undefined,
      };
      expect(lowerCaseProperty(before)).toEqual(after);
    });
  });
});
