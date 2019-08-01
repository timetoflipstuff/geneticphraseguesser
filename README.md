# Genetic Phrase Guesser

This is a simple project I did overnight as an attempt to learn a bit about genetic algorithms. I might be too excited about something so simple but seeing a machine learn on its own is pretty fun, so I'm planning to fix a list of things here, and then jump straight to giving it a neat look via CSS or something.

## The ultimate goal

The ultimate goal is to make the algorithm guess the whole script of Bee Movie.

### The algorithm currently does:

1. match any phrase you type in the input field after you click the **Go!** button;
   - be careful about putting too many symbols in though, depending on your machine this good boy may have a hard time processing too much input data;
2. support uppercase, lowercase, special characters (#, $, %, ^ etc);
3. solve the [Navy Seals Copypasta(NSFW)](https://knowyourmeme.com/memes/navy-seal-copypasta) in under 8000 generations;
4. not support: {, }, /.


### To do:
* ~Fix stack overflow;~
  - ~Have it guess 300+ characters faster than a week(possibly by splitting the input string into separate 20-character strings);~
* ~Add ' and " support, probably;~
* Optimize the code;
* Give the good boy a better look.