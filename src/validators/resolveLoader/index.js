import resolve from '../resolve'

// this is exactly the same as resolve, so we're just re-using those validators
export default resolve.map(validator => {
  return {
    ...validator,
    key: validator.key.replace(/resolve/, 'resolveLoader'),
  }
})

