import { Action } from 'interfaces/common';

export const ROUTER_REFRESH = 'ROUTER_REFRESH';

export function Router(state = false, action: Action<null>) {
  switch (action.type) {
    case ROUTER_REFRESH:
      return !state;
    default:
      return state;
  }
}
