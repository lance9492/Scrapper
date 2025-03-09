import { State, Action } from './types'
import { reducer } from './store'

export const listeners: Array<(state: State) => void> = []
export let memoryState: State = { toasts: [] }

export function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}