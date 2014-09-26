'use strict';

(function cards(){
  var htDeck = document.getElementById('deck');
  var htsDeck = document.getElementById('sDeck');
  var shuffle = document.getElementById('btnShuffle');
  var cut = document.getElementById('btnCut');

  var cards = {
    deck:[],
    spades:[],
    hearts:[],
    clubs:[],
    diamonds:[],
    make:function(){
      //spades
          for (var c = 0; c < 13; c++){
            this.spades.push('<label class=spades>&#'+(127137+c).toString()+'</label>');
            this.hearts.push('<label class=hearts>&#'+(127153+c)+'</lable>');
            this.diamonds.push('<label class=diamonds>&#'+(127169+c)+'</label>');
            this.clubs.push('<labels class=clubs>&#'+(127185+c)+'</labels>');
          }
          this.deck = this.deck.concat(this.spades, this.hearts, this.clubs, this.diamonds);
          return this.deck;
        },
    shuffle:function(times){
      var rndA, rndB;
      for (var t = 1; t <= times; t++){
        var halfdeckA = this.deck.slice(0,26);
        var halfdeckB = this.deck.slice(26);
        this.deck.length = 0;
        while (halfdeckA.length > 0 && halfdeckB.length > 0) {
          rndA = (Math.random()*10).toFixed(0);
          if (rndA > 5 ) rndA = 1;
          rndB = (Math.random()*10).toFixed(0);
          if (rndB > 5 ) rndB = 1;
            for (var hdaCount = 0; hdaCount <= rndA; hdaCount++){
              if (halfdeckA.length > 0){
                this.deck.push(halfdeckA.shift());
            }
          }
            for (var hdbCount = 0; hdbCount <= rndB; hdbCount++) {
              if (halfdeckB.length > 0) {
                this.deck.push(halfdeckB.shift());
              }
            }
        }
        if (halfdeckA.length > 0) {
          this.deck = this.deck.concat(halfdeckA);
        }
        else {
          if(halfdeckB.length > 0){
            this.deck = this.deck.concat(halfdeckB);
          }
        }
      }
    },
    cut:function(){
      var halfdeckA = this.deck.slice(0,26);
      var halfdeckB = this.deck.slice(26);
      this.deck = halfdeckB.concat(halfdeckA);
    }
  };

  //initialize deck
  htDeck.innerHTML = cards.make().join('');



  //Events
  shuffle.addEventListener('click', function(e){
    cards.shuffle(1);
    htDeck.innerHTML = cards.deck.join('');
  },
  false);

  cut.addEventListener('click', function(e){
    cards.cut();
    htDeck.innerHTML = cards.deck.join('');
  },
  false);

})();