"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FlagComponent;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Default country flag icon.
// `<img/>` is wrapped in a `<div/>` to prevent SVGs from exploding in size in IE 11.
// https://github.com/catamphetamine/react-phone-number-input/issues/111
function FlagComponent(_ref) {
  var country = _ref.country,
      countryName = _ref.countryName,
      flags = _ref.flags,
      flagUrl = _ref.flagUrl,
      rest = _objectWithoutProperties(_ref, ["country", "countryName", "flags", "flagUrl"]);

  if (flags && flags[country]) {
    return flags[country]({
      title: countryName
    });
  }

  return _react["default"].createElement("img", _extends({}, rest, {
    alt: countryName,
    role: countryName ? undefined : "presentation",
    src: flagUrl.replace('{XX}', country).replace('{xx}', country.toLowerCase())
  }));
}

FlagComponent.propTypes = {
  // The country to be selected by default.
  // Two-letter country code ("ISO 3166-1 alpha-2").
  country: _propTypes["default"].string.isRequired,
  // Will be HTML `title` attribute of the `<img/>`.
  countryName: _propTypes["default"].string.isRequired,
  // Country flag icon components.
  // By default flag icons are inserted as `<img/>`s
  // with their `src` pointed to `country-flag-icons` gitlab pages website.
  // There might be cases (e.g. an offline application)
  // where having a large (3 megabyte) `<svg/>` flags
  // bundle is more appropriate.
  // `import flags from 'react-phone-number-input/flags'`.
  flags: _propTypes["default"].objectOf(_propTypes["default"].elementType),
  // A URL for a country flag icon.
  // By default it points to `country-flag-icons` gitlab pages website.
  flagUrl: _propTypes["default"].string.isRequired
};
//# sourceMappingURL=Flag.js.map