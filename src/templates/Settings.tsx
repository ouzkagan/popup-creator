import CodeBlock from '@/components/CodeBlock';
import MultiSelect from '@/components/MultiSelect';
import { useDispatch, useSelector } from 'react-redux';
// form
import {
  initialState as initialGeneralSettings,
  PopupPositions,
  selectForm,
  UPDATE_FORM_STATE,
} from '@/store/features/default.slice';
import arrayMutators from 'final-form-arrays';
import { Field, Form, FormSpy } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

// types
import { RootState } from '@/store';
import type { settingsFormState } from '@/store/features/default.slice';
//
import FileInput from '@/components/FileInput';
import TextInput from '@/components/TextInput';
import ToggleInput from '@/components/toggleInput';
import axios, { AxiosError } from 'axios';
import { languages } from 'countries-list';
import { setIn } from 'final-form';
import { FileWithPath } from 'react-dropzone';

const FormStateToRedux = ({ form }) => {
  const dispatch = useDispatch();
  const updateForm = (form, state) => {
    // console.log(form, state);
    dispatch(UPDATE_FORM_STATE({ form, state }));
  };

  return (
    <FormSpy
      onChange={(state) => {
        return updateForm(form, state);
      }}
    />
  );
};

// const FormStateFromRedux = ({ form }) => {
//   const formValue = useSelector((state) => selectForm(state, form));
//   return <pre>{JSON.stringify(formValue.values, 0, 2)}</pre>;
// };

const possiblePositions: PopupPositions[] = [
  'TOP_LEFT',
  'TOP_CENTER',
  'TOP_RIGHT',
  'CENTER_LEFT',
  'CENTER_CENTER',
  'CENTER_RIGHT',
  'BOTTOM_LEFT',
  'BOTTOM_CENTER',
  'BOTTOM_RIGHT',
];
// interface FormValues {
//   firstName?: string;
//   lastName?: string;
//   employed: boolean;
//   favoriteColor?: string;
//   toppings?: string[];
//   sauces?: string[];
//   stooge: Stooge;
//   notes?: string;
// }

