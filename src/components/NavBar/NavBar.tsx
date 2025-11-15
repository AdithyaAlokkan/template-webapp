import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

import './NavBar.scss'
import logo from '@/assets/logos/wordMark_horizontal.svg'
import MenuIcon from '@/assets/icons/menu.svg?react'

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isNavBarOpen, setIsNavBarOpen] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)

  // Compact NavBar when scrolled down
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // run once on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close NavBar when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isNavBarOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setIsNavBarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isNavBarOpen])

  return (
    <>
      <nav ref={navRef} className={scrolled ? 'navBar compact' : 'navBar'}>
        <div className='header'>
          <img src={logo} className='logo' />
          <button onClick={() => setIsNavBarOpen(!isNavBarOpen)}>
            <MenuIcon className='menuIcon' />
          </button>
        </div>
        <ul className={isNavBarOpen ? '' : 'collapsed'}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>
      <div className={scrolled ? 'spacer compact' : 'spacer'}></div>
    </>
  )
}

export default NavBar
