import { describe, expect, it } from "vitest";

import { SITE_META } from "./site-meta";

describe("SITE_META", () => {
  it("contains Ayyman's verified public identity", () => {
    expect(SITE_META.name).toBe("Ayyman Eussoueff");
    expect(SITE_META.title).toBe("Full-Stack Developer | DevOps & Cloud");
    expect(SITE_META.canonicalUrl).toBe("https://ayyman.my");
  });
});
