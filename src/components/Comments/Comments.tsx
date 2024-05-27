import { useOptimistic, useState, useRef } from 'react'

import { wait } from '@/utils'
import initialComments from './comments.json'

import type { Comment, OptimisticComment } from './types'
import { CommentItem } from './CommentItem'
import { SubmitButton } from '@/components'

async function createComment(comment: Comment): Promise<Comment> {
  await wait(2000) // emulate API call
  return comment
}

export default function CommentList() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [comments, setComments] = useState<Comment[]>(initialComments)

  const [optimisticComments, addOptimisticComments] = useOptimistic<
    OptimisticComment[],
    Comment
  >(comments, (state, comment) => [...state, { ...comment, sending: true }])

  async function commentAction(formData: FormData) {
    const message = (formData.get('message') || '') as string
    const author = (formData.get('author') || '') as string
    const comment = { message, author: author }
    addOptimisticComments(comment)

    formRef.current?.reset()

    const response = await createComment(comment)
    setComments((state) => [...state, response])
  }

  return (
    <section
      className="flex flex-col w-full max-w-lg gap-8 p-8 mx-auto border rounded-sm shadow-sm"
      aria-label="comments"
    >
      <div className="space-y-4">
        {optimisticComments.map((comment) => (
          <CommentItem
            key={comment.message + Math.random()}
            comment={comment}
            sending={comment.sending ?? false}
          />
        ))}
      </div>

      <form
        className="flex justify-center gap-4"
        action={commentAction}
        ref={formRef}
      >
        <input
          className="w-full p-2 border"
          type="text"
          name="message"
          required
        />

        <select name="author">
          <option value="mario">Mario</option>
          <option value="luigi">Luigi</option>
          <option value="peach">Peach</option>
          <option value="toad">Toad</option>
          <option value="bowser">Bowser</option>
        </select>

        <SubmitButton>Send</SubmitButton>
      </form>
    </section>
  )
}
