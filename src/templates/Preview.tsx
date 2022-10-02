import PopupSelector from '@/components/Popups';
import { AppState } from '@/store';
import {
  formStateInterface,
  selectForm,
} from '@/store/features/settings.slice';
import { useSelector } from 'react-redux';
// const FormStateFromRedux = ({ form }) => {
//   const formValue = useSelector((state) => selectForm(state, form));
//   return <span>{JSON.stringify(formValue.values, 0, 2)}</span>;
// };
const Preview = (): JSX.Element => {
  const formValues: formStateInterface = useSelector(
    (state: AppState) => selectForm(state, 'defaultForm')?.values
  );
  return (
    <div className="relative mt-24 mx-auto">
      <div className="sticky top-24 ">
        {/* {data.content.body.map(block => Popups(block))} */}
        {PopupSelector(formValues)}
      </div>
      {/* <div className="sticky top-24 w-[800px] h-[468px] bg-white">
        <FormStateFromRedux form="defaultForm" />
      </div> */}
    </div>
  );
};

export default Preview;
