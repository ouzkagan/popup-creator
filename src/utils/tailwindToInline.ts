import { parser } from 'posthtml-parser';
import { render } from 'posthtml-render';
import { getConvertedClasses } from './tailwindToCss';

function iter(o) {
  Object.keys(o).forEach(function (k) {
    if (o[k] !== null && typeof o[k] === 'object') {
      iter(o[k]);
      return;
    }
    // console.log(o[k])
    if (k === 'class') {
      let inlineCSS = ';' + getConvertedClasses(o[k]).trim().replace(/\n/g, '');
      // console.log(inlineCSS)
      let oldStyles = o['style'];
      // console.log("oldstyles:", oldStyles)
      o['style'] = '';
      o['style'] = oldStyles ? oldStyles + ' ' + inlineCSS : ' ' + inlineCSS;
      o['class'] = '';
      // console.log(o['style'])

      // o[k] = o[k].replace(/'/g, "''");
    }
  });
}

export function tailwindHtmlToInline(html: string) {
  const parsed = parser(html);
  iter(parsed);
  const rendered = render(parsed);
  return rendered;
}
