import React from 'react';
import { FaShieldAlt, FaCar, FaStar, FaUsers, FaHandshake, FaAward } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-dark min-h-screen text-text">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-gray-900 border-b border-gray-800 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt="About Us Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                        About <span className="text-primary">Yadav Automobile</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                        Your Trusted Partner in Premium Automotive Excellence
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Our <span className="text-primary">Story</span></h2>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Founded with a vision to revolutionize the car buying and selling experience, Yadav Automobile has grown to become one of the most trusted names in the automotive industry. Our journey began with a simple belief: every customer deserves transparency, quality, and exceptional service.
                        </p>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Over the years, we've helped thousands of customers find their dream vehicles and ensured seamless transactions for car sellers. Our commitment to excellence and customer satisfaction has made us a preferred choice for premium automobile deals.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Today, we continue to set new standards in the industry with our rigorous vehicle inspection process, competitive pricing, and personalized customer care.
                        </p>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Our Showroom"
                            className="rounded-lg shadow-2xl border border-gray-800"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg shadow-xl border border-primary/50">
                            <p className="text-4xl font-bold">1000+</p>
                            <p className="text-sm">Happy Customers</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 px-4 md:px-8 bg-dark-light/30">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">Our Core <span className="text-primary">Values</span></h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        The principles that guide everything we do at Yadav Automobile
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-dark-card p-8 rounded-xl border border-gray-800 hover:border-primary transition duration-300 text-center group">
                            <div className="bg-dark-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-3xl group-hover:scale-110 transition">
                                <FaShieldAlt />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Trust & Integrity</h3>
                            <p className="text-gray-400">
                                We believe in complete transparency and honesty in all our dealings. Every vehicle comes with detailed history and certification.
                            </p>
                        </div>

                        <div className="bg-dark-card p-8 rounded-xl border border-gray-800 hover:border-primary transition duration-300 text-center group">
                            <div className="bg-dark-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-3xl group-hover:scale-110 transition">
                                <FaStar />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Excellence</h3>
                            <p className="text-gray-400">
                                We strive for perfection in every aspect - from vehicle quality to customer service and after-sales support.
                            </p>
                        </div>

                        <div className="bg-dark-card p-8 rounded-xl border border-gray-800 hover:border-primary transition duration-300 text-center group">
                            <div className="bg-dark-light w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-primary text-3xl group-hover:scale-110 transition">
                                <FaUsers />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Customer First</h3>
                            <p className="text-gray-400">
                                Your satisfaction is our priority. We go the extra mile to ensure you have the best car buying or selling experience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes Us Different */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-4">What Makes Us <span className="text-primary">Different</span></h2>
                <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                    Experience the Yadav Automobile advantage
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex gap-4 bg-dark-card p-6 rounded-lg border border-gray-800 hover:border-primary/50 transition">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary text-xl">
                                <FaCar />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">150-Point Inspection</h3>
                            <p className="text-gray-400">
                                Every vehicle undergoes a comprehensive 150-point inspection by certified technicians before listing.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 bg-dark-card p-6 rounded-lg border border-gray-800 hover:border-primary/50 transition">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary text-xl">
                                <FaHandshake />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Fair Pricing</h3>
                            <p className="text-gray-400">
                                We offer competitive and transparent pricing with no hidden charges. What you see is what you get.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 bg-dark-card p-6 rounded-lg border border-gray-800 hover:border-primary/50 transition">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary text-xl">
                                <FaAward />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Warranty & Support</h3>
                            <p className="text-gray-400">
                                All our vehicles come with warranty options and dedicated after-sales support for peace of mind.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 bg-dark-card p-6 rounded-lg border border-gray-800 hover:border-primary/50 transition">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary text-xl">
                                <FaShieldAlt />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Hassle-Free Process</h3>
                            <p className="text-gray-400">
                                From documentation to delivery, we handle everything to make your experience smooth and convenient.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 md:px-8 bg-dark-light/30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div className="bg-dark-card p-8 rounded-xl border border-gray-800">
                            <p className="text-5xl font-bold text-primary mb-2">1000+</p>
                            <p className="text-gray-400">Cars Sold</p>
                        </div>
                        <div className="bg-dark-card p-8 rounded-xl border border-gray-800">
                            <p className="text-5xl font-bold text-primary mb-2">950+</p>
                            <p className="text-gray-400">Happy Customers</p>
                        </div>
                        <div className="bg-dark-card p-8 rounded-xl border border-gray-800">
                            <p className="text-5xl font-bold text-primary mb-2">100%</p>
                            <p className="text-gray-400">Verified Cars</p>
                        </div>
                        <div className="bg-dark-card p-8 rounded-xl border border-gray-800">
                            <p className="text-5xl font-bold text-primary mb-2">24/7</p>
                            <p className="text-gray-400">Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to Find Your <span className="text-primary">Dream Car</span>?</h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                    Browse our extensive collection of premium vehicles or get in touch with our team for personalized assistance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/cars" className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105">
                        Browse Cars
                    </a>
                    <a href="/contact" className="bg-dark-card hover:bg-dark-light border border-gray-700 hover:border-primary text-white px-8 py-4 rounded-lg font-bold transition duration-300">
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;
