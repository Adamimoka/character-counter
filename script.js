function countLetters(text, appearanceMode, characterMode, countMode) {
    // text: a string of text to count the letters in
    // appearanceMode 0: Counts Number of appearances (in "that": 't' is 2)
    // appearanceMode 1: Counts letter appearance per word (in "that": 't' is 1)
    // characterMode: controls which characters to count
    // countMode: controls what to count (letter, bigram, trigram)
    
    text = text.split(/\s+/); // Split the text into words

    let letterCount = {};
    let letterFraction = {};
    let totalLettersOrWords = 0;

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
        if (countMode == 'letter') {
            for (const word of text) {
                for (const letter of word) {
                    if (letter in letterCount) {
                        letterCount[letter] += 1;
                    } else {
                        letterCount[letter] = 1;
                    }
                    totalLettersOrWords++;
                }
            }
            for (const letter in letterCount) {
                letterFraction[letter] = letterCount[letter] / totalLettersOrWords;
            }
        }
        else if (countMode == 'bigram'){
            for (const word of text) {
                if (word.length < 2) {
                    continue;
                }
                for (let i = 0; i < word.length - 1; i++) {
                    const bigram = word[i] + word[i+1];
                    if (bigram in letterCount) {
                        letterCount[bigram] += 1;
                    } else {
                        letterCount[bigram] = 1;
                    }
                    totalLettersOrWords++;
                }
            }
            for (const letter in letterCount) {
                letterFraction[letter] = letterCount[letter] / totalLettersOrWords;
            }
        }
        else if (countMode == 'trigram'){
            for (const word of text) {
                if (word.length < 3) {
                    continue;
                }
                for (let i = 0; i < word.length - 2; i++) {
                    const trigram = word[i] + word[i+1] + word[i+2];
                    if (trigram in letterCount) {
                        letterCount[trigram] += 1;
                    } else {
                        letterCount[trigram] = 1;
                    }
                    totalLettersOrWords++;
                }
            }
            for (const letter in letterCount) {
                letterFraction[letter] = letterCount[letter] / totalLettersOrWords;
            }
        }
    } else {
        if (countMode == 'letter') {
            for (const word of text) {
                let seenLetters = new Set();
                for (const letter of word) {
                    if (seenLetters.has(letter)) {
                        continue;
                    }
                    seenLetters.add(letter);
                    if (letter in letterCount) {
                        letterCount[letter] += 1;
                    } else {
                        letterCount[letter] = 1;
                    }
                }
                totalLettersOrWords++;
            }
            for (const letter in letterCount) {
                letterFraction[letter] = letterCount[letter] / totalLettersOrWords;
            }
        }
        else if (countMode == 'bigram'){
            for (const word of text) {
                if (word.length < 2) {
                    totalLettersOrWords++;
                    continue;
                }
                let seenBigrams = new Set();
                for (let i = 0; i < word.length - 1; i++) {
                    const bigram = word[i] + word[i+1];
                    if (seenBigrams.has(bigram)) {
                        continue;
                    }
                    seenBigrams.add(bigram);
                    if (bigram in letterCount) {
                        letterCount[bigram] += 1;
                    } else {
                        letterCount[bigram] = 1;
                    }
                }
                totalLettersOrWords++;
            }
            for (const letter in letterCount) {
                letterFraction[letter] = letterCount[letter] / totalLettersOrWords;
            }
        }
        else if (countMode == 'trigram'){
            for (const word of text) {
                if (word.length < 3) {
                    totalLettersOrWords++;
                    continue;
                }
                let seenTrigrams = new Set();
                for (let i = 0; i < word.length - 2; i++) {
                    const trigram = word[i] + word[i+1] + word[i+2];
                    if (seenTrigrams.has(trigram)) {
                        continue;
                    }
                    seenTrigrams.add(trigram);
                    if (trigram in letterCount) {
                        letterCount[trigram] += 1;
                    } else {
                        letterCount[trigram] = 1;
                    }
                }
                totalLettersOrWords++;
            }
            for (const letter in letterCount) {
                letterFraction[letter] = letterCount[letter] / totalLettersOrWords;
            }
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
        cell3.innerHTML = (letterFractionResults[letter]*100).toPrecision(4) + "%";
    }

    let countExplanation = "";
    let percentExplanation = "";
    const letterName = document.getElementById("countMode").value;
    if (tableID === "table0") {
        countExplanation = `Number of times the ${letterName} is in the text`
        percentExplanation = `Percent of ${letterName}s that are this ${letterName}`
    }
    else if (tableID === "table1") {
        countExplanation = `Number of words that contain the ${letterName}`
        percentExplanation = `Percent of words that contain the ${letterName}`
    }
    const countText = '<div class="tooltip">Count<span class="tooltiptext">' + countExplanation + '</span></div>'
    const percentText = '<div class="tooltip">Percentage<span class="tooltiptext">' + percentExplanation + '</span></div>'
    table.insertRow(0).innerHTML = `<th>${letterName[0].toUpperCase() + letterName.substring(1)}</th><th>` + countText + "</th><th>" + percentText + "</th>";
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
            console.warn("Invalid URL");
            alert("ERROR: Invalid URL");
            return;
        }
        fetch(linkInput)
            .then(response => response.text())
            .then(text => processTextInput(text))
            .catch(error => {
                console.error(error);
                alert("ERROR: " + error.message);});
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
            console.warn("No file selected");
            alert("ERROR: No file selected");
            return
        }
    }
    else if (inputType === "sample") {
        let linkInput = '';
        if (document.getElementById("sample1").checked) {
            linkInput = "https://raw.githubusercontent.com/Adamimoka/letter-frequencies/refs/heads/main/samples/words_alpha.txt"
        }
        else if (document.getElementById("sample2").checked) {
            linkInput = "https://raw.githubusercontent.com/Adamimoka/letter-frequencies/refs/heads/main/samples/common_words.txt"
        }
        else if (document.getElementById("sample3").checked) {
            linkInput = "https://raw.githubusercontent.com/Adamimoka/letter-frequencies/refs/heads/main/samples/the_raven.txt"
        }
        else {
            console.warn("No sample selected");
            alert("ERROR: No sample selected");
            return;
        }

        fetch(linkInput)
            .then(response => response.text())
            .then(text => processTextInput(text))
            .catch(error => {
                console.error(error);
                alert("ERROR: " + error.message);});
    }
}

function processTextInput(textInput) {
    
    const characterMode = document.getElementById("characterMode").value;
    const countMode = document.getElementById("countMode").value;

    const letterCountResults0 = countLetters(textInput, 0, characterMode, countMode);
    const letterCountResults1 = countLetters(textInput, 1, characterMode, countMode);

    displayLetterCount(letterCountResults0, "table0");
    displayLetterCount(letterCountResults1, "table1");
}

function toggleTextInputType() {
    const inputType = document.getElementById("inputType").value;
    const textInput = document.getElementById("textInput");
    const linkInput = document.getElementById("linkInput");
    const fileInput = document.getElementById("fileInput");
    const sampleInput = document.getElementById("sampleInput");

    textInput.style.display = "none";
    linkInput.style.display = "none";
    fileInput.style.display = "none";
    sampleInput.style.display = "none";
    if (inputType === "text") {
        textInput.style.display = "block";
    } else if (inputType === "link") {
        linkInput.style.display = "block";
    } else if (inputType === "file") {
        fileInput.style.display = "block";
    } else if (inputType === "sample") {
        sampleInput.style.display = "block";
    }
}