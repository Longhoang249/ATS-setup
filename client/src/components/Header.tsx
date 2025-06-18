import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../assets/logo-new.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: "TRANG CHỦ", href: "#hero" },
    { name: "GIỚI THIỆU", href: "#why-choose-us" },
    { name: "GÓI DỊCH VỤ", href: "#setup-package" },
    { name: "DỰ ÁN", href: "#video-gallery" },
    { name: "CHUYÊN GIA", href: "#team" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-green-700 shadow-md" : "bg-white/90"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
            <img
              src={logoImage}
              alt="Auto Shop Setup Logo"
              className="h-18 max-w-full" 
              style={{ height: "4.5rem" }} // Tăng kích thước 50% từ h-12 (3rem) lên 4.5rem
            />
        </Link>

        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex items-center">
            <ul className="flex space-x-6 font-semibold text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`${scrolled ? 'text-white' : 'text-gray-800'} hover:text-primary transition-colors`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center">
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              asChild
            >
              <a href="#contact">ĐẶT LỊCH TƯ VẤN</a>
            </Button>
          </div>
        </div>

        <button
          className={`lg:hidden ${scrolled ? 'text-white' : 'text-gray-800'} text-2xl`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg absolute w-full"
          >
            <nav className="container mx-auto px-4 py-3">
              <ul className="space-y-4 font-medium">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="block py-2 text-gray-700 hover:text-primary"
                      onClick={closeMenu}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    asChild
                  >
                    <a href="#contact" onClick={closeMenu}>
                      ĐẶT LỊCH TƯ VẤN
                    </a>
                  </Button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
