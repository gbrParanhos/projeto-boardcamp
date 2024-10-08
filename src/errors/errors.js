export const unprocessableError = (message) => {
  return {
    type: 'unprocessable',
    message
  }
}

export const conflictError = (entity,propriety) => {
  return {
    type: 'conflict',
    message: `Já existe um(a) ${entity} com esse(a) ${propriety}.`
  }
}