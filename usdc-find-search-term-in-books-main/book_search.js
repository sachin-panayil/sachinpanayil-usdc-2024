/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    // Iterate through each book in scannedTextObj if there is a search term available and there are books available
    if (searchTerm.length > 0 && scannedTextObj.length > 0) {
        for (let book of scannedTextObj) {
            // If there is no content in the book, we move to the next book
            if (book.Content.length == 0) { continue }

            // Iterate through content in the book
            for (let pageContent of book.Content) {
                // Check if the search term is in text
                if (pageContent.Text.includes(searchTerm)) {
                    // If so, add the result to the results
                    result.Results.push({
                        "ISBN": book.ISBN,
                        "Page": pageContent.Page,
                        "Line": pageContent.Line
                    });
                }
            }
        }
    }
        
    // Add search term to results no matter what
    result.SearchTerm = searchTerm
    return result;
}


/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** Example multiple books input object */
const multipleBooksIn = [
    twentyLeaguesIn[0],
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "97800528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
];

/** Example empty content input object */
const emptyContentIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "97800528531",
        "Content": [] 
    }
];

/** Example half empty content input object */
const halfEmptyContentIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "97800528531",
        "Content": [] 
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "97800528531321",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            }
        ]
    }
];

/** Example empty book input object */
const emptyBookIn = [];
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** Unit Testing Functions */
function test(message, fn) {
    console.log(`Test: ${message}`);
    try {
        fn();
        console.log('Pass! :)');
    } catch (error) {
        console.log(`Fail: ${error.message} :(`);
    }
}

function assertEquals(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`${message}: Expected ${expected}, but got ${actual}`);
    }
}

function assertTrue(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

/**  Test 1: Positive Match */
test('Intentonal Positive Match', () => {
    const result = findSearchTermInBooks("the", twentyLeaguesIn);
    assertEquals(JSON.stringify(result), JSON.stringify(twentyLeaguesOut), 'Should match example output object');
});

/** Test 2: Equal Number of Results */
test('Equal Number of Results', () => {
    const result = findSearchTermInBooks("I", twentyLeaguesIn); 
    assertEquals(result.Results.length, 1, 'Should return one result');
});

/** Test 3: Intentonal Negative Match */
test('Intentonal Negative Match', () => {
    const result = findSearchTermInBooks("random", twentyLeaguesIn);
    assertEquals(result.Results.length, 0, 'Should return no results');
});

/** Test 4: Multiple Results */
test('Multiple Results', () => {
    const result = findSearchTermInBooks("and", twentyLeaguesIn); 
    assertTrue(result.Results.length > 1, 'Should return multiple results');
});

/** Test 5: Case Sensitivity */
test('Case Sensitivity', () => {
    const result = findSearchTermInBooks("The", twentyLeaguesIn);
    assertTrue(result.Results.length > 0, 'Should return 2 results');
});

/** Test 6: Special Characters */
test('Special Characters', () => {
    const result = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
    assertTrue(result.Results.length > 0, 'Should return results for a term with special characters');
});

/** Test 7: Empty Search Term */
test('Empty Search Term', () => {
    const result = findSearchTermInBooks("", twentyLeaguesIn);
    assertEquals(result.Results.length, 0, 'Should return no results for an empty search term');
});

/** Test 8: Multiple Books */
test('Search Across Multiple Books', () => {
    const result = findSearchTermInBooks("the", multipleBooksIn); 
    assertTrue(result.Results.length > 1 && result.Results.some(r => r.ISBN !== twentyLeaguesIn[0].ISBN), 'Should find results in multiple books');
});

/** Test 9: Empty Content */
test('Book With Empty Content', () => {
    const result = findSearchTermInBooks("the", emptyContentIn); 
    assertEquals(result.Results.length, 0, 'Should return no results for a book with empty content');
});

/** Test 10: Empty Book */
test('Empty Book Array', () => {
    const result = findSearchTermInBooks("the", emptyBookIn); 
    assertEquals(result.Results.length, 0, 'Should return no results for an empty book array');
});
