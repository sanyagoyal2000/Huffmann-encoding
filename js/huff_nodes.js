import PentaNodeList from './penta_node_list';
import { rootToJson } from './util';
import { appData } from './data';
import { hierarchyFromData, dataFromCountObject } from './list_collapse';

const passage = appData.passage;

const charFreq = appData.charFreq;

$(() => {
  let linkedList = new PentaNodeList(charFreq);
  let treeView = new HuffmanTreeView(linkedList, 800, 677);
});

// Code for creating and drawing tree modified from:
// http://bl.ocks.org/d3noob/8375092

class HuffmanTreeView {
  constructor(data, width, height) {
    this.svg = d3.select("#huff-nodes").append("svg")
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

    this.collapsed = [];

    this.update(this.root);
    let timer = setInterval(()=> {
      this.root = d3.hierarchy(data.nextMorphState(), function(d) {
        return d.children;
      });

      this.root.x0 = width / 2;
      this.root.y0 = 0;
      this.update(this.root);
      if (data.isTree()) {
        clearInterval(timer);
      }
    }, 1000);

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
        return d.id || (d.id = d.name);
      });

    let nodeEnter = node.enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) {
        return "translate(" + (d.parent ? d.x : source.x) + "," + (d.parent ? d.y : source.y) + ")";
      })
      .on("click", click.bind(this));

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
      return d.data.name.length > 1 ? d.data.count : d.data.name;
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
}

export default HuffmanTreeView;
