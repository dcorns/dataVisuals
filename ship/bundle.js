(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by dcorns on 12/15/14.
 */
'use strict';
//setup namespace
if (!datavis) var datavis = {};
else alert('global object required to run is already being used');

datavis.Cards =require('./cards');
datavis.Ui = require('./ui');

var deck = new datavis.Cards();
var ui = new datavis.Ui();

//var fiveCards = deck.dealCard(5);

//deck.cut();

//deck.shuffle(5,10);

ui.showCards(deck.getCards());
ui.cutClickEvent(function(){
  deck.cut(ui.getCutSize());
  ui.showCards(deck.getCards());
});
ui.shuffleClickEvent(function(){
  deck.shuffle(ui.getIterations(), ui.getCutSize());
  ui.showCards(deck.getCards());
});
ui.quickSortClickEvent(function(){
  alert('quick sort to come');
});
},{"./cards":2,"./ui":4}],2:[function(require,module,exports){
'use strict';


function Cards(){
var cards = [];
      for (var c = 1; c < 14; c++){
        cards.push({value:c, suite:1, el:'<label id=spade' + c + ' class=spades>&#'+(127136+c).toString()+'</label>'});
        cards.push({value:c, suite:2, el:'<label id=heart' + c + ' class=hearts>&#'+(127152+c)+'</label>'});
        cards.push({value:c, suite:3, el:'<label id=diamond' + c + ' class=diamonds>&#'+(127168+c)+'</label>'});
        cards.push({value:c, suite:4, el:'<labels id=club' + c + ' class=clubs>&#'+(127184+c)+'</labels>'});
      }
  return {
    getCards:function(){
      return cards;
    },
    dealCard:function(num){
      var hand = [];
      var numCards = num || 1;
      for(numCards; numCards > 0; numCards--){
        hand.push(cards.shift());
      }
      return hand;
    },
    cut : function(tophalf){      var top = tophalf || 26;
          if(top > 51 || top < 1) top = 26;
          var halfdeckA = cards.slice(0,top);
          var halfdeckB = cards.slice(top);
          cards = halfdeckB.concat(halfdeckA);
          return {deckA: halfdeckA, deckB: halfdeckB};
        },
    shuffle : function(timesIn, split){
          var rndA, rndB;
          var times = timesIn || 1;
          console.log('shuffle called, ' + times);
          for (var t = 1; t <= times; t++){
            var halfs = this.cut(split) || {deckA: 26, deckB: 26};
            var halfdeckA = halfs.deckA;//this.deck.slice(0,26);
            var halfdeckB = halfs.deckB;//this.deck.slice(26);
            cards.length = 0;
            while (halfs.deckA.length > 0 && halfs.deckB.length > 0) {
              rndA = (Math.random()*10).toFixed(0);
              if (rndA > 5 ) rndA = 1;
              rndB = (Math.random()*10).toFixed(0);
              if (rndB > 5 ) rndB = 1;
              for (var hdaCount = 0; hdaCount <= rndA; hdaCount++){
                if (halfs.deckA.length > 0){
                  cards.push(halfs.deckA.shift());
                }
              }
              for (var hdbCount = 0; hdbCount <= rndB; hdbCount++) {
                if (halfs.deckB.length > 0) {
                  cards.push(halfs.deckB.shift());
                }
              }
            }
            if (halfs.deckA.length > 0) {
              cards = cards.concat(halfdeckA);
            }
            else {
              if(halfs.deckB.length > 0){
                cards = cards.concat(halfdeckB);
              }
            }
            console.log(t);
          }
        }
  }
    }

module.exports = Cards;

},{}],3:[function(require,module,exports){
'use strict';
//test for existence of object already in scope before creating
if (!drcUtils){
  var drcUtils = {};
  //Utility for timing function execution
  drcUtils.FunctionTimer = function(functionToTime) {
    this.functionToTime = functionToTime;
    this.startTime = 0;
    this.endTime = 0;
    this.averageTime = 0;
    this.runTime = function (){return this.endTime - this.startTime;};

    this.run = function (){
      //Use the Date object to record times in milliseconds
      this.startTime = new Date().getTime();
      this.endTime = (function(){
        functionToTime();
        return new Date().getTime();
      })();
      return this.endTime - this.startTime;
    };
    this.loopRun = function(count) {
      var oneTime = 0;
      var ttlTime = 0;
      var lcount = count || 1;
      for(var i = 0; i < lcount; i++){
        console.log('test ' + i);
        oneTime = this.run();
        ttlTime += oneTime;
        console.log(oneTime);
      }
      var avrTime = ttlTime / lcount;
      console.log('Average Time '+ avrTime);
      this.averageTime = avrTime;
      return avrTime;
    };
  }
}
else alert('global object required to run is already being used');


},{}],4:[function(require,module,exports){
function Ui(){
  console.log('ui2: ');
  var shuffle =document.getElementById('btnShuffle')
    ,cut = document.getElementById('btnCut')
    ,testShuffle = document.getElementById('btnTimeShuffle')
    ,quickSort = document.getElementById('btnQuickSort')
    ,htDeck = document.getElementById('deck')
    ,inIterations = document.getElementById('inIterations')
    ,cutSize =document.getElementById('cutSize');

  return{
    getCutSize: function(){
      return cutSize.value;

    },
    getIterations: function(){
      return inIterations.value;
    },
    showCards: function(cardData){
      console.log('showcards called');
      var cardDataLength = cardData.length;
      var idx = 0;
      htDeck.innerHTML = '';
      for(idx; idx < cardDataLength; idx++){
        htDeck.innerHTML = htDeck.innerHTML + cardData[idx].el;
      }
    },
    cutClickEvent: function(f){
      cut.addEventListener('click', f);
    },
    shuffleClickEvent: function(f){
      shuffle.addEventListener('click', f);
    },
    quickSortClickEvent: function(f){
      quickSort.addEventListener('click', f);
    }
  };
}

module.exports = Ui;

},{}]},{},[1,2,3,4]);
