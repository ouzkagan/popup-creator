import { formStateInterface } from '@/store/features/settings.slice';
import { Field } from 'react-final-form';
import CodeBlock from '../CodeBlock';
import TextInput from '../TextInput';
interface Props {
  formValues: formStateInterface;
}
function CodeSectionSetting({ formValues }: Props) {
  return (
    <div className="mt-24">
      <div className="flex gap-[15px] items-center mb-8">
        <span className="font-semibold text-base leading-6 text-center text-black tracking-half-tighter w-10 h-10  rounded-full bg-gray-300	flex justify-center items-center">
          5
        </span>
        <div className="font-semibold text-lg leading-9 text-black tracking-half-tighter ">
          Settings and Code
        </div>
      </div>
      <div className="mt-[30px]">
        <h4 className="font-semibold text-lg leading-9 text-black tracking-half-tighter">
          Webhook to Send data
        </h4>
        <div className="font-normal text-sm leading-4 mt-4">
          Enter youe Webhook URL
        </div>
        <div className="text-xs mt-[5px]">
          You can create a simple one with make.com
        </div>
        <div className="w-full mt-4">
          {/* <input
                      type="text"
                      className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3"
                      name=""
                      id=""
                      placeholder="Enter your webhook URL"
                    /> */}
          <Field
            parse={(x) => x}
            name="webHookUrl"
            component={TextInput}
            className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
            placeholder="Enter your webhook URL"
            // allowNull={true}
            // % eklenebilir
          />
        </div>
        <div className="flex gap-[4px] grow mt-[15px]">
          {/* <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500  mr-[6px]"
                    /> */}
          <Field<string>
            name="webHookTypes"
            component="input"
            type="checkbox"
            value="FORM"
            className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500  mr-[6px]"
          />{' '}
          Send form submissions
        </div>
        <div className="flex gap-[4px] grow mt-[15px]">
          <Field<string>
            name="webHookTypes"
            component="input"
            type="checkbox"
            value="CLICK"
            className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500  mr-[6px]"
          />{' '}
          Send click data
        </div>
        <button className="rounded-xl bg-purple-600 whitespace-nowrap  font-medium text-lg leading-5 text-center text-white tracking-tight mt-[50px] py-5 px-8 ">
          Get your Code
        </button>
        <div className="relative mt-[30px]">
          {/* <div className="rounded-[8px] bg-[#333333] not-italic font-light text-xs leading-4 text-white font-robotomono p-[15px] pb-[57px]">
                      <CodeBlock
                        codeString={
                          '<script type="text/javascript" src="https://popupsmart.com/freechat.js"></script><script> window.start.init({ title: "Hi there :v:", message: "How may we help you? Just send us a message now to get assistance.", color: "#FA764F", position: "right", placeholder: "Enter your message", withText: "Write with", viaWhatsapp: "Or write us directly via Whatsapp", gty: "Go to your", awu: "and write us", connect: "Connect now", button: "Write us", device: "everywhere", services: [{"name":"whatsapp","content":null}]})</script>'
                        }
                      />
                    </div> */}
          <div className="rounded-[8px] bg-[#333333] not-italic font-light text-xs leading-4 text-white font-robotomono p-[15px] pb-[57px] overflow-hidden">
            <CodeBlock
              codeString={`<script type="text/javascript" src="https://!.com/bundle.js"></script><script> window.start.init(${JSON.stringify(
                formValues,
                undefined,
                2
              )})</script>`}
            />
          </div>
          <button
            className=" absolute rounded-xl bg-purple-600 whitespace-nowrap  font-medium text-sm leading-5 text-center text-white tracking-tight mt-[50px] py-[4px] px-[15px] bottom-[10px] right-[10px] drop-shadow-md hover:drop-shadow-xl"
            type="submit"
          >
            Get your Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeSectionSetting;
