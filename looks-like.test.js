const { findParentByClassName } = require('./looks-like');
const { expect } = require('chai');

it('should work', () => {
  document.body.innerHTML = `
    <div class='me' id='result'>
      <div id='test'></div>
    </div>
  `;
  expect(findParentByClassName(document.getElementById('test'), 'me')).to.equal(document.getElementById('result'));
});
