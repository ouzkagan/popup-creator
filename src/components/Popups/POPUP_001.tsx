import { formStateInterface } from '@/store/features/settings.slice';

interface Props {
  popupData: formStateInterface;
}
export default function POPUP_001({ popupData }: Props) {
  return (
    <div>
      <h1>{popupData.template_id}</h1>
      <span>information about popup</span>
    </div>
  );
}
