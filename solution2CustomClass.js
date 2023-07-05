class CharacterInfoObject {
    constructor(string) {
        let chars = string.split('');    
        chars.forEach((char, index) => {
            if (this.hasOwnProperty(char)) {
                this[char].totalCount++;
            } else {
                this[char] = {};
                this[char].firstFoundIndex = index;
                this[char].char = char;
                this[char].totalCount = 1;
            }
        });
    }

    get firstUniqueLetter() {
        const charArray = Object.values(this);
        const uniqueLetters = charArray.filter(elem => elem.totalCount === 1);
        var smallestIndex = Math.min(...uniqueLetters.map(elem => elem.firstFoundIndex));

        return uniqueLetters.find(elem => elem.firstFoundIndex === smallestIndex);
    } 
}

const findUniqueChar = (text) => {
    //Test if text doesn't include valid characters (I don't know if digits are valid 🤔).
    if (!/[a-zA-Z]/.test(text)) {
        return "Plese provide valid text";
    }
    // Splites text into separate words without special characters.
    let words = text.split(/\W+/g);
    //Creates array of custom objects, which describe each word in handy way.
    const wordsCharInfo = words.map((elem) => new CharacterInfoObject(elem));
    //Getting unique character of every word
    let uniqueCharArray = wordsCharInfo.map(elem => {
        return elem.firstUniqueLetter?.char;
    }).filter(elem => elem);
    //If there more than one unique character, creates new word and call this function with new argument.
    if (uniqueCharArray.length > 1) return findUniqueChar(uniqueCharArray.join(''));
    //One final test case(not sure if it necessary in this version) and return with character or phrase that there is none of them.
    return uniqueCharArray[0] !== undefined ? uniqueCharArray[0] : "No unique characthers";
};

console.log(findUniqueChar(`TheTe TaoTo hejej gavegva birithbh too machine llanguage anno`)) // => e
console.log(findUniqueChar(`sss`)) // => No unique characthers
console.log(findUniqueChar(`sss s ee aa`)) // => s
console.log(findUniqueChar(`The Tao gave birth to machine language.  Machine language gave birth
to the assembler.
The assembler gave birth to the compiler.  Now there are ten thousand
languages.
Each language has its purpose, however humble.  Each language
expresses the Yin and Yang of software.  Each language has its place within
the Tao.
But do not program in COBOL if you can avoid it.
        -- Geoffrey James, "The Tao of Programming"`)) // => m
console.log(findUniqueChar(`C makes it easy for you to shoot yourself in the foot. 
C++ makes that harder, but when you do, it blows away your whole leg. 
(с) Bjarne Stroustrup`)) // => e