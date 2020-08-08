export const latency = async <C>(ms: number = 1000): Promise<C> => {
  const delay = +ms
  return new Promise<C>((resolve) => setTimeout(resolve, delay))
}

export default latency
