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
