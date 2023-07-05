const findUniqueChar = (text) => {
    //Test if text doesn't include valid characters
    if (!/[a-zA-Z]/.test(text)) {
        return "Plese provide valid text";
    }
    // Splites text into separate words without special characters
    let words = text.split(/\W+/g);
    //Creates object with information about how many specific characters in one word
    const characthersObject = words.map(elem => {
        let wordCharacters = {};
        let chars = elem.split('');        
        chars.forEach(element => {
            if (wordCharacters.hasOwnProperty(element)) {
                wordCharacters[element]++;
            } else {
                wordCharacters[element] = 1;
            }
        });
        return wordCharacters;
    });
    //Returns characters wich only appeared once
    const uniqueCharArray = words.map((elem, index) => {
        const chatr = elem.split('');
        for (let i = 0; i < chatr.length; i++) {
            if (characthersObject[index][chatr[i]] === 1 && !/\d/.test(chatr[i])) return chatr[i];
        }
    }).filter(elem => elem);
    //If there was only one unique character returns result, if was many, calls this function again with new word
    if (uniqueCharArray[0] !== undefined && uniqueCharArray.length > 1) {
        return findUniqueChar(uniqueCharArray.join(''))
    } else {
        return uniqueCharArray[0] !== undefined ? uniqueCharArray[0] : "No unique characthers";
    }
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