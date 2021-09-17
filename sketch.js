const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var left_rectangle, right_rectangle;
var bridge, jointPoint, jointPoint2;
var jointLink, jointLink2;
var last_link1, last_link2;

var edges;

var stones = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  edges = createEdgeSprites();


  left_rectangle = new Base(120, 400, 500, 100);
  right_rectangle = new Base(1220, 400, 500, 100);

  bridge = new Bridge(21, { x: 250, y: 500 });
  jointPoint = new Base(1000, 400, 20, 20);
  jointPoint2 = new Base(340, 400, 20, 20);

  last_link1 = bridge.body.bodies.length - 2;
  last_link2 = bridge.body.bodies.length - 21;

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint, last_link1);
  jointLink2 = new Link(bridge, jointPoint2, last_link2);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 140);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }
}

function draw() {
  background(51);
  Engine.update(engine);

  left_rectangle.display();
  right_rectangle.display();

  jointPoint.display();
  jointPoint2.display();

  bridge.show();

  

  for (var stone of stones) {
    stone.display();
  }

  drawSprites();
}