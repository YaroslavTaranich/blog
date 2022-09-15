import * as Yup from 'yup'

const singUpSchema = Yup.object()
  .shape({
    email: Yup.string().email('Email address is invalid').required('Email address is required'),
    password: Yup.string().required('Password is required'),
  })
  .required()

export default singUpSchema
