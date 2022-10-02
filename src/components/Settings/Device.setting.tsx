import { DeviceType } from '@/store/features/settings.slice';
import { Field } from 'react-final-form';
import ToggleInput from '../ToggleInput';
interface Props {
  setValue: (a: string, b: string) => void;
  visitorDevice: DeviceType;
  isDisabled: boolean;
}
function DeviceSetting({ visitorDevice, isDisabled, setValue }: Props) {
  return (
    <div>
      <div className="flex justify-between ">
        <div className="flex ">
          <span>Visitor Device</span>
        </div>
        <div>
          <Field
            name="inputStatus.visitorDevice"
            type="checkbox"
            component={ToggleInput}
            // checked={isDisabled}
            defaultValue={true}
          />
        </div>
      </div>
      <div className="mt-5 flex gap-5 h-12 w-full">
        <div className="flex items-center gap-[4px] bg-[#F5F5F5] rounded-xl grow">
          <input
            name="visitorDevice"
            type="checkbox"
            value="DESKTOP"
            checked={visitorDevice.includes('DESKTOP')}
            className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 ml-[15px] mr-[6px]"
            disabled={isDisabled}
            onChange={() => {
              if (visitorDevice !== 'DESKTOP') {
                setValue('visitorDevice', 'DESKTOP');
              } else {
                setValue('visitorDevice', 'MOBILE');
              }
            }}
          />{' '}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 14.5C15.825 14.5 16.5 13.825 16.5 13V3.5C16.5 2.675 15.825 2 15 2H3C2.175 2 1.5 2.675 1.5 3.5V13C1.5 13.825 2.175 14.5 3 14.5H0V16H18V14.5H15ZM3 3.5H15V13H3V3.5Z"
              fill={visitorDevice.includes('DESKTOP') ? '#7D4AEA' : '#999999'}
            />
          </svg>
          Desktop
        </div>
        <div className="flex items-center gap-[4px] bg-[#F5F5F5] rounded-xl grow">
          <input
            name="visitorDevice"
            // component="input"
            type="checkbox"
            value="MOBILE"
            checked={visitorDevice.includes('MOBILE')}
            className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 ml-[15px] mr-[6px] rounded-none"
            disabled={isDisabled}
            onChange={() => {
              // console.log(visitorDevice);
              if (visitorDevice !== 'MOBILE') {
                setValue('visitorDevice', 'MOBILE');
              } else {
                setValue('visitorDevice', 'DESKTOP');
              }
            }}
          />{' '}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.75 0.7575L5.25 0.75C4.425 0.75 3.75 1.425 3.75 2.25V15.75C3.75 16.575 4.425 17.25 5.25 17.25H12.75C13.575 17.25 14.25 16.575 14.25 15.75V2.25C14.25 1.425 13.575 0.7575 12.75 0.7575ZM12.75 14.25H5.25V3.75H12.75V14.25Z"
              // fill="#999999"
              fill={visitorDevice.includes('MOBILE') ? '#7D4AEA' : '#999999'}
            />
          </svg>
          Mobile
        </div>
      </div>
    </div>
  );
}

export default DeviceSetting;
