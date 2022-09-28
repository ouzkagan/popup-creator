import { FieldRenderProps } from 'react-final-form';

type Props = FieldRenderProps<string, any>;

const TextInput = ({ input, meta, ...rest }: Props): JSX.Element => {
  // console.log('META', meta);
  return <input type="text" {...input} {...rest} />;
};

export default TextInput;
