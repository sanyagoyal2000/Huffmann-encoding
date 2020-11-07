## Huffman Coding Visualization

### Background

**[Huffman Coding](https://en.wikipedia.org/wiki/Huffman_coding)** is a commonly used encoding algorithm for lossless data compression. The process for generating the encoding scheme involves assigning fewer bits to more frequently used source symbols. This is done by generating a frequency table of symbols used in the source, ordering by frequency, and creating a binary tree based on that ordering.

This simulation will incorporate visualizations for the steps in the algorithm and feature a final side-by-side visualization of the compressed and uncompressed data.

### Functionality & MVP  

With this Huffman Encoding visualization, users will be able to see:

- [ ] How a text file is represented in ASCII
- [ ] How a frequency table of symbols is generated
- [ ] How a binary tree is created to create an optimal encoding
- [ ] A visual representation of the size of the data file before and after encoding

In addition, this project will include:

- [ ] A production README

### Wireframes

This app will consist of a single screen with step controls to proceed through the algorithm, and nav links to the Github and my LinkedIn.

[Wireframe](images/huffman-vis.svg)

### Architecture and Technologies

This project will be implemented with the following technologies:

- `JavaScript`, specifically,
- `d3.js` with `canvas` for visualization rendering,
- `Webpack` to bundle js files.

In addition to the entry file, there will be multiple scripts involved in this project:

`huff.js`: this script will handle the logic for creating and updating the necessary elements and rendering them to the screen.

`penta_node.js`, `penta_node_list.js`, `penta_node_tree.js`: these scripts will hold logic for the data structures used to implement a Huffman encoding.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and `d3.js` installed. Write a basic entry file and the bare bones of all scripts outlined above. Map out visual flow of algorithm. Learn the basics of `d3.js`. Goals for the day:

- Get a green bundle with `Browserify`
- Learn enough `d3.js` to render an object to the `HTML5 huff` element

**Day 2**: Dedicate this day to learning the `d3.js` API. First, build out the `penta_node` objects. Then, use `huff.js` to create and render at least the linked list of nodes. Build in the function for collapsing nodes into sub-trees. Goals for the day:

- Complete the `penta_node.js` and `penta_node_list.js` modules (constructor, insert, remove functions)
- Render a linked list the `HTML5 huff` using `huff.js`
- Make a visual animation for collapsing two nodes into a single parent node

**Day 3**: Finish the logic for collapsing the list into a single parent node. Add visual animation for expanding a single parent node into its sub-tree. Goals for the day:

- Export an `PentaNodeTree` object with correct type and handling logic
- Be able to generate code for a given symbol based on the tree structure.
- Have a functional tree on the frontend that can display the code for a given symbol node when clicked.


**Day 4**: Install the controls for the user to interact with the visualization. Style the frontend, making it intuitive to use. Goals for the day:

- Create controls for step forward, back, and through
- Have a styled `HTML huff`, nice looking controls and title


### Bonus features

There are some other enhancements to be made:

- [ ] Add option to upload text file or enter text in a form to be compressed.
