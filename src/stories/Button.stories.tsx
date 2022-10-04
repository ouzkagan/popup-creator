import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
  backgroundColor: 'bg-purple-600',
  padding: 'py-2 px-5',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
  backgroundColor: 'bg-purple-600',
  padding: 'py-5 px-8',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Button',
  backgroundColor: 'bg-black',
  padding: 'py-3 px-24',
  width: 'w-full',
};
