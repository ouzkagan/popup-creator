// form
import FileInput from '@/components/FileInput';
import MultiSelect from '@/components/MultiSelect';
import TextInput from '@/components/TextInput';
import ToggleInput from '@/components/ToggleInput';
import { languages } from 'countries-list';
import { FormState, setIn, ValidationErrors } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { FileWithPath } from 'react-dropzone';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import * as Yup from 'yup';
// state
import FormStateToRedux from '@/components/FormStateToRedux';
import { AppState, RootState } from '@/store';
import {
  formStateInterface,
  initialState as initialGeneralSettings,
  selectForm,
  UPDATE_FORM_STATE,
} from '@/store/features/settings.slice';
import { useDispatch, useSelector } from 'react-redux';

// setting components
import CodeSectionSetting from '@/components/Settings/CodeSection.setting';
import ColorSetting from '@/components/Settings/Color.setting';
import DeviceSetting from '@/components/Settings/Device.setting';
import GeneralSetting from '@/components/Settings/General.setting';
import PositionSetting from '@/components/Settings/Position.setting';
import SizeSetting from '@/components/Settings/Size.setting';
// UTILS
import { asAString, getContent, restOfFormValues } from '@/utils/helpers';
import axios, { AxiosError } from 'axios';

// const FormStateFromRedux = ({ form }) => {
//   const formValue = useSelector((state) => selectForm(state, form));
//   return <pre>{JSON.stringify(formValue.values, 0, 2)}</pre>;
// };

const Settings = (): JSX.Element => {
  // redux selectors and functions
  const selected_template_id = useSelector(
    (state: AppState) => state.settings.template_id
  );
  const formValues =
    useSelector(
      (state: RootState) =>
        (selectForm(state, 'settingsForm') as FormState<formStateInterface>)
          ?.values
    ) || initialGeneralSettings;
  const dispatch = useDispatch();
  const updateForm = (form: string, state: FormState<formStateInterface>) => {
    // console.log(form, state);
    dispatch(UPDATE_FORM_STATE({ form, state }));
  };

  const popupTemplates = useSelector(
    (state: RootState) => state.popupTemplates.popups
  );

  // utils

  // submit
  const onSubmit = async (values: formStateInterface) => {
    const valueToCopy = asAString(values);
    navigator.clipboard.writeText(valueToCopy);
  };
  const uploadFile = async (file: FileWithPath) => {
    //here, we are creatingng a new FormData object; this lets you compile a set of key/value pairs.
    const data = new FormData();
    // we are appending a new value onto an existing key inside a FormData object. the keys here are what is required for the upload by the cloudinary endpoint. the value in line 7 is your upload preset
    data.append('upload_preset', 'ntlolkzu');
    // URL.createObjectURL(file)
    data.append('file', file);
    // return 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80';
    try {
      //making a post request to the cloudinary endpoint
      return await axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.CDN_USERNAME}/upload`,
          data
        )
        .then((response) => response.data.secure_url);
    } catch (e: unknown) {
      //logthe error if any here. you can as well display them to the users
      if (e instanceof AxiosError) {
        // Inside this block, err is known to be a ValidationError
        console.error(e);
      }
    }
  };

  const validationSchema = Yup.object().shape({
    // const validationSchema = Yup.object().shape({
    afterXSeconds: Yup.string().required(`Bu alan gerekli`),
    afterScrollingXAmount: Yup.string()
      .required(`Bu alan gerekli`)
      .max(100, 'Bu alan 100`den büyük olmamalı'),
    logo: Yup.string()
      .test('filePresence', 'Lütfen logonuzu yükleyin', (value) => {
        return value !== '';
      })
      .required(`Bu alan gerekli`),
    visitorDevice: Yup.string().required(`Bu alan gerekli`),
    browserLanguage: Yup.string()
      .required(`Bu alan gerekli`)
      .test('length', 'En az bir dil girmelisiniz', (value) => {
        return (value && value?.length > 0) || false;
      }),
    onExitIntent: Yup.string().required(`Bu alan gerekli`),
    webHookTypes: Yup.string().required(`Bu alan gerekli`),
    urlBrowsing: Yup.string().required(`Bu alan gerekli`),
    webHookUrl: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Lütfen bir URL girin!'
      )
      .required(`Bu alan gerekli`),
    content: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().required().min(1),
      })
    ),
  });

  const validate = (values: formStateInterface): ValidationErrors => {
    const errors: { [value: string]: string } = {};
    try {
      validationSchema.validateSync(values, {
        abortEarly: false,
      });
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((item) => {
          if (
            values.inputStatus[item.path as keyof typeof values.inputStatus]
          ) {
            const path = item?.path || 'unknownError';
            errors[path] = item.message;
          }
        });
      }
    }

    return errors;
  };
  return (
    <div className="w-[378px] mt-24">
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
            await uploadFile(value).then((image) => {
              changeValue(state, field, () => image);

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
              }
              return image;
            });
            return 1;
          },
        }}
        initialValues={{
          template_id: selected_template_id,
          content: [
            ...getContent(popupTemplates, selected_template_id, 'text'),
          ],
          images: [
            ...getContent(popupTemplates, selected_template_id, 'image'),
          ],
          ...restOfFormValues(formValues),
        }}
        // initialValuesEqual={deepEqual}
        initialValuesEqual={(a, b) => a?.template_id == b?.template_id}
        subscription={{ submitting: true, pristine: true }}
        render={({ handleSubmit, form }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormStateToRedux form="settingsForm" />

              <div className="buttons">
                {/* <button type="button" onClick={() => push('content', undefined)}>
                  Add Customer
                </button>
                <button type="button" onClick={() => pop('content')}>
                  Remove Customer
                </button> */}
              </div>

              <div className="flex gap-[15px] items-center mb-8">
                <span className="font-semibold text-base leading-6 text-center text-black tracking-half-tighter w-10 h-10  rounded-full bg-gray-300	flex justify-center items-center">
                  2
                </span>
                <div className="font-semibold text-lg leading-9 text-black tracking-half-tighter ">
                  Appearance
                  <span className="font-normal"> (Size, colors, logo)</span>
                </div>
              </div>
              <div className="mt-8">
                <SizeSetting
                  setValue={form.mutators.setValue}
                  size={formValues?.['size']}
                />
              </div>

              <div className="mt-8">
                <PositionSetting
                  setValue={form.mutators.setValue}
                  position={formValues?.['position']}
                />
              </div>
              <div className="mt-8">
                <ColorSetting setValue={form.mutators.setValue} />
              </div>
              <div className="mt-8">
                <span className="font-normal text-sm leading-4">
                  Upload Logo
                </span>
                <Field
                  parse={(x) => x}
                  name={`logo`}
                  component={FileInput}
                  getFiles={(files: FileWithPath[]) =>
                    form.mutators.setImage(`logo`, files[0])
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
                            // allowNull={true}
                          />
                        </div>
                      );
                    })
                  }
                </FieldArray>
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
                    parse={(x) => x}
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

              {/* <pre>{JSON.stringify(formValues, 0, 2)}</pre> */}
              {/* <FormStateFromRedux form="settingsForm" /> */}
            </form>
          );
        }}
      />
    </div>
  );
};

export default Settings;
