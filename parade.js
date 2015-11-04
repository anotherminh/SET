// TODO: detect when the peppers have fallen off the screen and take them out of the parade

function createCanvasOverlay()
 {
   // code is from http://permadi.com/2009/04/usng-html-5-canvas-to-draw-over-my-web-page-part-2/
   // Create a blank div where we are going to put the canvas into.
    var canvasContainer = document.createElement('div');
   // Add the div into the document
    document.body.appendChild(canvasContainer);
    canvasContainer.style.position="absolute";
    // Set to 100% so that it will have the dimensions of the document
    canvasContainer.style.left="0px";
    canvasContainer.style.top="0px";
    canvasContainer.style.width="100%";
    canvasContainer.style.height="100%";
    // Set to high index so that this is always above everything else
    // (might need to be increased if you have other element at higher index)
    canvasContainer.style.zIndex="1000";
    // Now we create the canvas
    myCanvas = document.createElement('canvas');
    myCanvas.style.width = canvasContainer.scrollWidth+"px";
    myCanvas.style.height = canvasContainer.scrollHeight+"px";
    // You must set this otherwise the canvas will be streethed to fit the container
    myCanvas.width=canvasContainer.scrollWidth;
    myCanvas.height=canvasContainer.scrollHeight;
    myCanvas.style.overflow = 'visible';
    myCanvas.style.position = 'absolute';
    // Add int into the container
    canvasContainer.appendChild(myCanvas);
    return myCanvas;
 }

var canvas;

 var startParade = function(){
   canvas = createCanvasOverlay();
   var ctx = canvas.getContext("2d");
   new Parade(ctx).start();
 };

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

// returns an array of n peppers of randomized colors/shapes in string format
// takes a reference to the ctx to pass to peppers & to determing starting pos
// this function is too long right meow
var makeRandomPeppers = function(n, ctx) {
  var pepperImages = [];
  for (var i = 0; i < n; i++) {
    var randomColor = CardConstants.COLORS[Math.floor(Math.random() * CardConstants.COLORS.length)];
    var randomShape = CardConstants.SHAPES[Math.floor(Math.random() * CardConstants.SHAPES.length)];
    pepperImages.push("" + randomShape + randomColor);
  }
  var peppers = [];
  // peppers start at the top and are evenly distributed across width of canvas
  // they have a random speed (downward movement of pixels per second)
  // and a random drift on the x-axis (moving either left or right)
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
