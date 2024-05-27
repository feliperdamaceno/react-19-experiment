import z from 'zod'

import { useActionState } from 'react'
import { SubmitButton } from '@/components'
import { wait } from '@/utils'

const schema = z.object({
  firstName: z.string().max(100),
  lastName: z.string().max(100),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password is too short' })
    .max(20, { message: 'Password is too long' })
})

type Fields = z.infer<typeof schema>

interface FormState {
  success: boolean
  errors: Partial<Record<keyof Fields, string>> | undefined
  fields: Fields
}

async function registerFormAction(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const data = Object.fromEntries(formData)
  const validation = schema.safeParse(data)

  await wait(2000)
  console.log(validation.data)

  if (!validation.success) {
    const errorMap = validation.error.flatten().fieldErrors
    return {
      ...state,
      success: validation.success,
      errors: {
        firstName: errorMap.firstName?.[0],
        lastName: errorMap.lastName?.[0],
        email: errorMap.email?.[0],
        password: errorMap.password?.[0]
      }
    }
  }

  return {
    ...state,
    success: validation.success,
    errors: undefined,
    fields: validation.data
  }
}

const initialState: FormState = {
  success: false,
  errors: undefined,
  fields: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
}

export default function RegisterForm() {
  const [state, action, isPending] = useActionState(
    registerFormAction,
    initialState
  )

  return (
    <form
      action={action}
      className="flex flex-col w-full max-w-lg gap-8 p-8 mx-auto border rounded-sm shadow-sm"
    >
      <h2 className="text-2xl font-semibold">Create an account</h2>

      <div className="space-y-4">
        <label className="flex flex-col gap-2">
          <span className="font-medium">First Name</span>
          <input
            className="px-2 py-1 border rounded-sm"
            type="text"
            name="firstName"
            defaultValue={state.fields.firstName}
            required
          />
          {state.errors?.firstName ? (
            <span className="text-red-500">{state.errors.firstName}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-medium">Last Name</span>
          <input
            className="px-2 py-1 border rounded-sm"
            type="text"
            name="lastName"
            defaultValue={state.fields.lastName}
            required
          />
          {state.errors?.lastName ? (
            <span className="text-red-500">{state.errors.lastName}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-medium">Email</span>
          <input
            className="px-2 py-1 border rounded-sm"
            type="email"
            name="email"
            defaultValue={state.fields.email}
            required
          />
          {state.errors?.email ? (
            <span className="text-red-500">{state.errors.email}</span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-medium">Password</span>
          <input
            className="px-2 py-1 border rounded-sm"
            type="password"
            name="password"
            defaultValue={state.fields.password}
            required
          />
          {state.errors?.password ? (
            <span className="text-red-500">{state.errors.password}</span>
          ) : null}
        </label>
      </div>

      {isPending ? <div>Loading...</div> : null}

      <SubmitButton>Register</SubmitButton>
    </form>
  )
}
