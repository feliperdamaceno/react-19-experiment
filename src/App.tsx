import { RegisterForm, Comments } from '@/components'

export default function App() {
  return (
    <main className="container grid flex-wrap flex-1 w-full gap-8 p-4 mx-auto lg:grid-cols-2 place-content-center">
      <div className="space-y-4">
        <h2 className="p-4 text-2xl font-semibold text-center">
          useActionState Example
        </h2>
        <RegisterForm />
      </div>

      <div className="space-y-4">
        <h2 className="p-4 text-2xl font-semibold text-center">
          useOptimistic Example
        </h2>
        <Comments />
      </div>
    </main>
  )
}
