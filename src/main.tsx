import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import TodoContextProvider from './context/TodoContextProvider'

//TODO: Implementing new Property on TaskStructure --> Prioritize<boolean>

//TODO: Implementing Filter Buttons and methods for ordering alphabetically and filtering prioritize<true | false>

//TODO: Implementing localstorage with a hook instead of just localstoraging inline

//TODO: MAYBE: Implementing ordering tasks / dropzone right after dropping the task. Maybe shift other tasks for preview effects.

//TODO: Get a red border for all tasks that are overdue

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <TodoContextProvider>
         <App />
      </TodoContextProvider>
   </React.StrictMode>
)
