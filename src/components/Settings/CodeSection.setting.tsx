import {
  formStateInterface,
  inputStatusInterface,
} from '@/store/features/settings.slice';
import { asAString } from '@/utils/helpers';
import { validate } from '@/utils/validations';
import { ValidationErrors } from 'final-form';
import { useState } from 'react';
import { Field } from 'react-final-form';
import CodeBlock from '../CodeBlock';
import TextInput from '../TextInput';
interface Props {
  formValues: formStateInterface;
  // submitSuccess: boolean | null;
  // customSubmit: () => void;
  // errors: { [key: string]: string } | undefined;
}

function CodeSectionSetting({
  formValues,
}: // submitSuccess,
// customSubmit,
// errors: filteredErrors,
Props) {
  const [copying, setCopying] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [filteredErrors, setFilteredErrors] = useState<ValidationErrors>({});
  // to copy the script
  const copyScript = () => {
    const valueToCopy = asAString(formValues);
    navigator.clipboard.writeText(valueToCopy);
    setCopying(true);
    setTimeout(() => {
      setCopying(false);
    }, 2500);
  };
  // calculate filtered errors from Toggled fields
  const customSubmit = () => {
    const values = { ...formValues };
    const errors = validate(values);

    let realErrors: ValidationErrors = {};
    if (errors != undefined) {
      realErrors = {
        ...Object.keys(errors)
          .filter((key) => {
            if (key in formValues.inputStatus) {
              return formValues?.inputStatus[key as keyof inputStatusInterface];
            }
            return true;
          })
          .reduce((cur, key) => {
            return Object.assign(cur, { [key]: errors[key] });
          }, {}),
      };
    }
    setFilteredErrors(realErrors);
    if (Object.keys(realErrors).length <= 0) {
      setSubmitSuccess(true);
      return;
    }
    setSubmitSuccess(false);
    return;
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
        <button
          type="submit"
          // disabled={submitting}
          className="mt-[50px] whitespace-nowrap rounded-xl  bg-purple-600 py-5 px-8 text-center text-lg font-medium leading-5 tracking-tight text-white "
          onClick={customSubmit}
        >
          Get your Code
        </button>
        {submitSuccess === false &&
          Object.keys(filteredErrors as Record<string, unknown>).length > 0 && (
            <div className="p-3 bg-slate-200/50 mt-3">
              Please fill these fields correctly or disable them:
              {filteredErrors &&
                Object.keys(filteredErrors).map((key, index) => {
                  return (
                    <div
                      className="text-red-400"
                      key={'key' + index.toString()}
                    >
                      {key} : {filteredErrors[key]}
                    </div>
                  );
                })}
            </div>
          )}
        {submitSuccess && (
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
              className=" absolute bottom-[10px] right-[10px] mt-[50px] min-w-[122px] whitespace-nowrap rounded-xl bg-purple-600 py-[4px] px-[15px] text-center text-sm font-medium leading-5 tracking-tight text-white drop-shadow-md hover:drop-shadow-xl active:bg-purple-500"
              type="submit"
              onClick={copyScript}
            >
              {copying ? 'Copied!' : 'Get your Code'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeSectionSetting;
