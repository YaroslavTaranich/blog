import * as Yup from 'yup'

const singIpSchema = Yup.object()
  .shape({
    username: Yup.string()
      .min(3, 'Username must be more then 3 simbols')
      .max(20, 'Username must be less then 20 characters.')
      .required('Username is reqrequired'),
    email: Yup.string().email('Email address is invalid').required('Email address is required'),
    password: Yup.string()
      .min(6, 'Your password needs to be at least 6 characters.')
      .max(40, 'Your password needs to be less then 40 characters.')
      .required('Password is required'),
    repeat_password: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords does not match')
      .required('Repeat password is required'),
    policy: Yup.boolean().oneOf([true], 'Agreement is required'),
  })
  .required()

export default singIpSchema
