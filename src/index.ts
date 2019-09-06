import "reflect-metadata";
import { Environment } from "./environment";
import { ClassType } from "./types";

const environment = new Environment();

export function Describe(message: string) {
  return (target: new (...args: any[]) => any) => {
    environment.generate(target, message);
  };
}

export function Test(message: string) {
  return (
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    environment.addTest(
      target.constructor as ClassType,
      propertyKey,
      descriptor,
      message
    );
  };
}

export function TestOnly(message: string) {
  return (
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    environment.addTestOnly(
      target.constructor as ClassType,
      propertyKey,
      descriptor,
      message
    );
  };
}

export function BeforeAll(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  environment.addBeforeAll(
    target.constructor as ClassType,
    propertyKey,
    descriptor
  );
}

export function AfterAll(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  environment.addAfterAll(
    target.constructor as ClassType,
    propertyKey,
    descriptor
  );
}

export function BeforeEach(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  environment.addBeforeEach(
    target.constructor as ClassType,
    propertyKey,
    descriptor
  );
}

export function AfterEach(
  target: Object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  environment.addAfterEach(
    target.constructor as ClassType,
    propertyKey,
    descriptor
  );
}
