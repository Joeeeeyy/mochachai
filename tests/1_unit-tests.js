const chai = require('chai');
const assert = chai.assert;

suite('Unit Tests', function () {
  suite('Basic Assertions', function () {
    // #1 Learn How JavaScript Assertions Work
    test('#isNull, #isNotNull', function () {
      assert.isNull(null, 'this is an optional error description - e.g. null is null');
      assert.isNotNull(1, '1 is not null');
    });
    // #2 Test if a Variable/Function is Defined
    test('#isDefined, #isUndefined', function () {
      assert.isDefined(null, 'null is not undefined');
      assert.isUndefined(undefined, 'undefined IS undefined');
      assert.isDefined('hello', 'a string is not undefined');
    });
    // #3 Use Assert.isOK and Assert.isNotOk
    test('#isOk, #isNotOk', function () {
      assert.isNotOk(null, 'null is falsey');
      assert.isOk("I'm truthy", 'a string is truthy');
      assert.isOk(true, 'true is truthy');
    });
    // #4 Test for Truthiness
    test('#isTrue, #isNotTrue', function () {
      assert.isTrue(true, 'true is true');
      assert.isTrue(!!'double negation', 'double negation of a truthy is true');
      assert.isNotTrue({ value: 'truthy' }, 'A truthy object is NOT TRUE (neither is false...)');
    });
  });

  // -----------------------------------------------------------------------------

  suite('Equality', function () {
    // #5 Double Equals to Assert Equality
    test('#equal, #notEqual', function () {
      assert.equal(12, '12', 'numbers are coerced into strings with == ');
      assert.notEqual({ value: 1 }, { value: 1 }, '== compares object references');
      assert.equal(6 * '2', '12', 'no more hints...');
      assert.notEqual(6 + '2', '12', 'type your error message if you want');
    });
    // #6 Triple Equals to Assert Strict
    test('#strictEqual, #notStrictEqual', function () {
      assert.notStrictEqual(6, '6');
      assert.strictEqual(6, 3 * 2);
      assert.strictEqual(6 * '2', 12);
      assert.notStrictEqual([1, 'a', {}], [1, 'a', {}]);
    });
    // #7 Assert Deep Equality with .deepEqual and .notDeepEqual
    test('#deepEqual, #notDeepEqual', function () {
      assert.deepEqual({ a: '1', b: 5 }, { b: 5, a: '1' }, "keys order doesn't matter");
      assert.notDeepEqual({ a: [5, 6] }, { a: [6, 5] }, "array elements position does matter !!");
    });
  });

  // -----------------------------------------------------------------------------

  function weirdNumbers(delta) {
    return (1 + delta - Math.random());
  }

  suite('Comparisons', function () {
    // #8 Compare the Property of Two Elements
    test('#isAbove, #isAtMost', function () {
      assert.isAtMost('hello'.length, 5);
      assert.isAbove(1, 0);
      assert.isAbove(Math.PI, 3);
      assert.isAtMost(1 - Math.random(), 1);
    });
    // #9  Test if One Value is Below or At Least as Large as Another
    test('#isBelow, #isAtLeast', function () {
      assert.isAtLeast('world'.length, 5);
      assert.isAtLeast(2 * Math.random(), 0);
      assert.isBelow(5 % 2, 2);
      assert.isBelow(2 / 3, 1);
    });
    // #10 Test if Value Falls within a Specific Range
    test('#approximately', function () {
      assert.approximately(weirdNumbers(0.5), 1, 0.5);
      assert.apprpoximately(weirdNumbers(0.2), 1, 0.8);
    });
  });

  // -----------------------------------------------------------------------------

  const winterMonths = ['dec,', 'jan', 'feb', 'mar'];
  const backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];
  suite('Arrays', function () {
    // #11 Test if a Value is an Array
    test('#isArray, #isNotArray', function () {
      assert.isArray('isThisAnArray?'.split(''), 'String.prototype.split() returns an Array');
      assert.isNotArray([1, 2, 3].indexOf(2), 'indexOf returns a number.');
    });
    // #12 Test if an Array Contains an Item
    test('Array #include, #notInclude', function () {
      assert.notInclude(winterMonths, 'jul', "It's summer in july...");
      assert.include(backendLanguages, 'javascript', 'JS is a backend language !!');
    });
  });

  // -----------------------------------------------------------------------------

  const formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };
  suite('Strings', function () {
    // #13 Test if a Value is a String
    test('#isString, #isNotString', function () {
      assert.isNotString(Math.sin(Math.PI / 4), 'a float is not a string');
      assert.isString(process.env.PATH, 'env vars are strings (or undefined)');
      assert.isString(JSON.stringify({ type: 'object' }), 'a JSON is a string');
    });
    // #14 Test if a String Contains a Substring
    test('String #include, #notInclude', function () {
      assert.iclude('Arrow', 'row', "Arrow contains row...");
      assert.notInclude('dart', 'queue', "But a dart doesn't contain a queue");
    });
    // #15 Use Regular Expressions to Test a String 
    test('#match, #notMatch', function () {
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.match(formatPeople('John Doe', 35), regex);
      assert.notMatch(formatPeople('Paul Smith III', 'twenty-four'), regex);
    });
  });

  // ----------------------------------------------------------------------------- 

  const Car = function () {
    this.model = 'cedan';
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  suite('Objects', function () {
    // #16 Test if an Object has a Property
    test('#property, #notProperty', function () {
      assert.notProperty(myCar, 'wings', 'A car has not wings');
      assert.property(airlinePlane, 'engines', 'planes have engines');
      assert.property(myCar, 'wheels', 'Cars have wheels');
    });
    // #17 Test if a Value is of a Specific Data Structure Type
    test('#typeOf, #notTypeOf', function () {
      assert.typeOf(myCar, 'object');
      assert.typeOf(myCar.model, 'string');
      assert.notTypeOf(airlinePlane.wings, 'string');
      assert.typeOf(airlinePlane.engines, 'array');
      assert.typeOf(myCar.wheels, 'number');
    });
    // #18 Test if an Object is an Instance of a Constructor
    test('#instanceOf, #notInstanceOf', function () {
      assert.notInstanceOF(myCar, Plane);
      assert.instanceOf(airlinePlane, Plane);
      assert.instanceOf(airlinePlane, Object, 'everything is an Object');
      assert.notInstanceOf(myCar.wheels, String);
    });
  });

  // -----------------------------------------------------------------------------
});
