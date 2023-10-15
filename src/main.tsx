import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import TodoContextProvider from './context/TodoContextProvider'

//TODO: Implement a symbol on Listitems that show priority and make a button to change priority (like a toggle button maybe with popover)

//TODO: Implementing Filter Buttons and methods for ordering alphabetically and filtering prioritize<true | false>

//TODO: Implementing localstorage with a hook instead of just localstoraging inline

//TODO: MAYBE: Implementing ordering tasks / dropzone right after dropping the task. Maybe shift other tasks for preview effects.

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <TodoContextProvider>
         <App />
      </TodoContextProvider>
   </React.StrictMode>
)
