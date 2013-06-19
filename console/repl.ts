// Generated by CoffeeScript 1.6.2
(function() {
  "use strict";
  var BootstrapClassLoader, RuntimeState, argv, jvm, read_stdin, readline, repl, repl_run, rs, stdin, write_stdout;

  readline = require('readline');

  argv = require('optimist').argv;

  jvm = require('../src/jvm');

  RuntimeState = require('../src/runtime').RuntimeState;

  BootstrapClassLoader = require('../src/ClassLoader').BootstrapClassLoader;

  repl_run = function(rs, cname, args, done_cb) {
    if (cname.slice(-6) === '.class') {
      cname = cname.slice(0, -6);
    }
    return jvm.run_class(rs, cname, args, done_cb);
  };

  read_stdin = function(n_bytes, resume) {
    process.stdin.resume();
    return process.stdin.once('data', function(data) {
      process.stdin.pause();
      return resume(data);
    });
  };

  if (require.main === module) {
    write_stdout = process.stdout.write.bind(process.stdout);
    jvm.set_classpath("" + __dirname + "/../vendor/classes", '.');
    rs = new RuntimeState(write_stdout, read_stdin, new BootstrapClassLoader(jvm.read_classfile));
    stdin = process.openStdin();
    repl = readline.createInterface(stdin, process.stdout);
    repl.on('close', function() {
      repl.output.write('\n');
      return repl.input.destroy();
    });
    repl.on('line', function(line) {
      var toks, _ref;

      toks = line.trim().split(/\s+/);
      if ((toks != null ? (_ref = toks[0]) != null ? _ref.length : void 0 : void 0) > 0) {
        return repl_run(rs, toks[0], toks.slice(1), function() {
          return repl.prompt();
        });
      } else {
        return repl.prompt();
      }
    });
    repl.setPrompt('doppio> ');
    repl.prompt();
  }

}).call(this);
