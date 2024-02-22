import { TraitType, TraitValues } from "./trait-generator";

// Convert bit string to decimal
export const bitStringToDecimal = (bitString: string): number => {
    return parseInt(bitString, 2);
}

// Convert decimal to 4-bit string
function decimalTo4BitString(decimal: number): string {
    return decimal.toString(2).padStart(4, '0');
}

// Convert decimal to 12-bit string
function decimalTo12BitString(decimal: number): string {
    return decimal.toString(2).padStart(12, '0');
}


// Main function
export const getTraitsFromBitString = (traitTypes: TraitType, bitString: string): TraitValues => {
    let bitGroups = bitString.match(/.{1,4}/g);
    let traits: TraitValues = {
        Personality: '',
        Eye: '',
        Background: ''
    };
    let i = 0;
    for (let traitType in traitTypes) {
        let index = bitStringToDecimal(bitGroups[i]);
        const traitValue = traitTypes[traitType][index];
        if(traitValue) {
          traits[traitType] = traitTypes[traitType][index];
        }
        i++;
    }
    return traits;
}


// Main function
export const getTraitsFromDecimal = (traitTypes: TraitType, decimal: number): TraitValues => {
    let bitString = decimalTo12BitString(decimal);
    let bitGroups = bitString.match(/.{1,4}/g);
    let traits: TraitValues = {
        Personality: '',
        Eye: '',
        Background: ''
    };
    let i = 0;
    for (let traitType in traitTypes) {
        let index = bitStringToDecimal(bitGroups[i]);
        traits[traitType as keyof TraitType] = traitTypes[traitType as keyof TraitType][index];
        i++;
    }
    return traits;
}

// Main function
// Main function
function getDecimalAndBitString(traitTypes: TraitType, traitValues: TraitValues): { decimal: number, bitString: string } {
    let bitString = '';
    for (let traitType in traitTypes) {
        let index = traitTypes[traitType as keyof TraitType].indexOf(traitValues[traitType as keyof TraitValues]);
        bitString += decimalTo4BitString(index);
    }
    let decimal = bitStringToDecimal(bitString);
    return { decimal, bitString };
}

let traitTypes : TraitType = {
    "Personality": ["Jolly", "Grumpy", "Adamant", "Docile"],
    "Eye": ["Flame", "Small", "Spectacled"],
    "Background": ["Red", "Cyan", "Pink", "Yellow", "Blue", "Gold"]
};

let traits = getTraitsFromBitString(traitTypes, '000000010010');
console.log(traits);

traits = getTraitsFromDecimal(traitTypes, 18);
console.log(traits);

//console.log(decimalToBitString(18));

let traitTypeInput: TraitType = {
    "Personality": ["Jolly", "Grumpy", "Adamant", "Docile"],
    "Eye": ["Flame", "Small", "Spectacled"],
    "Background": ["Red", "Cyan", "Pink", "Yellow", "Blue", "Gold"]
};

let traitValues: TraitValues = {
    "Personality": "Jolly",
    "Eye": "Small",
    "Background": "Pink"
};

let result = getDecimalAndBitString(traitTypeInput, traitValues);
console.log(result);

traitValues = {
    "Personality": "Jolly",
    "Eye": "",
    "Background": "Pink"
};

result = getDecimalAndBitString(traitTypeInput, traitValues);
console.log(result);