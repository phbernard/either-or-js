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
      either: function(f) {
        maxGroup += 1;
        var group = maxGroup
        if (states.length === group) {
          states.push(false);
          currentElements.push(0);
          selectedElements.push(0);
        }
        this.runEitherOr(group, 0, f);

        return this;
      },
      or: function(f) {
        var group = groupId;
        currentElements[group] += 1;
        element = currentElements[group];
        this.runEitherOr(group, element, f);

        return this;
      },
      runEitherOr: function(group, element, func) {
        if (selectedElements[group] === element) {
          if (true/* TODO support conditions */) {
            // Consider me as the last element
            states[group] = false;
            func();
          }
          else {
            // Condition not met: give a try to the next element
            selectedElements[group] += 1;
          }
        }
        else if (true/* TODO support conditions */) {
          // Don't forget me!
          states[group] = true;
        }
        groupId = group;
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
