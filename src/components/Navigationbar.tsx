import {
   NavigationMenu,
   NavigationMenuItem,
   NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Darkmodetoggle } from './Darkmodetoggle'
import logo from '../assets/images/logo.jpg'

const Navigationbar = () => {
   return (
      <nav
         className='flex px-4 py-4 gap-12 items-center tracking-tight relative 
      dark:shadow-[0_0_10px_1px_rgba(255,255,255,.75),0_0_20px_2px_rgba(255,255,255,.5)]
      shadow-[0_0_10px_1px_rgba(0,0,0,.75),0_0_20px_2px_rgba(0,0,0,.5)]'
      >
         <figure className='w-16 aspect-square border-2 rounded-sm border-red-900 dark:border-red-100 flex justify-center items-center'>
            <img
               className='object-cover object-center w-14 rounded-sm aspect-square'
               src={logo}
               alt='logo'
            />
         </figure>
         <h1 className='scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl font-vollkorn'>
            To-Do-List
         </h1>
         <NavigationMenu className='fixed top-4 right-4'>
            <NavigationMenuList>
               <NavigationMenuItem>
                  <Darkmodetoggle />
               </NavigationMenuItem>
            </NavigationMenuList>
         </NavigationMenu>
      </nav>
   )
}

export default Navigationbar
