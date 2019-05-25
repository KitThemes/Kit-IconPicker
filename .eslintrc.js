module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
		// "standard-preact",
        "plugin:@wordpress/eslint-plugin/recommended",
    ],
    "globals": {
        "browser": true,
        "page": true,
        "wp": true,
    }
};