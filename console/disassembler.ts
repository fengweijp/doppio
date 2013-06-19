// Generated by CoffeeScript 1.6.2
(function() {
  "use strict";
  var ReferenceClassData, argv, bytes_array, class_data, disassemble, fname, fs, util;

  fs = require('fs');

  util = require('../src/util');

  disassemble = require('../src/disassembler').disassemble;

  ReferenceClassData = require('../src/ClassData').ReferenceClassData;

  argv = require('optimist').argv;

  if (argv._.length > 0) {
    fname = argv._[0];
    if (fname.indexOf(".class") === -1) {
      fname += ".class";
    }
  } else {
    fname = '/dev/stdin';
  }

  bytes_array = util.bytestr_to_array(fs.readFileSync(fname, 'binary'));

  class_data = new ReferenceClassData(bytes_array);

  console.log(disassemble(class_data));

}).call(this);
