function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputSmart from './InputSmart';
import InputBasic from './InputBasic';
import Flag from './Flag';
import InternationalIcon from './InternationalIcon';
import { sortCountryOptions, isCountrySupportedWithError, getSupportedCountries, getSupportedCountryOptions, getCountries } from './helpers/countries';
import { createCountryIconComponent } from './CountryIcon';
import { metadata as metadataPropType, labels as labelsPropType } from './PropTypes';
import { getPreSelectedCountry, getCountrySelectOptions, parsePhoneNumber, generateNationalNumberDigits, getPhoneDigitsForNewCountry, getInitialPhoneDigits, onPhoneDigitsChange, e164 } from './helpers/phoneInputHelpers';
import getPhoneInputWithCountryStateUpdateFromNewProps from './helpers/getPhoneInputWithCountryStateUpdateFromNewProps';

var PhoneNumberInput_ =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(PhoneNumberInput_, _React$PureComponent);

  function PhoneNumberInput_(props) {
    var _this;

    _classCallCheck(this, PhoneNumberInput_);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PhoneNumberInput_).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "inputRef", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "isCountrySupportedWithError", function (country) {
      var metadata = _this.props.metadata;
      return isCountrySupportedWithError(country, metadata);
    });

    _defineProperty(_assertThisInitialized(_this), "onCountryChange", function (newCountry) {
      var _this$props = _this.props,
          international = _this$props.international,
          metadata = _this$props.metadata,
          onChange = _this$props.onChange,
          focusInputOnCountrySelection = _this$props.focusInputOnCountrySelection;
      var _this$state = _this.state,
          prevPhoneDigits = _this$state.phoneDigits,
          prevCountry = _this$state.country; // After the new `country` has been selected,
      // if the phone number `<input/>` holds any digits
      // then migrate those digits for the new `country`.

      var newPhoneDigits = getPhoneDigitsForNewCountry(prevPhoneDigits, {
        prevCountry: prevCountry,
        newCountry: newCountry,
        metadata: metadata,
        // Convert the phone number to "national" format
        // when the user changes the selected country by hand.
        useNationalFormat: !international
      });
      var newValue = e164(newPhoneDigits, newCountry, metadata); // Focus phone number `<input/>` upon country selection.

      if (focusInputOnCountrySelection) {
        _this.getInputRef().current.focus();
      } // If the user has already manually selected a country
      // then don't override that already selected country
      // if the `defaultCountry` property changes.
      // That's what `hasUserSelectedACountry` flag is for.


      _this.setState({
        country: newCountry,
        hasUserSelectedACountry: true,
        phoneDigits: newPhoneDigits,
        value: newValue
      }, function () {
        // Update the new `value` property.
        // Doing it after the `state` has been updated
        // because `onChange()` will trigger `getDerivedStateFromProps()`
        // with the new `value` which will be compared to `state.value` there.
        onChange(newValue);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (_phoneDigits) {
      var _this$props2 = _this.props,
          defaultCountry = _this$props2.defaultCountry,
          onChange = _this$props2.onChange,
          addInternationalOption = _this$props2.addInternationalOption,
          international = _this$props2.international,
          limitMaxLength = _this$props2.limitMaxLength,
          countryCallingCodeEditable = _this$props2.countryCallingCodeEditable,
          metadata = _this$props2.metadata;
      var _this$state2 = _this.state,
          countries = _this$state2.countries,
          prevPhoneDigits = _this$state2.phoneDigits,
          currentlySelectedCountry = _this$state2.country;

      var _onPhoneDigitsChange = onPhoneDigitsChange(_phoneDigits, {
        prevPhoneDigits: prevPhoneDigits,
        country: currentlySelectedCountry,
        defaultCountry: defaultCountry,
        countries: countries,
        international: international,
        limitMaxLength: limitMaxLength,
        countryCallingCodeEditable: countryCallingCodeEditable,
        metadata: metadata
      }),
          phoneDigits = _onPhoneDigitsChange.phoneDigits,
          country = _onPhoneDigitsChange.country,
          value = _onPhoneDigitsChange.value;

      var stateUpdate = {
        phoneDigits: phoneDigits,
        value: value,
        country: country
      };

      if (countryCallingCodeEditable === false) {
        // If it simply did `setState({ phoneDigits: intlPrefix })` here,
        // then it would have no effect when erasing an inital international prefix
        // via Backspace, because `phoneDigits` in `state` wouldn't change
        // as a result, because it was `prefix` and it became `prefix`,
        // so the component wouldn't rerender, and the user would be able
        // to erase the country calling code part, and that part is
        // assumed to be non-eraseable. That's why the component is
        // forcefully rerendered here.
        // https://github.com/catamphetamine/react-phone-number-input/issues/367#issuecomment-721703501
        if (!value && phoneDigits === _this.state.phoneDigits) {
          // Force a re-render of the `<input/>` in order to reset its value.
          stateUpdate.forceRerender = {};
        }
      }

      _this.setState(stateUpdate, // Update the new `value` property.
      // Doing it after the `state` has been updated
      // because `onChange()` will trigger `getDerivedStateFromProps()`
      // with the new `value` which will be compared to `state.value` there.
      function () {
        return onChange(value);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onFocus", function () {
      return _this.setState({
        isFocused: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_onBlur", function () {
      return _this.setState({
        isFocused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function (event) {
      _this._onFocus();

      var onFocus = _this.props.onFocus;

      if (onFocus) {
        onFocus(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function (event) {
      var onBlur = _this.props.onBlur;

      _this._onBlur();

      if (onBlur) {
        onBlur(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCountryFocus", function (event) {
      _this._onFocus(); // this.setState({ countrySelectFocused: true })


      var countrySelectProps = _this.props.countrySelectProps;

      if (countrySelectProps) {
        var onFocus = countrySelectProps.onFocus;

        if (onFocus) {
          onFocus(event);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onCountryBlur", function (event) {
      _this._onBlur(); // this.setState({ countrySelectFocused: false })


      var countrySelectProps = _this.props.countrySelectProps;

      if (countrySelectProps) {
        var onBlur = countrySelectProps.onBlur;

        if (onBlur) {
          onBlur(event);
        }
      }
    });

    var _this$props3 = _this.props,
        _value = _this$props3.value,
        labels = _this$props3.labels,
        _international = _this$props3.international,
        addInternationalOption = _this$props3.addInternationalOption,
        displayInitialValueAsLocalNumber = _this$props3.displayInitialValueAsLocalNumber,
        initialValueFormat = _this$props3.initialValueFormat,
        _metadata = _this$props3.metadata;
    var _this$props4 = _this.props,
        _defaultCountry = _this$props4.defaultCountry,
        _countries = _this$props4.countries; // Validate `defaultCountry`.

    if (_defaultCountry) {
      if (!_this.isCountrySupportedWithError(_defaultCountry)) {
        _defaultCountry = undefined;
      }
    } // Validate `countries`.


    _countries = getSupportedCountries(_countries, _metadata);
    var phoneNumber = parsePhoneNumber(_value, _metadata);
    _this.CountryIcon = createCountryIconComponent(_this.props);
    _this.state = {
      // Workaround for `this.props` inside `getDerivedStateFromProps()`.
      props: _this.props,
      // The country selected.
      country: getPreSelectedCountry({
        phoneNumber: phoneNumber,
        defaultCountry: _defaultCountry,
        countries: _countries || getCountries(_metadata),
        required: !addInternationalOption,
        metadata: _metadata
      }),
      // `countries` are stored in `this.state` because they're filtered.
      // For example, a developer might theoretically pass some unsupported
      // countries as part of the `countries` property, and because of that
      // the component uses `this.state.countries` (which are filtered)
      // instead of `this.props.countries`
      // (which could potentially contain unsupported countries).
      countries: _countries,
      // `phoneDigits` state property holds non-formatted user's input.
      // The reason is that there's no way of finding out
      // in which form should `value` be displayed: international or national.
      // E.g. if `value` is `+78005553535` then it could be input
      // by a user both as `8 (800) 555-35-35` and `+7 800 555 35 35`.
      // Hence storing just `value` is not sufficient for correct formatting.
      // E.g. if a user entered `8 (800) 555-35-35`
      // then value is `+78005553535` and `phoneDigits` are `88005553535`
      // and if a user entered `+7 800 555 35 35`
      // then value is `+78005553535` and `phoneDigits` are `+78005553535`.
      phoneDigits: getInitialPhoneDigits({
        value: _value,
        phoneNumber: phoneNumber,
        defaultCountry: _defaultCountry,
        international: _international,
        useNationalFormat: displayInitialValueAsLocalNumber || initialValueFormat === 'national',
        metadata: _metadata
      }),
      // `value` property is duplicated in state.
      // The reason is that `getDerivedStateFromProps()`
      // needs this `value` to compare to the new `value` property
      // to find out if `phoneDigits` needs updating:
      // If the `value` property was changed externally
      // then it won't be equal to `state.value`
      // in which case `phoneDigits` and `country` should be updated.
      value: _value
    };
    return _this;
  }

  _createClass(PhoneNumberInput_, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var onCountryChange = this.props.onCountryChange;
      var defaultCountry = this.props.defaultCountry;
      var selectedCountry = this.state.country;

      if (onCountryChange) {
        if (defaultCountry) {
          if (!this.isCountrySupportedWithError(defaultCountry)) {
            defaultCountry = undefined;
          }
        }

        if (selectedCountry !== defaultCountry) {
          onCountryChange(selectedCountry);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var onCountryChange = this.props.onCountryChange;
      var country = this.state.country; // Call `onCountryChange` when user selects another country.

      if (onCountryChange && country !== prevState.country) {
        onCountryChange(country);
      }
    } // A shorthand for not passing `metadata` as a second argument.

  }, {
    key: "getInputRef",
    value: function getInputRef() {
      var inputRef = this.props.inputRef;
      return inputRef || this.inputRef;
    } // `state` holds previous props as `props`, and also:
    // * `country` — The currently selected country, e.g. `"RU"`.
    // * `value` — The currently entered phone number (E.164), e.g. `+78005553535`.
    // * `phoneDigits` — The parsed `<input/>` value, e.g. `8005553535`.
    // (and a couple of other less significant properties)

  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          name = _this$props5.name,
          disabled = _this$props5.disabled,
          autoComplete = _this$props5.autoComplete,
          style = _this$props5.style,
          className = _this$props5.className,
          inputRef = _this$props5.inputRef,
          inputComponent = _this$props5.inputComponent,
          numberInputProps = _this$props5.numberInputProps,
          smartCaret = _this$props5.smartCaret,
          CountrySelectComponent = _this$props5.countrySelectComponent,
          countrySelectProps = _this$props5.countrySelectProps,
          ContainerComponent = _this$props5.containerComponent,
          defaultCountry = _this$props5.defaultCountry,
          countries = _this$props5.countries,
          countryOptionsOrder = _this$props5.countryOptionsOrder,
          labels = _this$props5.labels,
          flags = _this$props5.flags,
          flagComponent = _this$props5.flagComponent,
          flagUrl = _this$props5.flagUrl,
          addInternationalOption = _this$props5.addInternationalOption,
          internationalIcon = _this$props5.internationalIcon,
          displayInitialValueAsLocalNumber = _this$props5.displayInitialValueAsLocalNumber,
          initialValueFormat = _this$props5.initialValueFormat,
          onCountryChange = _this$props5.onCountryChange,
          limitMaxLength = _this$props5.limitMaxLength,
          countryCallingCodeEditable = _this$props5.countryCallingCodeEditable,
          focusInputOnCountrySelection = _this$props5.focusInputOnCountrySelection,
          reset = _this$props5.reset,
          metadata = _this$props5.metadata,
          international = _this$props5.international,
          locales = _this$props5.locales,
          rest = _objectWithoutProperties(_this$props5, ["name", "disabled", "autoComplete", "style", "className", "inputRef", "inputComponent", "numberInputProps", "smartCaret", "countrySelectComponent", "countrySelectProps", "containerComponent", "defaultCountry", "countries", "countryOptionsOrder", "labels", "flags", "flagComponent", "flagUrl", "addInternationalOption", "internationalIcon", "displayInitialValueAsLocalNumber", "initialValueFormat", "onCountryChange", "limitMaxLength", "countryCallingCodeEditable", "focusInputOnCountrySelection", "reset", "metadata", "international", "locales"]);

      var _this$state3 = this.state,
          country = _this$state3.country,
          phoneDigits = _this$state3.phoneDigits,
          isFocused = _this$state3.isFocused;
      var InputComponent = smartCaret ? InputSmart : InputBasic;
      var countrySelectOptions = useMemoCountrySelectOptions(function () {
        return sortCountryOptions(getCountrySelectOptions({
          countries: countries || getCountries(metadata),
          countryNames: labels,
          addInternationalOption: international && countryCallingCodeEditable === false ? false : addInternationalOption,
          compareStringsLocales: locales // compareStrings

        }), getSupportedCountryOptions(countryOptionsOrder, metadata));
      }, [countries, countryOptionsOrder, addInternationalOption, labels, metadata]);
      return React.createElement(ContainerComponent, {
        style: style,
        className: classNames(className, 'PhoneInput', {
          'PhoneInput--focus': isFocused
        })
      }, React.createElement(CountrySelectComponent, _extends({
        name: name ? "".concat(name, "Country") : undefined,
        "aria-label": labels.country
      }, countrySelectProps, {
        value: country,
        options: countrySelectOptions,
        onChange: this.onCountryChange,
        onFocus: this.onCountryFocus,
        onBlur: this.onCountryBlur,
        disabled: disabled || countrySelectProps && countrySelectProps.disabled,
        iconComponent: this.CountryIcon
      })), React.createElement(InputComponent, _extends({
        ref: this.getInputRef(),
        type: "tel",
        autoComplete: autoComplete
      }, numberInputProps, rest, {
        name: name,
        metadata: metadata,
        country: country,
        value: phoneDigits || '',
        onChange: this.onChange,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        disabled: disabled,
        inputComponent: inputComponent,
        className: classNames('PhoneInputInput', numberInputProps && numberInputProps.className, rest.className)
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return _objectSpread({
        // Emulate `prevProps` via `state.props`.
        props: props
      }, getPhoneInputWithCountryStateUpdateFromNewProps(props, state.props, state));
    }
  }]);

  return PhoneNumberInput_;
}(React.PureComponent); // This wrapper is only to `.forwardRef()` to the `<input/>`.


var PhoneNumberInput = React.forwardRef(function (props, ref) {
  return React.createElement(PhoneNumberInput_, _extends({}, props, {
    inputRef: ref
  }));
});
PhoneNumberInput.propTypes = {
  /**
   * Phone number in `E.164` format.
   *
   * Example:
   *
   * `"+12223333333"`
   */
  value: PropTypes.string,

  /**
   * Updates the `value` as the user inputs the phone number.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Toggles the `--focus` CSS class.
   * @ignore
   */
  onFocus: PropTypes.func,

  /**
   * `onBlur` is usually passed by `redux-form`.
   * @ignore
   */
  onBlur: PropTypes.func,

  /**
   * `onKeyDown` handler (e.g. to handle Enter key press).
   * @ignore
   */
  onKeyDown: PropTypes.func,

  /**
   * Set to `true` to disable both the phone number `<input/>`
   * and the country `<select/>`.
   */
  disabled: PropTypes.bool,

  /**
   * Sets `autoComplete` property for phone number `<input/>`.
   *
   * Web browser's "autocomplete" feature
   * remembers the phone number being input
   * and can also autofill the `<input/>`
   * with previously remembered phone numbers.
   *
   * https://developers.google.com
   * /web/updates/2015/06/checkout-faster-with-autofill
   *
   * For example, can be used to turn it off:
   *
   * "So when should you use `autocomplete="off"`?
   *  One example is when you've implemented your own version
   *  of autocomplete for search. Another example is any form field
   *  where users will input and submit different kinds of information
   *  where it would not be useful to have the browser remember
   *  what was submitted previously".
   */
  // (is `"tel"` by default)
  autoComplete: PropTypes.string.isRequired,

  /**
   * Set to `"national"` to show the initial `value` in
   * "national" format rather than "international".
   *
   * For example, if `initialValueFormat` is `"national"`
   * and the initial `value="+12133734253"` is passed
   * then the `<input/>` value will be `"(213) 373-4253"`.
   *
   * By default, `initialValueFormat` is `undefined`,
   * meaning that if the initial `value="+12133734253"` is passed
   * then the `<input/>` value will be `"+1 213 373 4253"`.
   *
   * The reason for such default behaviour is that
   * the newer generation grows up when there are no stationary phones
   * and therefore everyone inputs phone numbers in international format
   * in their smartphones so people gradually get more accustomed to
   * writing phone numbers in international format rather than in local format.
   * Future people won't be using "national" format, only "international".
   */
  // (is `undefined` by default)
  initialValueFormat: PropTypes.oneOf(['national']),
  // `displayInitialValueAsLocalNumber` property has been
  // superceded by `initialValueFormat` property.
  displayInitialValueAsLocalNumber: PropTypes.bool,

  /**
   * The country to be selected by default.
   * For example, can be set after a GeoIP lookup.
   *
   * Example: `"US"`.
   */
  // A two-letter country code ("ISO 3166-1 alpha-2").
  defaultCountry: PropTypes.string,

  /**
   * If specified, only these countries will be available for selection.
   *
   * Example:
   *
   * `["RU", "UA", "KZ"]`
   */
  countries: PropTypes.arrayOf(PropTypes.string),

  /**
   * Custom country `<select/>` option names.
   * Also some labels like "ext" and country `<select/>` `aria-label`.
   *
   * Example:
   *
   * `{ "ZZ": "Международный", RU: "Россия", US: "США", ... }`
   *
   * See the `locales` directory for examples.
   */
  labels: labelsPropType.isRequired,

  /**
   * Country `<select/>` options are sorted by their labels.
   * The default sorting function uses `a.localeCompare(b, locales)`,
   * and, if that's not available, falls back to simple `a > b` / `a < b`.
   * Some languages, like Chinese, support multiple sorting variants
   * (called "collations"), and the user might prefer one or another.
   * Also, sometimes the Operating System language is not always
   * the preferred language for a person using a website or an application,
   * so there should be a way to specify custom locale.
   * This `locales` property mimicks the `locales` argument of `Intl` constructors,
   * and can be either a Unicode BCP 47 locale identifier or an array of such locale identifiers.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
   */
  locales: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

  /*
   * Custom country `<select/>` options sorting function.
   * The default one uses `a.localeCompare(b)`, and,
   * if that's not available, falls back to simple `a > b`/`a < b`.
   * There have been requests to add custom sorter for cases
   * like Chinese language and "pinyin" (non-default) sorting order.
   * https://stackoverflow.com/questions/22907288/chinese-sorting-by-pinyin-in-javascript-with-localecompare
  compareStrings: PropTypes.func,
   */

  /**
   * A URL template of a country flag, where
   * "{XX}" is a two-letter country code in upper case,
   * or where "{xx}" is a two-letter country code in lower case.
   * By default it points to `country-flag-icons` gitlab pages website.
   * I imagine someone might want to download those country flag icons
   * and host them on their own servers instead
   * (all flags are available in the `country-flag-icons` library).
   * There's a catch though: new countries may be added in future,
   * so when hosting country flag icons on your own server
   * one should check the `CHANGELOG.md` every time before updating this library,
   * otherwise there's a possibility that some new country flag would be missing.
   */
  flagUrl: PropTypes.string.isRequired,

  /**
   * Custom country flag icon components.
   * These flags will be used instead of the default ones.
   * The the "Flags" section of the readme for more info.
   *
   * The shape is an object where keys are country codes
   * and values are flag icon components.
   * Flag icon components receive the same properties
   * as `flagComponent` (see below).
   *
   * Example:
   *
   * `{ "RU": (props) => <img src="..."/> }`
   *
   * Example:
   *
   * `import flags from 'country-flag-icons/react/3x2'`
   *
   * `import PhoneInput from 'react-phone-number-input'`
   *
   * `<PhoneInput flags={flags} .../>`
   */
  flags: PropTypes.objectOf(PropTypes.elementType),

  /**
   * Country flag icon component.
   *
   * Takes properties:
   *
   * * `country: string` — The country code.
   * * `countryName: string` — The country name.
   * * `flagUrl: string` — The `flagUrl` property (see above).
   * * `flags: object` — The `flags` property (see above).
   */
  flagComponent: PropTypes.elementType.isRequired,

  /**
   * Set to `false` to remove the "International" option from country `<select/>`.
   */
  addInternationalOption: PropTypes.bool.isRequired,

  /**
   * "International" icon component.
   * Should have the same aspect ratio.
   *
   * Receives properties:
   *
   * * `title: string` — "International" country option label.
   */
  internationalIcon: PropTypes.elementType.isRequired,

  /**
   * Can be used to place some countries on top of the list of country `<select/>` options.
   *
   * * `"XX"` — inserts an option for "XX" country.
   * * `"🌐"` — inserts "International" option.
   * * `"|"` — inserts a separator.
   * * `"..."` — inserts options for the rest of the countries (can be omitted, in which case it will be automatically added at the end).
   *
   * Example:
   *
   * `["US", "CA", "AU", "|", "..."]`
   */
  countryOptionsOrder: PropTypes.arrayOf(PropTypes.string),

  /**
   * `<Phone/>` component CSS style object.
   */
  style: PropTypes.object,

  /**
   * `<Phone/>` component CSS class.
   */
  className: PropTypes.string,

  /**
   * Country `<select/>` component.
   *
   * Receives properties:
   *
   * * `name: string?` — HTML `name` attribute.
   * * `value: string?` — The currently selected country code.
   * * `onChange(value: string?)` — Updates the `value`.
   * * `onFocus()` — Is used to toggle the `--focus` CSS class.
   * * `onBlur()` — Is used to toggle the `--focus` CSS class.
   * * `options: object[]` — The list of all selectable countries (including "International") each being an object of shape `{ value: string?, label: string }`.
   * * `iconComponent: PropTypes.elementType` — React component that renders a country icon: `<Icon country={value}/>`. If `country` is `undefined` then it renders an "International" icon.
   * * `disabled: boolean?` — HTML `disabled` attribute.
   * * `tabIndex: (number|string)?` — HTML `tabIndex` attribute.
   * * `className: string` — CSS class name.
   */
  countrySelectComponent: PropTypes.elementType.isRequired,

  /**
   * Country `<select/>` component props.
   * Along with the usual DOM properties such as `aria-label` and `tabIndex`,
   * some custom properties are supported, such as `arrowComponent` and `unicodeFlags`.
   */
  countrySelectProps: PropTypes.object,

  /**
   * Phone number `<input/>` component.
   *
   * Receives properties:
   *
   * * `value: string` — The formatted `value`.
   * * `onChange(event: Event)` — Updates the formatted `value` from `event.target.value`.
   * * `onFocus()` — Is used to toggle the `--focus` CSS class.
   * * `onBlur()` — Is used to toggle the `--focus` CSS class.
   * * Other properties like `type="tel"` or `autoComplete="tel"` that should be passed through to the DOM `<input/>`.
   *
   * Must also either use `React.forwardRef()` to "forward" `ref` to the `<input/>` or implement `.focus()` method.
   */
  inputComponent: PropTypes.elementType.isRequired,

  /**
   * Wrapping `<div/>` component.
   *
   * Receives properties:
   *
   * * `style: object` — A component CSS style object.
   * * `className: string` — Classes to attach to the component, typically changes when component focuses or blurs.
   */
  containerComponent: PropTypes.elementType.isRequired,

  /**
   * Phone number `<input/>` component props.
   */
  numberInputProps: PropTypes.object,

  /**
   * By default, the caret position is being "intelligently" managed
   * while a user inputs a phone number.
   * This "smart" caret behavior can be turned off
   * by passing `smartCaret={false}` property.
   * This is just an "escape hatch" for any possible caret position issues.
   */
  // Is `true` by default.
  smartCaret: PropTypes.bool.isRequired,

  /**
   * Set to `true` to force "international" phone number format.
   * Set to `false` to force "national" phone number format.
   * By default it's `undefined` meaning that it doesn't enforce any phone number format.
   */
  international: PropTypes.bool,

  /**
   * If set to `true`, the phone number input will get trimmed
   * if it exceeds the maximum length for the country.
   */
  limitMaxLength: PropTypes.bool.isRequired,

  /**
   * If set to `false`, and `international` is `true`, then
   * users won't be able to erase the "country calling part"
   * of a phone number in the `<input/>`.
   */
  countryCallingCodeEditable: PropTypes.bool.isRequired,

  /**
   * `libphonenumber-js` metadata.
   *
   * Can be used to pass custom `libphonenumber-js` metadata
   * to reduce the overall bundle size for those who compile "custom" metadata.
   */
  metadata: metadataPropType.isRequired,

  /**
   * Is called every time the selected country changes:
   * either programmatically or when user selects it manually from the list.
   */
  // People have been asking for a way to get the selected country.
  // @see  https://github.com/catamphetamine/react-phone-number-input/issues/128
  // For some it's just a "business requirement".
  // I guess it's about gathering as much info on the user as a website can
  // without introducing any addional fields that would complicate the form
  // therefore reducing "conversion" (that's a marketing term).
  // Assuming that the phone number's country is the user's country
  // is not 100% correct but in most cases I guess it's valid.
  onCountryChange: PropTypes.func,

  /**
   * If set to `false`, will not focus the `<input/>` component
   * when the user selects a country from the list of countries.
   * This can be used to conform to the Web Content Accessibility Guidelines (WCAG).
   * Quote:
   * "On input: Changing the setting of any user interface component
   *  does not automatically cause a change of context unless the user
   *  has been advised of the behaviour before using the component."
   */
  focusInputOnCountrySelection: PropTypes.bool.isRequired
};
PhoneNumberInput.defaultProps = {
  /**
   * Remember (and autofill) the value as a phone number.
   */
  autoComplete: 'tel',

  /**
   * Flag icon component.
   */
  flagComponent: Flag,

  /**
   * By default, uses icons from `country-flag-icons` gitlab pages website.
   */
  // Must be equal to `flagUrl` in `./CountryIcon.js`.
  flagUrl: 'https://purecatamphetamine.github.io/country-flag-icons/3x2/{XX}.svg',

  /**
   * Default "International" country `<select/>` option icon.
   */
  internationalIcon: InternationalIcon,

  /**
   * Phone number `<input/>` component.
   */
  inputComponent: 'input',

  /**
   * Wrapping `<div/>` component.
   */
  containerComponent: 'div',

  /**
   * Some users requested a way to reset the component:
   * both number `<input/>` and country `<select/>`.
   * Whenever `reset` property changes both number `<input/>`
   * and country `<select/>` are reset.
   * It's not implemented as some instance `.reset()` method
   * because `ref` is forwarded to `<input/>`.
   * It's also not replaced with just resetting `country` on
   * external `value` reset, because a user could select a country
   * and then not input any `value`, and so the selected country
   * would be "stuck", if not using this `reset` property.
   */
  // https://github.com/catamphetamine/react-phone-number-input/issues/300
  reset: PropTypes.any,

  /**
   *
   */

  /**
   * Set to `false` to use "basic" caret instead of the "smart" one.
   */
  smartCaret: true,

  /**
   * Whether to add the "International" option
   * to the list of countries.
   */
  addInternationalOption: true,

  /**
   * If set to `true` the phone number input will get trimmed
   * if it exceeds the maximum length for the country.
   */
  limitMaxLength: false,

  /**
   * If set to `false`, and `international` is `true`, then
   * users won't be able to erase the "country calling part"
   * of a phone number in the `<input/>`.
   */
  countryCallingCodeEditable: true,

  /**
   * If set to `false`, will not focus the `<input/>` component
   * when the user selects a country from the list of countries.
   * This can be used to conform to the Web Content Accessibility Guidelines (WCAG).
   * Quote:
   * "On input: Changing the setting of any user interface component
   *  does not automatically cause a change of context unless the user
   *  has been advised of the behaviour before using the component."
   */
  focusInputOnCountrySelection: true
};
export default PhoneNumberInput;
var countrySelectOptionsMemo;
var countrySelectOptionsMemoDependencies;

function useMemoCountrySelectOptions(generator, dependencies) {
  if (!countrySelectOptionsMemoDependencies || !areEqualArrays(dependencies, countrySelectOptionsMemoDependencies)) {
    countrySelectOptionsMemo = generator();
    countrySelectOptionsMemoDependencies = dependencies;
  }

  return countrySelectOptionsMemo;
}

function areEqualArrays(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  var i = 0;

  while (i < a.length) {
    if (a[i] !== b[i]) {
      return false;
    }

    i++;
  }

  return true;
}
//# sourceMappingURL=PhoneInputWithCountry.js.map