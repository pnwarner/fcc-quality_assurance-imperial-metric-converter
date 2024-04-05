const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

    suite('Function convertHandler.getNum(input)', function() {

        test('Whole number input', function(done){
            var input = '32L';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });

        test('Decimal input', function(done) {
            var input = '5.82mi';
            assert.equal(convertHandler.getNum(input), 5.82);
            done();
        });

        test('Fractional input', function(done) {
            var input = '1/2gal';
            assert.equal(convertHandler.getNum(input), 0.5);
            done();
        });

        test('Fraction input with decimal', function(done) {
            var input = '1.5/3gal';
            assert.equal(convertHandler.getNum(input), 0.5);
            done();
        });

        test('Invalid input (double fraction)', function(done) {
            var input = '3/7.2/4L';
            assert.equal(convertHandler.getNum(input), 'invalid number');
            done();
        });

        test('No numerical input', function(done) {
            var input = 'kg';
            assert.equal(convertHandler.getNum(input), 1);
            assert.equal(convertHandler.getUnit(input), 'kg');
            done();
        });

    });

    suite('Function convertHandler.getUnit(input)', function(){

        test('For Each Valid Unit Inputs', function(done) {
            //input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG"];
            input = ["gal", "L", "mi", "km", "lbs", "kg"];
            input.forEach((element) => {
                assert.equal(convertHandler.getUnit(32 + element), element);
            });
            done();
        });

        test('Unknown unit input', function(done) {
            input = "Blah";
            expected = 'invalid unit';
            assert.equal(convertHandler.getUnit(32 + input), expected);
            done();
        });

    });

    suite('Function convertHandler.convert(initNum, initUnit)', function(){

        test('Gal to L', function(done) {
            var input = [5, 'gal'];
            var expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('L to Gal', function(done) {
            var input = [5, 'L'];
            var expected = 1.32086;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('Lbs to kg', function(done) {
            var input = [5, 'Lbs'];
            var expected = 2.26796;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('Kg to Lbs', function(done) {
            var input = [5, 'Kg'];
            var expected = 11.02312;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('mi to km', function(done) {
            var input = [5, 'mi'];
            var expected = 8.0467;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('km to mi', function(done) {
            var input = [5, 'km'];
            var expected = 3.10686;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function(){

        test('Gal to L', function(done) {
            var input = 'gal';
            var expected = 'L';
            assert.equal(convertHandler.getReturnUnit(input), expected);
            done();
        });

        test('L to gal', function(done) {
            var input = 'L';
            var expected = 'gal';
            assert.equal(convertHandler.getReturnUnit(input), expected);
            done();
        });

        test('Lbs to kg', function(done) {
            var input = 'Lbs';
            var expected = 'kg';
            assert.equal(convertHandler.getReturnUnit(input), expected);
            done();
        });

        test('kg to lbs', function(done) {
            var input = 'Kg';
            var expected = 'lbs';
            assert.equal(convertHandler.getReturnUnit(input), expected);
            done();
        });

        test('mi to km', function(done) {
            var input = 'mi';
            var expected = 'km';
            assert.equal(convertHandler.getReturnUnit(input), expected);
            done();
        });

        test('km to mi', function(done) {
            var input = 'km';
            var expected = 'mi';
            assert.equal(convertHandler.getReturnUnit(input), expected);
            done();
        });

    });

    suite('Function convertHandler.spellOutUnit(unit)', function(){
        test('Return spelled out string unit', function(done){
            var input = ["gal", "L", "mi", "km", "lbs", "kg"];
            var expected = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
            input.forEach((inputValue, pos)=>{
                assert.equal(convertHandler.spellOutUnit(inputValue), expected[pos]);
            });
            done();
        });
    });

    suite('Function convertHandler.getString(initNum, initUnit, returnNum, returnUnit)', function() {
        test('Return string correct string from function', function(done){
            var input = [3.1, 'mi', 4.98895, 'km'];
            var expected = '3.1 miles converts to 4.98895 kilometers';
            assert.equal(convertHandler.getString(input[0], input[1], input[2], input[3]), expected);
            done();
        });
    });

});