System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "aurelia-framework": "npm:aurelia-framework@1.0.0-rc.1.0.6",
    "aurelia-orm": "npm:aurelia-orm@3.0.0-rc4",
    "aurelia-pager": "npm:aurelia-pager@0.0.5",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-rc.1.0.1",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-rc.1.0.0",
    "aurelia-router": "npm:aurelia-router@1.0.0-rc.1.0.1",
    "aurelia-view-manager": "npm:aurelia-view-manager@0.0.5",
    "fetch": "github:github/fetch@1.0.0",
    "npm:aurelia-api@3.0.0-rc4": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0-rc.1.0.1",
      "extend": "npm:extend@3.0.0",
      "qs": "npm:qs@6.2.1"
    },
    "npm:aurelia-binding@1.0.0-rc.1.0.3": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-event-aggregator@1.0.0-rc.1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1"
    },
    "npm:aurelia-framework@1.0.0-rc.1.0.6": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.3",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-rc.1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-rc.1.0.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.1"
    },
    "npm:aurelia-loader@1.0.0-rc.1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-metadata@1.0.0-rc.1.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-orm@3.0.0-rc4": {
      "aurelia-api": "npm:aurelia-api@3.0.0-rc4",
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.3",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.1",
      "aurelia-validation": "npm:aurelia-validation@0.6.6",
      "extend": "npm:extend@3.0.0",
      "typer": "npm:typer@1.1.0"
    },
    "npm:aurelia-pager@0.0.5": {
      "aurelia-framework": "npm:aurelia-framework@1.0.0-rc.1.0.6",
      "aurelia-view-manager": "npm:aurelia-view-manager@0.0.4"
    },
    "npm:aurelia-pal-browser@1.0.0-rc.1.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-polyfills@1.0.0-rc.1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-route-recognizer@1.0.0-rc.1.0.1": {
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-router@1.0.0-rc.1.0.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-rc.1.0.0",
      "aurelia-history": "npm:aurelia-history@1.0.0-rc.1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-rc.1.0.1"
    },
    "npm:aurelia-task-queue@1.0.0-rc.1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-templating@1.0.0-rc.1.0.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.3",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-rc.1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-rc.1.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-rc.1.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-rc.1.0.0"
    },
    "npm:aurelia-validation@0.6.6": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-rc.1.0.3",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-rc.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.1"
    },
    "npm:aurelia-view-manager@0.0.4": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.1",
      "extend": "npm:extend@3.0.0"
    },
    "npm:aurelia-view-manager@0.0.5": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-rc.1.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-rc.1.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-rc.1.0.1",
      "extend": "npm:extend@3.0.0"
    }
  }
});
