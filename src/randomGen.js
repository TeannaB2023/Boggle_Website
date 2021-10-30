function shuffle(word) {
    var a = word.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}



// Returns a random 5x5 board, using the official letter distribution.
exports.RandomGrid = function(size){
  
  let word = "";
  let totalChars = size * size * size;
  
  
  let freqLookUp = [{"let":"A","freq":.078}, {"let":"B","freq":.02}, {"let":"C","freq":.04}, {"let":"D","freq":.038}, {"let":"E","freq":.11}, {"let":"F","freq":.014}, {"let":"G","freq":.03}, {"let":"H","freq":.023}, {"let":"I","freq":.089}, {"let":"J","freq":.0021},	{"let":"K","freq":.0097},
                    {"let":"L","freq":.053}, {"let":"M","freq":.027}, {"let":"N","freq":.072}, {"let":"O","freq":.061}, {"let":"P","freq":.028}, {"let":"Q","freq":.0019}, {"let":"R","freq":.073}, {"let":"S","freq":.087}, {"let":"T","freq":.067}, {"let":"U","freq":.033},
                    {"let":"V","freq":.01}, {"let":"W","freq":.0091}, {"let":"X","freq":.0027}, {"let":"Y","freq":.016}, {"let":"Z","freq":.0044}];
/*       
  freqLookUp.map(litem => {
   word += litem.let.repeat(Math.round(litem.freq * totalChars))
  });
*/
  function iterate(item) {
    word += item.let.repeat(Math.round(item.freq * totalChars));
  }

  freqLookUp.forEach(iterate);
  
  
  if(word.length > totalChars) {
      word = word.slice(0, totalChars - word.length);
  }

  let sortedFreqList = freqLookUp.sort((a, b) => (a.freq <= b.freq) ? 1 : -1);
  
  let dif = totalChars - word.length;
  for(let i = 0; i < dif; i++) {
    word += sortedFreqList[i].let;
  }
  
  const dice = chunk(shuffle(word), size);
  
  let chars = dice.map(cube => cube[Math.floor(Math.random() * cube.length)]);
  chars.sort(() => Math.random() - 0.5); // Shuffle the letters.

  let grid = [];
  for (let row = 0; row < size; row++) {
    grid[row] = [];
    for (let col = 0; col < size; ++col) {
      grid[row][col] = chars[size * row + col].toLowerCase();
      if (grid[row][col] === "Q") grid[row][col] = "Qu";
    }
  }
  return grid;
}

function chunk(array, size) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

