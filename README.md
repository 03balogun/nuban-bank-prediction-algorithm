# NUBAN Bank Prediction Algorithm

This utility function is designed to predict or identify the bank associated with a given Nigeria Uniform Bank Account Number (NUBAN). 

It validates NUBAN account numbers and provides possible banks that could own the account number.

This implementation is based on the Central Bank of Nigeria's [REVISED STANDARDS ON NIGERIA UNIFORM BANK ACCOUNT NUMBER (NUBAN) SCHEME FOR DEPOSIT MONEY BANKS (DMBs) AND OTHER FINANCIAL INSTITUTIONS (OFIs) IN NIGERIA - MAR 2020](https://www.cbn.gov.ng/out/2020/psmd/revised%20standards%20on%20nigeria%20uniform%20bank%20account%20number%20(nuban)%20for%20banks%20and%20other%20financial%20institutions%20.pdf).


## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- TypeScript (v5.5.3 or later)

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/03balogun/predict-nuban-banks.git
cd predict-nuban-banks
npm install
```

## Usage

The utility provides two main functions: `isBankAccountValid` and `getPossibleBanks`.

### isBankAccountValid

This function validates a given account number and bank code. It throws an error if the account number is not 10 digits long or if the bank code is not 3, 5 or 6 digits long. It returns `true` if the account number and bank code are valid and match, and `false` otherwise.

```typescript
import { isBankAccountValid } from './src/nuban_util';

const isValid = isBankAccountValid('0010246780', '044');
console.log(isValid); // true
```

### getPossibleBanks

This function returns an array of possible banks that could own a given account number. Each bank in the array is represented as an object with name and code properties. The name is the name of the bank and the code is the bank's code as per the CBN standards.

Here's an example of how you might use the function and what the response might look like:
```typescript
import { getPossibleBanks } from './src/nuban_util';

const banks = getPossibleBanks('0010246780');
console.log(banks); // Array of possible banks
```

Output example:
```json
[
  {
    "name": "ACCESS BANK",
    "code": "044"
  },
  {
    "name": "First Bank PLC",
    "code": "011"
  }
]
```

You can also pass your own custom list of banks to the getPossibleBanks function. The custom list should be an array of objects that match the Bank type.

Here's an example:

```typescript
import { getPossibleBanks, Bank } from './src/nuban_util';

type CustomBank = Bank & { branch: string };

const customBanks: CustomBank[] = [
    {
        name: 'Custom Bank 1',
        code: '001',
        branch: 'Main Branch'
    },
    {
        name: 'Custom Bank 2',
        code: '002',
        branch: 'Secondary Branch'
    }
// ... more custom banks
];

const banks = getPossibleBanks<CustomBank>('0010246780', customBanks);
console.log(banks); // Array of possible banks from the custom list

```

In this example, CustomBank is a type that extends Bank and adds a branch property. The `getPossibleBanks` function is then called with the CustomBank type and the custom list of banks.

## Testing

To run the tests, use the following command:

```bash
npm run test
```

## Note

Please note that the list of banks provided in this utility is not exhaustive. It is a subset of all the banks available in Nigeria. Depending on your use case, you might need to update the list to include other banks or remove some banks.

You can find a more comprehensive [list of banks in this gist](https://gist.github.com/03balogun/c6386aaea439f18ffabd9892112ef767).

To update the bank list, modify the `BANKS` array in the `src/banks.ts` file. Each bank should be represented as an object with `name` and `code` properties. The `name` is the name of the bank and the `code` is the bank's code as per the CBN standards.

## Contributing

Contributions are welcome. Please make sure to update tests as appropriate.

## License

This project is licensed under the ISC License.