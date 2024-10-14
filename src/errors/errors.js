export const unprocessableError = (message) => {
  return {
    type: 'unprocessable',
    message
  }
}

export const conflictError = (entity, propriety) => {
  return {
    type: 'conflict',
    message: `Já existe um(a) ${entity} com esse(a) ${propriety}.`
  }
}

export const notFoundError = (entity, propriety) => {
  return {
    type: 'notFound',
    message: `Não foi encontrado nenhum(a) ${entity} com esse(a) ${propriety}.`
  }
}

export const noStock = () => {
  return {
    type: 'noStock',
    message: `Não há estoque para alugar este jogo no momento.`
  }
}

export const notOpen = () => {
  return {
    type: 'notOpen',
    message: `Esse aluguel já foi devolvido.`
  }
}

export const notClose = () => {
  return {
    type: 'notClose',
    message: `Esse aluguel não foi devolvido.`
  }
}