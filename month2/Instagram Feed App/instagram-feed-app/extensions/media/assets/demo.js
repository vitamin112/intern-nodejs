(() => {
  const body = document.getElementsByTagName('body')[0];
  const div = document.createElement('div');
  div.textContent = 'hello';
  body.parentNode.insertBefore(div, body);
})();
