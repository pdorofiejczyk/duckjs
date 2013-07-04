/**
 * Duck.js
 *
 * @author Paweł Dorofiejczyk
 */

var duck = (function(){

  var __ = {
    hasProperty: function(obj, prop) {
      return obj[prop] !== undefined;
    },

    types: {
      FUNCTION: 'function',
      OBJECT: 'object',
      ARRAY: 'array',
      STRING: 'string',
      NUMBER: 'number'
    }
  }; 

  var getType = function(obj){
    var type = typeof obj;

    if(type === __.types.FUNCTION &&
      typeof obj.length === __.types.NUMBER &&
      typeof obj.splice === __.types.FUNCTION &&
      !(obj.propertyIsEnumerable('length'))) {
      return __.types.ARRAY;
    }
    else {
      return type;    
    }    
  };

  var checkType = function(type, obj) {
    return getType(obj) === type;
  };

  var check = function(type, obj) {
    if(!__.hasProperty(checkers, getType(type))) {
      throw {
        name: 'NoSuchChecker',
        message: 'Can\'t check this ' + type + ' type'
      }
    }

    return checkers[getType(type)](type, obj);
  };

  var checkers = {};
    checkers[__.types.STRING] = checkType;

    checkers[__.types.ARRAY] = function(keys, obj) {
      return keys.every(function(el, index){
        return __.hasProperty(obj, index) && check(el, obj[index]);         
      });  
    };

    checkers[__.types.OBJECT] = function(type, obj){
      var keys = Object.keys(type);

      return keys.every(function(el, index){
        return __.hasProperty(obj, el) && check(type[el], obj[el]);         
      });
    };

  var expects = function(args, func) {
    return function() {
      if(!check(args, arguments)) {
        throw {
          name: 'ArgumentException',
          message: 'Wrong argument types'
        }      
      }

      return func.apply(this, arguments);
    }  
  }

  return {
    'check': check,
    'expects': expects,
    'getType': getType,
    'checkType': checkType
  };
})();
