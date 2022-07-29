const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case 'GOOD':
      newState = { ...state, good: state.good + 1 }
      state = newState
      return state
    case 'OK':
      newState = { ...state, ok: state.ok + 1 }
      state = newState
      return state
    case 'BAD':
      newState = { ...state, bad: state.bad + 1 }
      state = newState
      return state
    case 'ZERO':
      newState = { good: 0, bad: 0, ok: 0 }
      state = newState
      return state
    default: return state
  }
}

export default counterReducer
