"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usePhoneDigits;

var _react = require("react");

var _core = require("libphonenumber-js/core");

var _getInternationalPhoneNumberPrefix = _interopRequireDefault(require("./helpers/getInternationalPhoneNumberPrefix"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Returns `[phoneDigits, setPhoneDigits]`.
 * "Phone digits" includes not only "digits" but also a `+` sign.
 */
function usePhoneDigits(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      country = _ref.country,
      defaultCountry = _ref.defaultCountry,
      international = _ref.international,
      withCountryCallingCode = _ref.withCountryCallingCode,
      useNationalFormatForDefaultCountryValue = _ref.useNationalFormatForDefaultCountryValue,
      metadata = _ref.metadata;
  var countryMismatchDetected = (0, _react.useRef)();

  var onCountryMismatch = function onCountryMismatch(value, country, actualCountry) {
    console.error("[react-phone-number-input] Expected phone number ".concat(value, " to correspond to country ").concat(country, " but ").concat(actualCountry ? 'in reality it corresponds to country ' + actualCountry : 'it doesn\'t', "."));
    countryMismatchDetected.current = true;
  };

  var getInitialPhoneDigits = function getInitialPhoneDigits() {
    return getPhoneDigitsForValue(value, country, international, withCountryCallingCode, defaultCountry, useNationalFormatForDefaultCountryValue, metadata, onCountryMismatch);
  }; // This is only used to detect `country` property change.


  var _useState = (0, _react.useState)(country),
      _useState2 = _slicedToArray(_useState, 2),
      prevCountry = _useState2[0],
      setPrevCountry = _useState2[1]; // This is only used to detect `defaultCountry` property change.


  var _useState3 = (0, _react.useState)(defaultCountry),
      _useState4 = _slicedToArray(_useState3, 2),
      prevDefaultCountry = _useState4[0],
      setPrevDefaultCountry = _useState4[1]; // `phoneDigits` is the `value` passed to the `<input/>`.


  var _useState5 = (0, _react.useState)(getInitialPhoneDigits()),
      _useState6 = _slicedToArray(_useState5, 2),
      phoneDigits = _useState6[0],
      setPhoneDigits = _useState6[1]; // This is only used to detect `value` property changes.


  var _useState7 = (0, _react.useState)(value),
      _useState8 = _slicedToArray(_useState7, 2),
      valueForPhoneDigits = _useState8[0],
      setValueForPhoneDigits = _useState8[1]; // Rerender hack.


  var _useState9 = (0, _react.useState)(),
      _useState10 = _slicedToArray(_useState9, 2),
      rerenderTrigger = _useState10[0],
      setRerenderTrigger = _useState10[1];

  var rerender = (0, _react.useCallback)(function () {
    return setRerenderTrigger({});
  }, [setRerenderTrigger]); // If `value` property has been changed externally
  // then re-initialize the component.

  (0, _react.useEffect)(function () {
    if (value !== valueForPhoneDigits) {
      setValueForPhoneDigits(value);
      setPhoneDigits(getInitialPhoneDigits());
    }
  }, [value]); // If the `country` has been changed then re-initialize the component.

  (0, _react.useEffect)(function () {
    if (country !== prevCountry) {
      setPrevCountry(country);
      setPhoneDigits(getInitialPhoneDigits());
    }
  }, [country]); // If the `defaultCountry` has been changed then re-initialize the component.

  (0, _react.useEffect)(function () {
    if (defaultCountry !== prevDefaultCountry) {
      setPrevDefaultCountry(defaultCountry);
      setPhoneDigits(getInitialPhoneDigits());
    }
  }, [defaultCountry]); // Update the `value` after `valueForPhoneDigits` has been updated.

  (0, _react.useEffect)(function () {
    if (valueForPhoneDigits !== value) {
      onChange(valueForPhoneDigits);
    }
  }, [valueForPhoneDigits]);
  var onSetPhoneDigits = (0, _react.useCallback)(function (phoneDigits) {
    var value;

    if (country) {
      if (international && withCountryCallingCode) {
        // The `<input/>` value must start with the country calling code.
        var prefix = (0, _getInternationalPhoneNumberPrefix["default"])(country, metadata);

        if (phoneDigits.indexOf(prefix) !== 0) {
          // // Reset phone digits if they don't start with the correct prefix.
          // // Undo the `<input/>` value change if it doesn't.
          if (countryMismatchDetected.current) {// In case of a `country`/`value` mismatch,
            // if it performed an "undo" here, then
            // it wouldn't let a user edit their phone number at all,
            // so this special case at least allows phone number editing
            // when `value` already doesn't match the `country`.
          } else {
            // If it simply did `phoneDigits = prefix` here,
            // then it could have no effect when erasing phone number
            // via Backspace, because `phoneDigits` in `state` wouldn't change
            // as a result, because it was `prefix` and it became `prefix`,
            // so the component wouldn't rerender, and the user would be able
            // to erase the country calling code part, and that part is
            // assumed to be non-eraseable. That's why the component is
            // forcefully rerendered here.
            setPhoneDigits(prefix);
            setValueForPhoneDigits(undefined); // Force a re-render of the `<input/>` with previous `phoneDigits` value.

            return rerender();
          }
        }
      } else {
        // Entering phone number either in "national" format
        // when `country` has been specified, or in "international" format
        // when `country` has been specified but `withCountryCallingCode` hasn't.
        // Therefore, `+` is not allowed.
        if (phoneDigits && phoneDigits[0] === '+') {
          // Remove the `+`.
          phoneDigits = phoneDigits.slice(1);
        }
      }
    } else if (!defaultCountry) {
      // Force a `+` in the beginning of a `value`
      // when no `country` and `defaultCountry` have been specified.
      if (phoneDigits && phoneDigits[0] !== '+') {
        // Prepend a `+`.
        phoneDigits = '+' + phoneDigits;
      }
    } // Convert `phoneDigits` to `value`.


    if (phoneDigits) {
      var asYouType = new _core.AsYouType(country || defaultCountry, metadata);
      asYouType.input(country && international && !withCountryCallingCode ? "+".concat((0, _core.getCountryCallingCode)(country, metadata)).concat(phoneDigits) : phoneDigits);
      var phoneNumber = asYouType.getNumber(); // If it's a "possible" incomplete phone number.

      if (phoneNumber) {
        value = phoneNumber.number;
      }
    }

    setPhoneDigits(phoneDigits);
    setValueForPhoneDigits(value);
  }, [country, international, withCountryCallingCode, defaultCountry, metadata, setPhoneDigits, setValueForPhoneDigits, rerender, countryMismatchDetected]);
  return [phoneDigits, onSetPhoneDigits];
}
/**
 * Returns phone number input field value for a E.164 phone number `value`.
 * @param  {string} [value]
 * @param  {string} [country]
 * @param  {boolean} [international]
 * @param  {boolean} [withCountryCallingCode]
 * @param  {string} [defaultCountry]
 * @param  {boolean} [useNationalFormatForDefaultCountryValue]
 * @param  {object} metadata
 * @return {string}
 */


function getPhoneDigitsForValue(value, country, international, withCountryCallingCode, defaultCountry, useNationalFormatForDefaultCountryValue, metadata, onCountryMismatch) {
  if (country && international && withCountryCallingCode) {
    var prefix = (0, _getInternationalPhoneNumberPrefix["default"])(country, metadata);

    if (value) {
      if (value.indexOf(prefix) !== 0) {
        onCountryMismatch(value, country);
      }

      return value;
    }

    return prefix;
  }

  if (!value) {
    return '';
  }

  if (!country && !defaultCountry) {
    return value;
  }

  var asYouType = new _core.AsYouType(undefined, metadata);
  asYouType.input(value);
  var phoneNumber = asYouType.getNumber();

  if (phoneNumber) {
    if (country) {
      if (phoneNumber.country && phoneNumber.country !== country) {
        onCountryMismatch(value, country, phoneNumber.country);
      } else if (phoneNumber.countryCallingCode !== (0, _core.getCountryCallingCode)(country, metadata)) {
        onCountryMismatch(value, country);
      }

      if (international) {
        return phoneNumber.nationalNumber;
      }

      return (0, _core.parseDigits)(phoneNumber.formatNational());
    } else {
      if (phoneNumber.country && phoneNumber.country === defaultCountry && useNationalFormatForDefaultCountryValue) {
        return (0, _core.parseDigits)(phoneNumber.formatNational());
      }

      return value;
    }
  } else {
    return '';
  }
}
//# sourceMappingURL=usePhoneDigits.js.map