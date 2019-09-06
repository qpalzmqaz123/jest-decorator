import { ClassType } from "./types";

interface TestEntry {
  propertyKey: string;
  descriptor: TypedPropertyDescriptor<any>;
  message: string;
}

export class Suite {
  private _message: string;
  private testMap: Map<string, TestEntry> = new Map();
  private testOnlyMap: Map<string, TestEntry> = new Map();
  private beforeEachMap: Map<string, TypedPropertyDescriptor<any>> = new Map();
  private afterEachMap: Map<string, TypedPropertyDescriptor<any>> = new Map();
  private beforeAllMap: Map<string, TypedPropertyDescriptor<any>> = new Map();
  private afterAllMap: Map<string, TypedPropertyDescriptor<any>> = new Map();

  constructor(private readonly cls: ClassType) {}

  public message(message: string) {
    this._message = message;

    return this;
  }

  public addTest(
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
    message: string
  ) {
    this.testMap.set(propertyKey, {
      propertyKey,
      descriptor,
      message
    });
  }

  public addTestOnly(
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
    message: string
  ) {
    this.testOnlyMap.set(propertyKey, {
      propertyKey,
      descriptor,
      message
    });
  }

  public addBeforeEach(
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    this.beforeEachMap.set(propertyKey, descriptor);
  }

  public addAfterEach(
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    this.afterEachMap.set(propertyKey, descriptor);
  }

  public addBeforeAll(
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    this.beforeAllMap.set(propertyKey, descriptor);
  }

  public addAfterAll(
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    this.afterAllMap.set(propertyKey, descriptor);
  }

  public generate() {
    const instance = new this.cls();

    describe(this._message, () => {
      // beforeAll
      for (let name of this.beforeAllMap.keys()) {
        beforeAll(() => instance[name]());
      }

      // afterAll
      for (let name of this.afterAllMap.keys()) {
        afterAll(() => instance[name]());
      }

      // beforeEach
      for (let name of this.beforeEachMap.keys()) {
        beforeEach(() => instance[name]());
      }

      // afterEach
      for (let name of this.afterEachMap.keys()) {
        afterEach(() => instance[name]());
      }

      // test
      for (let [name, entry] of this.testMap.entries()) {
        test(entry.message, () => instance[name]());
      }

      // test only
      for (let [name, entry] of this.testOnlyMap.entries()) {
        test.only(entry.message, () => instance[name]());
      }
    });
  }
}
