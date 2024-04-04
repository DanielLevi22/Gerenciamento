import logo from '../assets/logo.svg'
import { NavLink } from './nav-link'


export function Header() {

  return(
    <header className='flex items-center gap-5 py-2'>
      <img src={logo} alt="logo" />

      <nav className='flex items-center gap-5 '>
        <NavLink href="" className='font-medium text-sm text-zinc-300'>Eventos</NavLink>
        <NavLink href="" className='font-medium text-sm text-zinc-300'>Participantes</NavLink>
      </nav>
      
    </header>
  )
}