var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    //hint:orm.all()
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  create: function(name, cb) {
    //hint:orm.create()
    orm.create("burgers", [
      "burger_name", "devoured"
    ], [
      name, false
    ], cb);
  },
  update: function(id, cb) {
    var condition = "id=" + id;
    //hint:orm.update
    orm.update("burgers", {
      devoured: true

    }, condition, cb)
  }
};

module.exports = burger;
