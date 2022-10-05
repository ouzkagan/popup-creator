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
// get color for related property
export const colorPicker = (hex: string | undefined, property?: string) => {
  const result =
    hex !== undefined && colorsConfig[hex] ? colorsConfig[hex] : '';
  if (typeof result === 'object') {
    return result[property as keyof typeof result];
  }
  return result;
};
// get content array from template

export const getDefaultProperty = (
  popupTemplates: PopupTemplate[],
  id: string,
  property: string
) => {
  return (
    popupTemplates.find((popup) => popup.template_id === id)?.[
      property as keyof PopupTemplate
    ] || ''
  );
};
export const getContent = (
  popupTemplates: PopupTemplate[],
  id: string,
  type: string
) => {
  return popupTemplates
    .filter((popup) => popup.template_id === id)[0]
    .content?.filter((c) => c.type === type);
};

// protect form fields on template change
export const restOfFormValues = (_formValues: formStateInterface) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { template_id, content, images, logo, ...rest } = _formValues;
  // console.log(rest);
  return rest;
};
// get code as a string
export const asAString = (_formValues: formStateInterface) => {
  const processedValues = { content: [], ..._formValues };
  processedValues.content = [
    ...processedValues?.content?.concat(processedValues?.images || []),
  ];
  delete processedValues?.images;

  const stringValues = JSON.stringify(processedValues);
  const valueToCopy = `<script type="text/javascript" src="https://popup-creator.vercel.app/bundle.js"></script><script> window.start.init(${stringValues})</script>`;
  return valueToCopy;
};

export const valuePicker = (data: formStateInterface, id: string) => {
  console.log('incoming;', data, 'id: ', id);
  return (
    data[id as keyof typeof data] ||
    data[id as keyof typeof data] !== '' ||
    '$' + id
  );
};
export const contentPicker = (data: formStateInterface, id: string) => {
  const { content } = data;
  if (data == null || content?.length == 0) return '$' + id;
  // console.log(content);
  return content?.filter((item) => item.name == id)?.[0]?.value;
};
export const imagePicker = (data: formStateInterface, id: string) => {
  if (data == null || data?.images?.length == 0 || data?.images == undefined)
    return '$' + id;
  const { images } = data;
  // console.log(content);
  return images?.filter((item) => item.name == id)?.[0]?.value;
};
