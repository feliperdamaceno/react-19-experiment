export interface Comment {
  message: string
  author: string
}

export interface OptimisticComment extends Comment {
  sending?: boolean
}
