i have A trait table

the highlighted content in the markdown file is a trait map for an image generator

the first column in each row is the trait type

and all subsequent columns of the row are different valid values of that trait

like wise you can see multiple rows in the table where in each row is a specific trait type

now i want you to generate a json out of it such that i can be able to pull trait names by bit map 

such as :

i give this bit map as input

group of 4 bits are in the string below maps to a specific trait-type

such as:

0001 0010 0010

here we have 12 characters or bits
Now eaxch 4 bits starting from left maps to each traitType

such as first set 0001 maps to Personality and here the value in decimal  is 1 and maps to Jolly which is 1st trait in personality

0010 the second set maps to Eye traut and here value in decimal is 2 where it maps to valid Eye Small

0010 the third set maps to Bavkground trait and here its decimal value is 2 and maps to Pink

now generate a typescript code which parses the input bitsstring and derive the trait-type and its value as output json

first you convert the markdown to a json file
followed by a typescript function which takes
- json file
- bit string

as input and generate output json as described above

ok for now lets exclude the markdown file parsing just generate a sample json by looking at the table in this markdown file


| | ID1 | ID2 | ID3 | ID4 | ID5 | ID6 |
|-| -| -| - | -| -| - |
| Personality | Jolly | Grumpy | Adamant | Docile |  | |
| Eye | Flame | Small | Spectacled | || |
| Background | Red | Cyan | Pink | Yellow | Blue | Gold |



Sure, based on the markdown table you provided, the corresponding JSON object would look like this:


{
    "Personality": ["Jolly", "Grumpy", "Adamant", "Docile"],
    "Eye": ["Flame", "Small", "Spectacled"],
    "Background": ["Red", "Cyan", "Pink", "Yellow", "Blue", "Gold"]
}


now assuming this is one of input and other is the bit map string write a typescript function which outputs the json

// Convert bit string to decimal
function bitStringToDecimal(bitString: string): number {
    return parseInt(bitString, 2);
}

// Main function
function getTraits(traitTypes: any, bitString: string): any {
    let bitGroups = bitString.match(/.{1,4}/g);
    let traits = {};
    let i = 0;
    for (let traitType in traitTypes) {
        let index = bitStringToDecimal(bitGroups[i]);
        traits[traitType] = traitTypes[traitType][index];
        i++;
    }
    return traits;
}

You can use the getTraits function like this:

let traitTypes = {
    "Personality": ["Jolly", "Grumpy", "Adamant", "Docile"],
    "Eye": ["Flame", "Small", "Spectacled"],
    "Background": ["Red", "Cyan", "Pink", "Yellow", "Blue", "Gold"]
};

let traits = getTraits(traitTypes, '000100100010');
console.log(traits);