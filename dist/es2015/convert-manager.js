var _dec, _class;

import { inject } from 'aurelia-dependency-injection';
import { ViewResources } from 'aurelia-templating';
import { getLogger } from 'aurelia-logging';
import typer from 'typer';

export let ConvertManagerValueConverter = (_dec = inject(ViewResources), _dec(_class = class ConvertManagerValueConverter {
  constructor(viewResources) {
    this.viewResources = viewResources;
    this.logger = getLogger('aurelia-datatable');
  }

  runConverter(value, converter, convertParams) {
    let valueConverter = this.viewResources.getValueConverter(converter);

    if (valueConverter) {
      return valueConverter.toView(value, convertParams);
    }

    this.logger.error('No ValueConverter named "' + converter + '" was found!');

    return value;
  }

  toView(value, converters) {
    if (!converters) {
      return value;
    }

    if (typeof converters === 'string') {
      converters = converters.split(' | ');
    }

    for (let converter of converters) {
      let index = converter.indexOf(':');

      if (index < 0) {
        value = this.runConverter(value, converter);

        continue;
      }

      let name = converter.slice(0, index);
      let param = this.parseParams(converter.slice(index + 1).trim());

      value = this.runConverter(value, name, param);
    }

    return value;
  }

  parseParams(str) {
    if (!str) {
      return null;
    }

    if (typer.detect(str) === 'string' && str[0] !== '{') {
      return str.substr(1, str.length - 2);
    }

    return typer.cast(str);
  }
}) || _class);