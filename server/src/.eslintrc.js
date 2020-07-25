module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2020": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "process": "readonly"
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-multi-spaces": ["error"]
    }
};
