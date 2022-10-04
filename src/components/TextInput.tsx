import { FieldRenderProps } from 'react-final-form';

const TextInput = ({
  input,
  meta,
  ...rest
}: FieldRenderProps<string, HTMLInputElement>): JSX.Element => {
  return (
    <div>
      <input
        type="text"
        {...input}
        {...rest}
        className={`${rest?.className} ${
          meta.error &&
          meta.touched &&
          'outline-red-400 required:border-red-500'
        }`}
      />

      {meta.error && meta.touched && !rest?.disabled && (
        <div className="text-red-500 p-2">{meta.error}</div>
      )}
    </div>
  );
};

export default TextInput;
