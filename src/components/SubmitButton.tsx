import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  children: ReactNode
}

export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  return (
    <button
      className="px-3 py-1.5 rounded-sm hover:scale-[102%] active:scale[98%] transition-all bg-zinc-800 text-white w-fit disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {children}
    </button>
  )
}
