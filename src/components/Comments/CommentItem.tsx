import type { Comment } from './types'

interface CommentItemProps {
  comment: Comment
  sending: boolean
}

export function CommentItem({ comment, sending }: CommentItemProps) {
  return (
    <div className="border p-4 rounded-sm">
      <p className="space-x-1 text-lg">
        <span>{comment.message}</span>
        <small>
          {sending ? (
            <span className="inline-block animate-spin">🐙</span>
          ) : null}
        </small>
      </p>
      <small className="font-semibold capitalize">{comment.author}</small>
    </div>
  )
}
