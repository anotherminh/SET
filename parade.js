var Parade = function(ctx) {
  this.ctx = ctx;
  this.peppers = [];
};

var PEPPER_IMGS = {};

var loadImages = function() {
  var pepper;
  CardConstants.COLORS.forEach(function(color, idx){
    CardConstants.SHAPES.forEach(function(shape, idx){
      pepper = "" + shape + color;
      PEPPER_IMGS[pepper] = new Image();
      PEPPER_IMGS[pepper].src = "./images/" + pepper + ".png";
    });
  });
};


Parade.prototype.start = function(){
  var that = this;
  loadImages();
  that.peppers = makeRandomPeppers(canvas.width / 30, that.ctx);
  var clickInt = setInterval(function(){
    that.click();
  }, 20);
  var rainInt = setInterval(function(){
    that.addMorePeppers();
  }, 1500);
};

Parade.prototype.addMorePeppers = function(){
  var that = this;
  var newPeppers = makeRandomPeppers(canvas.width / 30, that.ctx);
  that.peppers = that.peppers.concat(newPeppers);
};

Parade.prototype.click = function(){
  var that = this;
  that.moveAll();
  that.ctx.clearRect(0,0,canvas.width,canvas.height);
  that.drawAll();
};

Parade.prototype.moveAll = function(){
  this.peppers.forEach(function(pepper){
    pepper.move();
  });
};

Parade.prototype.drawAll = function(){
  this.peppers.forEach(function(pepper){
    pepper.draw();
  });
};
//
// var setupCanvas = function() {
//   var canvas = document.getElementById("game-canvas");
//   var ctx = canvas.getContext("2d");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   return ctx;
// };

var paradeClick = function() {
// clear canvas
// move
// draw
};



// returns an array of n peppers of randomized colors/shapes in string format
// takes a reference to the ctx to pass to peppers & to determing starting pos
var makeRandomPeppers = function(n, ctx) {
  var pepperImages = [];
  for (var i = 0; i < n; i++) {
    var randomColor = CardConstants.COLORS[Math.floor(Math.random() * CardConstants.COLORS.length)];
    var randomShape = CardConstants.SHAPES[Math.floor(Math.random() * CardConstants.SHAPES.length)];
    pepperImages.push("" + randomShape + randomColor);
  }
  var peppers = [];
  // peppers start at the top and are evenly distributed across width of canvas
  pepperImages.forEach(function(pepper, idx) {
    var pepperOptions = {
      img: PEPPER_IMGS[pepper],
      pos: [(35 * idx), -15],
      ctx: ctx,
      speed: Math.floor(Math.random() * 6) + 1,
      drift: Math.random() < 0.5 ? -1 : 1
    };
    peppers.push(new Pepper(pepperOptions));
  });
  return peppers;
};

// takes color/shape string, starting pos, and ctx reference
var Pepper = function(options) {
  this.img = options.img;
  this.pos = options.pos;
  this.ctx = options.ctx;
  this.speed = options.speed;
  this.drift = options.drift;
};

Pepper.prototype.draw = function() {
  this.ctx.drawImage(this.img, this.pos[0], this.pos[1]);
};

Pepper.prototype.move = function() {
  // move down
  this.pos[1] += this.speed;
  // randomly also move left or right or not at all
  this.pos[0] += randomX() * this.drift;
};

var randomX = function() {
  var x = Math.floor(Math.random() * 2);
  return x;
};
