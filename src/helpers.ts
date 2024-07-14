export const bankCodeWeights: number[] = [3, 7, 3, 3, 7, 3];

export const serialNumberWeights: number[] = [3, 7, 3, 3, 7, 3, 3, 7, 3];

export const calculateWeightedSum = (value: string, weights: number[]): number => {
    if (value.length !== weights.length) {
        throw new Error('value and weights must have the same length');
    }

    return value.split('').reduce((sum, digit, index) => sum + Number(digit) * weights[index], 0);

}