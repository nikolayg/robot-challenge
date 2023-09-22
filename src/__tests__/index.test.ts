import "jest";
import { f } from "..";

describe("index", () => {
  test("f", () => {
    expect(f()).toEqual("test");
  });
});
