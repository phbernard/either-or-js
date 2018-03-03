module.exports = {
  runAll: function(func) {
    var firstIteration = true;
    var states = new Array();
    var currentElements = new Array();
    var selectedElements = new Array();

    function hasMoreIteration() {
      if (firstIteration) {
        return true;
      }

      var idx = states.length - 1;
      while(idx >= 0) {
        if (! states[idx]) {
          states.splice(idx, 1);
          currentElements.splice(idx, 1);
          selectedElements.splice(idx, 1);
          idx -= 1;
        }
        else {
          selectedElements[idx] += 1;
          return true;
        }
      }
      return false;
    }

    var eo = {
      either: function(options, f) {
        maxGroup += 1;
        var group = maxGroup
        if (states.length === group) {
          states.push(false);
          currentElements.push(0);
          selectedElements.push(0);
        }
        this.runEitherOr(group, 0, options, f);

        return this;
      },
      or: function(options, f) {
        var group = groupId;
        currentElements[group] += 1;
        element = currentElements[group];
        this.runEitherOr(group, element, options, f);

        return this;
      },
      runEitherOr: function(group, element, options, func) {
        if (func === undefined) {
          // When func is undefined, this is because there were no options
          // and the "options" is the function we were expecting
          func = options;
          options = {};
        }

        if (selectedElements[group] === element) {
          if (this.evaluateEitherOrCondition(options)) {
            // Consider me as the last element
            states[group] = false;
            func();
          }
          else {
            // Condition not met: give a try to the next element
            selectedElements[group] += 1;
          }
        }
        else if (this.evaluateEitherOrCondition(options)) {
          // Don't forget me!
          states[group] = true;
        }
        groupId = group;
      },
      evaluateEitherOrCondition: function(options) {
        if (options.if == undefined) {
          return true;
        }
        else if (typeof options.if === 'function') {
          return options.if();
        }
        else {
          return options.if;
        }
      },

      choose: function(elements, options) {
        maxGroup += 1;
        var group = maxGroup;
        if (states.length === group) {
          states.push(false);
          currentElements.push(0);
          selectedElements.push(0);
        }
        // Select current element (may change because of the condition)
        for (var idx = selectedElements[group]; idx < elements.length; idx++) {
          if (this.evaluateChooseCondition(elements[idx], options)) {
            selectedElements[group] = idx;
            break;
          }
        }
        // Is it the last selected element?
        states[group] = false;
        for (var idx = selectedElements[group] + 1; idx < elements.length; idx++) {
          if (this.evaluateChooseCondition(elements[idx], options)) {
            states[group] = true;
            break;
          }
        }
        return elements[selectedElements[group]];
      },

      evaluateChooseCondition: function(element, options) {
        // No condition: always true
        if (options === undefined || options.with === undefined) {
          return true;
        }
        else if (typeof options.with === 'function') {
          return options.with(element);
        }
        else {
          return options.with;
        }
      }
    };

    var maxGroup;
    var groupId;

    while(hasMoreIteration()) {
      var maxGroup = -1;
      var groupId = -1;
      currentElements.fill(0);

      func(eo);

      firstIteration = false;
    }
  }
}
