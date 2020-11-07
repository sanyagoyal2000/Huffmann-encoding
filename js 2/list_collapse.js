import { appData } from './data.js';

const passage = appData.passage;
const charFreq = appData.charFreq;

export const setTreeTransformView = () => {
  let data = dataFromCountObject(charFreq);
  update(data);
  return () => {
    data = nextTreeState(data);
    update(data);
    if (data.length <= 1) {
      return true;
    }
    return false;
  };
};

export const update = (data) => {
  let nodes = d3.select(".freq-node-container").selectAll(".freq-node").data(data, function(d) { return d.name; });

  nodes.style("order", function(d) { return -1 * d.count; });
  nodes.select(".freq-count").text(function(d) { return d.count; });

  let enterSelection = nodes.enter().append("div").classed("freq-node", true);
  enterSelection.append("div").classed("freq-name", true).text(function(d) { return d.name; });
  enterSelection.append("div").classed("freq-count", true).text(function(d) { return d.count; });
  enterSelection.style("order", function(d) { return -1 * d.count; });

  nodes.exit().remove();
};

const dataCompare = (a, b) => {
  return (b.count - a.count);
};

export const dataFromCountObject = (obj) => {
  let keys = Object.keys(obj);
  let data = [];
  keys.forEach((key) => {
    data.push({name: key, count: obj[key]});
  });
  return data.sort(dataCompare);
};

export const hierarchyFromData = (data) => {
  switch (data.length) {
    case 0:
      return {};
    default:
      return {
        name: data[0].name,
        count: data[0].count,
        children: [
          hierarchyFromData(data.slice(1))
        ],
      };
  }
};

export const nextTreeState = (data) => {
  let z = data.pop();
  let y = data.pop();
  let parent = { name: y.name.concat(z.name), count: y.count + z.count };
  data.push(parent);

  return data.sort(dataCompare);
};
