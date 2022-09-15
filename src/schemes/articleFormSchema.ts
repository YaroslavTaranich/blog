import * as Yup from 'yup'

const articleFormSchema = Yup.object()
  .shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Short description is required'),
    body: Yup.string().required('Text is required'),
    tagList: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().min(1).required(),
      })
    ),
  })
  .required()

export default articleFormSchema
