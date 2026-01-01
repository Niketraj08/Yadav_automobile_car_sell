import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div className="bg-dark min-h-screen text-text">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center bg-gray-900 border-b border-gray-800 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt="Contact Us"
                        className="w-full h-full object-cover opacity-30"
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2UwZTBlMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Db250YWN0IFVzPC90ZXh0Pjwvc3ZnPg==';
                            e.target.onError = null; // Prevent infinite loop
                        }}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                        Get In <span className="text-primary">Touch</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                        We're here to help you find your perfect vehicle
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-6 mb-16">
                    <div className="bg-dark-card p-6 rounded-xl border border-gray-800 hover:border-primary transition text-center group">
                        <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl group-hover:scale-110 transition">
                            <FaPhone />
                        </div>
                        <h3 className="font-bold mb-2">Call Us</h3>
                        <p className="text-gray-400 text-sm mb-1">+91 7474747474</p>
                        <p className="text-gray-400 text-sm">Mon-Sat 9AM-7PM</p>
                    </div>

                    <div className="bg-dark-card p-6 rounded-xl border border-gray-800 hover:border-primary transition text-center group">
                        <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl group-hover:scale-110 transition">
                            <FaEnvelope />
                        </div>
                        <h3 className="font-bold mb-2">Email Us</h3>
                        <p className="text-gray-400 text-sm mb-1">info@yadavauto.com</p>
                        <p className="text-gray-400 text-sm">24/7 Support</p>
                    </div>

                    <div className="bg-dark-card p-6 rounded-xl border border-gray-800 hover:border-primary transition text-center group">
                        <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl group-hover:scale-110 transition">
                            <FaMapMarkerAlt />
                        </div>
                        <h3 className="font-bold mb-2">Visit Us</h3>
                        <p className="text-gray-400 text-sm mb-1">123 Auto Street</p>
                        <p className="text-gray-400 text-sm">Bhubaneswar, India</p>
                    </div>

                    <div className="bg-dark-card p-6 rounded-xl border border-gray-800 hover:border-primary transition text-center group">
                        <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl group-hover:scale-110 transition">
                            <FaClock />
                        </div>
                        <h3 className="font-bold mb-2">Working Hours</h3>
                        <p className="text-gray-400 text-sm mb-1">Mon-Sat: 9AM-7PM</p>
                        <p className="text-gray-400 text-sm">Sunday: Closed</p>
                    </div>
                </div>

                {/* Contact Form and Map */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Send Us a <span className="text-primary">Message</span></h2>
                        <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you shortly</p>

                        {submitted && (
                            <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded mb-6">
                                Thank you! Your message has been sent successfully.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                                    placeholder="Yadav Automobile"
                                    required   
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm font-medium">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                                        placeholder="yadavautomobile@gmail.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm font-medium">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                                        placeholder="+91 7474747474"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2 text-sm font-medium">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full bg-dark-light border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-lg transition duration-300 transform hover:scale-[1.02]"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Map and Additional Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Visit Our <span className="text-primary">Showroom</span></h2>
                            <p className="text-gray-400 mb-6">Come experience our premium collection in person</p>

                            {/* Map Placeholder */}
                            <div className="bg-dark-card border border-gray-800 rounded-xl overflow-hidden h-[300px] flex items-center justify-center">
                                <div className="text-center">
                                    <FaMapMarkerAlt className="text-6xl text-primary mx-auto mb-4" />
                                    <p className="text-gray-400">123 Auto Street, New Delhi, India</p>
                                    <a
                                        href="https://maps.google.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-white transition mt-2 inline-block"
                                    >
                                        Open in Google Maps →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-dark-card border border-gray-800 rounded-xl p-8">
                            <h3 className="text-2xl font-bold mb-4">Connect With <span className="text-primary">Us</span></h3>
                            <p className="text-gray-400 mb-6">Follow us on social media for latest updates and offers</p>

                            <div className="flex gap-4">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-dark-light hover:bg-primary w-12 h-12 rounded-full flex items-center justify-center text-xl transition"
                                >
                                    <FaFacebookF />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-dark-light hover:bg-primary w-12 h-12 rounded-full flex items-center justify-center text-xl transition"
                                >
                                    <FaTwitter />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-dark-light hover:bg-primary w-12 h-12 rounded-full flex items-center justify-center text-xl transition"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-dark-light hover:bg-primary w-12 h-12 rounded-full flex items-center justify-center text-xl transition"
                                >
                                    <FaLinkedinIn />
                                </a>
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/50 rounded-xl p-8">
                            <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
                            <p className="text-gray-300 mb-6">Our team is available to help you right away</p>
                            <a
                                href="tel:+919876543210"
                                className="bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg inline-flex items-center gap-2 transition"
                            >
                                <FaPhone /> Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 md:px-8 bg-dark-light/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked <span className="text-primary">Questions</span></h2>
                    <p className="text-gray-400 text-center mb-12">Quick answers to common questions</p>

                    <div className="space-y-4">
                        <details className="bg-dark-card border border-gray-800 rounded-lg p-6 group">
                            <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                                What are your business hours?
                                <span className="text-primary">+</span>
                            </summary>
                            <p className="text-gray-400 mt-4">We are open Monday to Saturday from 9:00 AM to 7:00 PM. We are closed on Sundays and public holidays.</p>
                        </details>

                        <details className="bg-dark-card border border-gray-800 rounded-lg p-6 group">
                            <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                                Do you offer test drives?
                                <span className="text-primary">+</span>
                            </summary>
                            <p className="text-gray-400 mt-4">Yes! We encourage test drives for all our vehicles. Simply schedule an appointment through our contact form or call us directly.</p>
                        </details>

                        <details className="bg-dark-card border border-gray-800 rounded-lg p-6 group">
                            <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                                What payment methods do you accept?
                                <span className="text-primary">+</span>
                            </summary>
                            <p className="text-gray-400 mt-4">We accept all major payment methods including bank transfers, credit/debit cards, and we also work with leading finance partners.</p>
                        </details>

                        <details className="bg-dark-card border border-gray-800 rounded-lg p-6 group">
                            <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                                Do you buy used cars?
                                <span className="text-primary">+</span>
                            </summary>
                            <p className="text-gray-400 mt-4">Absolutely! Use our "Sell Car" feature to submit your vehicle details, and our team will provide you with a fair evaluation.</p>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
