export function wait() {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 1500))
  )
}
