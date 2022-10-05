import { formStateInterface } from '@/store/features/settings.slice';
import { colorPicker, contentPicker, valuePicker } from '../../utils/helpers';
interface Props {
  popupData: formStateInterface;
}
export default function POPUP_001({ popupData }: Props) {
  return (
    <div
      data-testid="POPUP_001"
      className="w-[480px] h-[446px] relative  bg-white shadow-xl   rounded-l-[40px] max-w-full max-h-full"
    >
      <div className="w-full mx-auto max-w-full">
        <div className="flex flex-col justify-center items-center  mx-auto w-[350px] py-[40px]">
          <div
            className="rounded-full bg-purple-600 flex justify-center items-center p-[21px]"
            style={{
              backgroundColor: popupData?.color || '$color',
            }}
          >
            {/* <Image
              src={valuePicker(popupData, 'logo') as string}
              width={48}
              height={48}
              alt="popup logo"
            /> */}
            <picture>
              <source
                srcSet={valuePicker(popupData, 'logo') as string}
                type="image/webp"
              />
              <img
                src={valuePicker(popupData, 'logo') as string}
                alt="popup logo"
                width={48}
                height={48}
              />
            </picture>
            {/* <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 25.18L30.8 32.94L24 28.84L17.2 32.94L19 25.2L13 20.02L20.92 19.34L24 12.04L27.08 19.32L35 20L29 25.18ZM24 6.38L38 12.6V22C38 31.04 32.04 39.38 24 41.86C15.96 39.38 10 31.04 10 22V12.6L24 6.38ZM24 2L6 10V22C6 33.1 13.68 43.48 24 46C34.32 43.48 42 33.1 42 22V10L24 2Z"
                fill="white"
              />
            </svg> */}
          </div>
          <h3 className="text-4xl	font-semibold  text-black leading-[3.375rem] mt-[29px]">
            {/* {popupData?.content?.[0]?.value || '$headline'} */}
            {contentPicker(popupData, 'headline')}
          </h3>

          <p className="max-w-[459px] mt-[20px] font-[400] text-base leading-6 tracking-tighter">
            {contentPicker(popupData, 'description')}
          </p>
          <form
            id="webhookForm"
            className="w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="w-full mt-[40px]">
              <input
                type="text"
                className={`rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 ${
                  colorPicker(popupData?.color)
                    ? colorPicker(popupData?.color, 'focusOutline')
                    : ''
                }`}
                name="input_1"
                placeholder={contentPicker(popupData, 'input_1')}
              />
            </div>
            <div className="flex gap-[14px] mt-[30px] ">
              <button
                id="close-button"
                type="submit"
                className={
                  'rounded-xl py-3  whitespace-nowrap  font-medium text-base leading-4 text-center text-black tracking-tight	w-full h-[48px]   border-2 border-slate-100 cursor-pointer bg-white '
                }
              >
                {contentPicker(popupData, 'button_text_1')}
              </button>
              <button
                id="submit-button"
                type="submit"
                className={
                  'rounded-xl py-3 whitespace-nowrap  font-medium text-base leading-4 text-center text-white tracking-tight	w-full h-[48px]  border-0 cursor-pointer  ' +
                  (colorPicker(popupData?.color, 'bg') || '')
                }
                // x={colorPicker(popupData?.color)}
                style={{
                  backgroundColor: popupData?.color || '$color',
                }}
              >
                {contentPicker(popupData, 'button_text_2')}
              </button>
            </div>
          </form>
          <span className="font-light leading-3 text-gray-600 text-[10px] mt-4 ">
            {contentPicker(popupData, 'privacy_text_1')}
          </span>
        </div>
      </div>
      <span
        className=" absolute top-0 right-0 w-10 h-10 ml-auto rounded-full bg-black/30 	flex justify-center items-center mt-6 mr-6 cursor-pointer hover:bg-black/20"
        id="close-button"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.6351 6.70106L17.2985 5.3645L11.9997 10.6634L6.70082 5.3645L5.36426 6.70106L10.6631 11.9999L5.36426 17.2988L6.70082 18.6353L11.9997 13.3365L17.2985 18.6353L18.6351 17.2988L13.3362 11.9999L18.6351 6.70106Z"
            fill="white"
          />
        </svg>
      </span>
    </div>
  );
}
