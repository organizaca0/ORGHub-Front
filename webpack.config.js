const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  remotes: {
    orgrow: 'http://localhost:4201/remoteEntry.js'
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false, 
      requiredVersion: 'auto',
    }),
    '@angular/material/snack-bar': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/datepicker': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/core': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/input': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/form-field': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/button': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/icon': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/tooltip': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/tabs': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/slide-toggle': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/progress-spinner': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/select': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/badge': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/chips': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/menu': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/expansion': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
    '@angular/material/list': { singleton: true, strictVersion: false, requiredVersion: 'auto' },
  },
});