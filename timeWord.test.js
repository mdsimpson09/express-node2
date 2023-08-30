const timeWord = require('./timeWord');

describe('timeWord', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });

  test('handles 01:15 as one fifteen am', () => {
    expect(timeWord('01:15')).toBe('one fifteen am');
  });

  test('handles 01:30 as one thirty am', () => {  
    expect(timeWord('01:30')).toBe('one thirty am');
  });

  test('handles 01:45 as one forty five am', () => {
    expect(timeWord('01:45')).toBe('one forty five am');
  });

  test('handles 11:59 as eleven fifty nine am', () => {
    expect(timeWord('11:59')).toBe('eleven fifty nine am');  
  });

  test('handles 12:15 as twelve fifteen pm', () => {
    expect(timeWord('12:15')).toBe('twelve fifteen pm');
  });

  test('handles 12:30 as twelve thirty pm', () => {
    expect(timeWord('12:30')).toBe('twelve thirty pm');
  });

  test('handles 12:45 as twelve forty five pm', () => {
    expect(timeWord('12:45')).toBe('twelve forty five pm');
  });

  test('handles 23:15 as eleven fifteen pm', () => {
    expect(timeWord('23:15')).toBe('eleven fifteen pm');
  });

  test('handles 23:30 as eleven thirty pm', () => {
    expect(timeWord('23:30')).toBe('eleven thirty pm');
  });

  test('handles 23:45 as eleven forty five pm', () => {
    expect(timeWord('23:45')).toBe('eleven forty five pm');
  });
});