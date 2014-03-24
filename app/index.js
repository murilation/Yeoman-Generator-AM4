'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var AppGenerator = module.exports = function AppGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.testFramework = options['test-framework'] || 'mocha';
  this.coffee = options.coffee;
  options['test-framework'] = this.testFramework;

  this.hookFor('test-framework', {
    as: 'app',
    options: {
      options: {
        'skip-install': options['skip-install-message'],
        'skip-message': options['skip-install']
      }
    }
  });

  this.options = options;
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
    console.log(chalk.magenta('Hello Bitches !!!'));
  }

  var prompts = [{
      name: 'siteName',
      message: 'Digite o titulo do pojeto?'
    }, {
      type: 'checkbox',
      name: 'scripts',
      message: 'Quais Plugins javascript?',
      choices: [{
        name: 'jQuery',
        value: 'includejQuery',
        checked: true
      }, {
        name: 'HTML5Shiv',
        value: 'includeShiv',
        checked: true
      }, {
        name: 'jQuery-Mobile',
        value: 'includejQueryMobile',
        checked: false
      }, {
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: false
      }, {
        name: 'Malihu-Scrollbars',
        value: 'includeMalihuScrollbars',
        checked: false
      }, {
        name: 'jQuery-Colorbox',
        value: 'includeColorbox',
        checked: false
      }, {
        name: 'jQuery-MaskedInput',
        value: 'includeMaskedInput',
        checked: false
      }]
    }, {
      type: 'checkbox',
      name: 'grunt',
      message: 'Quais ferramentas do Grunt utilizar?',
      choices: [{
        name: 'Concat',
        value: 'includeConcat',
        checked: true
      }, {
        name: 'Uglify',
        value: 'includeUglify',
        checked: true
      }, {
        name: 'Sass',
        value: 'includeSass',
        checked: true
      }, {
        name: 'CSSmin',
        value: 'includeCSSmin',
        checked: true
      }, {
        name: 'Watch',
        value: 'includeWatch',
        checked: true
      }, {
        name: 'ImgMin',
        value: 'includeImgMin',
        checked: false
      }]
    }, {
      type: 'confirm',
      name: 'oldie',
      message: 'Incluir CSS / JS para IE8- ?'
    }];

    this.prompt(prompts, function(answers) {
      var scripts = answers.scripts;
      var grunt = answers.grunt;
      function hasScripts(feat) { return scripts.indexOf(feat) !== -1; }
      function hasGrunt(feat) { return grunt.indexOf(feat) !== -1; }

      this.siteName = answers.siteName;
      this.oldIE = answers.oldie;
      this.includejQuery = hasScripts('includejQuery');
      this.includeShiv = hasScripts('includeShiv');
      this.includejQueryMobile = hasScripts('includejQueryMobile');
      this.includeModernizr = hasScripts('includeModernizr');
      this.includeMalihuScrollbars = hasScripts('includeMalihuScrollbars');
      this.includeColorbox = hasScripts('includeColorbox');
      this.includeMaskedInput = hasScripts('includeMaskedInput');
      this.includeConcat = hasGrunt('includeConcat');
      this.includeUglify = hasGrunt('includeUglify');
      this.includeSass = hasGrunt('includeSass');
      this.includeCSSmin = hasGrunt('includeCSSmin');
      this.includeWatch = hasGrunt('includeWatch');
      this.includeImgMin = hasGrunt('includeImgMin');

      cb();
    }.bind(this));
};

AppGenerator.prototype.app = function app() {
  this.mkdir('css');
  this.mkdir('scripts');
  this.mkdir('page');
  this.mkdir('images');
  this.mkdir('conteudo');

  this.mkdir('assets');
  this.mkdir('assets/js');
  this.mkdir('assets/js/libs');
  if (this.includeSass) {
    this.mkdir('assets/sass');
  }
}

AppGenerator.prototype.gruntfile = function gruntfile(){
  this.template('Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
}

AppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
}

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

AppGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'page/favicon.ico');
  this.copy('favicon.png', 'page/favicon.png');
  this.copy('touch-icon-ipad.png', 'page/touch-icon-ipad.png');
  this.copy('touch-icon-ipad-retina.png', 'page/touch-icon-ipad-retina.png');
  this.copy('touch-icon-iphone.png', 'page/touch-icon-iphone.png');
  this.copy('touch-icon-iphone-retina.png', 'page/touch-icon-iphone-retina.png');
  this.copy('ico-facebook.jpg', 'images/ico-facebook.jpg');
  this.copy('404.aspx', 'page/404.aspx');
  this.copy('_icons.aspx', 'page/_icons.aspx');
  this.copy('_css.aspx', 'page/_css.aspx');
  this.copy('_scripts.aspx', 'page/_scripts.aspx');
  this.copy('index.aspx', 'page/index.aspx');
  this.copy('robots.txt', 'robots.txt');
  this.copy('global.js', 'assets/js/global.js');
  this.copy('scripts.js', 'scripts/scripts.js');
};

AppGenerator.prototype.styleSheets = function styleSheets() {
  if (this.includeSass) {
    this.copy('sass/estilo.sass', 'assets/sass/estilo.sass');
    this.copy('sass/util/_print.sass', 'assets/sass/util/_print.sass');
    this.copy('sass/util/_reset.sass', 'assets/sass/util/_reset.sass');
  }
  this.copy('estilo.css', 'css/estilo.css');
};

AppGenerator.prototype.install = function () {
  if (this.options['skip-install']) {
    return;
  }

  var done = this.async();
  this.installDependencies({
    skipMessage: this.options['skip-install-message'],
    skipInstall: this.options['skip-install'],
    callback: done
  });
};