import * as Util from './util';
import PentaNodeList from './penta_node_list';

export const appData = {
  passage: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};

class AppData {
  constructor(text) {
    this.text = text;
    this.charFreq = Util.getCharFreq(this.text);
    this.linkedList = new PentaNodeList(this.charFreq);
    this.rootNode = this.linkedList.getPentaNodeTree();
    this.huffDict = makeHuffDict(this.rootNode);
    this.huffHeader = getHuffHeader(this.charFreq);
  }
}
appData["charFreq"] = Util.getCharFreq(appData.passage);
appData["huffDict"] = {};
appData["huffHeader"] = "";

const makeHuffDict = (rootNode) => {
  const huffDict = {};
  const traverse = (node, code) => {
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

export const getHuffHeader = (freq) => {
  const headerElements = [];
  let symbols = Object.keys(freq);
  let fourByteLength = Util.padToNBIts(nToUBinInt(symbols.length), 32);
  headerElements.push(fourByteLength);

  let fourByteFour = Util.padToNBIts(nToUBinInt(4), 32);
  headerElements.push(fourByteFour);

  symbols.forEach(
    (sym) => {
      let fourByteFreq = Util.padToNBIts(nToUBinInt(freq[sym]), 32);
      headerElements.push(`${Util.charToBin(sym)}${fourByteFreq}`);
    }
  );
  return headerElements.join("");
};

export const nToUBinInt = (num) => {
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

export default AppData;
