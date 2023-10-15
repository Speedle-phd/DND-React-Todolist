
import AddTask from "./components/AddTask"
import MainSection from "./components/MainSection"
import Navigationbar from "./components/Navigationbar"
import { ThemeProvider } from "./components/Themeprovider"
import TodoList from "./components/TodoList"

function App() {

   return (
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
         <Navigationbar />
         <MainSection className='w-[max(calc(100vw-20rem),360px)] mx-auto mt-10 min-h-[80dvh] border rounded-lg py-8 px-10 shadow-lightmodeAccent dark:shadow-darkmodeAccent'>
            <AddTask />
            <TodoList />
         </MainSection>
      </ThemeProvider>
   )


}

export default App
