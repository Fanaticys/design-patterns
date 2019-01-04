class Car {}

class CarBuilder {
  constructor() {
    this.car = null;
  }
  
  reset() {
    this.car = new Car();
  }

  setSeats() {}
  setEngine() {}
  setTripComputer() {}
  setGPS() {}

  getProduct() {
    const product = this.car;
    this.reset();
    return product
  }
}

class Director {
  constructor(builder) {
    this.builder = builder;
  }

  setBuilder(builder) {
    this.builder = builder
  }

  constructSportsCar(builder) {
    builder.reset();
    builder.setSeats(2);
    builder.setEngine(new SportEngine());
    builder.setTripComputer(true);
    builder.setGPS(true);
  }

  constructSUV(builder) { }
}

class Application {
  makeCar() {
    const director = new Director();
    const builder = new CarBuilder();
    director.constructSportsCar(builder);
    const car = builder.getProduct();
  }
}
