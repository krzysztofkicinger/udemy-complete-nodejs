# udemy-complete-nodejs

## Note App (console app that stores notes in the file - fs, lodash, nodemon, os, yargs)

### Popular npm packages

* lodash - library with useful methods
* nodemon - entry point for the application that watches for changes and redeploys if necessary


### Input arguments

* Use: **process.argv** - arguments array passed to the node object
* yargs - library for parsing and passing arguments to node applications

### Debugging NodeJS App

Use: **node inspect <file>**

Commands in the debug mode:
* n - go to the next statement
* c - continue
* repl - go the interactive mode that enables variables evaluation

In the file:
* debugger; - sets breakpoint within a program

### Debugging NodeJS App using Chrome Dev Tools

1. Run application using: **node --inspect-brk <file>** (nodemon can be use always)
2. Go to the: chrome://inspect (in chrome)
3. Check Remote Target section and find application currently running

### Arrow Functions (object literals)

1. Arrow functions do not bind a **this** keyword (this corresponds to the parent binding!!)
2. Arrow functions do not bind an **arguments** variable

## Weather App 

### Async Basics - Call Stack

### Async Basics - Event Loop

### Callback functions

**Callback function** - function that is passed as an argument to another function that may be called
