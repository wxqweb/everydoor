module.exports = {
  "extends": "eslint:recommended", // 推荐规则
  "parser": "babel-eslint", // 解析器
  "rules": {
    "no-console": ["error", {
      "allow": ["warn", "error", "info"]
    }]
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script"
  },
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  }
}
