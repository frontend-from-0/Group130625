import { formatMoney } from './utils';

describe('formatMoney', () => {
  it('format SEK price using sv-SE locale by default', () => {
    const result = formatMoney(123, 'SEK');
    expect(result).toMatch(/123,00 kr/);
  });


  it('format SEK price according to the provided locale', () => {
    const result = formatMoney(123, 'SEK', 'en-GB');
    expect(result).toMatch(/SEK 123.00/);
  });
});
