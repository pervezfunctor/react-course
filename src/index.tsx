import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './index.css'
;(async function () {
  if (import.meta.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    await worker.start()
  }
})()
  .then(() => {
    console.log('index')
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'),
    )
  })
  .catch(error => console.log(`msw err: ${JSON.stringify(error, null, 2)}`))
// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
