import { formStateInterface } from '@/store/features/settings.slice';
import { PopupTemplate } from '@/types';
import axios, { AxiosError } from 'axios';
import { FileWithPath } from 'react-dropzone';

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

export const uploadFile = async (field: string, file: FileWithPath) => {
  //here, we are creatingng a new FormData object; this lets you compile a set of key/value pairs.
  const data = new FormData();
  // we are appending a new value onto an existing key inside a FormData object. the keys here are what is required for the upload by the cloudinary endpoint. the value in line 7 is your upload preset
  data.append('upload_preset', 'ntlolkzu');
  // URL.createObjectURL(file)
  data.append('file', file);
  // return 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80';
  try {
    //making a post request to the cloudinary endpoint

    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.CDN_USERNAME}/upload`,
        data
      )
      .then((response) => {
        return response.data.secure_url;
      });
  } catch (e: unknown) {
    //logthe error if any here. you can as well display them to the users
    if (e instanceof AxiosError) {
      // Inside this block, err is known to be a ValidationError
      console.error(e);
      // Set error to image and fallback
    }
    return '/assets/default-popup.jpg';
  }
};
