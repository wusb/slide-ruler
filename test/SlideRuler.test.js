const expect = require('chai').expect, {JSDOM} = require('jsdom'),
    {window} = new JSDOM(`<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0,user-scalable=no">
      <meta name="author" content="吴胜斌,simbawu">
      <title>Slide Ruler 滑尺选择器</title>
  </head>
  <body>
  <div id="values"></div>
  <div id="app"></div>
  </body>
  </html>`);

propagateToGlobal(window);

function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;
    global[key] = window[key];
  }
}

const SliderRuler = require('../lib/slide-ruler').default;

describe('mocha tests', function() {

  it('render correct', function() {
    expect().to.be.equal();
  });

});

