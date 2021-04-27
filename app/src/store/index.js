import { createStore } from 'redux';

const actions = {
  add: (state, action) => [...state, action.data],
  update: (_, action) => [...action.data]
}

function recordedBlobs(state = [], action) {
  return typeof actions[action.type] === 'function'
    ? actions[action.type](state, action)
    : state
}

const store = createStore(recordedBlobs);

export default store;