module.exports = {
    "presets" : ['@babel/preset-env' , '@babel/preset-react'],
    "plugins": ["module:@babel/plugin-transform-typescript"]
}

// Notre code sera convertit  

/***
 *  By default, jest uses the node testEnvironment. This essentially makes any tests meant for a browser environment invalid.

    jsdom is an implementation of a browser environment, which supports these types of UI tests.

For Jest version 28 and greater, jest-environment-jsdom was removed from the default jest installation to reduce package size.

 */