var PEPPER_MAX_SPEED = 6;
var PEPPER_MAX_DRIFT = 2;
// determines density - lower = more peppers for your party
var PIXELS_PER_PEPPER = 30;
var SECONDS_PER_BURST = 1.2;
var CANVAS;
var PARADE;

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
    canvasContainer.style.zIndex="5";
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

 function hideCanvas()
 {
    if (myCanvas)
    {
      //myCanvas.style.visibility='hidden';
      myCanvas.parentNode.style.visibility='hidden';
    }
 }

 var startParade = function(){
   CANVAS = createCanvasOverlay();
   var ctx = CANVAS.getContext("2d");
   PARADE = new Parade(ctx);
   PARADE.start();
 };

 var stopParade = function(){
   PARADE.stop();
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
  that.addPeppers();
  var clickInt = setInterval(function(){
    that.click();
  }, 20);
  var rainInt = setInterval(function(){
    that.addPeppers();
  }, SECONDS_PER_BURST * 1000);
};

Parade.prototype.stop = function() {
  this.peppers = [];
  hideCanvas();
};

Parade.prototype.addPeppers = function(){
  var that = this;
  var newPeppers = makeRandomPeppers(CANVAS.width / PIXELS_PER_PEPPER, that.ctx);
  that.peppers = that.peppers.concat(newPeppers);
};

Parade.prototype.click = function(){
  this.moveAll();
  this.ctx.clearRect(0,0,CANVAS.width,CANVAS.height);
  this.drawAll();
};

Parade.prototype.removePepper = function(pepper) {
  // this.peppers.forEach(function(pepper, idx){
  //   if (this.outOfBounds(pepper)) {
  //     this.peppers.splice(idx);
  //   }
  // }.bind(this));
  var index = this.peppers.indexOf(pepper);
  this.peppers.splice(index, 1);
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
      pos: [(PIXELS_PER_PEPPER * idx), - PEPPER_IMGS[pepper].height],
      ctx: ctx,
      speed: Math.floor(Math.random() * PEPPER_MAX_SPEED) + 1,
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

Pepper.prototype.outOfBounds = function() {
  if (this.pos[1] > (CANVAS.height + this.img.height)) {
    return true;
  } else { return false; }
};

Pepper.prototype.draw = function() {
  this.ctx.drawImage(this.img, this.pos[0], this.pos[1]);
};

Pepper.prototype.move = function() {
  // move down
  this.pos[1] += this.speed;
  // randomly also move left or right or not at all
  this.pos[0] += randomX() * this.drift;
  if (this.outOfBounds()) {
    PARADE.removePepper(this);
  }
};

var randomX = function() {
  var x = Math.floor(Math.random() * PEPPER_MAX_DRIFT);
  return x;
};
