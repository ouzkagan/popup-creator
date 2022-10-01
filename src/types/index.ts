export type Content = {
  name: string;
  type: 'text' | 'image';
  value: string;
  color?: `#${string}`;
};
export type PopupTemplate = {
  template_id: string;
  image: string;
  content: Content[];
  settings?: {
    font: string;
    fontLink: string;
  };
};
