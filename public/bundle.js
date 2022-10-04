/* eslint-disable @typescript-eslint/no-unused-vars */
(() => {
  const e = {
    TOP_LEFT: 'display:flex; justify-content:start;',
    TOP_CENTER: 'display:flex; justify-content:center;',
    TOP_RIGHT: 'display:flex; justify-content:end;',
    CENTER_LEFT: 'display:flex; justify-content:start;align-items:center;',
    CENTER_CENTER: 'display:flex; justify-content:center;align-items:center;',
    CENTER_RIGHT: 'display:flex; justify-content:end;align-items:center;',
    BOTTOM_LEFT: 'display:flex; justify-content:start;align-items:end;',
    BOTTOM_CENTER: 'display:flex; justify-content:center;align-items:end;',
    BOTTOM_RIGHT: 'display:flex; justify-content:end;align-items:end;',
  };
  window.start = new (function () {
    const t = document.createElement('link');
    var n;
    t.setAttribute('rel', 'stylesheet'),
      t.setAttribute('type', 'text/css'),
      t.setAttribute('href', 'http://127.0.0.1:5500/main.css'),
      document.getElementsByTagName('head')[0].appendChild(t);
    const o = { show: !1 };
    function i() {
      x = o.afterScrollingXAmount;
      var e = document.documentElement,
        t = document.body,
        n = 'scrollTop',
        i = 'scrollHeight';
      ((e[n] || t[n]) / ((e[i] || t[i]) - e.clientHeight)) * 100 >= x &&
        ((o.show = !0), c());
    }
    const r = {
        setCookie(e, t, n) {
          let o = '';
          if (n) {
            const e = new Date();
            e.setTime(e.getTime() + 24 * n * 60 * 60 * 1e3),
              (o = '; expires=' + e.toUTCString());
          }
          document.cookie = e + '=' + (t || '') + o + ';';
        },
        getCookie(e) {
          const t = document.cookie.split(';');
          for (const n of t)
            if (n.indexOf(e + '=') > -1) return n.split('=')[1];
          return null;
        },
      },
      s = (e) => {
        ([...e.target.classList].includes('exit-intent-popup') ||
          'close' === e.target.className ||
          27 === e.keyCode) &&
          (document
            .querySelector('.exit-intent-popup')
            .classList.remove('visible'),
          u());
      },
      a = (e) => {
        !e.toElement &&
          !e.relatedTarget &&
          e.clientY < 10 &&
          (document.removeEventListener('mouseout', a), c());
      };
    async function l(e) {
      e.preventDefault();
      const t = new FormData(webhookForm),
        n = {};
      for (var [i, r] of t.entries()) n[i] = r;
      const s =
          -1 != navigator.appVersion.indexOf('Win')
            ? 'Windows'
            : -1 != navigator.appVersion.indexOf('Mac')
            ? 'MacOS'
            : -1 != navigator.appVersion.indexOf('X11')
            ? 'UNIX'
            : -1 != navigator.appVersion.indexOf('Linux')
            ? 'Linux'
            : 'Unknown OS',
        [a, l] =
          ((u = navigator.appName),
          (p = (d = navigator.userAgent).match(
            /(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i
          )) &&
            null != (c = d.match(/version\/([\.\d]+)/i)) &&
            (p[2] = c[1]),
          p ? [p[1], p[2]] : [u, navigator.appVersion, '-?']);
      var c, u, d, p;
      const g = new Date(),
        m = g.toLocaleDateString(),
        f = g.toLocaleTimeString('en-US', {
          hour12: !1,
          hour: 'numeric',
          minute: 'numeric',
        }),
        v = o.browserLanguage,
        y = o.deviceType;
      await fetch(o.webHookUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: { ...n },
          OS: s,
          Browser: a,
          BrowserVersion: l,
          deviceType: y,
          language: v,
          date: m,
          time: f,
        }),
      }).then((e) => {
        console.log(e);
      });
    }
    function c() {
      null == r.getCookie('popup_seen') &&
        (document.querySelector('#modal').classList.remove('closed'),
        document.querySelector('#modal-overlay').classList.remove('closed'),
        document.querySelector('.exit-intent-popup').classList.add('visible'),
        (document.body.style.overflowY = 'hidden')),
        r.setCookie('popup_seen', !0, 30);
    }
    function u() {
      document.querySelector('#modal').classList.add('closed'),
        document.querySelector('#modal-overlay').classList.add('closed'),
        document
          .querySelector('.exit-intent-popup')
          .classList.remove('visible'),
        (document.body.style.overflowY = 'scroll');
    }
    this.init = function (t) {
      if ('object' == typeof t) {
        if (
          (t.inputStatus.visitorDevice
            ? ('' === t.visitorDevice
                ? (o.avaliableDevice = 'ALL')
                : (o.avaliableDevice = t.visitorDevice),
              (o.deviceType = window.innerWidth <= 720 ? 'MOBILE' : 'DESKTOP'),
              (o.isCorrectDevice =
                !o.inputStatus.visitorDevice ||
                'ALL' === o.avaliableDevice ||
                o.avaliableDevice === o.deviceType))
            : (o.isCorrectDevice = !0),
          t.inputStatus.afterXSeconds &&
            ((o.afterXSeconds = t.afterXSeconds),
            (x = o.afterXSeconds),
            setTimeout(function () {
              (o.show = !0), c();
            }, 1e3 * x)),
          t.inputStatus.afterScrollingXAmount &&
            ((o.afterScrollingXAmount = t.afterScrollingXAmount),
            window.addEventListener('scroll', i)),
          t.inputStatus.urlBrowsing
            ? ((o.urlBrowsing = t.urlBrowsing),
              (o.referrer = document.referrer),
              (o.isCorrectReferrer = (function () {
                if ('' === o.urlBrowsing) return !0;
                function e(e) {
                  let t = e;
                  return (
                    (t = t.replace('https://', '').replace('http://', '')),
                    '/' == t[t.length - 1] && (t = t.slice(0, -1)),
                    t
                  );
                }
                return e(document.referrer).includes(e(o.urlBrowsing));
              })()))
            : (o.isCorrectReferrer = !0),
          t.inputStatus.browserLanguage)
        ) {
          const e = (navigator.language || navigator.userLanguage).split('-');
          (o.browserLanguage = e.length > 0 ? e[0] : e),
            (o.activeLangugages = [...t.browserLanguage]),
            (o.activeLangugagesSeperated = []);
          for (var r = 0; r < o.activeLangugages.length; r++) {
            var d = o.activeLangugages[r].split('-');
            o.activeLangugagesSeperated.push(d[0]),
              o.activeLangugagesSeperated.push(d[1]);
          }
          o.isCorrectLanguage =
            o.activeLangugagesSeperated.includes(e[0]) ||
            o.activeLangugagesSeperated.includes(e[0]);
        } else o.isCorrectLanguage = !0;
        t.inputStatus.onExitIntent &&
          setTimeout(() => {
            document.addEventListener('mouseout', a),
              document.addEventListener('keydown', s);
          }, 10),
          'template_id' in t && (o.template_id = t.template_id),
          'content' in t && (o.customContent = t.content),
          'logo' in t && null !== t.logo && (o.logo = t.logo),
          'logo' in t &&
            null === t.logo &&
            (o.logo =
              'https://d2r80wdbkwti6l.cloudfront.net/Cz74LbbmsqGrFmpcWlqJaQpx6GJwZyEz.jpg'),
          'webHookUrl' in t &&
            null !== t.webHookUrl &&
            (o.webHookUrl = t.webHookUrl),
          'color' in t && (o.color = t.color),
          'position' in t && (o.position = t.position);
        const p = function () {
          return o.isCorrectDevice && o.isCorrectLanguage;
        };
        'undefined' != typeof window &&
          p() &&
          (async function () {
            void 0 === n && (n = document.createElement('DIV')),
              await fetch(
                'https://popup-creator.vercel.app/api/popups/' + o.template_id
              )
                .then((e) => e.json())
                .then((e) => {
                  (o.template = e.template), (o.settings = e.settings);
                });
            var t = document.createElement('link');
            t.setAttribute('rel', 'stylesheet'),
              t.setAttribute('type', 'text/css'),
              t.setAttribute('href', o.settings.fontLink),
              document.head.appendChild(t),
              (n.innerHTML = `\n    <div class="exit-intent-popup">\n\n      <div\n        id="modal"\n        class="modal closed"\n        id="freechat-popup"\n        style="font-family: ${
                o.font
              }, sans-serif;"\n      >\n        <div class="modal-guts" style="${
                e[o.position]
              }">\n          ${(function (e, t) {
                let n = e;
                for (let e = 0; e < t.length; e++)
                  n = n.replace('$' + t[e].name, t[e].value);
                return n;
              })(o.template, o.customContent)
                .replace('$color', o.color)
                .replace(
                  '$logo',
                  o?.logo
                )}\n        </div>\n      </div>\n      </div>\n\n        <div class="modal-overlay closed" id="modal-overlay"></div>\n    `),
              document.body.appendChild(n),
              document
                .querySelector('#close-button')
                .addEventListener('click', u),
              (webhookForm.onsubmit = l);
          })();
      }
    };
  })();
})();
//# sourceMappingURL=bundle.js.map
