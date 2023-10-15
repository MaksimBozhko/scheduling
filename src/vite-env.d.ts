/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { compose } from 'redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
