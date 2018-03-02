var assert = require('chai').assert;
var EitherOr = require('../lib/either-or.js');

describe('EitherOr', function() {
  var trace;

  beforeEach(function() {
    trace = new Array();
  });

  it('should just run the callback', function() {
    trace.push(1);
    EitherOr.runAll(function(eo) {
      trace.push(2);
    });
    trace.push(3);
    assert.deepEqual(trace, [
      1, 2, 3
    ]);
  });

  it('should enumerate branches with either...', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
      })
      trace.push(3);
    });
    assert.deepEqual(trace, [
      1, 2, 3
    ]);
  });

  it('should enumerate branches with either... or...', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
      }).or(function() {
        trace.push(3);
      });
      trace.push(4);
    });
    assert.deepEqual(trace, [
      1, 2, 4,
      1, 3, 4
    ]);
  });

  it('should enumerate branches with either... or... or...', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
      }).or(function() {
        trace.push(3);
      }).or(function() {
        trace.push(4);
      });
      trace.push(5);
    });
    assert.deepEqual(trace, [
      1, 2, 5,
      1, 3, 5,
      1, 4, 5
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 01', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
        eo.either(function() {
          trace.push(3);
        }).or(function() {
          trace.push(4);
        });
        trace.push(5);
      }).or(function() {
        trace.push(6);
      });
      trace.push(7);
    });
    assert.deepEqual(trace, [
      1, 2, 3, 5, 7,
      1, 2, 4, 5, 7,
      1, 6, 7
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 02', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
      }).or(function() {
        trace.push(3);
        eo.either(function() {
          trace.push(4);
        }).or(function() {
          trace.push(5);
        });
        trace.push(6);
      });
      trace.push(7);
    });
    assert.deepEqual(trace, [
      1, 2, 7,
      1, 3, 4, 6, 7,
      1, 3, 5, 6, 7,
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 03', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);

      eo.either(function() {
        trace.push(2);
      }).or(function() {
        trace.push(3);
      });

      trace.push(4);

      eo.either(function() {
        trace.push(5);
      }).or(function() {
        trace.push(6);
      });

      trace.push(7);
    });
    assert.deepEqual(trace, [
      1, 2, 4, 5, 7,
      1, 2, 4, 6, 7,
      1, 3, 4, 5, 7,
      1, 3, 4, 6, 7
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 04', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
        eo.either(function() {
          trace.push(3);
        }).or(function() {
          trace.push(4);
        });
        trace.push(5);
      }).or(function() {
        trace.push(6);
      }).or(function() {
        trace.push(7);
      });
      trace.push(8);
    });
    assert.deepEqual(trace, [
      1, 2, 3, 5, 8,
      1, 2, 4, 5, 8,
      1, 6, 8,
      1, 7, 8,
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 05', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
      }).or(function() {
        trace.push(3);
        eo.either(function() {
          trace.push(4);
        }).or(function() {
          trace.push(5);
        });
        trace.push(6);
      }).or(function() {
        trace.push(7);
      });
      trace.push(8);
    });
    assert.deepEqual(trace, [
      1, 2, 8,
      1, 3, 4, 6, 8,
      1, 3, 5, 6, 8,
      1, 7, 8
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 06', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
      }).or(function() {
        trace.push(3);
      }).or(function() {
        trace.push(4);
        eo.either(function() {
          trace.push(5);
        }).or(function() {
          trace.push(6);
        });
        trace.push(7);
      });
      trace.push(8);
    });
    assert.deepEqual(trace, [
      1, 2, 8,
      1, 3, 8,
      1, 4, 5, 7, 8,
      1, 4, 6, 7, 8
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 07', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
        eo.either(function() {
          trace.push(3);
        }).or(function() {
          trace.push(4);
        });
        trace.push(5);
      }).or(function() {
        trace.push(6);
        eo.either(function() {
          trace.push(7);
        }).or(function() {
          trace.push(8);
        });
        trace.push(9);
      });
      trace.push(10);
    });
    assert.deepEqual(trace, [
      1, 2, 3, 5, 10,
      1, 2, 4, 5, 10,
      1, 6, 7, 9, 10,
      1, 6, 8, 9, 10
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 08', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
        eo.either(function() {
          trace.push(3);
        }).or(function() {
          trace.push(4);
        });
        trace.push(5);
      }).or(function() {
        trace.push(6);
        eo.either(function() {
          trace.push(7);
        }).or(function() {
          trace.push(8);
        });
        trace.push(9);
      }).or(function() {
        trace.push(10);
      });
      trace.push(11);
    });
    assert.deepEqual(trace, [
      1, 2, 3, 5, 11,
      1, 2, 4, 5, 11,
      1, 6, 7, 9, 11,
      1, 6, 8, 9, 11,
      1, 10, 11
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 09', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
      }).or(function() {
        trace.push(3);
        eo.either(function() {
          trace.push(4);
        }).or(function() {
          trace.push(5);
        });
        trace.push(6);
      }).or(function() {
        trace.push(7);
        eo.either(function() {
          trace.push(8);
        }).or(function() {
          trace.push(9);
        });
        trace.push(10);
      });
      trace.push(11);
    });
    assert.deepEqual(trace, [
      1, 2, 11,
      1, 3, 4, 6,  11,
      1, 3, 5, 6,  11,
      1, 7, 8, 10, 11,
      1, 7, 9, 10, 11
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 10', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
        eo.either(function() {
          trace.push(3);
        }).or(function() {
          trace.push(4);
        });
        trace.push(5);
      }).or(function() {
        trace.push(6);
      }).or(function() {
        trace.push(7);
        eo.either(function() {
          trace.push(8);
        }).or(function() {
          trace.push(9);
        });
        trace.push(10);
      });
      trace.push(11);
    });
    assert.deepEqual(trace, [
      1, 2, 3, 5, 11,
      1, 2, 4, 5, 11,
      1, 6, 11,
      1, 7, 8, 10, 11,
      1, 7, 9, 10, 11
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 11', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
        eo.either(function() {
          trace.push(3);
          eo.either(function() {
            trace.push(4);
          }).or(function() {
            trace.push(5);
          });
          trace.push(6);
        }).or(function() {
          trace.push(7);
        });
        trace.push(8);
      }).or(function() {
        trace.push(9);
      });
      trace.push(10);
    });
    assert.deepEqual(trace, [
      1, 2, 3, 4, 6, 8, 10,
      1, 2, 3, 5, 6, 8, 10,
      1, 2, 7, 8, 10,
      1, 9, 10
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 12', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
        eo.either(function() {
          trace.push(3);
        }).or(function() {
          trace.push(4);
          eo.either(function() {
            trace.push(5);
          }).or(function() {
            trace.push(6);
          });
          trace.push(7);
        });
        trace.push(8);
      }).or(function() {
        trace.push(9);
      });
      trace.push(10);
    });
    assert.deepEqual(trace, [
      1, 2, 3, 8, 10,
      1, 2, 4, 5, 7, 8, 10,
      1, 2, 4, 6, 7, 8, 10,
      1, 9, 10
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 13', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
      }).or(function() {
        trace.push(3);
        eo.either(function() {
          trace.push(4);
          eo.either(function() {
            trace.push(5);
          }).or(function() {
            trace.push(6);
          });
          trace.push(7);
        }).or(function() {
          trace.push(8);
        });
        trace.push(9);
      });
      trace.push(10);
    });
    assert.deepEqual(trace, [
      1, 2, 10,
      1, 3, 4, 5, 7, 9, 10,
      1, 3, 4, 6, 7, 9, 10,
      1, 3, 8, 9, 10
    ]);
  });

  it('should enumerate branches with either... or... (complex) - 14', function() {
    EitherOr.runAll(function(eo) {
      trace.push(1);
      eo.either(function() {
        trace.push(2);
      }).or(function() {
        trace.push(3);
        eo.either(function() {
          trace.push(4);
        }).or(function() {
          trace.push(5);
          eo.either(function() {
            trace.push(6);
          }).or(function() {
            trace.push(7);
          });
          trace.push(8);
        });
        trace.push(9);
      });
      trace.push(10);
    });
    assert.deepEqual(trace, [
      1, 2, 10,
      1, 3, 4, 9, 10,
      1, 3, 5, 6, 8, 9, 10,
      1, 3, 5, 7, 8, 9, 10
    ]);
  });
});
