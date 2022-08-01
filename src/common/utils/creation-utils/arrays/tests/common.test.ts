import CommonUtils from '../common';

describe('Common creation utils', () => {
  describe('range', () => {
    it('should return numbers in range starting from N from and before K', () => {
      expect(CommonUtils.range(10)).toStrictEqual([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9
      ]);
    });
  });

  describe('numericPalindrome', () => {
    it('should return common range if start from empty', () => {
      expect(CommonUtils.numericPalindrome(5)).toStrictEqual([
        0, 1, 2, 3, 4, 5
      ]);
    });

    it('should return palindrome of numbers starting from', () => {
      expect(CommonUtils.numericPalindrome(5, 3)).toStrictEqual([
        3, 4, 5, 4, 3
      ]);
    });
  });
});
