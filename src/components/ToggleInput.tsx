import { FieldRenderProps } from 'react-final-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = FieldRenderProps<string, any>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ToggleInput = ({ input, meta, ...rest }: Props): JSX.Element => {
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        {...input}
        {...rest}
        type="checkbox"
        className="sr-only peer "
        // onClick={() => console.log(formValues.inputStatus)}
      />
      <div className="w-[33px] h-[18px] bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-[160px] peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[12px] after:w-[12px] after:transition-all dark:border-gray-600 peer-checked:bg-[#7D4AEA] peer-checked:after:left-[6px]"></div>
    </label>
  );
};

export default ToggleInput;
