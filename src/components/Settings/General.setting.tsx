import { Field } from 'react-final-form';
import TextInput from '../TextInput';
import ToggleInput from '../ToggleInput';
interface Props {
  fieldName: string;
  alias: string;
  isDisabled: boolean;
  placeholder?: string;
  parse?: (x: unknown) => unknown;
  allowNull?: boolean;
}
function GeneralSetting({
  fieldName = 'field_x',
  alias = 'error',
  isDisabled = false,
  ...rest
}: Props) {
  return (
    <div>
      {' '}
      <div className="flex justify-between ">
        <div className="flex ">
          <span>{alias}</span>
        </div>
        <div>
          <Field
            name={'inputStatus.' + fieldName}
            type="checkbox"
            component={ToggleInput}
            // checked={!formValues.inputStatus.visitorDevice}
            defaultValue={true}
          />
        </div>
      </div>
      <div className="w-full mt-4">
        <Field
          parse={(x) => x}
          name={fieldName}
          component={TextInput}
          className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
          disabled={isDisabled}
          placeholder={rest?.placeholder}
          allowNull={rest?.allowNull}
        />
      </div>
    </div>
  );
}

export default GeneralSetting;
