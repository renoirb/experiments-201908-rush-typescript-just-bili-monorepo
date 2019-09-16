export const latency = async (ms: number = 1000) => {
  const delay = +ms
  return new Promise(resolve => setTimeout(resolve, delay))
}

export default latency
