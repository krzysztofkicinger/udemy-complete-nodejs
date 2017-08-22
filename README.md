# udemy-complete-nodejs

## Popular npm packages

* lodash - library with useful methods
* nodemon - entry point for the application that watches for changes and redeploys if necessary


## Input arguments

* Use: **process.argv** - arguments array passed to the node object
* yargs - library for parsing and passing arguments to node applications

## Debugging NodeJS App

Use: **node inspect <file>**

Commands in the debug mode:
* n - go to the next statement
* c - continue
* repl - go the interactive mode that enables variables evaluation

In the file:
* debugger; - sets breakpoint within a program

## Debugging NodeJS App using Chrome Dev Tools

1. Run application using: **node --inspect-brk <file>** (nodemon can be use always)
2. Go to the: chrome://inspect (in chrome)
3. Check Remote Target section and find application currently running