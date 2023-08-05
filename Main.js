function getParsed() {
  return {
    hasHeaders: document.querySelector('#hasHeader:checked'),
    split: document.getElementById('input').value.split(/\r?\n/),
  };
}

var htmlTimeout, mdTimeout;

function delayedGeneration() {
  clearTimeout(htmlTimeout);
  clearInterval(mdTimeout);
  htmlTimeout = setTimeout(generateHtml, 100);
  mdTimeout = setTimeout(generateMd, 1000);
}

function generateMd() {
  function escapeMd(str) {
    str = str.replace(/\*/g, '\\*');
    str = str.replace(/_/g, '\\_');
    str = str.replace(/}/g, '\\}');
    str = str.replace(/{/g, '\\{');
    str = str.replace(/\[/g, '\\[');
    str = str.replace(/]/g, '\\]');
    str = str.replace(/\(/g, '\\(');
    str = str.replace(/\)/g, '\\)');
    str = str.replace(/-/g, '\\-');
    str = str.replace(/\+/g, '\\+');
    str = str.replace(/#/g, '\\#');
    str = str.replace(/\./g, '\\.');
    str = str.replace(/!/g, '\\!');

    return str;
  }

  const mdPre = document.getElementById('mdContent');
  mdPre.textContent = '';

  const parsed = getParsed();
  var output = '';

  if (parsed.hasHeaders != undefined) {
    const tds = parsed.split[0].split(/\t/);
    output += '| ';
    var line = '| ';
    tds.forEach(element => {
      var escaped = escapeMd(element);
      output += `${escaped} | `;
      line += '-'.repeat(escaped.length) + ' | ';
    });

    output = output.trim();
    output += `\r\n${line.trim()}`;
    parsed.split.shift();
  }

  parsed.split.forEach(row => {
    if (!row || row.trim().length < 1) return true;
    var tds = row.split(/\t/);
    output += '\r\n| ';
    tds.forEach(element => {
      output += `${escapeMd(element)} | `;
    });
    return true;
  });

  mdPre.textContent = output.trim();
}

function generateHtml() {
  function convert(str) {
    str = str.replace(/&/g, '&amp;');
    str = str.replace(/>/g, '&gt;');
    str = str.replace(/</g, '&lt;');
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#039;');
    return str;
  }

  const previewPanel = document.getElementById('previewPanel');
  previewPanel.innerHTML = '';
  const htmlPre = document.getElementById('htmlContent');
  htmlPre.textContent = '';

  const parsed = getParsed();

  var output = '<table>';
  if (parsed.hasHeaders != undefined) {
    output += '\r\n <thead>\r\n  <tr>';
    const tds = parsed.split[0].split(/\t/);

    tds.forEach(element => {
      output += `\r\n\   <th>${convert(element)}</th>`;
    });

    output += '\r\n  </tr>\r\n </thead>';
    parsed.split.shift();
  }

  output += '\r\n <tbody>';
  parsed.split.forEach(row => {
    if (!row || row.trim().length < 1) return true;
    var tds = row.split(/\t/);
    output += '\r\n  <tr>';
    tds.forEach(element => {
      output += `\r\n\   <td>${convert(element)}</td>`;
    });

    output += '\r\n  </tr>';
    return true;
  });
  output += '\r\n </tbody>';
  output += '\r\n</table>';

  previewPanel.innerHTML = output;

  htmlPre.classList.remove('prettyprinted');
  htmlPre.textContent = output;
  setTimeout(() => window.PR.prettyPrint(), 100);
}

function showCopied() {
  // var c = document.getElementById('copy-message');
  // c.classList.remove('copy-message-animation');
  // setTimeout(() => c.classList.add('copy-message-animation'), 100);
}

function copyHtmlCode() {
  navigator.clipboard.writeText(document.getElementById('htmlContent').textContent).then(
    function () {
      showCopied();
    },
    function () {
      alert('Failed to copy the text to clipboard!');
    }
  );
}

function copyMdCode() {
  navigator.clipboard.writeText(document.getElementById('mdContent').textContent).then(
    function () {
      showCopied();
    },
    function () {
      alert('Failed to copy the text to clipboard!');
    }
  );
}

function copyHtml() {
  let element = document.getElementById('previewPanel');
  window.getSelection().removeAllRanges();
  let range = document.createRange();
  range.selectNode(typeof element === 'string' ? document.getElementById(element) : element);
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  showCopied();
}

function clearAll() {
  const previewPanel = document.getElementById('previewPanel');
  previewPanel.innerHTML = '';
  const htmlPre = document.getElementById('htmlContent');
  htmlPre.textContent = '';
  document.getElementById('input').value = '';
  const mdPre = document.getElementById('mdContent');
  mdPre.textContent = '';
}
