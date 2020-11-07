import PentaNodeList from './penta_node_list';
import { rootToJson } from './util';
import { appData } from './data';
import { hierarchyFromData, dataFromCountObject } from './list_collapse';

const passage = appData.passage;

const charFreq = appData.charFreq;

$(() => {
  let linkedList = new PentaNodeList(charFreq);
  linkedList.getPentaNodeTree();
  let treeView = new HuffTree(linkedList, 789, 450);
});

// Code for creating and drawing tree modified from:
// http://bl.ocks.org/d3noob/8375092

class HuffTree {
  constructor(data, width, height) {
    this.svg = d3.select("#huff-tree-done").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate("
          + "0" + "," + "20" + ")");

    this.width = width;
    this.height = height;

    this.duration = 750; //ms
    this.i = 0;

    this.treemap = d3.tree().size([width, height]);

    this.root = d3.hierarchy(data.toHierarchyObject(), function(d) {
      return d.children;
    });

    this.root.x0 = width / 2;
    this.root.y0 = 0;

    this.leaves = this.treemap(this.root).leaves();

    this.update(this.root);

  }

  numLeaves() {
    return this.leaves.length;
  }

  setView(n) {
    this.update(this.root, n);
  }

  update(source, index) {
    let treeData = this.treemap(this.root);
    let nodes = treeData.descendants();
    let links = treeData.descendants().slice(1);

    nodes.forEach((d) => { d.y = d.depth * 40;});

    let node = this.svg.selectAll("g.node")
      .data(nodes, (d) => {
        return d.id || (d.id = ++this.i);
      });

    let nodeEnter = node.enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + (d.parent ? d.x : source.x) + "," + (d.parent ? d.y : source.y) + ")";
      })
      .on("mouseover", showPath)
      .on("mouseout", () => {
        this.update(this.root);
        resetDisplayCode();
      });

    nodeEnter.append('circle')
    .attr('class', 'node')
    .attr('r', 1e-6)
    .style("fill", function(d) {
      return d.children || d._children ? "lightsteelblue" : "#fff";
    });

    nodeEnter.append("text")
    .attr("dx", -5)
    .attr("y", function(d) {
      return d.children || d._children ? -23 : 23;
    })
    .attr("text-anchor", function(d) {
      return d.children || d._children ? "end" : "start";
    })
    .text(function(d) {
      if (!d.height) {
        switch (d.data.name) {
          case " ":
            return "[space]";
          case "\n":
            return "\n";
          default:
            return d.data.name;
        }
      } else {
        return "";
      }
    });

    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
    .duration(this.duration)
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
      return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


    // Remove any exiting nodes
    let nodeExit = node.exit().transition()
    .duration(this.duration)
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
    .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    let link = this.svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

    // Enter any new links at the parent's previous position.
    let linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        let o = {x: d.x, y: d.y};
        return diagonal(o, o);
      });

    // UPDATE
    let linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(this.duration)
      .attr('d', function(d){ return diagonal(d, d.parent); });

    // Remove any exiting links
    let linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal(o, o);
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
      let path = `M ${s.x} ${s.y}
      L
      ${d.x} ${d.y}`;

      return path;
    }

    // Highlight node's path
    function showPath(d) {
      let ids = d.ancestors().map((n) => n.id);
      let c = d3.selectAll("circle.node");
      c.filter((f) => {
        return ids.includes(f.id);
      }).style("fill", "yellow");
      displayHuffmanCode(d.data.name, getHuffmanCode(d));
    }

    // Return tree node's Huffman code
    function getHuffmanCode(d) {
      const path = [];
      const fromRoot = d.ancestors().reverse();
      for(let i = 1; i < fromRoot.length; i++) {
        if(fromRoot[i - 1].children[0] === fromRoot[i]) {
          path.push("0");
        } else {
          path.push("1");
        }
      }
      return path.join("");
    }
  }

  getHuffmanCodeTable(r) {
    const huffmanTable = [];
    let leafNodes = r.leaves();
    // debugger
    leafNodes.forEach(
      (leaf) => {
        // debugger
        huffmanTable.push(
          {
            symbol: leaf.data.name,
            hCode: this.getHuffmanCode(leaf),
            frequency: leaf.data.count,
            node: leaf,
          }
        );
      }
    );
    return huffmanTable;
  }

  highlightRow(name) {
    d3.select(".huff-table-body").selectAll("tr").filter(function(row) {
      console.log(row);
      // return true;
      return row["symbol"] !== name;
    }).style("background-color", "white");
    d3.select(".huff-table-body").selectAll("tr").filter(function(row) {
      console.log(row);
      // return true;
      return row["symbol"] === name;
    }).style("background-color", "yellow");
  }
}

const huffDictionaryFromData = (data) => {
  const dict = {};
  data.forEach(
    (datum) => {
      dict[datum.symbol.toString()] = datum.hCode;
    }
  );
  return dict;
};

const resetDisplayCode = () => {
  $(".sym-name").text("Mouse over a node to see its Huffman code.");
  $(".sym-code").text("");
};

const displayHuffmanCode = (name, code) => {
  $(".sym-name").text(`${name}:`);
  $(".sym-code").text(code);
};

export default HuffTree;
