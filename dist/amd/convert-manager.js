define(['exports', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-logging', 'typer'], function (exports, _aureliaDependencyInjection, _aureliaTemplating, _aureliaLogging, _typer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ConvertManagerValueConverter = undefined;

  var _typer2 = _interopRequireDefault(_typer);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  

  var _dec, _class;

  var ConvertManagerValueConverter = exports.ConvertManagerValueConverter = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.ViewResources), _dec(_class = function () {
    function ConvertManagerValueConverter(viewResources) {
      

      this.viewResources = viewResources;
      this.logger = (0, _aureliaLogging.getLogger)('aurelia-datatable');
    }

    ConvertManagerValueConverter.prototype.runConverter = function runConverter(value, converter, convertParams) {
      var valueConverter = this.viewResources.getValueConverter(converter);

      if (valueConverter) {
        return valueConverter.toView(value, convertParams);
      }

      this.logger.error('No ValueConverter named "' + converter + '" was found!');

      return value;
    };

    ConvertManagerValueConverter.prototype.toView = function toView(value, converters) {
      if (!converters) {
        return value;
      }

      if (typeof converters === 'string') {
        converters = converters.split(' | ');
      }

      for (var _iterator = converters, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var converter = _ref;

        var index = converter.indexOf(':');

        if (index < 0) {
          value = this.runConverter(value, converter);

          continue;
        }

        var name = converter.slice(0, index);
        var param = this.parseParams(converter.slice(index + 1).trim());

        value = this.runConverter(value, name, param);
      }

      return value;
    };

    ConvertManagerValueConverter.prototype.parseParams = function parseParams(str) {
      if (!str) {
        return null;
      }

      if (_typer2.default.detect(str) === 'string' && str[0] !== '{') {
        return str.substr(1, str.length - 2);
      }

      return _typer2.default.cast(str);
    };

    return ConvertManagerValueConverter;
  }()) || _class);
});