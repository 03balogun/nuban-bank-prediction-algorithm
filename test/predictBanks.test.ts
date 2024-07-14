import {getPossibleBanks, isBankAccountValid} from "../src/nuban_util";

describe('isBankAccountValid', () => {
    it('should throw an error if account number is not 10 digits long', () => {
        expect(() => isBankAccountValid('123456789', '123')).toThrow('Invalid account number, account number must be 10 digits long');
    });

    it('should throw an error if bank code is not 3, 5 or 6 digits long', () => {
        expect(() => isBankAccountValid('1234567890', '12')).toThrow('Invalid bank code, bank code must be 3, 5 or 6 digits long');
    });

    it('should return true if account number and bank code are valid and match', () => {
        expect(isBankAccountValid('0010246780', '044')).toBe(true);
    });

    it('should return false if account number and bank code are valid but do not match', () => {
        expect(isBankAccountValid('1234567890', '123')).toBe(false);
    });

});

describe('getPossibleBanks', () => {
    it('should return an array of banks for a valid account number', () => {
        const result = getPossibleBanks('0010246780');
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty('name');
        expect(result[0]).toHaveProperty('code');
    });

    it('should return an empty array for an invalid account number', () => {
        const result = getPossibleBanks('00000000xx');
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(0);
    });

    it('should include bank code 50515 (Moniepoint)', () => {
        const result = getPossibleBanks('5522116946');
        expect(result).toBeInstanceOf(Array);
        expect(result.some((bank) => bank.code === '50515')).toBe(true);
    });

    it('should include bank code 999991 (PalmPay)', () => {
        const result = getPossibleBanks('8106136519');
        expect(result).toBeInstanceOf(Array);
        expect(result.some((bank) => bank.code === '999991')).toBe(true);
    });

    it('should include bank code 044 (Access Bank)', () => {
        const result = getPossibleBanks('0010246780');
        expect(result).toBeInstanceOf(Array);
        expect(result.some((bank) => bank.code === '044')).toBe(true);
    });

    it('should include bank code 221 (Stanbic IBTC Bank)', () => {
        const result = getPossibleBanks('0054556411');
        expect(result).toBeInstanceOf(Array);
        expect(result.some((bank) => bank.code === '221')).toBe(true);
    });

    it('should include bank code 057 (Zenith)', () => {
        const result = getPossibleBanks('1012854016');
        expect(result).toBeInstanceOf(Array);
        expect(result.some((bank) => bank.code === '057')).toBe(true);
    });

    it('should include bank code 058 (GTBank)', () => {
        const result = getPossibleBanks('0108024071');
        expect(result).toBeInstanceOf(Array);
        expect(result.some((bank) => bank.code === '058')).toBe(true);
    });

    it('should include bank code 033 (UBA)', () => {
        const result = getPossibleBanks('1018044721');
        expect(result).toBeInstanceOf(Array);
        expect(result.some((bank) => bank.code === '033')).toBe(true);
    });

    it('should include bank code 011 (First Banks)', () => {
        const result = getPossibleBanks('2022323697');
        expect(result).toBeInstanceOf(Array);
        expect(result.some((bank) => bank.code === '011')).toBe(true);
    });

    it('should include bank code 070 (Fidelity Bank)', () => {
        const result = getPossibleBanks('5600026567');
        expect(result).toBeInstanceOf(Array);
        expect(result.some((bank) => bank.code === '070')).toBe(true);
    });

    it('should include bank code 214 (FCMB)', () => {
        const result = getPossibleBanks('2828744017');
        expect(result).toBeInstanceOf(Array);
        expect(result.some((bank) => bank.code === '214')).toBe(true);
    });
});