import { describe, expect, it } from "vitest";
import stripHtml from "./stripHTML";

describe("Util - Strip HTML", () => {
  describe("stripHtml", () => {
    it("correctly returns text without HTML tags", () => {
      const description = stripHtml("<p>A <strong>beautiful</strong> painting.</p>");
      expect(description).toBe("A beautiful painting.");
    });
    it("correctly returns description not available for empty input", () => {
      const description = stripHtml("");
      expect(description).toBe("Description not available.");
    });
  });
});
