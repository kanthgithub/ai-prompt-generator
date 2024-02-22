export interface TraitType {
    Personality: string[];
    Eye: string[];
    Background: string[];
}

export interface TraitValues {
    Personality: string;
    Eye: string;
    Background: string;
}

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

// Main function to get traits from bit string
export const getTraitsFromBitString = (traitTypes: TraitType, bitString: string): TraitValues => {
    let bitGroups = bitString.match(/.{1,4}/g);
    let traits: TraitValues = {
        Personality: undefined,
        Eye: undefined,
        Background: undefined
    };
    let i = 0;
    for (let traitType in traitTypes) {
        let index = bitStringToDecimal(bitGroups[i]);
        traits[traitType as keyof TraitType] = index === 0 ? undefined : traitTypes[traitType as keyof TraitType][index - 1];
        i++;
    }
    return traits;
}

// Main function to get traits from decimal
export const getTraitsFromDecimal = (traitTypes: TraitType, decimal: number): TraitValues => {
    return getTraitsFromBitString(traitTypes, decimalTo12BitString(decimal));
}

// Main function to get decimal and bit string from traits
// Main function to get decimal and bit string from traits
export const getDecimalAndBitString = (traitTypes: TraitType, traitValues: TraitValues): { decimal: number, bitString: string } => {
    let bitString = '';
    for (let traitType in traitTypes) {
        let traitValue = traitValues[traitType as keyof TraitValues];
        let index = traitValue && traitValue !== '' ? traitTypes[traitType as keyof TraitType].indexOf(traitValue) + 1 : 0;
        bitString += decimalTo4BitString(index);
    }
    let decimal = bitStringToDecimal(bitString);
    return { decimal, bitString };
}

let traitTypeInput: TraitType = {
    "Personality": ["Jolly", "Grumpy", "Adamant", "Docile"],
    "Eye": ["Flame", "Small", "Spectacled"],
    "Background": ["Red", "Cyan", "Pink", "Yellow", "Blue", "Gold"]
};

let traitValues = {
    "Personality": "Jolly",
    "Eye": "",
    "Background": "Pink"
};

let result = getDecimalAndBitString(traitTypeInput, traitValues);
console.log(result);

traitValues = {
    "Personality": "Jolly",
    "Eye": "Small",
    "Background": "Pink"
};

result = getDecimalAndBitString(traitTypeInput, traitValues);
console.log(result);

// Main function to generate AI prompt
export const generateAIPrompt = (baseImageUrl: string, traitValues: TraitValues): string => {
    let personality = traitValues.Personality ? `exuding a ${traitValues.Personality.toLowerCase()} personality` : '';
    let eye = traitValues.Eye ? `with ${traitValues.Eye.toLowerCase()} eyes` : '';
    let background = traitValues.Background ? `set against a ${traitValues.Background.toLowerCase()} background` : '';

    let traitsDescription = [personality, eye, background].filter(trait => trait !== '').join(', ');

    return `${baseImageUrl} An image of a living-being ${traitsDescription}.`;
}

// Usage
let baseImageUrl = "https://cdn.discordapp.com/attachments/123/123/123.png";
traitValues = {
    "Personality": "Jolly",
    "Eye": "Small",
    "Background": "Pink"
};

let prompt = generateAIPrompt(baseImageUrl, traitValues);
console.log(prompt);