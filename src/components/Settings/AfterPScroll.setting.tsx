import { Field } from 'react-final-form';
import TextInput from '../TextInput';
import ToggleInput from '../ToggleInput';
interface Props {
  isDisabled: boolean;
}
function AfterPScrollSetting({ isDisabled }: Props) {
  return (
    <div>
      {' '}
      <div className="flex justify-between ">
        <div className="flex ">
          <span>After % Scroll</span>
        </div>
        <div>
          <Field
            name="inputStatus.afterScrollingXAmount"
            type="checkbox"
            component={ToggleInput}
            // checked={!formValues.inputStatus.visitorDevice}
            defaultValue={true}
          />
        </div>
      </div>
      <div className="w-full mt-4">
        <Field
          name="afterScrollingXAmount"
          component={TextInput}
          className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
          placeholder="12"
          parse={(x) => x}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}

export default AfterPScrollSetting;
