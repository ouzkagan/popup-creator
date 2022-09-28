import type { PopupTemplate } from './types';
function pad(num: number, size: number): string {
  let newNum = num.toString();
  while (newNum.length < size) newNum = '0' + newNum;
  return newNum;
}
export const popupTemplates: PopupTemplate[] = [
  {
    template_id: 'POPUP_001',
    image: '01 1.png',
    content: [
      {
        name: 'headline',
        type: 'text',
        value: 'Security Code',
        color: '#000000',
      },
      {
        name: 'description',
        type: 'text',
        value: 'This code expires in 24 hours',
        color: '#000000',
      },
      {
        name: 'button_text_1',
        type: 'text',
        value: 'Cancel',
      },
      {
        name: 'button_text_2',
        type: 'text',
        value: 'Continue',
      },
    ],
  },
  {
    template_id: 'POPUP_002',
    image: '02 1.png',
    content: [
      {
        name: 'headline',
        type: 'text',
        value: 'Install local now',
        color: '#000000',
      },
      {
        name: 'description',
        type: 'text',
        value: 'We’ve gone native, try it!',
        color: '#000000',
      },
      {
        name: 'button_text_1',
        type: 'text',
        value: 'Continue',
      },
      {
        name: 'button_text_2',
        type: 'text',
        value: 'Not Now',
      },
    ],
  },
  {
    template_id: 'POPUP_003',
    image: '03 1.png',
    content: [
      {
        name: 'title',
        type: 'text',
        value: 'Plans',
        color: '#000000',
      },
      {
        name: 'headline',
        type: 'text',
        value: 'Choose best for you',
        color: '#000000',
      },
      {
        name: 'description',
        type: 'text',
        value: 'Only pay for the capacity that you use.',
        color: '#000000',
      },

      {
        name: 'radio_name_1',
        type: 'text',
        value: 'Starter',
      },

      {
        name: 'radio_description_1',
        type: 'text',
        value: '1 free (then $15 per meember / month)',
      },
      {
        name: 'radio_name_2',
        type: 'text',
        value: 'Pro',
      },

      {
        name: 'radio_description_2',
        type: 'text',
        value: '$19 per member/month',
      },
      {
        name: 'radio_name_3',
        type: 'text',
        value: 'Business',
      },

      {
        name: 'radio_description_3',
        type: 'text',
        value: '$29 per member/month',
      },

      {
        name: 'button_text_1',
        type: 'text',
        value: 'Cancel',
      },
      {
        name: 'button_text_2',
        type: 'text',
        value: 'Continue',
      },
    ],
  },
  // fill rest
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  ...Array.from(Array(33), (_, x) => {
    // return `${('0' + (x + 1)).slice(-2)} 1.png`;
    if (x + 4 === 10) {
      return {
        template_id: 'POPUP_010',
        image: '10 1.png',
        content: [
          {
            name: 'headline',
            type: 'text',
            value: 'Sign up',
            color: '#000000',
          },
          {
            name: 'description',
            type: 'text',
            value: 'Join the adventure',
            color: '#000000',
          },
          {
            name: 'input_placeholder_1',
            type: 'text',
            value: 'Enter full name',
            color: '#000000',
          },
          {
            name: 'button_text_1',
            type: 'text',
            value: 'Signup',
            color: '#F37C34',
          },
          {
            name: 'privacy_text_1',
            type: 'text',
            value: 'By signing up, you agree to  Privacy Policy',
          },
          {
            name: 'image_1',
            type: 'image',
            value: '/assets/default-popup.jpg',
          },
        ],
      };
    }
    return {
      template_id: 'POPUP_' + pad(x + 4, 3),
      image: `${('0' + (x + 4)).slice(-2)} 1.png`,
      content: [],
    };
  }),
];
