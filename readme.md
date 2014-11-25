# My Uber Sudoku

## Specs

- This sudoku has to work without the need of a server. It will store state directly in the browser. It has to work online, of course, but can be launched 'locally' too
- It has to work on the latest browsers (Firefox, Chrome, IE 10) and has to be mobile-friendly (modern chrome/ android browser/ iOS)
- An appealing UI. We might want to fancy a game, after all, an unfriendly design a day keeps the fun away

The stack:  

- `HTML5`  
- `CSS3` with the use of `SASS` as preprocessor
- `Pure JavaScript` with the help of some libraries:  
  * [Lodash](https://lodash.com) for calculations, objects and collections helpers  
  * [PubSub-js](https://github.com/mroderick/PubSubJS) for publish/subscribe logic  
  * [Director](https://github.com/flatiron/director) as our application routing handler
  * [FastClick](https://github.com/ftlabs/fastclick) to remove the 300ms delay when clicking on items on mobile
  * [Zepto](http://zeptojs.com/) as our 'jQuery' replacement. Lighter and faster
- `Gulp` as task manager: local server, livereload, assets compilation


## Design

It has to be very simple: a **start screen**, allowing the user to (1) create a new game (2) restore a previous game (if a previous unfinished game has been played).

Then, we go to the **board screen**: it displays the sudoku grid (9x9 by default) and, close, 9 buttons with numbers from 1 to 9.
The user has to click/tap on a cell in the grid to enable the buttons. If no cell is selected, the buttons have no effects.
Each time a user clicks on a cell, we show him a little help: even if he always can put any number, we will highlight him the available numbers he can put, based on its row, column and square.

If the user want to begin a new game, he always can hit the back button of his phone/ browser, or click on the header.

Once the user completes a sudoku, a warm congratulations message appears.


## Tech Stack

### HTML
I don't want the user to have a blank screen while loading the app, so I'll write the *start screen* html code directly in the index.html. We'll then can use a templating system to render the other screen(s).

I would have loved to use and enjoy the benefits of Web Components, or Polymer, but it's a complete different architecture. If our logic and styles live in two different places (JS and CSS) right now for the purpose of the exercise, Web Components encapsulate these two notions by itself.

### JavaScript

I'll organize my code following the **CommonJS** pattern, and build my application with [Webpack](http://webpack.github.io/), a famous module bundler.

##### Why modules instead of a bunch of methods into a big one file, especially for such a tiny app?
Organizing an app with modules helps you having a code with separate concerns, each file following the single-responsability principle. It makes your code much more maintainable, and I'm thinking about future, or teamwork. You might want to run som tests and to divide the work between your team, so separate the components is the way to go.

##### Why CommonJS over AMD, or simplier, namespaces?
Even if CommonJS was designed for the server at first, it has, for me, a much simpler and nicer syntax to use. Plus, we don't really need the asynchronous module loading that AMD provides, because we'll bundle our app into one file at the end, so all modules will just have to be declared and loaded. We could totally separate our app into asynchronously loaded modules, but we wouldn't need them on-the-fly. It's 'package' divided, one product at-a-time, not one functionality at-a-time.

#### The UI Component
It's the Controller of every separate interface object we want to handle. It's inspired by a Backbone View, with a main difference:

we are in a game, and communication between components is critical to have the best real-time experience. Therefore, I wanted to have a native 'global ear' to the components by allowing them to react to a Facade object, sort of an Application Mediator. We cannot know what could trigger every interaction (ex, we might want to monitor the elapsed time of all games, to count every victory), so having the Components reacting directly from the Facade will help.

While I wanted to not copy any existing framework, I tried, at first, to make some clean MVC functions, and made them listen to the DOM and to the Facade. It occurs that theses first prototypes were all doing the same thing, so I wanted to write a base class that would allow us to write the code more "declaratively", with less repeating `$(rootEl).on('click', ...)`

#### Board Model
It has to handle only the abstract matrix of the Sudoku. 0 dependencies, it doesn't know anything about who's instanciating it, who's playing with it, or anything about html. It's pure logic.

Two main methods are available to start with:

- `Board.create(size)`: create a new matrix game. For now, the result is always the same, but we have to take in account the possibility of creating a custom game, or generating a new one
- `Board.load()`: load an existing matrix

After its creation, the board provide several properties and methods:

- `board.matrix`: the two-dimensional array containing our Sudoku grid
- `board.isSolved()`: the big baby. Calculate if each row, column and square are valid
- `board.set(row, cell, value)`: fill a cell based on its coordinates
- `board.getRow(rowId)`: returns all row values based on its index (starts at 0)
- `board.getColumn(colId)`: returns all column values based on its index (starts at 0)
- `board.getSquare(row, cell)`: returns the square where the cell is living, based on its coordinates
- `board.availableValuesForCell(row, cell)`: a little helper. Returns all possible numbers that are non conflicting with the cell's row, cell or square


### CSS

SASS will power an OOCSS-based application. I'll organize my code thinking of my UI components, will separate **structure** from **skin**, and **containers** from **content**.

I'll basically have several components here (structure):

- screen
- header
- sudoku grid
- button bar
- button

Serving different contents:

##### Spash screen
- 1 screen
- `new game` and `restore game` buttons

##### Board screen
- 1 screen
- 1 button bar
- 1-9 buttons
- `reset board` button
- `quit game` button


## Possible Improvements

- a true "game" UI, with a perfect responsive mode. For instance, put the controls (keyboard) to the right of the board on landscape, it will allow the user to have the entire board displayed, with the buttons on the side
- a "tap" indicator whenever the user taps a button. It might even be smarter to actually use buttons and customize them, to enjoy the native features of a button element
- have a 100% responsive board size. Right now it's fixed cell sizes, but it would be awesome to have the board with and height automatically adapted based on the screen size

And, if the time permits, it'd be super cool to add these features:

- remember the number of games played and wins
- remember how much time the user played
- an app manifest for running it offline
- a board generator
- upload the sources/assets to a cdn on build

## ... and happy Sudoku to everyone!