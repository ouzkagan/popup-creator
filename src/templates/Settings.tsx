// form
import FileInput from '@/components/FileInput';
import MultiSelect from '@/components/MultiSelect';
import TextInput from '@/components/TextInput';
import ToggleInput from '@/components/ToggleInput';
import { languages } from 'countries-list';
import { FormState, setIn } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
// state
import FormStateToRedux from '@/components/FormStateToRedux';
import { AppState, RootState } from '@/store';
import {
  formStateInterface,
  initialState as initialSettings,
  selectForm,
  UPDATE_FORM_STATE,
} from '@/store/features/settings.slice';
import { useState } from 'react';
import { useSelector } from 'react-redux';

// setting components
import CodeSectionSetting from '@/components/Settings/CodeSection.setting';
import ColorSetting from '@/components/Settings/Color.setting';
import DeviceSetting from '@/components/Settings/Device.setting';
import GeneralSetting from '@/components/Settings/General.setting';
import PositionSetting from '@/components/Settings/Position.setting';
import SizeSetting from '@/components/Settings/Size.setting';
// UTILS
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  asAString,
  getContent,
  getDefaultProperty,
  restOfFormValues,
  uploadFile,
} from '@/utils/helpers';
import { validate } from '@/utils/validations';

const Settings = (): JSX.Element => {
  const [imageLoading, setImageLoading] = useState<string[]>([]);

  // redux selectors and functions
  const selectedTemplateId = useAppSelector(
    (state: AppState) => state.settings.template_id
  );
  const formValues =
    useSelector(
      (state: RootState) =>
        (selectForm(state, 'settingsForm') as FormState<formStateInterface>)
          ?.values
    ) || initialSettings;
  const dispatch = useAppDispatch();
  const updateForm = (form: string, state: FormState<formStateInterface>) => {
    dispatch(UPDATE_FORM_STATE({ form, state }));
  };

  const popupTemplates = useSelector(
    (state: RootState) => state.popupTemplates.popups
  );

  // submit
  const onSubmit = async (values: formStateInterface) => {
    // const errors = validate(values);
    // console.log(errors);
    const valueToCopy = asAString(values);
    navigator.clipboard.writeText(valueToCopy);
  };

  return (
    <div className="w-[378px] mt-[88px]">
      <Form
        onSubmit={onSubmit}
        validate={validate}
        mutators={{
          ...arrayMutators,
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
            return 1;
          },
          setImage: async ([field, value], state, { changeValue }) => {
            setImageLoading([...imageLoading, field]);
            await uploadFile(field, value).then((image) => {
              changeValue(state, field, () => image);
              // logic to update final form fields with new fields manually. why? because changeValue didn't work in async logic.
              if (state.lastFormState?.values !== undefined) {
                const newValues = setIn(
                  state.lastFormState?.values,
                  field,
                  image
                ) as formStateInterface;
                const newState: FormState<formStateInterface> = {
                  ...state.lastFormState,
                  values: newValues,
                };
                updateForm('settingsForm', newState);
                setImageLoading([
                  ...imageLoading.filter((item) => item !== field),
                ]);
              }
              return image;
            });
            return 1;
          },
        }}
        initialValues={{
          template_id: selectedTemplateId,
          content: [...getContent(popupTemplates, selectedTemplateId, 'text')],
          images: [...getContent(popupTemplates, selectedTemplateId, 'image')],
          logo: getDefaultProperty(popupTemplates, selectedTemplateId, 'logo'),
          ...restOfFormValues(formValues),
        }}
        // initialValuesEqual={deepEqual}
        initialValuesEqual={(a, b) => a?.template_id == b?.template_id}
        // subscription={{ submitting: true, pristine: true }}
        render={({ handleSubmit, form, errors }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormStateToRedux form="settingsForm" />
              <div className="flex gap-[15px] items-center">
                <span className="font-semibold text-[18px] leading-6 text-center text-black tracking-half-tighter w-[36px] h-[36px]  rounded-full bg-[#eaeaea]	flex justify-center items-center">
                  2
                </span>
                <div className="font-semibold text-lg leading-9 text-black tracking-half-tighter  text-[18px]  text-center ">
                  Appearance
                  <span className="font-normal"> (Size, colors, logo)</span>
                </div>
              </div>
              <div className="mt-[22px]">
                <SizeSetting
                  setValue={form.mutators.setValue}
                  size={formValues?.['size']}
                />
              </div>
              <div className="mt-[22px]">
                <PositionSetting
                  setValue={form.mutators.setValue}
                  position={formValues?.['position']}
                />
              </div>
              <div className="mt-[22px]">
                <ColorSetting setValue={form.mutators.setValue} />
              </div>
              <div className="mt-[22px]">
                <span className="font-normal text-sm leading-4">
                  Upload Logo
                </span>
                <Field
                  parse={(x) => x}
                  name={`logo`}
                  component={FileInput}
                  getFiles={(files: File[]) =>
                    form.mutators.setImage(`logo`, files[0])
                  }
                  loading={imageLoading.includes(`logo`)}
                />
                <Field
                  name={`logo`}
                  subscribe={{ touched: true, error: true }}
                  render={({ meta: { touched, error } }) =>
                    touched && error ? <span>{error}</span> : null
                  }
                />
              </div>
              <div>
                <div className="flex gap-[15px] items-center mt-24 mb-8">
                  <span className="font-semibold text-base leading-6 text-center text-black tracking-half-tighter w-10 h-10  rounded-full bg-gray-300	flex justify-center items-center">
                    3
                  </span>
                  <div className="font-semibold text-lg leading-9 text-black tracking-half-tighter ">
                    Content
                  </div>
                </div>
                <span className="font-normal text-sm leading-4 ">
                  Edit your content
                </span>
                <FieldArray name="content">
                  {({ fields }) =>
                    fields.map((name) => {
                      // console.log(name,index)
                      return (
                        // field typini switch case yap. zaten ya text input ya da image belki url input olacak!!!

                        <div className="w-full mt-4" key={name}>
                          <Field
                            parse={(x) => x}
                            name={`${name}.value`}
                            // defaultValue=""
                            component={TextInput}
                            className="rounded-xl border border-solid text-base leading-6  w-full h-[48px]  pl-3 focus:outline-[#7D4AEA] text-black"
                            placeholder="Enter your own text"

                            // validate={(value) =>
                            //   value ? undefined : 'Bu alanı doldurmalısınız.'
                            // }
                          />
                        </div>
                      );
                    })
                  }
                </FieldArray>
                {formValues?.images && formValues?.images?.length > 0 && (
                  <div className="mt-8">
                    <span className="font-normal text-sm leading-4">
                      Upload Image
                    </span>
                    <FieldArray name="images">
                      {({ fields }) =>
                        fields.map((name) => {
                          return (
                            <div className="w-full mt-4" key={name}>
                              <Field
                                parse={(x) => x}
                                name={`${name}.value`}
                                component={FileInput}
                                getFiles={(files: File[]) =>
                                  form.mutators.setImage(
                                    `${name}.value`,
                                    files[0]
                                  )
                                }
                                loading={imageLoading.includes(`${name}.value`)}
                              />
                              <Field
                                name={`${name}.value`}
                                subscribe={{ touched: true, error: true }}
                                render={({ meta: { touched, error } }) =>
                                  touched && error ? <span>{error}</span> : null
                                }
                              />
                            </div>
                          );
                        })
                      }
                    </FieldArray>
                  </div>
                )}
              </div>
              <div className="mt-24">
                <div className="flex gap-[15px] items-center mb-8">
                  <span className="font-semibold text-base leading-6 text-center text-black tracking-half-tighter w-10 h-10  rounded-full bg-gray-300	flex justify-center items-center">
                    4
                  </span>
                  <div className="font-semibold text-lg leading-9 text-black tracking-half-tighter ">
                    Targeting Rules
                  </div>
                </div>
                <DeviceSetting
                  visitorDevice={formValues.visitorDevice}
                  isDisabled={!formValues.inputStatus.visitorDevice}
                  setValue={form.mutators.setValue}
                />
                <div className="mt-8">
                  <GeneralSetting
                    fieldName="afterXSeconds"
                    alias="After X Seconds"
                    isDisabled={!formValues.inputStatus.afterXSeconds}
                    parse={(x) => x}
                    placeholder="12"
                  />
                </div>
                <div className="mt-8">
                  <GeneralSetting
                    fieldName="afterScrollingXAmount"
                    alias="After % Scroll"
                    isDisabled={!formValues.inputStatus.afterScrollingXAmount}
                    parse={(x) => x + '%'}
                    allowNull={true}
                    placeholder="50"
                  />
                </div>
                <div className="mt-8">
                  <GeneralSetting
                    fieldName="urlBrowsing"
                    alias="Traffic Source"
                    isDisabled={!formValues.inputStatus.urlBrowsing}
                    placeholder="Enter your traffic source domain"
                    parse={(x) => x}
                    allowNull={true}
                  />
                </div>
                <div className="mt-[78px]">
                  <div className="flex justify-between ">
                    <div className="flex ">
                      <span className="font-semibold">Browser Language</span>
                    </div>
                    <div>
                      <Field
                        name="inputStatus.browserLanguage"
                        type="checkbox"
                        component={ToggleInput}
                        // checked={!formValues.inputStatus.visitorDevice}
                        defaultValue={true}
                      />
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <MultiSelect
                      items={[
                        ...Object.keys(languages).map((key, index) => {
                          return {
                            id: index,
                            code:
                              key +
                              '-' +
                              languages[key as keyof typeof languages]['name']
                                .slice(0, 2)
                                .toUpperCase(),
                            value:
                              languages[key as keyof typeof languages]['name'],
                          };
                        }),
                      ]}
                      placeholder="Select"
                      selectedValues={[...formValues.browserLanguage]}
                      setSelectedValues={(selectedCodes: string[]): void => {
                        // console.log(selectedCodes);
                        form.mutators.setValue('browserLanguage', [
                          ...selectedCodes,
                        ]);
                      }}
                      name="Languages"
                      defaultValue="en-EN"
                      disabled={!formValues.inputStatus.browserLanguage}
                    />
                    {errors?.browserLanguage &&
                      formValues.inputStatus.browserLanguage && (
                        <div className="text-red-500 p-2">
                          {errors?.browserLanguage}
                        </div>
                      )}
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between ">
                    <div className="flex ">
                      <span className="font-semibold">
                        Exit Intent Targeting
                      </span>
                    </div>
                    <div>
                      <Field
                        name="inputStatus.exitIntentTargeting"
                        type="checkbox"
                        component={ToggleInput}
                        // checked={!formValues.inputStatus.visitorDevice}
                        defaultValue={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <CodeSectionSetting formValues={formValues} />
            </form>
          );
        }}
      />
    </div>
  );
};

export default Settings;
