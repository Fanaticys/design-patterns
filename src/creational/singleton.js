class Database {
    instance;
    constructor() {}

    static getInstance() {
      if (!this.instance) this.instance = new Database()
      return this.instance;
    }

    query(sql) {}
}

class Application {
  main() {
    const foo = Database.getInstance();
    foo.query("SELECT ...");
    const bar = Database.getInstance();
    bar.query("SELECT ...");
  }
}