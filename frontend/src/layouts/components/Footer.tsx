import { Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 border-t-2 border-border mt-20 dark:bg-black text-gray-300 py-10 ">
        <div className="containerBox max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white font-bold text-xl">InkTale</div>

            <nav className="flex space-x-6 text-sm">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <Link to="/novels" className="hover:text-white">
                Novels
              </Link>
              <Link to="/authors" className="hover:text-white">
                Authors
              </Link>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </nav>

            <div className="flex space-x-4 text-gray-400">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-white"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-white"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} InkTale. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
