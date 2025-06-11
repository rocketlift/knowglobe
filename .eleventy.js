module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets/data/ai-risk.json");
  eleventyConfig.addPassthroughCopy("assets/styles.css");
  eleventyConfig.addPassthroughCopy("assets/maps"); // 👈 FIX for PNG visibility
  eleventyConfig.addWatchTarget("assets/data/ai-risk.json");
  eleventyConfig.addWatchTarget("assets/styles.css");
  eleventyConfig.addPassthroughCopy("assets/favicon.ico");


  return {
    dir: {
      input: "pages",
      output: "_site",
      includes: "../_includes",
      layouts: "../layouts"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
