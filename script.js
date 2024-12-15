function countLetters(text, countMode) {
    // text: a list of strings, words in the text.
    // Mode 1: Counts number of appearances of each letter (in "that": t=2)
    // Mode 2: Counts if letter appears at all (in "that": t=1)
    const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
    let letterCount = {};
    if (countMode == 1) {
        for (const word of text) {
            for (const letter of word) {
                if (letter in letterCount) {
                    letterCount[letter] += 1;
                } else {
                    letterCount[letter] = 1;
                }
            }
        }      
    } else {
        for (const word of text) {
            for (const letter of alphabet) {
                if (word.includes(letter)) {
                    if (letter in letterCount) {
                        letterCount[letter] += 1;
                    } else {
                        letterCount[letter] = 1;
                    }                
                }
            }
        }
    }
    return letterCount;
}

function logLetterCount(text) {
    const wordArray = text.split(/\s+/);

    console.log(countLetters(wordArray, 1));
    console.log(countLetters(wordArray, 2));
}

function displayLetterCount(text) {
    const letterCount = countLetters(text, 1);
    const letterCountDisplay = document.getElementById("letterCountDisplay");
    letterCountDisplay.innerHTML = "";
    for (const letter in letterCount) {
        const letterElement = document.createElement("div");
        letterElement.innerHTML = `${letter}: ${letterCount[letter]}`;
        letterCountDisplay.appendChild(letterElement);
    }
}

function countLettersButtonPressed() {
    const inputType = document.getElementById("inputType").value;
    if (inputType === "text") {
        const textInput = document.getElementById("text").value;
        displayLetterCount(textInput);
    }
    else if (inputType === "link") {
        try {
            new URL(document.getElementById("link").value);
        } catch (_) {
            console.error("Invalid URL");
            return;
        }
        const linkInput = document.getElementById("link").value;
        fetch(linkInput)
            .then(response => response.text())
            .then(text => displayLetterCount(text))
            .catch(error => console.error(error));
    }
}