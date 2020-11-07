import AppData, {appData} from './data';

const aData = new AppData(appData.passage);

const huffDict = aData.huffDict;
const charFreq = aData.charFreq;
const passage = aData.text;

const padToNBIts = (bin, n) => {
  const numLeadingZeros = n - bin.length;
  if (numLeadingZeros < 0) {
    console.log(`bin: ${bin}\nnumBits: ${n}`);
  }
  return "0".repeat(numLeadingZeros).concat(bin);
};

const charBinAt = (str, idx) => {
  return padEightBits(str.charCodeAt(idx).toString(2));
};

const charToBin = (ch) => {
  return padEightBits(ch.charCodeAt(0).toString(2));
};

const stringToBin = (str) => {
  let binString = "";
  for (let i = 0; i < str.length; i++) {
    binString = binString.concat(charToBin(str.charAt(i)));
  }
  return binString;
};

const stringToHuff = (str, dict) => {
  let binString = "";
  for (let i = 0; i < str.length; i++) {
    binString = binString.concat(dict[str.charAt(i)]);
  }
  return binString;
};

const padEightBits = (bin) => {
  const numLeadingZeros = 8 - bin.length;
  return "0".repeat(numLeadingZeros).concat(bin);
};


$(() => {
  let compression = Math.round((1 - (hh.length + stringToHuff(passage, huffDict).length) / ((passage.length) * 8))*10000) / 100;
  $("#compress-percent").text(compression);
  let index = 0;
  setView(index);
  let intervalId = 0;
  intervalId = setInterval(() => {
    if (index < passage.length) {
      setView(index++);
    } else {
      clearInterval(intervalId);
    }
  }, 200);
});

const setView = (index) => {
  let textDocContents = thirdCursorTextDocHtml(passage, index);
  let asciiDocContents = cursorAsciiDocHtml(passage, index);
  let huffDocContents = cursorHuffDocHtml(passage, index);
};

const thirdCursorTextDocHtml = (txt, charIndex) => {
  const docHtml = $("#text-doc-third");
  const pre = $("<span>");
  pre.addClass("pre-text");
  const cur = $("<span>");
  cur.addClass("cursor");
  const post = $("<span>");

  pre.text(txt.substring(0, charIndex));
  cur.text(txt.charAt(charIndex));
  post.text(txt.substring(charIndex + 1));
  docHtml.html(pre);
  docHtml.append(cur);
  docHtml.append(post);

  $(".char-count").text((charIndex + 1).toString());

  return docHtml;
};

const cursorAsciiDocHtml = (txt, charIndex) => {
  const docHtml = $("#bin-doc-third");
  const pre = $("<span>");
  pre.addClass("pre-text");
  const cur = $("<span>");
  cur.addClass("cursor");
  const post = $("<span>");
  post.addClass("post-text");

  let pText = stringToBin(txt.substring(0, charIndex));
  let cText = charIndex >= txt.length ? " " : charToBin(txt.charAt(charIndex));
  pre.text(pText);
  cur.text(cText);
  post.text(txt.substring(charIndex + 1));

  $(".bit-count").text((pText.length + cText.length).toString());

  docHtml.html(pre);
  docHtml.append(cur);
  // docHtml.append(post);

  docHtml.scrollTop(docHtml[0].scrollHeight - docHtml[0].clientHeight);
  return docHtml;
};

const cursorHuffDocHtml = (txt, charIndex) => {
  const docHtml = $("#huff-doc-third");
  const pre = $("<span>");
  pre.addClass("pre-text");
  const cur = $("<span>");
  cur.addClass("cursor");
  const post = $("<span>");

  let pText = stringToHuff(txt.substring(0, charIndex), huffDict);
  let cText = huffDict[txt.charAt(charIndex)];
  $(".huff-bit-count").text((hh.length + pText.length + cText.length).toString());
  pre.text(pText);
  cur.text(cText);

  docHtml.html(hh);
  docHtml.append(pre);
  docHtml.append(cur);
  docHtml.append(post);

  docHtml.scrollTop(docHtml[0].scrollHeight - docHtml[0].clientHeight);
  return docHtml;
};

const nToUBinInt = (num) => {
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

const getHuffHeader = (dict, freq) => {
  const headerElements = [];
  let symbols = Object.keys(dict);
  let fourByteLength = padToNBIts(nToUBinInt(symbols.length), 32);
  headerElements.push(fourByteLength);

  let fourByteFour = padToNBIts(nToUBinInt(4), 32);
  headerElements.push(fourByteFour);

  symbols.forEach(
    (sym) => {
      let fourByteFreq = padToNBIts(nToUBinInt(freq[sym]), 32);
      headerElements.push(`${charToBin(sym)}${fourByteFreq}`);
    }
  );
  return headerElements.join("");
};

const hh = getHuffHeader(huffDict, charFreq);
