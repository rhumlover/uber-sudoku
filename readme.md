# My Uber Sudoku

## Specs

- This sudoku has to work without the need of a server. It will store state directly in the browser. It has to work online, of course, but can be launched 'locally' too.

The stack:  

- `HTML5`  
- `CSS3` with `SASS`  
- `Pure JavaScript` with the help of some libraries:  
  * `Lodash` for calculations, objects and collections helpers  
  * `PubSub-js` for publish/subscribe logic  
- `Gulp` as task manager: local server, livereload, assets compilation


## Design

It has to be very simple: a **splash screen**, allowing the user to (1) create a new game (2) restore a previous game (if a previous unfinished game has been played).

Then, we go to the **board screen**: it displays the sudoku grid (9x9 by default) and, close, 9 buttons with numbers from 1 to 9.
The user has to click/tap on a cell in the grid to enable the buttons. If no cell is selected, the buttons are disabled.

Once the user completes a sudoku, a warm congratulations message appears.

## Improvements

If the time permits, it'd be super cool to add these features:

- remember the number of games played and wins
- remember how much time the user played
- an app manifest for running it offline
- a board generator
- upload the sources/assets to a cdn on build
- also use webpack for images, css and SASS (currently only using for JS)

## Tech Stack

### HTML

I'd love to use the Web Components, or Polymer for such a project. It would be super cool and help a lot to organize your UI components, but it's out-of-the scope. We need to organize our JavaScript and CSS separately, while Web Components encapsulate these two notions.

### JavaScript

I'll organize my code following the **CommonJS** pattern, and build my application with [Webpack](http://webpack.github.io/), a famous module bundler.

##### Why modules instead of a bunch of methods into a big one file, especially for such a tiny app?
Organizing an app with modules helps you having a code with separate concerns, each file following the single-responsability principle. It makes your code much more maintainable, and I'm thinking about future, or teamwork. You might want to run som tests and to divide the work between your team, so separate the components is the way to go.

##### Why CommonJS over AMD, or simplier, namespaces?
Even if CommonJS was designed for the server at first, it has, for me, a much simpler and nicer syntax to use. Plus, we don't really need the asynchronous module loading that AMD provides, because we'll bundle our app into one file at the end, so all modules will just have to be declared and loaded. We could totally separate our app into asynchronously loaded modules, but we wouldn't need them on-the-fly. It's 'package' divided, one product at-a-time, not one functionality at-a-time.

JavaScript modules:



##### Board
- init()
- isResolved()

### CSS

SASS will power an OOCSS-based application. I'll organize my code thinking of my UI components, will separate **structure** from **skin**, and **containers** from **content**.

I'll basically have several components here (structure):

- screen
- header
- sudoku grid
- button bar
- button

Serving several contents:

##### Spash screen
- 1 screen
- `new game` and `restore game` buttons

##### Board screen
- 1 screen
- 1-9 button bar
- 1-9 buttons
- `reset board` button
- `quit game` button

## Decisions
- Every UI Object is an eventreceiver
- No DOM reference is stored outside a view. Allows it to be garbage collected when unloaded 