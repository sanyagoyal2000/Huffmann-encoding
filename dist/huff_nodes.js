/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootToJson = exports.padToNBIts = exports.charToBin = exports.getCharFreq = undefined;

var _penta_node_list = __webpack_require__(1);

var _penta_node_list2 = _interopRequireDefault(_penta_node_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCharFreq = exports.getCharFreq = function getCharFreq(text) {
  var charFreq = {};
  for (var i = 0; i < text.length; i++) {
    var c = text.charAt(i);
    if (charFreq.hasOwnProperty(c)) {
      charFreq[c] += 1;
    } else {
      charFreq[c] = 1;
    }
  }
  return charFreq;
};

var charBinAt = function charBinAt(str, idx) {
  return padEightBits(str.charCodeAt(idx).toString(2));
};

var charToBin = exports.charToBin = function charToBin(ch) {
  return padEightBits(ch.charCodeAt(0).toString(2));
};

var stringToBin = function stringToBin(str) {
  var binString = "";
  for (var i = 0; i < str.length; i++) {
    binString = binString.concat(charToBin(str.charAt(i)));
  }
  return binString;
};

var padEightBits = function padEightBits(bin) {
  var numLeadingZeros = 8 - bin.length;
  return "0".repeat(numLeadingZeros).concat(bin);
};

var padToNBIts = exports.padToNBIts = function padToNBIts(bin, n) {
  var numLeadingZeros = n - bin.length;
  if (numLeadingZeros < 0) {
    console.log("bin: " + bin + "\nnumBits: " + n);
  }
  return "0".repeat(numLeadingZeros).concat(bin);
};

var charToName = function charToName(ch) {
  switch (ch) {
    case " ":
      return "space";
    case "\n":
      return "newline";
    case "\t":
      return "tab";
    default:
      return ch;
  }
};

var rootToJson = exports.rootToJson = function rootToJson(root) {
  if (root.isLeaf()) {
    return {
      name: root.name,
      // id: root.name,
      count: root.count,
      children: null
    };
  } else {
    return {
      name: root.name,
      // id: root.name,
      count: root.count,
      children: [rootToJson(root.leftChild), rootToJson(root.rightChild)]
    };
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _penta_node = __webpack_require__(3);

var _penta_node2 = _interopRequireDefault(_penta_node);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// (head) <-> (...nodes) <-> (tail)
var PentaNodeList = function () {
  function PentaNodeList(freqHash) {
    _classCallCheck(this, PentaNodeList);

    this.count = 0;
    this.head = new _penta_node2.default("head", 0);
    this.tail = new _penta_node2.default("tail", 0);
    this.tail.left = this.head;
    this.head.right = this.tail;
    var keys = Object.keys(freqHash);
    for (var i = 0; i < keys.length; i++) {
      var node = new _penta_node2.default(keys[i], freqHash[keys[i]]);
      this.insert(node);
    }
  }

  _createClass(PentaNodeList, [{
    key: 'insert',
    value: function insert(node) {
      var currNode = this.tail.left;
      while (currNode !== this.head) {
        if (currNode.count > node.count) {
          // insert to right of currNode
          node.left = currNode;
          node.right = currNode.right;
          currNode.right.left = node;
          currNode.right = node;
          this.count++;
          return;
        }
        currNode = currNode.left;
      }
      // insert to right of head
      node.left = currNode;
      node.right = currNode.right;
      currNode.right.left = node;
      currNode.right = node;
      this.count++;
    }
  }, {
    key: 'append',
    value: function append(node) {
      node.left = this.tail.left;
      node.right = this.tail;
      this.tail.left.right = node;
      this.tail.left = node;
    }
  }, {
    key: 'mergeLastTwo',
    value: function mergeLastTwo() {
      if (this.count > 1) {
        var last = this.pop();
        var nextToLast = this.pop();
        this.append(_penta_node2.default.merge(nextToLast, last));
      }
    }
  }, {
    key: 'combineLastTwo',
    value: function combineLastTwo() {
      if (this.count > 1) {
        var last = this.pop();
        var nextToLast = this.pop();
        this.insert(_penta_node2.default.merge(nextToLast, last));
      }
    }
  }, {
    key: 'pop',
    value: function pop() {
      if (this.count < 1) {
        return null;
      } else {
        var node = this.tail.left;
        this.tail.left = node.left;
        node.left.right = this.tail;
        node.left = null;
        node.right = null;
        this.count--;
        return node;
      }
    }
  }, {
    key: 'getPentaNodeTree',
    value: function getPentaNodeTree() {
      if (this.count < 1) {
        return null;
      } else if (this.count === 1) {
        return this.head.right;
      } else {
        while (this.count > 1) {
          this.combineLastTwo();
        }
        return this.head.right;
      }
    }
  }, {
    key: 'nextMorphState',
    value: function nextMorphState() {
      if (this.count > 1) {
        this.combineLastTwo();
        return this.toHierarchyObject();
      } else if (this.count === 1) {
        return this.toHierarchyObject();
      } else {
        return {};
      }
    }
  }, {
    key: 'toHierarchyObject',
    value: function toHierarchyObject() {
      if (this.isTree()) {
        return (0, _util.rootToJson)(this.head.right);
      } else {
        return this.leftToJson(this.head.right);
      }
    }
  }, {
    key: 'leftToJson',
    value: function leftToJson(node) {
      return {
        name: node.name,
        // id: node.name,
        count: node.count,
        children: node.right === this.tail ? [] : [this.leftToJson(node.right)]
      };
    }
  }, {
    key: 'isTree',
    value: function isTree() {
      return this.count === 1;
    }
  }, {
    key: 'isInOrder',
    value: function isInOrder() {
      var walker = this.head.right;
      var currCount = walker.count;
    }
  }]);

  return PentaNodeList;
}();

exports.default = PentaNodeList;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nToUBinInt = exports.getHuffHeader = exports.appData = undefined;

var _util = __webpack_require__(0);

var Util = _interopRequireWildcard(_util);

var _penta_node_list = __webpack_require__(1);

var _penta_node_list2 = _interopRequireDefault(_penta_node_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var appData = exports.appData = {
  passage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

var AppData = function AppData(text) {
  _classCallCheck(this, AppData);

  this.text = text;
  this.charFreq = Util.getCharFreq(this.text);
  this.linkedList = new _penta_node_list2.default(this.charFreq);
  this.rootNode = this.linkedList.getPentaNodeTree();
  this.huffDict = makeHuffDict(this.rootNode);
  this.huffHeader = getHuffHeader(this.charFreq);
};

appData["charFreq"] = Util.getCharFreq(appData.passage);
appData["huffDict"] = {};
appData["huffHeader"] = "";

var makeHuffDict = function makeHuffDict(rootNode) {
  var huffDict = {};
  var traverse = function traverse(node, code) {
    if (node.leftChild) {
      traverse(node.leftChild, code.concat("0"));
    }
    if (node.rightChild) {
      traverse(node.rightChild, code.concat("1"));
    }
    if (!node.leftChild && !node.rightChild) {
      huffDict[node.name] = code;
    }
  };
  traverse(rootNode, "");
  return huffDict;
};

var getHuffHeader = exports.getHuffHeader = function getHuffHeader(freq) {
  var headerElements = [];
  var symbols = Object.keys(freq);
  var fourByteLength = Util.padToNBIts(nToUBinInt(symbols.length), 32);
  headerElements.push(fourByteLength);

  var fourByteFour = Util.padToNBIts(nToUBinInt(4), 32);
  headerElements.push(fourByteFour);

  symbols.forEach(function (sym) {
    var fourByteFreq = Util.padToNBIts(nToUBinInt(freq[sym]), 32);
    headerElements.push('' + Util.charToBin(sym) + fourByteFreq);
  });
  return headerElements.join("");
};

var nToUBinInt = exports.nToUBinInt = function nToUBinInt(num) {
  switch (num) {
    case 0:
      return "00";
    case 1:
      return "01";
    case 2:
      return "10";
    case 3:
      return "11";
    default:
      return nToUBinInt(Math.floor(num / 2)).concat((num % 2).toString());
  }
};

exports.default = AppData;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PentaNode = function () {
  function PentaNode(name, count) {
    _classCallCheck(this, PentaNode);

    this.name = name;
    this.count = count;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
  }

  _createClass(PentaNode, [{
    key: "isLeaf",
    value: function isLeaf() {
      return !this.leftChild && !this.rightChild;
    }
  }, {
    key: "isLeftChild",
    value: function isLeftChild() {
      if (this.parent) {
        return this.parent.leftChild === this;
      } else {
        return false;
      }
    }
  }, {
    key: "getBirthOrder",
    value: function getBirthOrder() {
      if (this.parent.leftChild === this) {
        return 0;
      }
      if (this.parent.rightChild === this) {
        return 1;
      }
      return -1;
    }
  }, {
    key: "setLeft",
    value: function setLeft(node) {
      node.right = this;
      node.left = this.left;
      if (this.left) {
        this.left.right = node;
      }
      this.left = node;
    }
  }, {
    key: "setRight",
    value: function setRight(node) {
      node.right = this;
      node.left = this.left;
      if (this.left) {
        this.left.right = node;
      }
      this.left = node;
    }
  }, {
    key: "setLeftChild",
    value: function setLeftChild(node) {
      if (node) {
        if (node.parent) {
          var order = this.getBirthOrder();
          if (order === 0) {
            node.parent.leftChild = null;
          } else if (order === 1) {
            node.parent.rightChild = null;
          }
          node.parent = null;
        }
        node.parent = this;
      }
      this.leftChild = node;
    }
  }, {
    key: "setRightChild",
    value: function setRightChild(node) {
      if (node) {
        if (node.parent) {
          var order = this.getBirthOrder();
          if (order === 0) {
            node.parent.leftChild = null;
          } else if (order === 1) {
            node.parent.rightChild = null;
          }
          node.parent = null;
        }
        node.parent = this;
      }
      this.rightChild = node;
    }
  }], [{
    key: "merge",
    value: function merge(left, right) {
      var node = new PentaNode(left.name + right.name, left.count + right.count);
      node.leftChild = left;
      node.rightChild = right;
      left.parent = node;
      right.parent = node;
      return node;
    }
  }]);

  return PentaNode;
}();

exports.default = PentaNode;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextTreeState = exports.hierarchyFromData = exports.dataFromCountObject = exports.update = exports.setTreeTransformView = undefined;

var _data = __webpack_require__(2);

var passage = _data.appData.passage;
var charFreq = _data.appData.charFreq;

var setTreeTransformView = exports.setTreeTransformView = function setTreeTransformView() {
  var data = dataFromCountObject(charFreq);
  update(data);
  return function () {
    data = nextTreeState(data);
    update(data);
    if (data.length <= 1) {
      return true;
    }
    return false;
  };
};

var update = exports.update = function update(data) {
  var nodes = d3.select(".freq-node-container").selectAll(".freq-node").data(data, function (d) {
    return d.name;
  });

  nodes.style("order", function (d) {
    return -1 * d.count;
  });
  nodes.select(".freq-count").text(function (d) {
    return d.count;
  });

  var enterSelection = nodes.enter().append("div").classed("freq-node", true);
  enterSelection.append("div").classed("freq-name", true).text(function (d) {
    return d.name;
  });
  enterSelection.append("div").classed("freq-count", true).text(function (d) {
    return d.count;
  });
  enterSelection.style("order", function (d) {
    return -1 * d.count;
  });

  nodes.exit().remove();
};

var dataCompare = function dataCompare(a, b) {
  return b.count - a.count;
};

var dataFromCountObject = exports.dataFromCountObject = function dataFromCountObject(obj) {
  var keys = Object.keys(obj);
  var data = [];
  keys.forEach(function (key) {
    data.push({ name: key, count: obj[key] });
  });
  return data.sort(dataCompare);
};

var hierarchyFromData = exports.hierarchyFromData = function hierarchyFromData(data) {
  switch (data.length) {
    case 0:
      return {};
    default:
      return {
        name: data[0].name,
        count: data[0].count,
        children: [hierarchyFromData(data.slice(1))]
      };
  }
};

var nextTreeState = exports.nextTreeState = function nextTreeState(data) {
  var z = data.pop();
  var y = data.pop();
  var parent = { name: y.name.concat(z.name), count: y.count + z.count };
  data.push(parent);

  return data.sort(dataCompare);
};

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _penta_node_list = __webpack_require__(1);

var _penta_node_list2 = _interopRequireDefault(_penta_node_list);

var _util = __webpack_require__(0);

var _data = __webpack_require__(2);

var _list_collapse = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var passage = _data.appData.passage;

var charFreq = _data.appData.charFreq;

$(function () {
  var linkedList = new _penta_node_list2.default(charFreq);
  var treeView = new HuffmanTreeView(linkedList, 800, 677);
});

// Code for creating and drawing tree modified from:
// http://bl.ocks.org/d3noob/8375092

var HuffmanTreeView = function () {
  function HuffmanTreeView(data, width, height) {
    var _this = this;

    _classCallCheck(this, HuffmanTreeView);

    this.svg = d3.select("#huff-nodes").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + "0" + "," + "20" + ")");

    this.width = width;
    this.height = height;

    this.duration = 750; //ms
    this.i = 0;

    this.treemap = d3.tree().size([width, height]);

    this.root = d3.hierarchy(data.toHierarchyObject(), function (d) {
      return d.children;
    });

    this.root.x0 = width / 2;
    this.root.y0 = 0;

    this.leaves = this.treemap(this.root).leaves();

    this.collapsed = [];

    this.update(this.root);
    var timer = setInterval(function () {
      _this.root = d3.hierarchy(data.nextMorphState(), function (d) {
        return d.children;
      });

      _this.root.x0 = width / 2;
      _this.root.y0 = 0;
      _this.update(_this.root);
      if (data.isTree()) {
        clearInterval(timer);
      }
    }, 1000);
  }

  _createClass(HuffmanTreeView, [{
    key: 'numLeaves',
    value: function numLeaves() {
      return this.leaves.length;
    }
  }, {
    key: 'setView',
    value: function setView(n) {
      this.update(this.root, n);
    }
  }, {
    key: 'update',
    value: function update(source, index) {
      var treeData = this.treemap(this.root);
      var nodes = treeData.descendants();
      var links = treeData.descendants().slice(1);

      nodes.forEach(function (d) {
        d.y = d.depth * 40;
      });

      var node = this.svg.selectAll("g.node").data(nodes, function (d) {
        return d.id || (d.id = d.name);
      });

      var nodeEnter = node.enter().append("g").attr("class", "node").attr("transform", function (d) {
        return "translate(" + (d.parent ? d.x : source.x) + "," + (d.parent ? d.y : source.y) + ")";
      }).on("click", click.bind(this));

      nodeEnter.append('circle').attr('class', 'node').attr('r', 1e-6).style("fill", function (d) {
        return d.children || d._children ? "lightsteelblue" : "#fff";
      });

      nodeEnter.append("text").attr("dx", -5).attr("y", function (d) {
        return d.children || d._children ? -23 : 23;
      }).attr("text-anchor", function (d) {
        return d.children || d._children ? "end" : "start";
      }).text(function (d) {
        return d.data.name.length > 1 ? d.data.count : d.data.name;
      });

      var nodeUpdate = nodeEnter.merge(node);

      // Transition to the proper position for the node
      nodeUpdate.transition().duration(this.duration).attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

      // Update the node attributes and style
      nodeUpdate.select('circle.node').attr('r', 10).style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      }).attr('cursor', 'pointer');

      // Remove any exiting nodes
      var nodeExit = node.exit().transition().duration(this.duration).attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      }).remove();

      // On exit reduce the node circles size to 0
      nodeExit.select('circle').attr('r', 1e-6);

      // On exit reduce the opacity of text labels
      nodeExit.select('text').style('fill-opacity', 1e-6);

      // ****************** links section ***************************

      // Update the links...
      var link = this.svg.selectAll('path.link').data(links, function (d) {
        return d.id;
      });

      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('path', "g").attr("class", "link").attr('d', function (d) {
        var o = { x: d.x, y: d.y };
        return diagonal(o, o);
      });

      // UPDATE
      var linkUpdate = linkEnter.merge(link);

      // Transition back to the parent element position
      linkUpdate.transition().duration(this.duration).attr('d', function (d) {
        return diagonal(d, d.parent);
      });

      // Remove any exiting links
      var linkExit = link.exit().transition().duration(this.duration).attr('d', function (d) {
        var o = { x: source.x, y: source.y };
        return diagonal(o, o);
      }).remove();

      // Store the old positions for transition.
      nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {
        var path = 'M ' + s.x + ' ' + s.y + '\n      L\n      ' + d.x + ' ' + d.y;

        return path;
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        this.update(d);
      }
    }
  }]);

  return HuffmanTreeView;
}();

exports.default = HuffmanTreeView;

/***/ })
/******/ ]);
//# sourceMappingURL=huff_nodes.js.map