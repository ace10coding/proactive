import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { SiPinterest } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-muted/30 py-8 mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter/X"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Pinterest"
            >
              <SiPinterest className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} PROACTIVE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
