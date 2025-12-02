/* script.js — shared JS for nav, contact mailto and calculator */

/* Mobile nav toggle */
document.addEventListener('DOMContentLoaded', function() {
  var nav = document.querySelector('.nav');
  var toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
  }
  
  /* Contact mailto function exposed globally */
  window.sendEmailViaMailto = function() {
    var name = encodeURIComponent(document.getElementById('yourName')?.value || '');
    var from = encodeURIComponent(document.getElementById('yourEmail')?.value || '');
    var message = encodeURIComponent(document.getElementById('yourMessage')?.value || '');
    var to = 'giopacaldocabalidajr.2000@gmail.com';
    var subject = encodeURIComponent('Message from portfolio site — ' + (name || 'Visitor'));
    var body = encodeURIComponent('Name: ' + (name || '') + '\nEmail: ' + (from || '') + '\n\nMessage:\n' + (message || ''));
    var mailto = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
    window.location.href = mailto;
    return false; // prevent normal form submission
  };
  
  /* Simple calculator */
  var display = document.getElementById('calcDisplay');
  if (display) {
    var current = '';
    var keys = document.querySelectorAll('#calc .key');
    keys.forEach(function(k) {
      k.addEventListener('click', function() {
        if (k.id === 'clear') { current = '';
          display.value = '0'; return; }
        if (k.id === 'equals') {
          try {
            // evaluate expression safely: replace ÷ and × if present
            var s = current.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
            // prevent accidental injection: allow only digits, operators, parentheses, dot and spaces
            if (/^[0-9+\-*/().\s]+$/.test(s)) {
              var res = Function('"use strict";return (' + s + ')')();
              display.value = res;
              current = String(res);
            } else {
              display.value = 'Error';
              current = '';
            }
          } catch (e) {
            display.value = 'Error';
            current = '';
          }
          return;
        }
        var num = k.dataset.val;
        var op = k.dataset.op;
        if (num !== undefined) {
          if (current === '0') current = num;
          else current += num;
          display.value = current;
        } else if (op) {
          // translate * and / to symbols for display if you like; but keep underlying op
          current += op;
          display.value = current;
        }
      });
    });
  }
});