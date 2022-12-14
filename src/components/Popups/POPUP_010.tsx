import { formStateInterface } from '@/store/features/settings.slice';
import { colorPicker, contentPicker, imagePicker } from '@/utils/helpers';

interface Props {
  popupData: formStateInterface;
}
export default function POPUP_010({ popupData }: Props) {
  return (
    <div
      data-testid="POPUP_010"
      className="w-[740px] h-[405px] grid grid-cols-2  bg-white shadow-xl   rounded-l-[40px] max-w-full max-h-full"
    >
      <div className="w-[300px] mx-auto max-w-full">
        <div className="flex flex-col justify-center items-center  mx-auto">
          <h3 className="text-4xl	font-semibold  text-black leading-[3.375rem] mt-[49px]">
            {/* {popupData?.content?.[0]?.value || '$headline'} */}
            {contentPicker(popupData, 'headline')}
          </h3>

          <p className="max-w-[459px] mt-[10px] font-[400] text-base leading-6 tracking-tighter">
            {contentPicker(popupData, 'description')}
          </p>
          <form
            id="webhookForm"
            className="w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="w-full mt-8">
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
            <div className="w-full mt-4">
              <input
                type="text"
                className={`rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 ${
                  colorPicker(popupData?.color)
                    ? colorPicker(popupData?.color, 'focusOutline')
                    : ''
                }`}
                name="input_2"
                placeholder={contentPicker(popupData, 'input_2')}
              />
            </div>
            <button
              id="submit-button"
              type="submit"
              className={
                'rounded-xl py-3 px-24 whitespace-nowrap  font-medium text-base leading-4 text-center text-white tracking-tight	w-full h-[48px] mt-4  border-0 cursor-pointer ' +
                (colorPicker(popupData?.color, 'bg') || '')
              }
              // x={colorPicker(popupData?.color)}
              style={{
                backgroundColor: popupData?.color || '$color',
              }}
            >
              {contentPicker(popupData, 'button_text_1')}
            </button>
          </form>
        </div>
        <span className="font-light leading-3 text-gray-600 text-[10px] mt-4 ">
          {contentPicker(popupData, 'privacy_text_1')}
        </span>
      </div>
      <div className="relative  ">
        {/* <img src="/51951afc5aa43fb6d90f01eeeec2b12c.png" alt="me" /> */}
        <div className="absolute w-full h-full top-0 left-0 ">
          <span
            className="w-10 h-10 ml-auto rounded-full bg-black/30 	flex justify-center items-center mt-6 mr-6 cursor-pointer hover:bg-black/20"
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
        <div
          className="bg-cover	h-full "
          style={{
            backgroundImage: `url(${imagePicker(popupData, 'image_1')})`,
          }}
        ></div>
      </div>
    </div>
  );
}
