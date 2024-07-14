import {bankCodeWeights, calculateWeightedSum, serialNumberWeights} from "./helpers";
import {BANKS} from "./banks";

export type Bank = { id?: string | null, name: string; code: string }

export const computeCheckDigit = (bankCode: string, serialNumber: string) => {
    const result = calculateWeightedSum(bankCode, bankCodeWeights) + calculateWeightedSum(serialNumber, serialNumberWeights)

    const subtractionResult = 10 - (result % 10)

    return subtractionResult === 10 ? 0 : subtractionResult
}

/**
 * https://www.cbn.gov.ng/out/2018/psmd/exposure%20circular%20for%20nuban.pdf
 * @param accountNumber
 * @param bankCode
 */
export const isBankAccountValid = (accountNumber: string, bankCode: string) => {
    if (accountNumber.length !== 10) {
        throw new Error('Invalid account number, account number must be 10 digits long')
    }

    let paddedBankCode = bankCode.replace(/\D/g, '')

    if (paddedBankCode.length === 3) {
        paddedBankCode = `000${paddedBankCode}`
    } else if (paddedBankCode.length === 5) {
        paddedBankCode = `9${paddedBankCode}`
    }

    if (paddedBankCode.length !== 6) {
        throw new Error(`Invalid bank code, bank code must be 3, 5 or 6 digits long. ${paddedBankCode} is ${paddedBankCode.length} digits long`)
    }

    const serialNumber = accountNumber.substring(0, 9)

    const accountCheckDigit = accountNumber[9]

    const checkDigit = computeCheckDigit(paddedBankCode, serialNumber)

    return checkDigit?.toString() === accountCheckDigit
}

export const getPossibleBanks = <T extends Bank>(accountNumber: string, banks: T[] = BANKS as T[]): T[] => {
    return banks.filter((bank) => isBankAccountValid(accountNumber, bank.code))
}