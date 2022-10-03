import PopupSelector from '@/components/Popups';
import { AppState } from '@/store';
import {
  formStateInterface,
  selectForm,
} from '@/store/features/settings.slice';
import { FormState } from 'final-form';
import { useSelector } from 'react-redux';
const Preview = (): JSX.Element => {
  const formValues: formStateInterface = useSelector(
    (state: AppState) =>
      (selectForm(state, 'settingsForm') as FormState<formStateInterface>)
        ?.values
  );
  return (
    <div className="relative mt-24 mx-auto">
      <div className="sticky top-24 ">{PopupSelector(formValues)}</div>
    </div>
  );
};

export default Preview;
