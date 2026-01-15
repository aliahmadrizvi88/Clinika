import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { title: 'Company', links: ['About Us', 'Blog'] },
    {
      title: 'Support',
      links: ['Help Center', 'Contact Us', 'FAQs'],
    },
    {
      title: 'Legal',
      links: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
    },
    {
      title: 'Contact Us',
      links: ['clinika@info.com', '+92 123456709'],
    },
  ];

  const linkClasses = `relative block text-white/80 hover:text-white transition-all duration-300 
                       after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:w-0 
                       hover:after:w-full after:transition-all after:duration-300`;

  return (
    <footer className="bg-linear-to-r from-[#2a89b9] via-[#37a2ad] to-[#3bbb9c] text-white py-16 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {footerLinks.map((section, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <Link to="/" className={linkClasses}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-white/70">
        &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
