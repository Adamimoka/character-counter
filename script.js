function countLetters(text, appearanceMode) {
    // text: a string of text to count the letters in
    // Mode 0: Counts Number of appearances (in "that": 't' is 2)
    // Mode 1: Counts letter appearance per word (in "that": 't' is 1)
    
    text = text.split(/\s+/); // Split the text into words

    let letterCount = {};
    let letterFraction = {};

    const characterMode = document.getElementById("characterMode").value;
    if (characterMode == 'all') { // Count all characters
        // nothing
    }
    else if (characterMode == 'alphanumeric') { // Remove non-alphanumeric characters
        text = text.map(word => word.replace(/[^a-zA-Z0-9]/g, ""));
    }
    else if (characterMode == 'alphabet') { // Remove non-alphabetic characters
        text = text.map(word => word.replace(/[^a-zA-Z]/g, ""));
    }
    else if (characterMode == 'caseinsensitive') { // Remove non-alphabetic characters
        text = text.map(word => word.replace(/[^a-zA-Z]/g, ""));
        text = text.map(word => word.toUpperCase());
    }

    text = text.filter(word => word !== ""); // Remove empty strings

    if (appearanceMode == 0) {
        for (const word of text) {
            for (const letter of word) {
                if (letter in letterCount) {
                    letterCount[letter] += 1;
                } else {
                    letterCount[letter] = 1;
                }
            }
        }
        const totalLetters = Object.values(letterCount).reduce((a, b) => a + b, 0);
        for (const letter in letterCount) {
            letterFraction[letter] = letterCount[letter] / totalLetters;
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
        const totalWords = text.length;
        for (const letter in letterCount) {
            letterFraction[letter] = letterCount[letter] / totalWords;
        }
    }
    return [letterCount, letterFraction];
}

function displayLetterCount(letterResults, tableID) {
    // letterCountResults: a dictionary with letters as keys and counts as values
    // tableID: the ID of the table to display the results
    let letterCountResults = letterResults[0];
    let letterFractionResults = letterResults[1];

    letterCountResults = Object.fromEntries( // Sort the dictionaries by value
        Object.entries(letterCountResults).sort(([,a],[,b]) => b-a).reverse()
    );
    letterFractionResults = Object.fromEntries(
        Object.entries(letterFractionResults).sort(([,a],[,b]) => b-a).reverse()
    );

    const table = document.getElementById(tableID);
    table.innerHTML = "";
    for (const letter in letterCountResults) {
        const row = table.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = letter;
        cell2.innerHTML = letterCountResults[letter];
        cell3.innerHTML = (letterFractionResults[letter]*100).toFixed(2) + "%";
    }

    let countExplanation = "";
    let percentExplanation = "";
    if (tableID === "table0") {
        countExplanation = "Number of times the letter appears in the text"
        percentExplanation = "Percent of all all letters in the text that are this letter"
    }
    else if (tableID === "table1") {
        countExplanation = "Number of words that contain the letter"
        percentExplanation = "Percent of all words that contain the letter"
    }
    const countText = '<div class="tooltip">Count (?)<span class="tooltiptext">' + countExplanation + '</span></div>'
    const percentText = '<div class="tooltip">Percentage (?)<span class="tooltiptext">' + percentExplanation + '</span></div>'
    table.insertRow(0).innerHTML = "<th>Letter</th><th>" + countText + "</th><th>" + percentText + "</th>";
    if (tableID === "table0") {
        table.insertRow(0).innerHTML = "<th colspan='3'>Number of appearances</th>";
    }
    else if (tableID === "table1") {
        table.insertRow(0).innerHTML = "<th colspan='3'>Appearance per word</th>";
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
    else if (inputType === "file") {
        const fileInput = document.getElementById("file").files[0];
        if (fileInput) {
            const reader = new FileReader();
            reader.onload = function() {
                processTextInput(reader.result);
            }
            reader.readAsText(fileInput);
        } else {
            console.error("No file selected");
        }
    }
}

function processTextInput(textInput) {
    const letterCountResults0 = countLetters(textInput, 0);
    const letterCountResults1 = countLetters(textInput, 1);

    displayLetterCount(letterCountResults0, "table0");
    displayLetterCount(letterCountResults1, "table1");
}

function toggleTextInputType() {
    const inputType = document.getElementById("inputType").value;
    const textInput = document.getElementById("textInput");
    const linkInput = document.getElementById("linkInput");
    const fileInput = document.getElementById("fileInput");

    textInput.style.display = "none";
    linkInput.style.display = "none";
    fileInput.style.display = "none";
    if (inputType === "text") {
        textInput.style.display = "block";
    } else if (inputType === "link") {
        linkInput.style.display = "block";
    } else if (inputType === "file") {
        fileInput.style.display = "block";
    }
}