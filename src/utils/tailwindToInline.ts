import { parser } from 'posthtml-parser';
import { render } from 'posthtml-render';
import { getConvertedClasses } from './tailwindToCss';
// types
import type { Node } from 'posthtml-render';

type Parsed = Node[] & {
  style: string;
  class: string;
};
function iter(o: Parsed) {
  Object.keys(o).forEach(function (k: string) {
    if (
      o[k as keyof typeof o] !== null &&
      typeof o[k as keyof typeof o] === 'object'
    ) {
      iter(o[k as keyof typeof o] as Parsed);
      return;
    }
    // console.log(o[k])
    if (k === 'class') {
      const inlineCSS =
        ';' + getConvertedClasses(o['class']).trim().replace(/\n/g, '');
      // console.log(inlineCSS)
      const oldStyles = o['style' as keyof typeof o];
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
  const parsed = parser(html) as Parsed;
  iter(parsed);
  const rendered = render(parsed);
  return rendered;
}
