module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "standard",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "transform-decorators-legacy",
        "transform-class-properties"
    ],
    "rules": {
        "react/require-extension": "off",
        "semi": [2, "always"],
        "react/no-unescaped-entities": 0,
        "@typescript-eslint/explicit-member-accessibility": 2
    },
    "settings": {
        "react": {
            "version": "detect",
        },
    }
};