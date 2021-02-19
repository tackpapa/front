const { assetExts, sourceExts } = require("metro-config/src/defaults/defaults");

module.exports = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
  },
};
