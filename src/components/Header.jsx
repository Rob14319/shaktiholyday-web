
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchVisible(false);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Pilgrimages', path: '/packages' },
    { name: 'Spiritual Blog', path: '/blog' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="relative z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo only - Text branding removed */}
          <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
            <img 
              src="https://horizons-cdn.hostinger.com/2d70781b-12fd-4e83-aaf6-043f024606cc/4fd3775cb2de8a69bfc93da112b5b116.png" 
              alt="ShaktiHolyday logo" 
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-medium transition-all duration-200 relative ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-primary"></span>
                )}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 ml-4 border-l border-border pl-8">
              {/* Desktop Search */}
              <div className="relative flex items-center">
                {isSearchVisible ? (
                  <form onSubmit={handleSearch} className="relative animate-in fade-in slide-in-from-right-4 duration-300">
                    <input
                      type="text"
                      placeholder="Search journeys..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-48 lg:w-64 h-10 pl-4 pr-10 rounded-full border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                      <Search size={16} />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsSearchVisible(false)}
                      className="ml-2 p-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </form>
                ) : (
                  <button 
                    onClick={() => setIsSearchVisible(true)}
                    className="p-2 text-foreground hover:text-primary transition-colors duration-200"
                    aria-label="Search"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>

              <a href="tel:+919815649468" className="flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors ml-2">
                <Phone size={16} className="mr-2 text-primary" />
                +91 9815649468
              </a>
              
              <Link to="/pay-us" className="ml-2">
                <Button variant="default" size="sm" className="rounded-full px-6 bg-gradient-to-r from-[#fb923c] to-primary hover:opacity-90 transition-opacity">
                  Pay Us
                </Button>
              </Link>
              
              {/* Only show Dashboard/Logout if admin is logged in. No login button for public. */}
              {isAuthenticated && (
                <>
                  <Link to="/admin">
                    <Button variant="default" size="sm" className="rounded-full px-6">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={logout} className="rounded-full">
                    Logout
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Search and Menu Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="p-2 text-foreground hover:text-primary transition-colors duration-200"
              onClick={() => {
                setMobileMenuOpen(true);
                // We'll let the user focus the search input manually or we can add logic to focus it.
              }}
              aria-label="Search"
            >
              <Search size={24} />
            </button>
            <button
              className="p-2 text-foreground hover:text-primary transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-4 py-2 mt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search journeys..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-4 pr-11 rounded-xl border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                    <Search size={20} />
                  </button>
                </div>
              </form>
              
              <div className="h-px bg-border my-2"></div>
              
              <a href="tel:+919815649468" className="flex items-center py-2 px-4 text-foreground font-medium">
                <Phone size={18} className="mr-3 text-primary" />
                Call: +91 9815649468
              </a>
              
              <div className="px-4 py-2">
                <Link to="/pay-us" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full rounded-full bg-gradient-to-r from-[#fb923c] to-primary hover:opacity-90 transition-opacity">
                    Pay Us
                  </Button>
                </Link>
              </div>
              
              {isAuthenticated && (
                <div className="px-4 pt-2 flex flex-col gap-2">
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="default" className="w-full rounded-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full rounded-full border border-border"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
