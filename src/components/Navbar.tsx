import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import searchIcon from '../assets/search.png';
import searchMobile from '../assets/search-mobile.png';
import menuIcon from '../assets/menu.png';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-[140px]">
          {/* Left Side: Logo & Links */}
          <div className="flex items-center gap-14">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 text-white text-2xl font-semibold tracking-wide">
                  <img src={logo} alt="Logo" className="w-8 h-8" />
                  <span className="mt-1 text-white font-semibold text-[28.44px] leading-[36px] font-['Poppins']">Movie</span>
              </Link>
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-12 font-normal text-base leading-[36px] ">
                  <Link to="/" className="text-white hover:text-blue-500 transition-colors">Home</Link>
                  <Link to="/favorites" className="text-white hover:text-blue-500 transition-colors">Favorites</Link>
              </div>
          </div>

          {/* Right: Search (Desktop) */}
          <div className="relative hidden md:block">
             <form onSubmit={handleSearch}>
                <input 
                      type="text" 
                      placeholder="Search Movie" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-[rgba(10,13,18,0.6)] text-neutral-500 font-normal px-12 py-3 rounded-2xl pl-10 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all w-61 border border-neutral-800 backdrop-blur-[40px]"
                />
                <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                    <img src={searchIcon} alt="Search" className="w-5 h-5" />
                </button>
             </form>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-6 md:hidden">
             <button aria-label="Search" className="text-white" onClick={() => navigate('/search')}>
                <img src={searchMobile} alt="Search-mobile" className="w-5 h-5"  />
             </button>
             <button 
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Menu" 
                className="text-white"
             >
                <img src={menuIcon} alt="Menu" className="w-6 h-6" />
             </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black text-white p-6">
            <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <img src={logo} alt="Logo" className="w-6" />
                    <span className="text-[19.91px] text-neutral font-semibold font-['Poppins']">Movie</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <div className="flex flex-col gap-10 text-xl">
                <Link 
                    to="/" 
                    className="mt-6 hover:text-gray-300 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Home
                </Link>
                <Link 
                    to="/favorites" 
                    className="hover:text-gray-300 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    Favorites
                </Link>
            </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
