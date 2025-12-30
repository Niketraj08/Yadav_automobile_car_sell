import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCar, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark-card border-t border-gray-800 text-text pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src="/logo.png"
                                alt="Yadav Automobile"
                                className="object-contain w-[180px] h-[54px] group-hover:scale-105 transition-transform duration-300"
                            />
                        </Link>
                        <p className="text-gray-400 leading-relaxed italic">
                            Redefining the car buying and selling experience since 2010. Quality, Trust, and Transparency are our core values.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                                <a key={index} href="#" className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/cars" className="hover:text-primary transition-colors">Browse Cars</Link></li>
                            <li><Link to="/sell" className="hover:text-primary transition-colors">Sell Your Car</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Support</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                                <span>Bhubaneswar, Odisha, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-primary flex-shrink-0" />
                                <span>+91 7474747474</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-primary flex-shrink-0" />
                                <span>info@yadavauto.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Yadav Automobile. Developed with ❤️ <a href="https://github.com/Niketraj08" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Niket Raj</a>.</p>
                    <div className="flex gap-8">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            System Operational
                        </span>
                        <div className="flex gap-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50 hover:opacity-100 transition" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 hover:opacity-100 transition" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-50 hover:opacity-100 transition" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
