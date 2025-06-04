module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets/data/ai-risk.json");
  eleventyConfig.addPassthroughCopy("assets/styles.css");
  eleventyConfig.addWatchTarget("assets/data/ai-risk.json");
  eleventyConfig.addWatchTarget("assets/styles.css");

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
