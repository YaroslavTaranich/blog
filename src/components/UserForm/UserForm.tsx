import React, { ReactElement, useEffect } from 'react'
import { useForm, DeepPartial, Path } from 'react-hook-form'

interface UserFormProps<T> {
  onSubmit: (data: T) => void
  children: (ReactElement | null)[]
  className: string
  resolver: any
  defaultValues?: DeepPartial<T>
  serverErrors?: IServerErrors<T>[]
}

export interface IServerErrors<T> {
  name: Path<T>
  option: {
    type: 'server'
    message: string
  }
}

const UserForm = <T extends Record<string, unknown>>({
  children,
  onSubmit,
  className,
  resolver,
  defaultValues,
  serverErrors,
  ...rest
}: UserFormProps<T>): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<T>({ defaultValues, resolver })

  function serverErrorsHandler(e: IServerErrors<T>[] | undefined) {
    if (e) e.map((error) => setError(error.name, error.option))
  }

  useEffect(() => {
    serverErrorsHandler(serverErrors)
  }, [serverErrors])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} {...rest}>
      {React.Children.map(children, (child) => {
        if (child && child.props.name)
          return React.createElement(child.type, {
            ...{
              ...child.props,
              register,
              key: child.props.name,
              error: errors[child.props.name],
            },
          })
        return child
      })}
    </form>
  )
}

UserForm.defaultProps = {
  defaultValues: undefined,
  serverErrors: undefined,
}

export default UserForm
