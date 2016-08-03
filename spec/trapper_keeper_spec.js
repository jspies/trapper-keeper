process.env.NODE_ENV = "test";
var path = require('path');
var TrapperKeeper = require("../lib/trapper_keeper.js");

describe('TrapperKeeper', function() {
  describe('initializing', function() {
    it("defaults to cwd()/config", function() {
      delete process.env.NODE_CONFIG_DIR;
      var tk = new TrapperKeeper({suppressErrors: true});

      expect(tk.CONFIG_DIR).toEqual(process.cwd() + "/config");
    });

    describe("with a config", function() {
      process.env.NODE_CONFIG_DIR = path.resolve(__dirname) + "/fixtures";

      var tk = new TrapperKeeper();

      it("can get a top level key", function() {
        expect(tk.get('db_connection_string')).toEqual('mysql');
      });

      it("can get a second level key", function() {
        expect(tk.get('aws.key')).toEqual('SHHHHHH');
      });

      it("can get a third level key", function() {
        expect(tk.get('bang.bang.bang')).toEqual('dead');
      });

      it("returns null if the key doesn't exist", function() {
        expect(tk.get("nowhereman")).toEqual(null);
      });

      it("returns null if the sub key doesn't exist", function() {
        expect(tk.get("nowhereman.there")).toEqual(null);
      });

      describe("with an ENV variable override", function() {
        it("returns the ENV variable value first", function() {
          process.env.db_connection_string = "overridden";
          expect(tk.get('db_connection_string')).toEqual('overridden');
          process.env.db_connection_string = null;
        });
      })
    });
  });
});
