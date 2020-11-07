import PentaNodeList from './penta_node_list.js';

export const getCharFreq = (text) => {
  const charFreq = {};
  for(let i = 0; i < text.length; i++) {
    let c = text.charAt(i);
    if (charFreq.hasOwnProperty(c)) {
      charFreq[c] += 1;
    } else {
      charFreq[c] = 1;
    }
  }
  return charFreq;
};

const charBinAt = (str, idx) => {
  return padEightBits(str.charCodeAt(idx).toString(2));
};

export const charToBin = (ch) => {
  return padEightBits(ch.charCodeAt(0).toString(2));
};

const stringToBin = (str) => {
  let binString = "";
  for (let i = 0; i < str.length; i++) {
    binString = binString.concat(charToBin(str.charAt(i)));
  }
  return binString;
};

const padEightBits = (bin) => {
  const numLeadingZeros = 8 - bin.length;
  return "0".repeat(numLeadingZeros).concat(bin);
};

export const padToNBIts = (bin, n) => {
  const numLeadingZeros = n - bin.length;
  if (numLeadingZeros < 0) {
    console.log(`bin: ${bin}\nnumBits: ${n}`);
  }
  return "0".repeat(numLeadingZeros).concat(bin);
};

const charToName = (ch) => {
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

export const rootToJson = (root) => {
  if (root.isLeaf()) {
    return {
      name: root.name,
      // id: root.name,
      count: root.count,
      children: null,
    };
  } else {
    return {
      name: root.name,
      // id: root.name,
      count: root.count,
      children: [
        rootToJson(root.leftChild),
        rootToJson(root.rightChild)
      ],
    };
  }
};
