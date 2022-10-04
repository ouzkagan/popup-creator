import { formStateInterface } from '@/store/features/settings.slice';
import { PopupTemplate } from '@/types';

const colorsConfig: {
  [key: string]: string | { bg: string; color: string; focusOutline: string };
} = {
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

export const colorPicker = (hex: string | undefined, property?: string) => {
  const result =
    hex !== undefined && colorsConfig[hex] ? colorsConfig[hex] : '';
  if (typeof result === 'object') {
    return result[property as keyof typeof result];
  }
  return result;
};

export const getContent = (
  popupTemplates: PopupTemplate[],
  id: string,
  type: string
) => {
  // console.log(popupInputs.filter((popup) => popup.id === id)[0].template);
  return popupTemplates
    .filter((popup) => popup.template_id === id)[0]
    .content?.filter((c) => c.type === type);
};

// protect form fields on template change
export const restOfFormValues = (_formValues: formStateInterface) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { template_id, content, ...rest } = _formValues;
  // console.log(rest);
  return rest;
};
export const asAString = (_formValues: formStateInterface) => {
  const processedValues = { content: [], ..._formValues };
  processedValues.content = [
    ...processedValues?.content?.concat(processedValues?.images || []),
  ];
  delete processedValues?.images;

  const stringValues = JSON.stringify(processedValues);
  const valueToCopy = `<script type="text/javascript" src="https://popupsmart.com/freechat.js"></script><script> window.start.init(${stringValues})</script>`;
  return valueToCopy;
};
