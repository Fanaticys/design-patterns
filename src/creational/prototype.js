class Shape {
  X;
  Y;
  color;

  constructor() {}
  constructor(source) {
    this.X = source.X;
    this.Y = source.Y;
    this.color = source.color;
  }

  clone() {}
}

class Rectangle extends Shape {
  width;
  height;

  constructor(source) {
    super(source);
    this.width = source.width;
    this.height = source.height;
  }

  clone() {
    return new Rectangle(this);
  }

}

class Circle extends Shape {
  radius;

  constructor(source) {
    super(source);
    this.radius = source.radius;
  }

  clone() {
    return new Circle(this);
  }
}

class Application {
  shapes;

  constructor () {
    circle = new Circle();
    circle.width = 10;
    circle.height = 10;
    circle.radius = 20;
    shapes.add(circle);

    anotherCircle = circle.clone();
    shapes.add(anotherCircle);

    rectangle = new Rectangle();
    rectangle.width = 10;
    rectangle.height = 20;
    shapes.add(rectangle);
  }

  businessLogic() {
    const shapesCopy = [];
    this.shapes.forEach(s => shapesCopy.push(s.clone())); 
  }
  
}