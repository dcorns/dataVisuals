/**
 * Created by dcorns on 12/15/14.
 */
'use strict';
//setup namespace
if (!datavis) var datavis = {};
else alert('global object required to run is already being used');

datavis.Cards =require('./cards');
datavis.Ui = require('./ui');
datavis.heapSort = require('./heapSort')();


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
ui.heapSortClickEvent(function(){
  console.log(deck.getCards());
});