import { Link } from 'react-router-dom'
import Logo from '@/assets/logos/WordMark-Horizontal.svg'
import { useState, useEffect } from 'react'

import './NavBar.scss'

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // run once on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={scrolled? 'navBar compact' : 'navBar'}>
      <img src={Logo} className='logo' />
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
