function ConvertHandler() {
    const inputRegex = /[a-z]+|[^a-z]+/gi;
    this.getNum = function(input) {
      let result;
      result = input.match(inputRegex)[0];
  
      const numRegex = /\d/;
  
      if (numRegex.test(result) === false) {
        result = 1;
      }
  
      if (result.toString().includes("/")){
        let values = result.toString().split("/");
        if (values.length != 2) {
          return 'invalid number';
        }
        values[0] = parseFloat(values[0]);
        values[1] = parseFloat(values[1]);
        result = parseFloat((values[0] / values[1]).toFixed(5));
      }
  
      if (isNaN(result)) {
        return 'invalid number';
      }
  
        return result;
    };
    
    this.getUnit = function(input) {
      let result;
      result = input.match(inputRegex)[1];
  
      if (!result) {
        result = input.match(inputRegex)[0];
      }
  
      let validUnits = ["gal", "l", "lbs", "kg", "mi", "km"];
      //console.log('Unit before: ', result);
      if (validUnits.includes(result.toLowerCase())){
        if (result.toLowerCase() === 'l'){
          return 'L';
        } else {
          return result.toLowerCase();
        } 
      } else {
        return 'invalid unit';
      }
    };
    
    this.getReturnUnit = function(initUnit) {
      let result;
  
      if (initUnit.toLowerCase() === 'gal') {
        result = 'L';
      } else if(initUnit.toLowerCase() === 'l'){
        result = 'gal';
      } else if(initUnit.toLowerCase() === 'lbs'){
        result = 'kg';
      } else if(initUnit.toLowerCase() === 'kg'){
        result = 'lbs';
      } else if(initUnit.toLowerCase() === 'mi'){
        result = 'km';
      } else if(initUnit.toLowerCase() === 'km'){
        result = 'mi';
      }
      
      return result;
    };
  
    this.spellOutUnit = function(unit) {
      let result;
      const units = {
        gal: 'gallons',
        L: 'liters',
        lbs: 'pounds',
        kg: 'kilograms',
        mi: 'miles',
        km: 'kilometers'
      }
      if (unit !== 'invalid unit'){
        result = units[unit];
        return result;
      } else {
        return unit;
      }
    };
    
    this.convert = function(initNum, initUnit) {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      let result;
  
      //console.log(initNum);
      
      if (initUnit.toLowerCase() === 'gal') {
        result = (initNum * galToL).toFixed(5);
      }
  
      if (initUnit.toLowerCase() === 'l') {
        result = (initNum / galToL).toFixed(5);
      }
  
      if (initUnit.toLowerCase() === 'lbs') {
        result = (initNum * lbsToKg).toFixed(5);
      }
  
      if (initUnit.toLowerCase() === 'kg'){
        result = (initNum / lbsToKg).toFixed(5);
      }
  
      if (initUnit.toLowerCase() === 'mi'){
        result = (initNum * miToKm).toFixed(5);
      }
  
      if (initUnit.toLowerCase() === 'km') {
        result = (initNum / miToKm).toFixed(5);
      }
  
      return parseFloat(result);
    };
    
    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
      let result;
      //3.1 miles converts to 4.98895 kilometers
      let initUnitString = this.spellOutUnit(initUnit);
      let returnUnitString = this.spellOutUnit(returnUnit);
      result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
      return result;
    };
    
  }
  
  module.exports = ConvertHandler;
  