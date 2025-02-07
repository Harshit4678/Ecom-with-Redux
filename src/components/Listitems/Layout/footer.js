import React from "react";
import "../../../styles/footer.scss"; // Import SCSS for styling

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy-policy" className="footer-link">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="footer-link">
            Terms of Service
          </a>
          <a href="/contact" className="footer-link">
            Contact Us
          </a>
        </div>
      </div>
      <div className="footer-socials">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          Facebook
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          Instagram
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
