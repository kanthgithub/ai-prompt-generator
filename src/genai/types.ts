export interface Traits {
    personality: string[];
    eye: string[];
    tail: string[];
    wearing: string[];
    activity: string[];
    environment: string[];
}

export const traitRecordValues: Traits = {
    personality: ["Jolly", "Grumpy", "Adamant", "Docile", "Drunk", "Scary", "Happy", "Sad", "Angry", "Calm", "Excited", "Bored"],
    eye: ["Flame", "Small", "Spectacled", "Big", "Round", "Sharp", "Glowing", "Red", "Blue", "Green", "Yellow", "Black", "White", "Brown", "Grey", "Purple", "Pink", "Orange", "Rainbow", "Crossed", "Closed", "Sleepy", "Tired", "Angry", "Happy", "Sad", "Scary", "Calm", "Excited", "Bored"],
    tail: ["long", "short", "twisted"],
    wearing: ["Spectacles", "Hat", "Cigar", "Scarf", "Glasses", "Tie", "Bow", "Crown", "Wig", "Mask", "Hood", "Helmet", "Cap", "Shirt", "Jacket", "Coat", "Pant", "Shorts", "Skirt", "Dress", "Shoes", "Socks", "Gloves", "Bag", "Purse", "Umbrella", "Cane", "Sword", "Gun", "Shield", "Armor", "Wings", "Tail", "Horns", "Ears", "Fur", "Feathers", "Scales", "Skin", "Tattoo", "Jewelry", "Watch", "Ring", "Necklace", "Bracelet", "Earring", "Goggles", "Belt", "Buckle", "Badge", "Medal", "Trophy", "Flag", "Banner"],
    activity: ["Drinking Beer", "Drinking Soda", "Playing", "Dancing", "Crying", "Laughing", "Jumping", "Sitting", "Sleeping", "Running", "Walking", "Eating Fish", "Drinking", "Reading", "Writing", "Singing", "Talking", "Listening", "Watching", "Thinking", "Dreaming", "Working", "Cooking", "Cleaning", "Studying", "Teaching", "Learning", "Training", "Exercising", "Practicing", "Meditating", "Praying", "Fighting", "Hunting", "Hiding", "Drinking Beer", "Shooting with a Sniper Gun"],
    environment: ["On Snow", "In Rain", "Under the Sun", "At Beach", "In Desert", "In Forest", "In Jungle", "In Space", "In Cave", "In Castle", "In City",  "In Market", "In Garden", "In Park", "In Zoo", "In Aquarium", "In Museum", "In Library", "In School", "In College", "In University", "In Hospital", "In Church", "In Temple", "In Mosque", "In Synagogue", "In Shrine", "In Stadium", "In Gym", "In Pool", "In River", "In Lake","In Waterfall", ]
};

export type TraitsRecordItem = {
    [K in keyof Traits]?: Traits[K][number]
}