import { FieldRenderProps } from 'react-final-form';

const TextInput = ({
  input,
  ...rest
}: FieldRenderProps<string, HTMLInputElement>): JSX.Element => {
  return <input type="text" {...input} {...rest} />;
};

export default TextInput;
