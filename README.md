## Shipping Assignment Coding Challenge

### How to run

-    Make sure node is installed
-    Clone repo `gh repo clone timsorweid/shipping-assignment`
-    Run the application `npm run start`
-    If you want to run the application on different input files, be sure to update the start script in `package.json`

### Running tests

`npm test`

### Assumptions

-    For the sake of counting vowels and consonants in names, the letter y is treated as a vowel
-    For the length of driver names, the space between names is removed
-    For the length of street names, only the street name is used. The numeric address and unit type and number are ignored
-    For the length of street names, any spaces inside the street names are removed

### Areas for feedback

-    Does it make sense for the secret algorithm to be in its own class, the way I did it?
-    Should I separate out global values into their own file, e.g. units array? I left them in SecretAlgorithm.js
-    For functions which exist outside of a class, where is the best place for them? I put them in various helper files
-    Is there a better way stylistically to break up the work? Does it matter computationally for this project?
-    Am I using getters correctly or should these be methods instead?
-    What other more complicated tests could I have written?
