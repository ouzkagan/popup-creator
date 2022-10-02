import { Field } from 'react-final-form';
import TextInput from '../TextInput';
import ToggleInput from '../ToggleInput';
interface Props {
  isDisabled: boolean;
}
function AfterXSecondsSetting({ isDisabled }: Props) {
  return (
    <div>
      {' '}
      <div className="flex justify-between ">
        <div className="flex ">
          <span>After X Seconds</span>
        </div>
        <div>
          <Field
            name="inputStatus.afterXSeconds"
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
          name="afterXSeconds"
          component={TextInput}
          className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
          placeholder="12"
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}

export default AfterXSecondsSetting;
