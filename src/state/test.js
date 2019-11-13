import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// react-15.0.0/src/shared/utils/Transaction.js
var invariant = require("invariant");

var Mixin = {
  reinitializeTransaction: function() {
    this.transactionWrappers = this.getTransactionWrappers();
    if (this.wrapperInitData) {
      this.wrapperInitData.length = 0;
    } else {
      this.wrapperInitData = [];
    }
    this._isInTransaction = false;
  },

  _isInTransaction: false,

  getTransactionWrappers: null,

  isInTransaction: function() {
    return !!this._isInTransaction;
  },

  perform: function(method, scope, a, b, c, d, e, f) {
    invariant(
      !this.isInTransaction(),
      "Transaction.perform(...): Cannot initialize a transaction when there " +
        "is already an outstanding transaction."
    );
    var errorThrown;
    var ret;
    try {
      this._isInTransaction = true;
      errorThrown = true;
      this.initializeAll(0);
      ret = method.call(scope, a, b, c, d, e, f);
      errorThrown = false;
    } finally {
      try {
        if (errorThrown) {
          try {
            this.closeAll(0);
          } catch (err) {}
        } else {
          this.closeAll(0);
        }
      } finally {
        this._isInTransaction = false;
      }
    }
    return ret;
  },

  initializeAll: function(startIndex) {
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      try {
        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
        this.wrapperInitData[i] = wrapper.initialize
          ? wrapper.initialize.call(this)
          : null;
      } finally {
        if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
          try {
            this.initializeAll(i + 1);
          } catch (err) {}
        }
      }
    }
  },

  closeAll: function(startIndex) {
    invariant(
      this.isInTransaction(),
      "Transaction.closeAll(): Cannot close transaction when none are open."
    );
    var transactionWrappers = this.transactionWrappers;
    for (var i = startIndex; i < transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      var initData = this.wrapperInitData[i];
      var errorThrown;
      try {
        errorThrown = true;
        if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
          wrapper.close.call(this, initData);
        }
        errorThrown = false;
      } finally {
        if (errorThrown) {
          try {
            this.closeAll(i + 1);
          } catch (e) {}
        }
      }
    }
    this.wrapperInitData.length = 0;
  }
};

var Transaction = {
  Mixin: Mixin,
  OBSERVED_ERROR: {}
};

var MyTransaction = function() {
  //...
};

Object.assign(MyTransaction.prototype, Transaction.Mixin, {
  getTransactionWrappers: function() {
    return [
      {
        initialize: function() {
          console.log("before method perform");
        },
        close: function() {
          console.log("after method perform");
        }
      }
    ];
  }
});

var transaction = new MyTransaction();

transaction.reinitializeTransaction();

var testMethod = function() {
  console.log("test");
};

transaction.perform(testMethod);
