import React, {useState} from 'react'
import { MdOutlineMenu, MdOutlineCloseFullscreen } from "react-icons/md"

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleNav = () => setNav(!nav)

  return (
    <div className='text-gray-200 flex justify-between items-center max-w-[1240px] mx-auto h-24 px-4 text-l'>
      <h1 className='text-3xl font-bold ml-4'>SM WARISUL A. RAFIN</h1>
      <DesktopMenu />
      
      {/* Fixed Hamburger Button */}
      <button 
        onClick={handleNav} 
        className={`z-[100] block md:hidden text-4xl transition-all duration-300 ease-in-out ${
          nav ? 'fixed right-4 top-7' : 'relative mr-4'
        }`}
      >
        {nav ? (
          <MdOutlineCloseFullscreen className="text-[#202121] fill-current bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 hover:scale-110 transition-transform duration-300" />
        ) : (
          <MdOutlineMenu className="text-[#202121] fill-current bg-gradient-to-r from-red-500 via-orange-500 to-purple-600 hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      <MobileMenu nav={nav} />
    </div>
  )
}

const DesktopMenu = () => (
  <ul className='hidden md:flex z-50'>
    <li className='p-5'><a href='#portfolio'>Portfolio</a></li>
    <li className='p-5'><a href='#about'>Skills & Experiences</a></li>
    <li className='p-5'>
      <a href='#contact' className='font-bold px-4 py-2 rounded-xl bg-primary-color'>Contact</a>
    </li>
    <li className="p-5">
      <a href="https://dashboard.warisul.com/" target="_blank" rel="noopener noreferrer">Dashboard</a>
    </li>
  </ul>
)

const MobileMenu = ({nav}) => (
  <div className={nav ? 
    'z-50 text-gray-300 fixed h-full left-0 top-0 w-[60%] border-r border-r-gray-900 bg-[#202121] ease-in-out duration-500' 
    : 'fixed left-[-100%]'}>
    <h1 className='text-3xl primary-color m-4'>SM WARISUL A. RAFIN</h1>
    <ul className='p-8 text-2xl'>
      <li className='p-2'><a href='#portfolio'>Portfolio</a></li>
      <li className='p-2'><a href='#about'>Skills & Experiences</a></li>                    
      <li className='p-2'><a href='#contact'>Contact</a></li>
      <li className="p-2"><a href="https://dashboard.warisul.com/" target="_blank" rel="noopener noreferrer">Dashboard</a></li>
    </ul> 
  </div>
)

export default Navbar