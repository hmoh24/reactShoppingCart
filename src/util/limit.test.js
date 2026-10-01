import { describe, expect, it } from "vitest";
import limit from "./limit";

describe("Util - Limit", () => {
  it("returns maximum value when value input is over max limit", () => {
    const value = limit(15, 1, 10);
    expect(value).toBe(10);
  });
  it("returns minimum value when value input is under min limit", () => {
    const value = limit(0, 1, 10);
    expect(value).toBe(1);
  });
  it("returns input value when value input is within limits", () => {
    const value = limit(5, 1, 10);
    expect(value).toBe(5);
  });
});
