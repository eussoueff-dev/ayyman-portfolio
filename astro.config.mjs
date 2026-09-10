import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ayyman.my",
  output: "static",
  integrations: [react()],
});
