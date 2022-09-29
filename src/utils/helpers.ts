const colorsConfig = {
  // Colors
  '#777777': {
    bg: 'bg-[#777777]',
    color: '[#777777]',
    focusOutline: 'focus:outline-[#777777] hover:outline-[#777777]',
  },
  '#F37C34': {
    bg: 'bg-[#F37C34]',
    color: '[#F37C34]',
    focusOutline: 'focus:outline-[#F37C34] hover:outline-[#F37C34]',
  },
  '#000000': {
    bg: 'bg-[#000000]',
    color: '[#000000]',
    focusOutline: 'focus:outline-[#000000] hover:outline-[#000000]',
  },
  '#DDDDDD': {
    bg: 'bg-[#DDDDDD]',
    color: '[#DDDDDD]',
    focusOutline: 'focus:outline-[#DDDDDD] hover:outline-[#DDDDDD]',
  },
  // Sizes
  small: 'px-3 py-2',
  medium: 'px-4 py-2',
  large: 'px-5 py-2',
};

export const colorPicker = (hex: string) => {
  return colorsConfig[hex];
};
