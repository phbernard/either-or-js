# either-or

## TL;DR

Write code as branches to be enumerated.

    var EitherOr = require('either-or');

    EitherOr.runAll(function(eo) {
      console.log("Hello");
      eo.either(function() {
        console.log("Doctor Jekill");
      }).or(function() {
        console.log("Mister Hide");
      });
      console.log("Have a nice day");
    });

Prints:

    Hello
    Doctor Jekill
    Have a nice day
    Hello
    Mister Hide
    Have a nice day

## Install

Install the package:

    npm install either-or

Use it:

    var EitherOr = require('either-or');

## Use

### Either... or...

#### Multiple branches

Try two branches:

    EitherOr.runAll(function(eo) {
      console.log("Hello");
      eo.either(function() {
        console.log("Doctor Jekill");
      }).or(function() {
        console.log("Mister Hide");
      });
      console.log("Have a nice day");
    });

Prints:

    Hello
    Doctor Jekill
    Have a nice day
    Hello
    Mister Hide
    Have a nice day

You can add as many `or` as needed:

    EitherOr.runAll(function(eo) {
      console.log("Hello");
      eo.either(function() {
        console.log("Doctor Jekill");
      }).or(function() {
        console.log("Mister Hide");
      }).or(function() {
        console.log("Mister Utterson");
      });
      console.log("Have a nice day");
    });

#### Conditions

You can use conditions to skip branches:

    var happyEnding = true;
    EitherOr.runAll(function(eo) {
      console.log("Hello");
      eo.either(function() {
        console.log("Doctor Jekill");
      }).or({if: !happyEnding}, function() {
        console.log("Mister Hide");
      });
      console.log("Have a nice day");
    });

Prints:

    Hello
    Doctor Jekill
    Have a nice day

### Choose

#### Enumerate arrays

You can also enumerate the elements of an array:

    EitherOr.runAll(function(eo) {
      console.log("Hello");
      var name = eo.choose(["Doctor Jekill", "Mister Hide"]);
      console.log(name);
      console.log("Have a nice day");
    });

Prints:

    Hello
    Doctor Jekill
    Have a nice day
    Hello
    Mister Hide
    Have a nice day

#### Conditions

You can filter the elements:

    EitherOr.runAll(function(eo) {
      console.log("Hello");
      var name = eo.choose(["Doctor Jekill", "Mister Hide"], {
        with: function(e) { return e.startsWith("Doctor"); }
      });
      console.log(name);
      console.log("Have a nice day");
    });

Prints:

    Hello
    Doctor Jekill
    Have a nice day

### Combine

You can also combine these constructs at will.

Nest `either/or`:

    EitherOr.runAll(function(eo) {
      console.log("Hello");
      eo.either(function() {
        console.log("Doctor Jekill");
      }).or(function() {
        console.log("Mister Hide");
        eo.either(function() {
          console.log("O mysterious character");
        }).or(function() {
          console.log("O dangerous man");
        });
      });
      console.log("Have a nice day");
      console.log("");
    });

Prints:

    Hello
    Doctor Jekill
    Have a nice day

    Hello
    Mister Hide
    O mysterious character
    Have a nice day

    Hello
    Mister Hide
    O dangerous man
    Have a nice day

`Either/or` in series:

    EitherOr.runAll(function(eo) {
      console.log("Hello");

      eo.either(function() {
        console.log("Doctor Jekill");
      }).or(function() {
        console.log("Mister Hide");
      });

      eo.either(function() {
        console.log("Have a nice day");
      }).or(function() {
        console.log("I wish we never met");
      });

      console.log("");
    });

Prints:

    Hello
    Doctor Jekill
    Have a nice day

    Hello
    Doctor Jekill
    I wish we never met

    Hello
    Mister Hide
    Have a nice day

    Hello
    Mister Hide
    I wish we never met

`Either/or` and `choose`:

    EitherOr.runAll(function(eo) {
      console.log("Hello");
      var name = eo.choose(["Doctor Jekill", "Mister Hide"]);

      eo.either(function() {
        console.log(name);
      }).or(function() {
        console.log(name.toUpperCase());
      });
      console.log("Have a nice day");
      console.log("");
    });

Prints:

    Hello
    Doctor Jekill
    Have a nice day

    Hello
    DOCTOR JEKILL
    Have a nice day

    Hello
    Mister Hide
    Have a nice day

    Hello
    MISTER HIDE
    Have a nice day

Conditions can help combine more complex data:

    EitherOr.runAll(function(eo) {
      console.log("Hello");

      var name = eo.choose(["Doctor Jekill", "Mister Hide"]);

      eo.either(function() {
        console.log("Nice to meet you");
      }).or({if: (name.starsWith('Doctor'))}, function() {
        console.log("Could you examine my cough?");
      });

      console.log("Have a nice day");
      console.log("");
    });

Prints:

    Hello
    Doctor Jekill
    Nice to meet you
    Have a nice day

    Hello
    Doctor Jekill
    Could you examine my cough?
    Have a nice day

    Hello
    Mister Hide
    Nice to meet you
    Have a nice day

## Contribute

Pull requests are very welcome. If you add or change some code, by all means, **write some tests**.

If you feel your PR is quite obvious (typo, bug...), you can submit it directly. If it is a new feature or a change it the package behavior, first post an issue to discuss it.
