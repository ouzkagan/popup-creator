import { formStateInterface } from '@/store/features/settings.slice';
import { asAString } from '@/utils/helpers';
import { Field } from 'react-final-form';
import CodeBlock from '../CodeBlock';
import TextInput from '../TextInput';
interface Props {
  formValues: formStateInterface;
}

function CodeSectionSetting({ formValues }: Props) {
  const copyScript = () => {
    const valueToCopy = asAString(formValues);
    navigator.clipboard.writeText(valueToCopy);
  };
  return (
    <div className="mt-24">
      <div className="mb-8 flex items-center gap-[15px]">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-center  text-base font-semibold	leading-6 tracking-half-tighter text-black">
          5
        </span>
        <div className="text-lg font-semibold leading-9 tracking-half-tighter text-black ">
          Settings and Code
        </div>
      </div>
      <div className="mt-[30px]">
        <h4 className="text-lg font-semibold leading-9 tracking-half-tighter text-black">
          Webhook to Send data
        </h4>
        <div className="mt-4 text-sm font-normal leading-4">
          Enter youe Webhook URL
        </div>
        <div className="mt-[5px] text-xs">
          You can create a simple one with make.com
        </div>
        <div className="mt-4 w-full">
          <Field
            parse={(x) => x}
            name="webHookUrl"
            component={TextInput}
            className="h-[48px] w-full rounded-xl border border-solid pl-3 text-base leading-6  text-gray-600 focus:outline-[#7D4AEA]"
            placeholder="Enter your webhook URL"
          />
        </div>
        <div className="mt-[15px] flex grow gap-[4px]">
          <Field<string>
            name="webHookTypes"
            component="input"
            type="checkbox"
            value="FORM"
            className="mr-[6px] h-[18px] w-[18px] border-blue-500  checked:bg-blue-500"
          />{' '}
          Send form submissions
        </div>
        <div className="mt-[15px] flex grow gap-[4px]">
          <Field<string>
            name="webHookTypes"
            component="input"
            type="checkbox"
            value="CLICK"
            className="mr-[6px] h-[18px] w-[18px] border-blue-500  checked:bg-blue-500"
          />{' '}
          Send click data
        </div>
        <button className="mt-[50px] whitespace-nowrap rounded-xl  bg-purple-600 py-5 px-8 text-center text-lg font-medium leading-5 tracking-tight text-white ">
          Get your Code
        </button>
        <div className="relative mt-[30px]">
          <div className="overflow-hidden rounded-[8px] bg-[#333333] p-[15px] pb-[57px] font-robotomono text-xs font-light not-italic leading-4 text-white">
            <CodeBlock
              codeString={`<script type="text/javascript" src="https://popup-creator.vercel.app/bundle.js"></script><script> window.start.init(${JSON.stringify(
                formValues,
                undefined,
                2
              )})</script>`}
            />
          </div>
          <button
            className=" absolute bottom-[10px] right-[10px] mt-[50px]  whitespace-nowrap rounded-xl bg-purple-600 py-[4px] px-[15px] text-center text-sm font-medium leading-5 tracking-tight text-white drop-shadow-md hover:drop-shadow-xl active:bg-purple-500"
            type="submit"
            onClick={copyScript}
          >
            Get your Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeSectionSetting;
