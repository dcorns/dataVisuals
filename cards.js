'use strict';
if (!datavis) var datavis = {};
else alert('global object required to run is already being used');
(datavis.Cards = function(){

    this.deck = [];
    this.spades = [];
    this.hearts = [];
    this.clubs = [];
    this.diamonds = [];
    this.make = function(){
      //spades
          for (var c = 0; c < 13; c++){
            this.spades.push('<label class=spades>&#'+(127137+c).toString()+'</label>');
            this.hearts.push('<label class=hearts>&#'+(127153+c)+'</lable>');
            this.diamonds.push('<label class=diamonds>&#'+(127169+c)+'</label>');
            this.clubs.push('<labels class=clubs>&#'+(127185+c)+'</labels>');
          }
          this.deck = this.deck.concat(this.spades, this.hearts, this.clubs, this.diamonds);
          return this.deck;
        };

    this.cut = function(tophalf){
      var top = tophalf || 26;
      var halfdeckA = this.deck.slice(0,top);
      var halfdeckB = this.deck.slice(top);
      this.deck = halfdeckB.concat(halfdeckA);
      return {deckA: halfdeckA, deckB: halfdeckB};
    };

    this.shuffle = function(timesIn, split){
      var rndA, rndB;
      var times = timesIn || 1;
      console.log('shuffle called, ' + times);
      for (var t = 1; t <= times; t++){
        var halfs = this.cut(split) || {deckA: 26, deckB: 26};
        var halfdeckA = halfs.deckA;//this.deck.slice(0,26);
        var halfdeckB = halfs.deckB;//this.deck.slice(26);
        this.deck.length = 0;
        while (halfs.deckA.length > 0 && halfs.deckB.length > 0) {
          rndA = (Math.random()*10).toFixed(0);
          if (rndA > 5 ) rndA = 1;
          rndB = (Math.random()*10).toFixed(0);
          if (rndB > 5 ) rndB = 1;
            for (var hdaCount = 0; hdaCount <= rndA; hdaCount++){
              if (halfs.deckA.length > 0){
                this.deck.push(halfs.deckA.shift());
            }
          }
            for (var hdbCount = 0; hdbCount <= rndB; hdbCount++) {
              if (halfs.deckB.length > 0) {
                this.deck.push(halfs.deckB.shift());
              }
            }
        }
        if (halfs.deckA.length > 0) {
          this.deck = this.deck.concat(halfdeckA);
        }
        else {
          if(halfs.deckB.length > 0){
            this.deck = this.deck.concat(halfdeckB);
          }
        }
        console.log(t);
      }
    };

  });

