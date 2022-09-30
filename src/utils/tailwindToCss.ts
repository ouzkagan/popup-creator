// https://github.com/Devzstudio/tailwind_to_css/blob/main/libs/helpers.ts
import CheatSheet from './TailwindCheatSheet';

const arbitrarySupportedClasses = {
  pt: 'padding-top',
  pb: 'padding-bottom',
  pl: 'padding-left',
  pr: 'padding-right',
  p: 'padding',
  mb: 'margin-bottom',
  m: 'margin',
  mt: 'margin-top',
  ml: 'margin-left',
  mr: 'margin-right',
  w: 'width',
  h: 'height',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  bg: 'background',
  text: 'color',
  font: 'font-weigth',
  'max-w': 'max-width',
  'min-w': 'min-width',
  leading: 'line-height',
  'rounded-l': (value: string) =>
    `border-bottom-left-radius:${value};border-top-left-radius:${value}`,
  'rounded-tl': (value: string) => `border-top-left-radius:${value}`,
  'rounded-tr': (value: string) => `border-top-right-radius:${value}`,
  'rounded-bl': (value: string) => `border-bottom-left-radius:${value}`,
  'rounded-br': (value: string) => `border-bottom-right-radius:${value}`,
  'rounded-r': (value: string) =>
    `border-bottom-right-radius:${value};border-top-right-radius:${value}`,
};

const convertToCss = (classNames: string[]) => {
  // console.log(classNames)
  let leftover = classNames;
  let cssCode = ``;
  CheatSheet.forEach((element) => {
    element.content.forEach((content) => {
      content.table.forEach((list) => {
        if (classNames.includes(list[0])) {
          leftover.splice(leftover.indexOf(list[0]), 1);

          const semicolon = list[1][list[1].length - 1] !== ';' ? ';' : '';
          if (list.length === 3) cssCode += `${list[1]}${semicolon} \n`;
          else cssCode += `${list[2]}${semicolon} \n`;
        }

        if (classNames.includes(list[1])) {
          leftover.splice(leftover.indexOf(list[1]), 1);
          const semicolon = list[2][list[2].length - 1] !== ';' ? ';' : '';
          cssCode += `${list[2]}${semicolon} \n`;
        }

        // TRANSPARENT CLASSES
        const transparentClasses = classNames.filter((className) =>
          className.includes('/')
        );
        const transparentClassColor = transparentClasses.map(
          (className) => className.split('/')[0]
        );
        const transparentClassColorPercent = transparentClasses.map(
          (className) => className.split('/')[1].replace('.', '')
        );

        // TURN /50 -> 0.50 by string manipulation | rgb(,,,) -> rgba(,,,0.50)
        if (transparentClassColor.includes(list[1])) {
          let index = transparentClassColor.indexOf(list[1]);
          leftover.splice(leftover.indexOf(transparentClasses[index]), 1);
          const semicolon = list[0][list[0].length - 1] !== ';' ? ';' : '';

          cssCode += list[0]
            .replace('rgb', 'rgba')
            .replace(
              ')',
              ', 0.' + transparentClassColorPercent[index] + ')' + semicolon
            );
        }
      });
    });
  });

  // Check for arbitrary values
  const arbitraryClasses = classNames.filter((className) =>
    className.includes('[')
  );

  arbitraryClasses.forEach((className: string) => {
    const property: string = className.split('-[')[0].replace('.', '');
    const propertyValue = className?.match(/(?<=\[)[^\][]*(?=])/g)?.[0];
    if (arbitrarySupportedClasses[property]) {
      leftover.splice(leftover.indexOf(className), 1);

      if (typeof arbitrarySupportedClasses[property] === 'function') {
        // leftover.splice(leftover.indexOf(list[1]))
        cssCode += `${arbitrarySupportedClasses[property](propertyValue)};\n`;
      } else {
        cssCode += `${arbitrarySupportedClasses[property]}: ${propertyValue};\n`;
      }
    }
  });

  return cssCode;
};

const getBreakPoints = (input: string, breakpoint: string) => {
  return input
    .split(' ')
    .filter((i: string) => i.startsWith(breakpoint + ':'))
    .map((i: string) => '.' + i.substring(3));
};

const getHoverClass = (input: string) => {
  return input
    .split(' ')
    .filter((i) => i.startsWith('hover:'))
    .map((i) => i.replace('hover:', '.'));
};

export const getConvertedClasses = (input) => {
  const classNames = input.split(/\s+/).map((i) => '.' + i.trim());
  const breakpoints = CheatSheet[0].content[3].table;

  const hoverClasses = getHoverClass(input);

  const smClasses = getBreakPoints(input, 'sm');
  const mdClasses = getBreakPoints(input, 'md');
  const lgClasses = getBreakPoints(input, 'lg');
  const xlClasses = getBreakPoints(input, 'xl');
  const _2xlClasses = getBreakPoints(input, '2xl');

  const resultCss = `${convertToCss(classNames)}
${
  smClasses.length !== 0
    ? breakpoints[0][1].replace('...', '\n  ' + convertToCss(smClasses))
    : ''
}
${
  mdClasses.length !== 0
    ? breakpoints[1][1].replace('...', '\n  ' + convertToCss(mdClasses))
    : ''
}
${
  lgClasses.length !== 0
    ? breakpoints[2][1].replace('...', '\n  ' + convertToCss(lgClasses))
    : ''
}
${
  xlClasses.length !== 0
    ? breakpoints[3][1].replace('...', '\n  ' + convertToCss(xlClasses))
    : ''
}
${
  _2xlClasses.length !== 0
    ? breakpoints[4][1].replace('...', '\n  ' + convertToCss(_2xlClasses))
    : ''
}
${hoverClasses.length !== 0 ? `:hover {\n ${convertToCss(hoverClasses)} }` : ''}
`;

  return resultCss;
};
