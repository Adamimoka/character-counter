function countLetters(text, countMode) {
    // text: a list of strings, words in the text.
    // Mode 0: Counts number of appearances of each letter (in "that": t=2)
    // Mode 1: Counts if letter appears at all (in "that": t=1)

    let letterCount = {};
    if (countMode == 0) {
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
        const lettersToCheck = new Set(text.join(""));
        for (const word of text) {
            for (const letter of lettersToCheck) {
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

function displayLetterCount(letterCountResults, tableID) {
    // letterCountResults: a dictionary with letters as keys and counts as values
    // tableID: the ID of the table to display the results
    
    letterCountResults = Object.fromEntries( // Sort the dictionary by value
        Object.entries(letterCountResults).sort(([,a],[,b]) => b-a).reverse()
    );

    const table = document.getElementById(tableID);
    table.innerHTML = "";
    for (const letter in letterCountResults) {
        const row = table.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = letter;
        cell2.innerHTML = letterCountResults[letter];
    }
    table.insertRow(0).innerHTML = "<th>Letter</th><th>Count</th>";
    if (tableID === "table0") {
        table.insertRow(0).innerHTML = "<th colspan='2'>Number of appearances (in \"that\": t=2)</th>";
    }
    else if (tableID === "table1") {
        table.insertRow(0).innerHTML = "<th colspan='2'>Letter appears in word (in \"that\": t=1)</th>";
    }
}

function countLettersButtonPressed() {
    const inputType = document.getElementById("inputType").value;
    let textInput = [];

    if (inputType === "text") {
        textInput = document.getElementById("text").value;
        processTextInput(textInput);
    }
    else if (inputType === "link") {
        const linkInput = document.getElementById("link").value;
        try { // Check if the URL is valid
            new URL(linkInput);
        } catch (_) {
            console.error("Invalid URL");
            return;
        }
        fetch(linkInput)
            .then(response => response.text())
            .then(text => processTextInput(text))
            .catch(error => console.error(error));
    }
}

function processTextInput(textInput) {
    if (!document.getElementById("caseSensitive").checked) {
        textInput = textInput.toLowerCase();
    }
    textInput = textInput.split(/\s+/);

    const letterCountResultsType0 = countLetters(textInput , 0);
    const letterCountResultsType1 = countLetters(textInput , 1);

    displayLetterCount(letterCountResultsType0, "table0");
    displayLetterCount(letterCountResultsType1, "table1");
}