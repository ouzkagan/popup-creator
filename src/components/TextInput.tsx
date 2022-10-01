import { FieldRenderProps } from 'react-final-form';

type Props = FieldRenderProps<string, any>;

const TextInput = ({ input, meta, ...rest }: Props): JSX.Element => {
  return <input type="text" {...input} {...rest} />;
};

export default TextInput;
