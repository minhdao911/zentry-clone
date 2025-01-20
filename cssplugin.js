// @ts-check

import { parse } from "postcss";
import { objectify } from "postcss-js";
import { readFileSync } from "fs";

/**
 * CSS as plugin
 * @param {string} filename CSS file
 * @returns {import('tailwindcss/types/config').PluginCreator}
 */
export default (filename) => {
  return ({ addBase, addComponents, addUtilities }) => {
    const css = readFileSync(filename, "utf8");
    const root = parse(css);
    const jss = objectify(root);

    if ("@layer base" in jss) {
      addBase(jss["@layer base"]);
    }
    if ("@layer components" in jss) {
      addComponents(jss["@layer components"]);
    }
    if ("@layer utilities" in jss) {
      addUtilities(jss["@layer utilities"]);
    }
  };
};
