import {
  formStateInterface,
  UPDATE_FORM_STATE,
} from '@/store/features/settings.slice';
import { FormState } from 'final-form';
import { FormSpy } from 'react-final-form';
import { useDispatch } from 'react-redux';

const FormStateToRedux = ({ form }: { form: string }) => {
  const dispatch = useDispatch();
  const updateForm = (form: string, state: FormState<formStateInterface>) => {
    dispatch(UPDATE_FORM_STATE({ form, state }));
    return 1;
  };

  return (
    <FormSpy
      onChange={(state: FormState<formStateInterface>) => {
        return updateForm(form, state);
      }}
    />
  );
};
export default FormStateToRedux;
