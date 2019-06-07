# Typeshift (see http://www.playtypeshift.com/)

## Page architecture
- body background
- header : title of the game
- main : game 
    -  one main row
    - adaptive rows and columns
    - buttons to shift cell
    - highlight when a 

- horizontal nav (footer): 
     - number of points (short word : 1, long word 2, rare word 3)
     - timer
     - the number of words to find 

## Creating the db
- uses the Merriam-Webster dictionary as its source, 
    - see the API : https://dictionaryapi.com/register/index
    - https://dictionaryapi.com/api/v3/references/collegiate/json/test?key=4ece7640-89cf-4eae-a74d-f2097bf8045f
    - https://github.com/matthewreagan/WebstersEnglishDictionary
    - https://raw.githubusercontent.com/words/an-array-of-english-words/master/corpus/originals.txt
    - https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary.json
- use the library underscore : https://underscorejs.org/
- generate the pseudo words

## Rules / the logic 
- Main rule put simply : "You have a finite amount of letters to work with, and with each position being limited to a handful of letters, that narrows things down even further. "
- for a set of letters, compute all possible permutations to generate a list of valid words, each letter of the set has a specific, fixed index, 

- There’s no penalty for trying out a word that doesn’t exist, save the time spent on entering it in. 
- The game does keep track of your time on each stage, so that’s of some concern if you’re into that kind of thing. If you just want to clear the levels themselves, there’s nothing to discourage guessing like wild.

## Levels of difficulty :
- the lesser the number of letter in the central position (ie the length of all common words), the easist
- the lesser, the number of letters in each position, the easiest it is

## Code architecture : 
- css
    - styles.css
- js (DOM)
- src 
    - logic
    - data : 
        - array of objects of pseudo words strings
        - array of objects correponding to possible word combinations

- index.html (main page)
- readme.md (instrcutions on the github repo)
- (if time) spec
- (if time) deploiement 


## CSS / UX

- API drag and drop : 
    - https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/1922434-le-drag-drop
    - https://developer.mozilla.org/fr/docs/Web/API/API_HTML_Drag_and_Drop/Op%C3%A9rations_de_glissement
    - https://developer.mozilla.org/fr/docs/Web/API/API_HTML_Drag_and_Drop
    - Guillaume a un bout de code de drag and drop pour le jeu du baggamon


