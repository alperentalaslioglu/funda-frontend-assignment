var gulp = require('gulp');
var elixir = require('laravel-elixir');

var config = elixir.config;
config.assetsPath = 'assets';

require('./tasks/bundle.task');

elixir(function (mix) {
    mix
        .copy('app/views/*.html', 'public/views')
        .copy('assets/fonts/*.*', 'public/fonts')
        .copy('assets/img/*.*', 'public/img')
        .copy('app/data/*.*', 'public/data')
        .sass('styles.scss')
        .angular([
            'bower_components/angular/angular.min.js',
            'bower_components/angular-ui-router/release/*.min.js',
            'bower_components/angular-resource/*.min.js',
            'bower_components/angular-sanitize/*.min.js',
            'bower_components/angular-animate/*.min.js',
        ], 'public/js', 'vendor.js')
        .angular('app/', 'public/js', 'app.js')
        .styles(['*.css'], 'public/css/vendor.css');
});