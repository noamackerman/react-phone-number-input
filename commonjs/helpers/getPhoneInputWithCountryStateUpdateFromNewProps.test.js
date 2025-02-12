"use strict";

var _metadataMin = _interopRequireDefault(require("libphonenumber-js/metadata.min.json"));

var _getPhoneInputWithCountryStateUpdateFromNewProps2 = _interopRequireDefault(require("./getPhoneInputWithCountryStateUpdateFromNewProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getPhoneInputWithCountryStateUpdateFromNewProps(newProps, prevProps, state) {
  return (0, _getPhoneInputWithCountryStateUpdateFromNewProps2["default"])(_objectSpread({}, newProps, {
    metadata: _metadataMin["default"]
  }), _objectSpread({}, prevProps, {
    metadata: _metadataMin["default"]
  }), state);
}

describe('getPhoneInputWithCountryStateUpdateFromNewProps', function () {
  it('should get state update from new props (reset)', function () {
    getPhoneInputWithCountryStateUpdateFromNewProps({
      reset: true,
      defaultCountry: 'RU'
    }, {}, {}).should.deep.equal({
      phoneDigits: undefined,
      value: undefined,
      country: 'RU',
      hasUserSelectedACountry: undefined
    });
  });
  it('should get state update from new props (reset) (international)', function () {
    getPhoneInputWithCountryStateUpdateFromNewProps({
      reset: true,
      international: true,
      defaultCountry: 'RU'
    }, {}, {}).should.deep.equal({
      phoneDigits: '+7',
      value: undefined,
      country: 'RU',
      hasUserSelectedACountry: undefined
    });
  });
  it('should get state update from new props (default country did not change)', function () {
    expect(getPhoneInputWithCountryStateUpdateFromNewProps({
      defaultCountry: 'RU'
    }, {
      defaultCountry: 'RU'
    }, {})).to.be.undefined;
  });
  it('should get state update from new props (default country changed) (no `value`)', function () {
    getPhoneInputWithCountryStateUpdateFromNewProps({
      defaultCountry: 'RU'
    }, {
      defaultCountry: 'US'
    }, {}).should.deep.equal({
      country: 'RU',
      phoneDigits: undefined
    });
  });
  it('should get state update from new props (default country changed) (no `value`) (new country not supported)', function () {
    expect(getPhoneInputWithCountryStateUpdateFromNewProps({
      defaultCountry: 'XX'
    }, {
      defaultCountry: 'US'
    }, {})).to.be.undefined;
  });
  it('should get state update from new props (default country changed) (`value` is intl prefix)', function () {
    getPhoneInputWithCountryStateUpdateFromNewProps({
      international: true,
      defaultCountry: 'CA'
    }, {
      international: true,
      defaultCountry: 'US'
    }, {
      value: '+1'
    }).should.deep.equal({
      country: 'CA',
      phoneDigits: '+1'
    });
  });
  it('should get state update from new props (default country changed) (has `value`)', function () {
    expect(getPhoneInputWithCountryStateUpdateFromNewProps({
      value: '+78005553535',
      defaultCountry: 'FR'
    }, {
      value: '+78005553535',
      defaultCountry: 'RU'
    }, {})).to.be.undefined;
  });
  it('should get state update from new props (`value` changed: undefined -> value)', function () {
    getPhoneInputWithCountryStateUpdateFromNewProps({
      value: '+78005553535',
      defaultCountry: 'FR'
    }, {
      defaultCountry: 'US'
    }, {}).should.deep.equal({
      country: 'RU',
      phoneDigits: '+78005553535',
      value: '+78005553535'
    });
  });
  it('should get state update from new props (`value` changed: value -> undefined)', function () {
    getPhoneInputWithCountryStateUpdateFromNewProps({
      defaultCountry: 'RU'
    }, {
      value: '+78005553535',
      defaultCountry: 'RU'
    }, {
      value: '+78005553535'
    }).should.deep.equal({
      country: 'RU',
      phoneDigits: undefined,
      value: undefined,
      hasUserSelectedACountry: undefined
    });
  });
  it('should get state update from new props (`value` changed, but already displayed)', function () {
    expect(getPhoneInputWithCountryStateUpdateFromNewProps({
      value: '+78005553535'
    }, {}, {
      value: '+78005553535'
    })).to.be.undefined;
  });
  it('should get state update from new props (`value` did not change)', function () {
    expect(getPhoneInputWithCountryStateUpdateFromNewProps({
      value: '+78005553535'
    }, {
      value: '+78005553535'
    }, {})).to.be.undefined;
  });
});
//# sourceMappingURL=getPhoneInputWithCountryStateUpdateFromNewProps.test.js.map