import { FC } from 'react'
import { FieldError, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import Input from '../UI/Input/Input'
import Textarea from '../UI/textarea/textarea'
import Button from '../UI/button/button'
import { IArticleFormData, IArticlePostData } from '../../models/articles'

import styles from './articleForm.module.css'

interface ArticleFormProps {
  defaultValues: IArticleFormData
  onSubmit: (data: IArticleFormData) => void
  title: string
}

export const formatDataToPost = (data: IArticleFormData): IArticlePostData => ({
  title: data.title,
  description: data.description,
  body: data.body,
  tagList: data.tagList.map((tag) => tag.value),
})

export const formatFetchedToData = (data: IArticlePostData): IArticleFormData => ({
  title: data.title,
  description: data.description,
  body: data.body,
  tagList: data.tagList.map((tag) => ({
    value: tag,
  })),
})

const singUpSchema = Yup.object()
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

const resolver = yupResolver(singUpSchema)

const ArticleForm: FC<ArticleFormProps> = ({ title, defaultValues, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IArticleFormData>({ resolver, defaultValues })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.form_title}>{title}</h1>
        <Input<IArticleFormData>
          name="title"
          label="Title"
          placeholder="Title"
          error={errors.title}
          register={register}
        />
        <Input<IArticleFormData>
          name="description"
          label="Short description"
          placeholder="Short description"
          error={errors.description}
          register={register}
        />
        <Textarea<IArticleFormData>
          name="body"
          label="Text"
          placeholder="Short description"
          error={errors.body}
          register={register}
        />

        <fieldset className={styles.tagList}>
          <legend>Tags</legend>
          <div className={styles.tag_inputs}>
            <div>
              {fields.map((field, i) => {
                const error: FieldError | undefined =
                  errors.tagList && errors.tagList[i] ? { type: 'no value' } : undefined
                return (
                  <div className={styles.row} key={field.id}>
                    <Input<IArticleFormData>
                      name={`tagList.${i}.value`}
                      register={register}
                      placeholder="Tag"
                      error={error}
                    />
                    <Button type="danger" onClick={() => remove(i)}>
                      Delete
                    </Button>
                  </div>
                )
              })}
            </div>
            <Button type="outline" onClick={() => append({ value: '' })}>
              Add tag
            </Button>
          </div>
        </fieldset>
        <Button submit>Send</Button>
      </form>
    </section>
  )
}

export default ArticleForm
