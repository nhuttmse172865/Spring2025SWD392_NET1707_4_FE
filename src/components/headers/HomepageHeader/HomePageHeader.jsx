
import React, { useState } from 'react';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';
import './HomePageHeader.scss';
import FPT from '/AssetsHomePage/FPT.jpg';
import { Link } from 'react-router-dom';

const HomePageHeader = ({ scrollToSection }) => {


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="homepage-header">
      <div className="header-container">
        {/* Top section with logo and search */}
        <div className="top-section">
          {/* Logo */}
          <div className="logo">
            <img src={FPT} alt="Logo" className="logo-img" />
            <span className="logo-text">SkinCare</span>
          </div>

          {/* Search bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search entire store here..."
              className="search-input"
            />
            <Search className="search-icon" size={20} />
          </div>

          {/* Icons */}
          <div className="icons">
            <User className="icon" size={24} />
            <Heart className="icon" size={24} />
            <div className="cart">
              <ShoppingCart className="icon" size={24} />
              <span className="cart-badge">0</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item" onClick={() => scrollToSection('aboutUs')}>
              About
            </li>
           <Link  className="nav-item has-dropdown" to="/service" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Service
           </Link>
              
            
            <li className="nav-item" onClick={() => scrollToSection('priceService')}>
              Price
            </li>
            <li className="nav-item" onClick={() => scrollToSection('therapist')}>
              Therapist
            </li>
            <li className="nav-item" onClick={() => scrollToSection('blog')}>
              Blog
            </li>
            <li className="nav-item" onClick={() => scrollToSection('support')}>
              Support
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HomePageHeader;

