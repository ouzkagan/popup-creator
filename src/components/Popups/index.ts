/* eslint-disable import/no-anonymous-default-export */
// https://www.storyblok.com/tp/react-dynamic-component-from-json
import { formStateInterface } from '@/store/features/settings.slice';
import React from 'react';
import DEFAULT from './DEFAULT';
import Popup_001 from './POPUP_001';
import Popup_002 from './POPUP_002';
import Popup_010 from './POPUP_010';
const Components: { [key: string]: any } = {
  POPUP_001: Popup_001,
  POPUP_002: Popup_002,
  POPUP_010: Popup_010,
  DEFAULT: DEFAULT,
};

// eslint-disable-next-line react/display-name
export default (popupData: formStateInterface): JSX.Element => {
  // component does exist
  if (typeof Components[popupData.template_id] !== 'undefined') {
    return React.createElement(Components[popupData.template_id], {
      key: popupData.template_id,
      popupData: popupData,
    });
  }
  // component doesn't exist yet
  return React.createElement(DEFAULT);
};
