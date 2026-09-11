import { describe, expect, it } from "vitest";

import { CASE_STUDIES } from "./case-studies";
import { NAVIGATION, PORTFOLIO } from "./portfolio";

describe("portfolio content", () => {
  it("contains only Ayyman's verified public identity and links", () => {
    expect(PORTFOLIO.profile).toMatchObject({
      name: "Ayyman Eussoueff",
      title: "Full-Stack Developer | DevOps & Cloud",
      location: "Kuala Lumpur, Malaysia",
      institution: "Politeknik Ungku Omar",
      availability: "Open to work and internships",
    });
    expect(PORTFOLIO.links).toEqual({
      email: "mailto:eussoueff@gmail.com",
      github: "https://github.com/eussoueff-dev",
      linkedin: "https://www.linkedin.com/in/ayyman-eussoueff-ab446b2b8/",
    });
  });

  it("uses unique, valid homepage navigation anchors", () => {
    const hrefs = NAVIGATION.map(({ href }) => href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs.every((href) => /^\/#?[a-z][a-z-]*$/.test(href))).toBe(true);
  });

  it("does not fabricate content that still needs supporting material", () => {
    expect(CASE_STUDIES.map(({ title, slug, href }) => ({ title, slug, href }))).toEqual([
      {
        title: "AutoConstruct",
        slug: "autoconstruct",
        href: "/work/autoconstruct/",
      },
      {
        title: "Miss-Compete",
        slug: "miss-compete",
        href: "/work/miss-compete/",
      },
    ]);
    expect(PORTFOLIO.featuredProjects).toEqual(CASE_STUDIES);
    expect(PORTFOLIO.experience).toEqual([]);
    expect(PORTFOLIO.certifications).toEqual([]);
    expect(PORTFOLIO.achievements).toEqual([]);
    expect(PORTFOLIO.community).toEqual([]);
    expect(PORTFOLIO.interests).toEqual([]);
    expect(PORTFOLIO.resumeUrl).toBeNull();
  });
});
