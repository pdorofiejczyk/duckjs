# Duckjs #
### Typing duck simple as fuck ###


JavaScript duck typing tool

### Usage ###

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
