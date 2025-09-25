module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "index.html": "index.html" });
  eleventyConfig.addPassthroughCopy({ ".": "." });
  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
