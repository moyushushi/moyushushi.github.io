const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "docs", // 双引号，加分号
  // 其他配置...
});
