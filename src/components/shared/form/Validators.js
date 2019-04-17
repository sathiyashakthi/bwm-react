export const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength4 = minLength(4)
