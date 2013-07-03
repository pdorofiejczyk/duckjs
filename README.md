![Duckjs](http://i2.kym-cdn.com/entries/icons/original/000/003/549/1307920884001.jpg)

# Duckjs #
### Typing duck simple as fuck ###


JavaScript duck typing tool

### Usage ###

Check object
```javascript
var scheme = {
  a: "string",
  b: {
    a: "function",
    b: "object"
  }
}

//Returns true
duck.check(scheme, {
  a: "string value",
  b: {
    a: function(){},
    b: {}
  }
});

//Returns false
duck.check(scheme, {
  a: "string value",
  b: function(){}
});
```

Check function arguments
```javascript
var helloWorld = {
  say: duck.expects([
      "string",
      "function"
    ], function(name, sayCallback) {
      sayCallback(name);
    })
}

//This runs ok
helloWorld.say("Duck", function(name) {
  console.log("Hello " + name + "!");
});

//This one throws ArgumentException
helloWorld.say("Duck", "Hello");
```
