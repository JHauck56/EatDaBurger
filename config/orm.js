
// Here is the O.R.M. where you write functions that takes inputs and conditions
// and turns them into database commands like SQL.

var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  // column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    if(Object.hasOwnProperty.call(ob, key)) {
      if(typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
    }
    arr.push(key + "=" + ob[key]);
  }

  return arr.toString();
}

var orm = {
  //Create 'all' method to select *
  all: function(column, cb) {
    var queryString = `SELECT * FROM ${column}`
    connection.query(queryString, function(err, results) {
      if(err) throw err;
      cb(results);
    })
  },

  //Create 'create' method
  // vals is an array of values that we want to save to cols
  // cols are the columns we want to insert the values into
  create: function(table, cols, vals, cb) {
    var queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`
    connection.query(queryString, vals, function(err, results) {
      if(err) throw err;
      cb(results);
    });
  },

  //Create 'update' Method
  // objColVals would be the columns and values that you want to update
  // an example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);  
    });
  }
};

module.exports = orm;
