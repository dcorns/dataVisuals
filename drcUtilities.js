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

