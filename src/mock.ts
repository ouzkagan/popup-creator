export const popupTemplates = [
  {
    template_id: 't1',
    image: '01 1.png',
    content: [
      {
        identifier: 'headline',
        type: 'text',
        value: 'Security Code',
        color: '#000000',
      },
      {
        identifier: 'description',
        type: 'text',
        value: 'This code expires in 24 hours',
        color: '#000000',
      },
      {
        identifier: 'button_text_1',
        type: 'text',
        name: 'button_text_1',
        value: 'Cancel',
      },
      {
        identifier: 'button_text_2',
        type: 'text',
        name: 'button_text_2',
        value: 'Continue',
      },
    ],
  },
  {
    template_id: 't2',
    image: '02 1.png',
    content: [
      {
        identifier: 'headline',
        type: 'text',
        value: 'Install local now',
        color: '#000000',
      },
      {
        identifier: 'description',
        type: 'text',
        value: 'We’ve gone native, try it!',
        color: '#000000',
      },
      {
        identifier: 'button_text_1',
        type: 'text',
        name: 'button_text_1',
        value: 'Continue',
      },
      {
        identifier: 'button_text_2',
        type: 'text',
        name: 'button_text_2',
        value: 'Not Now',
      },
    ],
  },
  {
    template_id: 't3',
    image: '03 1.png',
    content: [
      {
        identifier: 'title',
        type: 'text',
        value: 'Plans',
        color: '#000000',
      },
      {
        identifier: 'headline',
        type: 'text',
        value: 'Choose best for you',
        color: '#000000',
      },
      {
        identifier: 'description',
        type: 'text',
        value: 'Only pay for the capacity that you use.',
        color: '#000000',
      },

      {
        identifier: 'radio_name_1',
        type: 'text',
        name: 'radio_text_1',
        value: 'Starter',
      },

      {
        identifier: 'radio_description_1',
        type: 'text',
        name: 'radio_text_1',
        value: '1 free (then $15 per meember / month)',
      },
      {
        identifier: 'radio_name_2',
        type: 'text',
        name: 'radio_text_2',
        value: 'Pro',
      },

      {
        identifier: 'radio_description_2',
        type: 'text',
        name: 'radio_text_2',
        value: '$19 per member/month',
      },
      {
        identifier: 'radio_name_3',
        type: 'text',
        name: 'radio_text_3',
        value: 'Business',
      },

      {
        identifier: 'radio_description_3',
        type: 'text',
        name: 'radio_text_3',
        value: '$29 per member/month',
      },

      {
        identifier: 'button_text_1',
        type: 'text',
        name: 'button_text_1',
        value: 'Cancel',
      },
      {
        identifier: 'button_text_2',
        type: 'text',
        name: 'button_text_2',
        value: 'Continue',
      },
    ],
  },
  // fill rest
  ...Array.from(Array(33), (_, x) => {
    // return `${('0' + (x + 1)).slice(-2)} 1.png`;
    if (x + 4 === 10) {
      return {
        template_id: 't10',
        image: '10 1.png',
        content: [
          {
            identifier: 'headline',
            type: 'text',
            value: 'Sign up',
            color: '#000000',
          },
          {
            identifier: 'description',
            type: 'text',
            value: 'Join the adventure',
            color: '#000000',
          },
          {
            identifier: 'input_placeholder_1',
            type: 'text',
            value: 'Join the adventure',
            color: '#000000',
          },
          {
            identifier: 'image_1',
            type: 'image',
            value: '/assets/default-popup.jpg',
          },
          {
            identifier: 'button_text_1',
            type: 'text',
            name: 'button_text_1',
            value: 'Signup',
            color: '#F37C34',
          },
          {
            identifier: 'privacy_text_1',
            type: 'text',
            name: 'extra_text_2',
            value: 'By signing up, you agree to  Privacy Policy',
          },
        ],
      };
    }
    return {
      template_id: 't' + (x + 4),
      image: `${('0' + (x + 4)).slice(-2)} 1.png`,
      content: [],
    };
  }),
];
