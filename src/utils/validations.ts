import { formStateInterface } from '@/store/features/settings.slice';
import { ValidationErrors } from 'final-form';
import { get, set } from 'lodash';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  afterXSeconds: Yup.string().required(`This field is required.`),
  afterScrollingXAmount: Yup.string()
    .test('Max', 'Maximum is 100.', (value) => {
      return Number(value) < 100;
    })
    .required(`This field is required.`),
  logo: Yup.string()
    .test('filePresence', 'Please upload your logo', (value) => {
      return value !== '';
    })
    .required(`This field is required.`),
  visitorDevice: Yup.string().required(`This field is required.`),
  browserLanguage: Yup.array()
    .of(Yup.string())
    .required(`This field is required.`)
    .test('length', 'You have to enter at least one langauge.', (value) => {
      return (value && value?.length > 0) || false;
    }),
  onExitIntent: Yup.string().required(`This field is required.`),
  webHookTypes: Yup.array()
    .of(Yup.string())
    .required(`This field is required.`),
  urlBrowsing: Yup.string()
    .required(`This field is required.`)
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Please enter a valid URL.'
    ),
  webHookUrl: Yup.string()
    .required(`This field is required.`)
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Please enter a valid URL.!'
    ),
  content: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required('This field is required.'),
    })
  ),
});

export const validate = (values: formStateInterface): ValidationErrors => {
  let errors: { [value: string]: string } = {};
  try {
    validationSchema.validateSync(values, {
      abortEarly: false,
    });
  } catch (error: unknown) {
    if (error instanceof Yup.ValidationError) {
      errors = { ...convertYupErrorsToFieldErrors(error) };
    }
  }

  return errors;
};

function convertYupErrorsToFieldErrors(yupErrors: Yup.ValidationError) {
  return yupErrors.inner?.reduce((errors, { path, message }) => {
    if (get(errors, path as string)) {
      set(errors, path as string, get(errors, path as string) + ' ' + message);
    } else {
      set(errors, path as string, message);
    }
    return errors;
  }, {});
}
