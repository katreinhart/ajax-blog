const BASE_URL = 'http://localhost:3000'
const HOMEPAGE = 'http://localhost:8080'

const getParamsFromString = (string) => {
  const params = {}
  const args = string.split('&')
  args[0] = args[0].slice(1)
  args.forEach((arg) => {
    const vals = arg.split('=')
    params[vals[0]] = vals[1]
  })
  return params;
}