const Settings = (): JSX.Element => {
  const selected_template_id = useSelector(
    (state: RootState) => state.defaultForm.template_id
  );
  const formValues =
    useSelector(
      (state: RootState) => selectForm(state, 'defaultForm').values
    ) || initialGeneralSettings;
  const dispatch = useDispatch();
  const updateForm = (form: string, state: settingsFormState) => {
    console.log(form, state);
    dispatch(UPDATE_FORM_STATE({ form, state }));
  };
  // console.log('formvalues', formValues);

  // const initialGeneralSettings = useSelector(
  //   (state: AppState) => state.defaultForm
  // );

  const popupTemplates = useSelector(
    (state: RootState) => state.popupTemplates.popups
  );

  const get_content = (id: string, type: string) => {
    // console.log(popupInputs.filter((popup) => popup.id === id)[0].template);
    return popupTemplates
      .filter((popup) => popup.template_id === id)[0]
      .content?.filter((c) => c.type === type);
  };

  // protect form fields on template change
  const restOfFormValues = (_formValues: settingsFormState) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { template_id, content, ...rest } = _formValues;
    // console.log(rest);
    return rest;
  };
  const asAString = (_formValues: settingsFormState) => {
    const processedValues = { ..._formValues };
    processedValues.content.concat(processedValues?.images);
    delete processedValues?.images;

    const stringValues = JSON.stringify(processedValues);
    const valueToCopy = `<script type="text/javascript" src="https://popupsmart.com/freechat.js"></script><script> window.start.init(${stringValues})</script>`;
    return valueToCopy;
  };
  const onSubmit = async (values: settingsFormState) => {
    console.log(values);
    const valueToCopy = asAString(values);
    navigator.clipboard.writeText(valueToCopy);
  };
  const uploadFile = async (file: File) => {
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

      // set the state of loading to 0 if there is an error
      // setLoading(0);
    }
  };

  return (
    <div className="w-[378px] mt-24">
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
          },
          setImage: async ([field, value], state, { changeValue }) => {
            await uploadFile(value).then((image) => {
              changeValue(state, field, () => image);
              const newValues = setIn(
                state.lastFormState?.values,
                field,
                image
              );
              const newState = { ...state.lastFormState, values: newValues };
              updateForm('defaultForm', newState);
              return image;
            });
            return 1;
          },
        }}
        initialValues={{
          template_id: selected_template_id,
          content: [...get_content(selected_template_id, 'text')],
          images: [...get_content(selected_template_id, 'image')],
          ...restOfFormValues(formValues),
        }}
        // initialValuesEqual={deepEqual}
        initialValuesEqual={(a, b) => a.template_id == b.template_id}
        subscription={{ submitting: true, pristine: true }}
        render={({ handleSubmit, pristine, form, submitting, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FormStateToRedux form="defaultForm" />

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
                  <span className="font-normal">(Size, colors, logo)</span>
                </div>
              </div>
              <div className="mt-8">
                <span className="font-normal text-sm leading-4">Size</span>
                <ul className="mt-4 flex items-center bg-[#F5F5F5] rounded-xl max-w-min h-12 p-1">
                  {['SMALL', 'MEDIUM', 'LARGE'].map((sizeType) => {
                    return (
                      <li
                        key={sizeType}
                        className={` px-[20px] py-[12px] flex justify-center items-center text-sm leading-4 text-center text-black rounded-[10px] cursor-pointer
                        ${
                          formValues?.['size'] === sizeType
                            ? 'bg-white'
                            : 'text-[#777777]'
                        }
                        `}
                        // onClick={() => setCurrentPage(index + 1)}
                        onClick={() => form.mutators.setValue('size', sizeType)}
                      >
                        {sizeType}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-8">
                <span className="font-normal text-sm leading-4">Position</span>
                <ul className="mt-4  grid grid-cols-3 box-border w-[82px] h-[55px]">
                  {Array.from(Array(9).keys()).map((positionType, index) => {
                    return (
                      <li
                        key={positionType}
                        className={`w-[24px] h-[15px] text-black border border-solid border-[#DDDDDD] cursor-pointer
                        ${
                          possiblePositions[index] === formValues.position &&
                          'bg-[#7D4AEA] border-[#7D4AEA]'
                        }
                        ${index == 0 && 'rounded-tl'}
                        ${index == 2 && 'rounded-tr'}
                        ${index == 6 && 'rounded-bl'}
                        ${index == 8 && 'rounded-br'}
                        `}
                        onClick={() =>
                          form.mutators.setValue(
                            'position',
                            possiblePositions[index]
                          )
                        }
                      ></li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-8">
                <span className="font-normal text-sm leading-4">Colors</span>
                <ul className="mt-4 flex gap-2.5 items-center rounded-xl max-w-min p-[3px]">
                  {/* https://stackoverflow.com/questions/72481680/tailwinds-background-color-is-not-being-applied-when-added-dynamically */}
                  {['#000000', '#F37C34', '#777777', '#DDDDDD', '#FFFFFF'].map(
                    (colorType) => {
                      return (
                        <li
                          key={`color-${colorType}`}
                          className={`w-[42px] h-[42px] text-white rounded-[10px] border border-solid  border-[#000000]/3 cursor-pointer `}
                          style={{ backgroundColor: `${colorType}` }}
                          onClick={() =>
                            form.mutators.setValue('color', colorType)
                          }
                          // onClick={() => setCurrentPage(index + 1)}
                        ></li>
                      );
                    }
                  )}
                </ul>
              </div>
              <div className="mt-8">
                <span className="font-normal text-sm leading-4">
                  Upload Logo
                </span>
                <Field
                  parse={(x) => x}
                  name={`logo`}
                  // defaultValue=""
                  component={FileInput}
                  // className="rounded-xl border border-solid text-base leading-6  w-full h-[48px]  pl-3 focus:outline-[#7D4AEA] text-black"
                  // placeholder="Enter your own text"
                  // allowNull={true}
                  // onchange setValue((values)=> UploadImage(values.files[0]))? ??
                  // onChange={(files) => console.log('"files', files)}
                  getFiles={(files: FileWithPath[]) =>
                    form.mutators.setImage(`logo`, files[0])
                  }
                  // className=""
                  // defaultValue={''}
                />
                <Field
                  name={`logo`}
                  subscribe={{ touched: true, error: true }}
                  render={({ meta: { touched, error } }) =>
                    touched && error ? <span>{error}</span> : null
                  }
                />
                <div className="border border-[#DDDDDD] border-dashed border-color py-8 flex justify-center items-center flex-col gap-5 mt-4">
                  <div className="w-20 h-20 rounded-xl bg-opacity-10 bg-[#7D4AEA] flex justify-center items-center">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_79_9814)">
                        <path
                          d="M28.5 7.5V28.5H7.5V7.5H28.5ZM28.5 4.5H7.5C5.85 4.5 4.5 5.85 4.5 7.5V28.5C4.5 30.15 5.85 31.5 7.5 31.5H28.5C30.15 31.5 31.5 30.15 31.5 28.5V7.5C31.5 5.85 30.15 4.5 28.5 4.5ZM21.21 17.79L16.71 23.595L13.5 19.71L9 25.5H27L21.21 17.79Z"
                          fill="#7D4AEA"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_79_9814">
                          <rect width="36" height="36" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div>
                    <span className="font-[400] text-sm leading-4 text-black whitespace-nowrap flex justify-center items-center gap-[5px]">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_79_9810)">
                          <path
                            d="M14.5125 7.53C14.0025 4.9425 11.73 3 9 3C6.8325 3 4.95 4.23 4.0125 6.03C1.755 6.27 0 8.1825 0 10.5C0 12.9825 2.0175 15 4.5 15H14.25C16.32 15 18 13.32 18 11.25C18 9.27 16.4625 7.665 14.5125 7.53ZM14.25 13.5H4.5C2.8425 13.5 1.5 12.1575 1.5 10.5C1.5 8.9625 2.6475 7.68 4.17 7.5225L4.9725 7.44L5.3475 6.7275C6.06 5.355 7.455 4.5 9 4.5C10.965 4.5 12.66 5.895 13.0425 7.8225L13.2675 8.9475L14.415 9.03C15.585 9.105 16.5 10.0875 16.5 11.25C16.5 12.4875 15.4875 13.5 14.25 13.5ZM6 9.75H7.9125V12H10.0875V9.75H12L9 6.75L6 9.75Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_79_9810">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <a href="#">
                        {' '}
                        Drop your image here or{' '}
                        <span className="underline text-[#7D4AEA]">upload</span>
                      </a>
                    </span>
                  </div>
                </div>
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
                    Upload Images
                  </span>
                  <FieldArray name="images">
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
                              component={FileInput}
                              // className="rounded-xl border border-solid text-base leading-6  w-full h-[48px]  pl-3 focus:outline-[#7D4AEA] text-black"
                              // placeholder="Enter your own text"
                              // allowNull={true}
                              // onchange setValue((values)=> UploadImage(values.files[0]))? ??
                              // onChange={(files) => console.log('"files', files)}
                              getFiles={(files: FileWithPath[]) =>
                                form.mutators.setImage(
                                  `${name}.value`,
                                  files[0]
                                )
                              }
                              // className=""
                              // defaultValue={''}
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
                  {/* <div className="border border-[#DDDDDD] border-dashed border-color py-8 flex justify-center items-center flex-col gap-5 mt-4">
                    <div className="w-20 h-20 rounded-xl bg-opacity-10 bg-[#7D4AEA] flex justify-center items-center">
                      <Image
                        src="/assets/placeholder-image.png"
                        width={72}
                        height={80}
                        alt="placeholder"
                      />
                    </div>
                    <div>
                      <span className="font-[400] text-sm leading-4 text-black whitespace-nowrap flex justify-center items-center gap-[5px]">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_79_9810)">
                            <path
                              d="M14.5125 7.53C14.0025 4.9425 11.73 3 9 3C6.8325 3 4.95 4.23 4.0125 6.03C1.755 6.27 0 8.1825 0 10.5C0 12.9825 2.0175 15 4.5 15H14.25C16.32 15 18 13.32 18 11.25C18 9.27 16.4625 7.665 14.5125 7.53ZM14.25 13.5H4.5C2.8425 13.5 1.5 12.1575 1.5 10.5C1.5 8.9625 2.6475 7.68 4.17 7.5225L4.9725 7.44L5.3475 6.7275C6.06 5.355 7.455 4.5 9 4.5C10.965 4.5 12.66 5.895 13.0425 7.8225L13.2675 8.9475L14.415 9.03C15.585 9.105 16.5 10.0875 16.5 11.25C16.5 12.4875 15.4875 13.5 14.25 13.5ZM6 9.75H7.9125V12H10.0875V9.75H12L9 6.75L6 9.75Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_79_9810">
                              <rect width="18" height="18" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>

                        <a href="#">
                          {' '}
                          Drop your image here or{' '}
                          <span className="underline text-[#7D4AEA]">
                            upload
                          </span>
                        </a>
                      </span>
                    </div>
                  </div> */}
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
                <div className="flex justify-between ">
                  <div className="flex ">
                    <span>Visitor Device</span>
                  </div>
                  <div>
                    <Field
                      name="inputStatus.visitorDevice"
                      type="checkbox"
                      component={ToggleInput}
                      // checked={!formValues.inputStatus.visitorDevice}
                      defaultValue={true}
                    />
                  </div>
                </div>
                <div className="mt-5 flex gap-5 h-12 w-full">
                  <div className="flex items-center gap-[4px] bg-[#F5F5F5] rounded-xl grow">
                    <input
                      name="visitorDevice"
                      // component="input"
                      type="checkbox"
                      value="DESKTOP"
                      checked={formValues.visitorDevice.includes('DESKTOP')}
                      className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 ml-[15px] mr-[6px]"
                      disabled={!formValues.inputStatus.visitorDevice}
                      onChange={() => {
                        if (formValues.visitorDevice !== 'DESKTOP') {
                          form.mutators.setValue('visitorDevice', 'DESKTOP');
                        } else {
                          form.mutators.setValue('visitorDevice', 'MOBILE');
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
                        fill={
                          formValues.visitorDevice.includes('DESKTOP')
                            ? '#7D4AEA'
                            : '#999999'
                        }
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
                      checked={formValues.visitorDevice.includes('MOBILE')}
                      className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 ml-[15px] mr-[6px] rounded-none"
                      disabled={!formValues.inputStatus.visitorDevice}
                      onChange={() => {
                        if (formValues.visitorDevice !== 'MOBILE') {
                          form.mutators.setValue('visitorDevice', 'MOBILE');
                        } else {
                          form.mutators.setValue('visitorDevice', 'DESKTOP');
                        }
                      }}
                    />{' '}
                    {/* <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-[18px] h-[18px] border-blue-500 checked:bg-blue-500 ml-[15px] mr-[6px]"
                    /> */}
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
                        fill={
                          formValues.visitorDevice.includes('MOBILE')
                            ? '#7D4AEA'
                            : '#999999'
                        }
                      />
                    </svg>
                    Mobile
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between ">
                    <div className="flex ">
                      <span>After X Seconds</span>
                    </div>
                    <div>
                      <Field
                        name="inputStatus.afterXSeconds"
                        type="checkbox"
                        component={ToggleInput}
                        // checked={!formValues.inputStatus.visitorDevice}
                        defaultValue={true}
                      />
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <Field
                      parse={(x) => x}
                      name="afterXSeconds"
                      component={TextInput}
                      className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                      placeholder="12"
                      disabled={!formValues.inputStatus.afterXSeconds}
                    />
                    {/* <input
                      type="text"
                      className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                      name=""
                      id=""
                      defaultValue="12"
                    /> */}
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between ">
                    <div className="flex ">
                      <span>After % Scroll</span>
                    </div>
                    <div>
                      <Field
                        name="inputStatus.afterScrollingXAmount"
                        type="checkbox"
                        component={ToggleInput}
                        // checked={!formValues.inputStatus.visitorDevice}
                        defaultValue={true}
                      />
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <Field
                      parse={(x) => x}
                      name="afterScrollingXAmount"
                      component={TextInput}
                      className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                      placeholder="50"
                      disabled={!formValues.inputStatus.afterScrollingXAmount}
                      // % eklenebilir
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between ">
                    <div className="flex ">
                      <span>Traffic Source</span>
                    </div>
                    <div>
                      <Field
                        name="inputStatus.urlBrowsing"
                        type="checkbox"
                        component={ToggleInput}
                        // checked={!formValues.inputStatus.visitorDevice}
                        defaultValue={true}
                      />
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    {/* <input
                      type="text"
                      className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                      name=""
                      id=""
                      placeholder="Enter your traffic source domain"
                    /> */}
                    <Field
                      parse={(x) => x}
                      name="urlBrowsing"
                      component={TextInput}
                      className="rounded-xl border border-solid text-base leading-6 text-gray-600 w-full h-[48px]  pl-3 focus:outline-[#7D4AEA]"
                      placeholder="Enter your traffic source domain"
                      allowNull={true}
                      disabled={!formValues.inputStatus.urlBrowsing}
                      // % eklenebilir
                    />
                  </div>
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
                        // ...[
                        //   { id: '1', code: 'tr', value: 'Turkish' },
                        //   { id: '3', code: 'en-EN', value: 'English' },
                        //   { id: '4', code: 'fr', value: 'French' },
                        //   { id: '5', code: 'gr', value: 'German' },
                        //   { id: '132', code: 'pl', value: 'Polish' },
                        //   { id: '6', code: 'sp', value: 'Spanish' },
                        //   { id: '1551', code: 'dt', value: 'Dutch' },
                        //   { id: '15516', code: 'fn', value: 'Finnish' },
                        //   { id: '7', code: 'bg', value: 'Bulgarian' },
                        //   { id: '8', code: 'gr', value: 'Greek' },
                        //   { id: '10', code: 'gr', value: 'Greek' },
                        //   { id: '9', code: 'gr', value: 'Greek' },
                        // ],
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
                      allowNull={true}
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

              {/* <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div> */}
              {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
              {/* <pre>{JSON.stringify(formValues, 0, 2)}</pre> */}
              {/* <FormStateFromRedux form="defaultForm" /> */}
            </form>
          );
        }}
      />
    </div>
  );
};

export default Settings;
