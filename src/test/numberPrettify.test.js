import prettyNumber from '../js/numbersPrettify';

describe('prettify numbers', () => {
   test('adds spaces to numbers', () => {
      let prettyNum = prettyNumber(22345);
      expect(prettyNum).toBe('22 345');

      prettyNum = prettyNumber(333444555666.43);
      expect(prettyNum).toBe('333 444 555 666.43');

      prettyNum = prettyNumber(123.12);
      expect(prettyNum).toBe('123.12');
   });
});
