import * as Yup from 'yup'

const profileSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Email address is invalid'),
  password: Yup.string().min(6, 'Your password needs to be at least 6 characters.').required('Password is required'),
  image: Yup.string().url('Must be the correct url'),
})
export default profileSchema
