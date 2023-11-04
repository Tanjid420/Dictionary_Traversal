
document.addEventListener('DOMContentLoaded', async (event) => {
  
  var orderArr = [];
  var data=[]
  let idx=0;
const jsonFile=await fetch("../json/crossPuzzle.json")
const jsonObject=await jsonFile.json()

data=jsonObject[idx]

const btnNext=document.querySelector("#btnNext")
btnNext.addEventListener("click",async (e)=>{
if(idx< jsonObject.length-1)
{
  while(orderArr.length>0)
  {
    orderArr.pop()
  }
 const removeLine=document.querySelectorAll(".line")
 for(let i=0;i<removeLine.length;i++)
 {
   removeLine[i].remove()
 }
  idx+=1;
 
  data= jsonObject[idx]
 
 
 createElementS()
 init();
 GetWordsFromInput();

 Generate();
 
 Play();
            

}
})

const btnPrev=document.querySelector("#btnPrev")
btnPrev.addEventListener("click",async(e)=>{
  if(idx>0)
  {
    while(orderArr.length>0)
    {
      orderArr.pop()
    }
    const removeLine=document.querySelectorAll(".line")
    for(let i=0;i<removeLine.length;i++)
    {
      removeLine[i].remove()
    }
    idx-=1;
    
    data= jsonObject[idx]
  
    createElementS()
    
    init();
    GetWordsFromInput();
   
    Generate();
    
    Play();
  }
  })
  
 function createElementS()
{
const cluesAcross=document.querySelector("#cluesAcross");
const clueDirectionAcross=document.createElement("DIV")
clueDirectionAcross.className="clueDirection";

clueDirectionAcross.id="directionAcross"

cluesAcross.appendChild(clueDirectionAcross);


for( i=0;i<data.length;i++)
{
  const lineDiv=document.createElement("DIV")
  lineDiv.className="line"
  cluesAcross.appendChild(lineDiv)
 const wordInput=document.createElement("INPUT")
     wordInput.className="word"
     wordInput.setAttribute("type","text")
   lineDiv.appendChild(wordInput)
  
     
     const lineNumSpan=document.createElement("SPAN")
     lineNumSpan.className="lineNum"
     lineDiv.appendChild(lineNumSpan)
  const clueInput=document.createElement("INPUT")
     clueInput.className="clue"
     lineDiv.appendChild(clueInput);
}
const cluesDown=document.querySelector("#cluesDown");
const clueDirectionDown=document.createElement("DIV")
clueDirectionDown.className="clueDirection";
clueDirectionDown.id="directionDown"
cluesDown.appendChild(clueDirectionDown);
     

}



  function shuffle(array) {
 
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  
    return array;
  }
  
   function init() {
 
  
    $.each(data, function(index) {
     
      
      orderArr.push(index);
      shuffle(orderArr);
    });
  
    loadClues()

  };
  
  

  function loadClues() {
  //console.log(orderArr);
    for (i = 0; i<data.length; i++) 
    {
    
      if( data[orderArr[i]].answer)
      {
        $(".line").eq(i).find("input.word").attr("value", data[orderArr[i]].answer);
      $(".line").eq(i).find("input.clue").attr("value", data[orderArr[i]].clue);
      }
      //$("#cluesAcross").append("<div class='line'><input class='word' type='text' value="+ data[orderArr[i]].answer+"/><span class='lineNum'></span><input class='clue' value="+ data[orderArr[i]].clue+" />");
      
    } 
  };
      
  
  
  //---------------------------------//
  //   GLOBAL VARIABLES              //
  //---------------------------------//
  var board, wordArr, wordBank, wordsActive, boardMap, clues,
    focusChar, focusIndex = null,
    wordElementsAcross, wordElementsDown;
  
  var Bounds = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  
    Update: function(x, y) {
      this.top = Math.min(y, this.top);
      this.right = Math.max(x, this.right);
      this.bottom = Math.max(y, this.bottom);
      this.left = Math.min(x, this.left);
    },
  
    Clean: function() {
      this.top = 999;
      this.right = 0;
      this.bottom = 0;
      this.left = 999;
    }
  };
  
  //---------------------------------//
  //   MAIN                          //
  //---------------------------------//
  
  function Play() {
   
    
    var charEleArr = document.getElementsByClassName('char');
  
    for (var i = 0; i < charEleArr.length; i++) {
      //register character click and focus events
      RegisterChar(charEleArr[i], boardMap[i]);
      charEleArr[i].placeholder = "";
    }
  
    HideInputBoxes();
  
    FormatClues();
  }
  
  /*
   * @param {Object} wordElement
   * @param {string} wordElement.num - clue number
   * @param {string} wordElement.clue - clue text
   * @param {string} wordElement.wordCount - word count of answer
   */
  
  function createClueHTML(wordElement) {
    
  
    //create clue holder
    var clueElement = document.createElement('div');
    
    clueElement.className += " line";
  
    //add line number
    var lineNumSpan = document.createElement('span');
    lineNumSpan.innerHTML = wordElement.num + '. ';
    lineNumSpan.className += " lineNum";
  
    //add clue
    var clueSpan = document.createElement('span');
    clueSpan.innerHTML = wordElement.clue;
    clueSpan.className += " cluesentence";
  
    //add word count
    var wordCountSpan = document.createElement('span');
    wordCountSpan.innerHTML = ' (' + wordElement.wordCount + ')';
    wordCountSpan.className += " wordCount";
    
    clueElement.appendChild(lineNumSpan);
    clueElement.appendChild(clueSpan);
    clueElement.appendChild(wordCountSpan);
  
    return clueElement;
  }
  
  function FormatClues() {
   
  
    var cluesAcross = document.getElementById("cluesAcross");
    var cluesDown = document.getElementById("cluesDown");
  
    cluesAcross.innerHTML = "";
    cluesDown.innerHTML = "";
  
    var clueElement = "";
  
    for (var i = 0; i < wordElementsAcross.length; i++) {
  
      clueElement = createClueHTML(wordElementsAcross[i]);
      cluesAcross.appendChild(clueElement);
  
    }
  
    for (var j = 0; j < wordElementsDown.length; j++) {
  
      clueElement = createClueHTML(wordElementsDown[j]);
      cluesDown.appendChild(clueElement);
  
    }
  
  }
  
  function Generate() {
  //console.log("Generate")
  
    wordElementsAcross = [];
    wordElementsDown = [];
  
    CleanVars();
    //console.log("after CleanVars")
    var canBuild = PopulateBoard();
   // console.log("after PopulateBoard")
  
    while (!canBuild) {
  
      CleanVars();
      canBuild = PopulateBoard();
  
    }
  
    document.getElementById("crossword").innerHTML =
      canBuild ? BoardToHtml() : "Failed to find crossword.";
  
    document.getElementById('btnHint').classList.remove('disabled');
  }
  
  function HideInputBoxes() {

  
    var w = document.getElementsByClassName('word'),
      d = document.getElementsByClassName('clue'),
      dir = document.getElementsByClassName('clueDirection'),
      char = document.getElementsByClassName('char');
  
    for (var i = 0; i < w.length; i++) {
      AddClass(w[i], 'hide');
      AddClass(d[i], 'hide');
      AddClass(d[i], 'clueReadOnly');
   
  
      d[i].disabled = 'readonly';
    }
  
    for (var i = 0; i < dir.length; i++) {
      RemoveClass(dir[i], 'disabled');
    }
  
    for (var i = 0; i < char.length; i++) {
      RemoveClass(char[i], 'charReadOnly');
      char[i].disabled = '';
    }
  
  }
  
  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }
  /*
   * get the length of the clues as a string
   * @param {string}
   * @return {string}
   */
  function getWordCount(word) {
  
    if (hasWhiteSpace(word)) {
      var words = word.split(/\s/g);
      var wordCount = "";
  
      for (var i = 0; i < words.length; i++) {
        //last word
        if (i === words.length - 1) {
          wordCount = wordCount + words[i].length;
        }
        //other words
        else {
          wordCount = wordCount + words[i].length + ', ';
        }
      }
      return wordCount;
    } else {
      return word.length.toString();
    }
  
  }
  
  function GetWordsFromInput() {
 
    var clues = document.getElementsByClassName("line");
    //console.log(clues)
    wordArr = [];
  
    for (var i = clues.length - 1; i >= 0; i--) {
    //console.log(clues[i].querySelector("#next-prev"))
      var val = clues[i].getElementsByClassName("word")[0].value.toUpperCase();
      
     // console.log(clues[i].getElementsByClassName("word")[0])
     // console.log( `val ${val}`)
      var clue = clues[i].getElementsByClassName("clue")[0].value;
      //console.log( `clue ${clue}`)
      var wordCount = getWordCount(val);
      if (val !== null && val.length > 1) {
        wordArr.push({
          ele: clues[i],
          value: val.replace(' ', ''),
          clue: clue,
          wordCount: wordCount
  
        });
      }
    }
  }
  
  function CleanVars() {
   
  
    Bounds.Clean();
    wordBank = [];
    wordsActive = [];
    clues = [];
    board = [];
  
    for (var i = 0; i <50; i++) {
      board.push([]);
      for (var j = 0; j < 50; j++) {
        board[i].push({
          value: null,
          char: []
        });
      }
    }
  }
  
  function PopulateBoard() {
  
    PrepareBoard();
  
    var boardisValid = false;
    var len = wordBank.length;
  
    for (var i = 0; i < len; i++) {
  
      boardisValid = AddWordToBoard();
  
      if (!boardisValid) {
        return boardisValid;
      }
  
    }
  
    return boardisValid;
  }
  
  /*
  @param {Number} currentWordIndex
  @param {Object} prevObj
  @param {String} currentChar
  @returns {Object} cObj - values for the character square
  */
  function createcObj(currentWordIndex, prevObj, currentChar) {
   
    return {
      wordIndex: currentWordIndex,
      prev: prevObj,
      value: currentChar,
      next: null
    };
  
  }
  
  function PrepareBoard() {
    wordBank = [];
 
    for (var i = 0, len = wordArr.length; i < len; i++) {
  
      wordBank.push(new WordObj(wordArr[i]));
  
    }
  
    for (i = 0; i < wordBank.length; i++) {
      for (var j = 0, wA = wordBank[i]; j < wA.char.length; j++) {
        for (var k = 0, cA = wA.char[j]; k < wordBank.length; k++) {
          for (var l = 0, wB = wordBank[k]; k !== i && l < wB.char.length; l++) {
            wA.totalMatches += (cA === wB.char[l]) ? 1 : 0;
          }
        }
      }
    }
  }
  
  // TODO: Clean this guy up
  function AddWordToBoard() {
    
    var i, len, curIndex, curWord, curChar, testWord, testChar, minMatchDiff = 9999,
      curMatchDiff;
  
    //first word
    if (wordsActive.length < 1) {
      curIndex = 0;
      for (i = 0, len = wordBank.length; i < len; i++) {
        if (wordBank[i].totalMatches < wordBank[curIndex].totalMatches) {
          curIndex = i;
        }
      }
      wordBank[curIndex].successfulMatches = [{
        x: 12,
        y: 12,
        dir: 0
      }];
    }
    //others
    else {
      curIndex = -1;
  
      for (i = 0, len = wordBank.length; i < len; i++) {
        curWord = wordBank[i];
        curWord.effectiveMatches = 0;
        curWord.successfulMatches = [];
        for (var j = 0, lenJ = curWord.char.length; j < lenJ; j++) {
          curChar = curWord.char[j];
          for (var k = 0, lenK = wordsActive.length; k < lenK; k++) {
            testWord = wordsActive[k];
            for (var l = 0, lenL = testWord.char.length; l < lenL; l++) {
              testChar = testWord.char[l];
              if (curChar === testChar) {
                curWord.effectiveMatches++;
                var curCross = {
                  x: testWord.x,
                  y: testWord.y,
                  dir: 0
                };
                if (testWord.dir === 0) {
                  curCross.dir = 1;
                  curCross.x += l;
                  curCross.y -= j;
                } else {
                  curCross.dir = 0;
                  curCross.y += l;
                  curCross.x -= j;
                }
  
                var isMatch = true;
  
                for (var m = -1, lenM = curWord.char.length + 1; m < lenM; m++) {
                  var crossVal = [];
                  if (m !== j) {
                    if (curCross.dir === 0) {
                      var xIndex = curCross.x + m;
  
                      if (xIndex < 0 || xIndex > board.length - 1) {
                        isMatch = false;
                        break;
                      }
  
                      crossVal.push(board[xIndex][curCross.y].value);
                      crossVal.push(board[xIndex][curCross.y + 1].value);
                      crossVal.push(board[xIndex][curCross.y - 1].value);
  
                    } else {
                      var yIndex = curCross.y + m;
  
                      if (yIndex < 0 || yIndex > board[curCross.x].length - 1) {
                        isMatch = false;
                        break;
                      }
  
                      if (typeof board[curCross.x] == 'undefined') {
                        console.error(board[curCross.x]);
                      }
                      if (typeof board[curCross.x][yIndex] == 'undefined') {
                        console.error(board[curCross.x][yIndex]);
                      }
  
                      crossVal.push(board[curCross.x][yIndex].value);
                      crossVal.push(board[curCross.x + 1][yIndex].value);
                      crossVal.push(board[curCross.x - 1][yIndex].value);
                    }
  
                    if (m > -1 && m < lenM - 1) {
                      if (crossVal[0] !== curWord.char[m]) {
                        if (crossVal[0] !== null) {
                          isMatch = false;
                          break;
                        } else if (crossVal[1] !== null) {
                          isMatch = false;
                          break;
                        } else if (crossVal[2] !== null) {
                          isMatch = false;
                          break;
                        }
                      }
                    } else if (crossVal[0] !== null) {
                      isMatch = false;
                      break;
                    }
                  }
                }
  
                if (isMatch === true) {
                  curWord.successfulMatches.push(curCross);
                }
              }
            }
          }
        }
  
        curMatchDiff = curWord.totalMatches - curWord.effectiveMatches;
  
        if (curMatchDiff < minMatchDiff && curWord.successfulMatches.length > 0) {
          curMatchDiff = minMatchDiff;
          curIndex = i;
        } else if (curMatchDiff <= 0) {
          return false;
        }
  
      }
    }
  
    if (curIndex === -1) {
      return false;
    }
  
    var word = wordBank.splice(curIndex, 1);
  
    var currentWordActive = updateWordInfo(word);
  
    wordsActive.push(currentWordActive);
  
    var wordisAdded = addCharInfoToBoard(currentWordActive);
  
    if (!wordisAdded) {
      return false;
    }
  
    if (Bounds.right >= 37) {
      // console.log('%cCrossword is too wide', 'color:red;font-size: 16px;');
      return false;
    }
  
    return true;
  
  }
  /*
   * @param {Number} word - index of the current word 
   * @return {Object} activeWord 
   */
  function updateWordInfo(activeWord) {
   
    var currentActiveWord = activeWord[0];
  
    var matchArr = currentActiveWord.successfulMatches;
    var matchIndex = Math.floor(Math.random() * matchArr.length);
    var matchData = matchArr[matchIndex];
  
    currentActiveWord.x = matchData.x;
    currentActiveWord.y = matchData.y;
    currentActiveWord.dir = matchData.dir;
  
    return currentActiveWord;
  }
  
  function addCharInfoToBoard(currentWordActive) {
  
    var pushIndex = wordsActive.length - 1;
  
    var prevObj = null;
  
    for (var i = 0; i < currentWordActive.char.length; i++) {
  
      var xInd = currentWordActive.x;
      var yInd = currentWordActive.y;
  
      if (currentWordActive.dir === 0) {
        xInd = xInd + i;
      } else {
        yInd = yInd + i;
      }
  
      if (xInd >= 36) {
        // console.log('%cCrossword will be too wide', 'color:orange;font-size: 16px;font-style: bold;');
        return false;
      }
  
      var cObj = createcObj(pushIndex, prevObj, currentWordActive.char[i]);
  
      var cIndex = board[xInd][yInd].char.length;
  
      board[xInd][yInd].char.push(cObj);
      board[xInd][yInd].value = currentWordActive.char[i];
  
      Bounds.Update(xInd, yInd);
  
      if (prevObj !== null) {
        prevObj.next = board[xInd][yInd].char[cIndex];
      }
  
      prevObj = board[xInd][yInd].char[cIndex];
    }
  
    prevObj = null;
    return true;
  
  }
  
  function BoardToHtml() {
  
  
    boardMap = [];
  
    var boardHTML = '';
  
    for (var i = Bounds.top - 1; i < Bounds.bottom + 2; i++) {

      boardHTML += "<div class='row'>";
  
      for (var j = Bounds.left - 1; j < Bounds.right + 2; j++) {
        boardHTML += BoardCharToElement(board[j][i]);
      }
      boardHTML += "</div>";
    }
    

  
    return boardHTML;
  
  }
  
  /*
   * @param {Object} c - values for a sqaure of the board
   * @param {string} c.value - character string for the square. 
   * @param {Array} c.char - list of character strings for the square. 
   * length of c.char is 0, 1 or 2. 
   * length is 2 when 2 words cross
   */
  
  function BoardCharToElement(c) {
   
  
  
    var inner = "";
  
    if (c.value !== null) {
      var num = "";
  
      for (var i = 0; i < c.char.length; i++) {
  
        var currentChar = c.char[i];
        currentChar.index = boardMap.length;
        if (currentChar.prev === null) {
  
          var currentwordIndex = currentChar.wordIndex;
  
          if (num === "") {
            num = wordElementsDown.length + wordElementsAcross.length + 1;
          }
  
          if (wordsActive[currentwordIndex].dir === 0) {
            wordElementsAcross.push({
              num: num,
              ele: wordsActive[currentwordIndex].element,
              clue: wordsActive[currentwordIndex].clue,
              answer: wordsActive[currentwordIndex].string,
              wordCount: wordsActive[currentwordIndex].wordCount
            });
          } else {
            wordElementsDown.push({
              num: num,
              ele: wordsActive[currentwordIndex].element,
              clue: wordsActive[currentwordIndex].clue,
              answer: wordsActive[currentwordIndex].string,
              wordCount: wordsActive[currentwordIndex].wordCount
            });
          }
        }
      }
      boardMap.push(c);
  
      inner = EleStr('input', [{
          a: 'type',
          v: ['text']
        }, {
          a: 'class',
          v: ['char']
        }, {
          a: 'maxlength',
          v: ['1']
        }, {
          a: 'data-letter',
          v: [c.value]
        }, {
          a: 'data-hint',
          v: [c.value]
        }, {
          a: 'placeholder',
          v: [c.value]
        }],
        EleStr('span', [{
          a: 'class',
          v: ['num']
        }], num));
    }
    return EleStr('div', [{
      a: 'class',
      v: ['square']
    }], inner);
  }
  /*
   * @param {Object} boardChar
   * @param {string} boardChar.value
   * @param {array} boardChar.char
   */
  function BoardCharClick(boardChar) {
   
  
    if (boardChar.char.length > 1) {
      if (focusIndex >= boardChar.char.length - 1) {
        focusIndex = 0;
      } else {
        focusIndex++;
      }
    }
  }
  /*
   * @param {Object} boardChar
   * @param {string} boardChar.value
   * @param {array} boardChar.char
   */
  function BoardCharFocus(boardChar) {
    
    if (!(boardChar.char[focusIndex] && boardChar.char[focusIndex].prev === focusChar)) {
      focusIndex = Math.max(0, boardChar.char.indexOf(focusChar));
    }
  
    var inputBoxes = document.getElementsByClassName('char');
  
    //navigation via arrow keys
    this.onkeydown = function(e) {
  
      var key = e.keyCode || e.which;
  
      //left arrow or up - focus on prev square
      if (key === 37 || key === 38) {
        if (boardChar.char[focusIndex].prev != null) {
          focusChar = boardChar.char[focusIndex].prev;
          inputBoxes[focusChar.index].focus();
        }
      }
  
      //right arrow or down - focus on next square
      if (key === 39 || key === 40) {
        if (boardChar.char[focusIndex].next != null) {
          focusChar = boardChar.char[focusIndex].next;
          inputBoxes[focusChar.index].focus();
        }
      }
  
    };
  
    this.onkeyup = function(e) {
  
      var key = e.keyCode || e.which;
  
      var prevChar = boardChar.char[focusIndex].prev;
  
      //backspace and not first letter
      if (key === 8 && prevChar != null) {
        RemoveClass(inputBoxes[boardChar.char[focusIndex].index], 'correct');
        inputBoxes[prevChar.index].focus();
  
      }
      //backspace and is first letter
      if (key === 8 && prevChar === null) {
        RemoveClass(inputBoxes[boardChar.char[focusIndex].index], 'correct');
      }
  
    };
  
    this.oninput = function(e) {
  
      var nextChar = boardChar.char[focusIndex].next;
  
      //backspace at end of word
      if (e.inputType === 'deleteContentBackward' && nextChar === null) {
  
        inputBoxes[boardChar.char[focusIndex].index].value = "";
  
        RemoveClass(inputBoxes[boardChar.char[focusIndex].index], 'correct');
  
      }
  
      //normal text entry
      if (e.inputType !== 'deleteContentBackward' && nextChar !== null) {
  
        inputBoxes[nextChar.index].focus();
  
        RemoveClass(inputBoxes[boardChar.char[focusIndex].index], 'correct');
  
      }
  
    };
  }
  
  //---------------------------------//
  //   OBJECT DEFINITIONS            //
  //---------------------------------//
  
  function WordObj(wordData) {
    this.element = wordData.ele;
    this.string = wordData.value;
    this.char = wordData.value.split("");
    this.totalMatches = 0;
    this.effectiveMatches = 0;
    this.successfulMatches = [];
    this.clue = wordData.clue;
    this.wordCount = wordData.wordCount;
  }
  
  //---------------------------------//
  //   EVENTS                        //
  //---------------------------------//
  
  function RegisterEvents() {
  
    document.getElementById("btnReset").addEventListener(
      'click',
      function() {
        
        Generate();
        Play();
  
      }, false);
  
  }
  RegisterEvents();
  
  function RegisterChar(ele, boardChar) {
    ele.onclick = CreateCallback("click", boardChar);
    ele.onfocus = CreateCallback("focus", boardChar);
   
  }
  
  function CreateCallback(type, boardChar) {
  
  
    switch (type) {
      case "click":
        return function() {
          BoardCharClick(boardChar);
        };
      case "focus":
        return function() {
          BoardCharFocus(boardChar);
        };
    }
  }
  
  //---------------------------------//
  //   HELPER FUNCTIONS              //
  //---------------------------------//
  
  function EleStr(e, c, h) {
 
    h = (h) ? h : "";
    for (var i = 0, s = "<" + e + " "; i < c.length; i++) {
      s += c[i].a + "='" + ArrayToString(c[i].v, " ") + "' ";
    }
    
   
  
    return (s + ">" + h + "</" + e + ">");
  }
  
  function ArrayToString(a, s) {
    if (a === null || a.length < 1) return "";
    if (s === null) s = ",";
    for (var r = a[0], i = 1; i < a.length; i++) {
      r += s + a[i];
    }
    return r;
  }
  
  function AddClass(ele, classStr) {

    ele.className = ele.className.replaceAll(' ' + classStr, '') + ' ' + classStr;
   
  //  console.log(document.querySelectorAll(".word"))
  }
  
  function RemoveClass(ele, classStr) {

  
   // console.log(`remove class ${ele.className}`)
    ele.className = ele.className.replaceAll(' ' + classStr, '');
    //console.log(`after remove class ${ele.className}`)
  }
  
  function ToggleClass(ele, classStr) {
    var str = ele.className.replaceAll(' ' + classStr, '');
    ele.className = (str.length === ele.className.length) ? str + ' ' + classStr : str;
  }
  
  String.prototype.replaceAll = function(replaceThis, withThis) {
    var re = new RegExp(replaceThis, "g");
    return this.replace(re, withThis);
  };
  
  //==================================================//
  // const dd=document.querySelectorAll(".square")
  //   console.log(dd);
  $("#btnCheck").on('click', function() {
    $(this).blur();
    //clear values from incorrect boxes
    
    $(".square input").each(function() {
      if ($(this).attr('data-letter') !== $(this).val().toUpperCase()) {
        $(this).val('');
        $(this).removeClass('correct');
  
      } else {
        $(this).addClass('correct');
      }
    });
  });
  
  $('#btnHint').on('click', function() {
    // Change this number to reveal more or less answers
    var hintFrequency = 8;
  
    $(this).addClass('disabled');
  
    var hints = $("[data-letter]").filter(function(index) {
      return (index + 1) % hintFrequency == 0;
    });
  
    hints.each(function() {
      $(this).val($(this).attr('data-letter')).addClass('correct');
  
    });
  });
  
  $(async function() {
   
    createElementS()
    init();
    GetWordsFromInput();
   
    Generate();
    
    Play();
  });
  })