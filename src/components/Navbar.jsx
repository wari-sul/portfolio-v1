import React, {useState} from 'react'
import { MdOutlineMenu, MdOutlineCloseFullscreen } from "react-icons/md"

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const handleNav = () => setNav(!nav);

  // Easing function 
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  // Function to handle smooth scrolling using custom animation
  const handleSmoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const duration = 1000; // Duration in ms
      const startPosition = window.pageYOffset;
      const targetPosition = targetElement.offsetTop; // Get target element's position
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutQuad(progress);

        // Calculate new position based on eased progress
        const newPosition = startPosition + (targetPosition - startPosition) * easedProgress;
        window.scrollTo(0, newPosition);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }

    // Close mobile nav if it's open
    if (nav) {
      setNav(false);
    }
  };
  return (
    <div className='text-gray-200 flex justify-between items-center max-w-[1240px] mx-auto h-24 px-4 text-l'>
      <h1 className='text-3xl font-bold ml-4'>SM WARISUL A. RAFIN</h1>
      <DesktopMenu handleSmoothScroll={handleSmoothScroll} />
      
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

      <MobileMenu nav={nav} handleSmoothScroll={handleSmoothScroll} />
    </div>
  )
}

const DesktopMenu = ({ handleSmoothScroll }) => (
  <ul className='hidden md:flex z-50'>
    <li className='p-5'><a href='#portfolio' onClick={handleSmoothScroll}>Portfolio</a></li>
    <li className='p-5'><a href='#about' onClick={handleSmoothScroll}>Skills & Experiences</a></li>
    <li className='p-5'>
      <a href='#contact' onClick={handleSmoothScroll} className='font-bold px-4 py-2 rounded-xl bg-primary-color'>Contact</a>
    </li>
    <li className="p-5">
      <a href="https://dashboard.warisul.com/" target="_blank" rel="noopener noreferrer">Dashboard</a>
    </li>
  </ul>
)

const MobileMenu = ({ nav, handleSmoothScroll }) => (
  <div className={nav ? 
    'z-50 text-gray-300 fixed h-full left-0 top-0 w-[60%] border-r border-r-gray-900 bg-[#202121] ease-in-out duration-500' 
    : 'fixed left-[-100%]'}>
    <h1 className='text-3xl primary-color m-4'>SM WARISUL A. RAFIN</h1>
    <ul className='p-8 text-2xl'>
      <li className='p-2'><a href='#portfolio' onClick={handleSmoothScroll}>Portfolio</a></li>
      <li className='p-2'><a href='#about' onClick={handleSmoothScroll}>Skills & Experiences</a></li>
      <li className='p-2'><a href='#contact' onClick={handleSmoothScroll}>Contact</a></li>
      <li className="p-2"><a href="https://dashboard.warisul.com/" target="_blank" rel="noopener noreferrer">Dashboard</a></li>
    </ul> 
  </div>
)

export default Navbar