import React, { useState, useEffect, useRef } from "react";

// ===== FAQ DATA =====
const faqs = [
    {
        question: "How do I book a consultation?",
        answer: "You can book a consultation by filling out the contact form below, calling us directly, or emailing us. We'll get back to you within 24 hours to schedule a meeting.",
    },
    {
        question: "What is your service area?",
        answer: "We serve clients across India and internationally. Our team has designed weddings in Mumbai, Delhi, Udaipur, Goa, Bangalore, and destinations like Dubai, Thailand, and Italy.",
    },
    {
        question: "How far in advance should I book?",
        answer: "For peak wedding season (October to March), we recommend booking 9-12 months in advance. For other times, 6 months is usually sufficient.",
    },
    {
        question: "Do you offer virtual consultations?",
        answer: "Yes! We offer video consultations for clients who cannot meet in person. We can discuss your vision, share portfolio pieces, and start planning remotely.",
    },
    {
        question: "What is your pricing structure?",
        answer: "Our pricing is customized based on your specific requirements. We offer flexible packages ranging from partial decoration to full-service A-to-Z wedding design.",
    },
];

// ===== OFFICE LOCATIONS =====
const offices = [
    {
        city: "Mumbai",
        address: "15, Pali Hill Road, Bandra West, Mumbai - 400050",
        phone: "+91 22 1234 5678",
        email: "mumbai@stewdec.com",
        hours: "Mon-Sat: 10am - 7pm",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        city: "Delhi",
        address: "42, Khan Market, New Delhi - 110003",
        phone: "+91 11 2345 6789",
        email: "delhi@stewdec.com",
        hours: "Mon-Sat: 10am - 7pm",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        city: "Udaipur",
        address: "7, Lake Palace Road, Udaipur - 313001",
        phone: "+91 294 123 4567",
        email: "udaipur@stewdec.com",
        hours: "Mon-Sat: 10am - 6pm",
        image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
];

// Social media icons as components
const InstagramIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.83 2.013 9.175 2 12 2z" />
    </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const TwitterIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.775-3.374c1.042-1.94 1.586-4.115 1.586-6.368 0-.097-.002-.194-.006-.291A10.003 10.003 0 0024 8.59a9.86 9.86 0 01-2.047.58z" />
    </svg>
);

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        budget: "",
        message: "",
        howDidYouHear: "",
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: "",
    });

    const [activeOffice, setActiveOffice] = useState(0);
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mapError, setMapError] = useState(false);

    const formRef = useRef(null);
    const mapRef = useRef(null);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setFormStatus({
                submitted: true,
                success: true,
                message: "Thank you for reaching out! We'll get back to you within 24 hours.",
            });
            setIsSubmitting(false);

            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                eventType: "",
                eventDate: "",
                budget: "",
                message: "",
                howDidYouHear: "",
            });

            // Scroll to success message
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 2000);
    };

    // Toggle FAQ
    const toggleFaq = (index) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    // Simulate map loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMapLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="font-serif bg-black pt-16 md:pt-20 lg:pt-24">
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] lg:min-h-[55vh] xl:min-h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Luxury wedding contact"
                        className="w-full h-full object-cover animate-kenBurns"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
                </div>

                {/* Hero Content */}
                <div className="relative container mx-auto px-4 sm:px-6 text-center text-white z-10 py-12 sm:py-16 md:py-20">
                    <p className="text-amber-300 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4 animate-fadeInUp">
                        Get in Touch
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-light mb-3 sm:mb-4 lg:mb-6 animate-fadeInUp delay-200">
                        Let's Create<br />Your Dream Wedding
                    </h1>
                    <div className="w-16 sm:w-20 md:w-24 h-px bg-amber-400 mx-auto my-4 sm:my-6 lg:my-8 animate-scaleIn delay-400"></div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 animate-fadeInUp delay-600">
                        Reach out for a complimentary consultation. We'd love to hear about your vision.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
                    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-0.5 sm:w-1 h-1 sm:h-2 bg-white rounded-full mt-2 animate-scroll"></div>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT INFO CARDS ===== */}
            <section className="py-12 sm:py-14 lg:py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 -mt-16 sm:-mt-20 lg:-mt-24 relative z-20">
                        {/* Email Card */}
                        <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 xl:p-8 text-center transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-1 sm:mb-2">Email Us</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 lg:mb-4">For general inquiries</p>
                            <a href="mailto:hello@stewdec.com" className="text-amber-700 hover:underline text-xs sm:text-sm lg:text-base break-all">
                                hello@stewdec.com
                            </a>
                        </div>

                        {/* Phone Card */}
                        <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 xl:p-8 text-center transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp delay-200">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-1 sm:mb-2">Call Us</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 lg:mb-4">Mon-Sat, 10am-7pm</p>
                            <a href="tel:+912212345678" className="text-amber-700 hover:underline text-xs sm:text-sm lg:text-base">
                                +91 22 1234 5678
                            </a>
                        </div>

                        {/* Visit Card */}
                        <div className="bg-white rounded-xl lg:rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 xl:p-8 text-center transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp delay-400">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-serif mb-1 sm:mb-2">Visit Us</h3>
                            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 lg:mb-4">Three locations</p>
                            <p className="text-amber-700 text-xs sm:text-sm lg:text-base">Mumbai • Delhi • Udaipur</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT FORM & MAP SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-neutral-900" ref={formRef}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
                        {/* Contact Form */}
                        <div className="animate-fadeInLeft order-2 lg:order-1">
                            <p className="text-amber-500 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                                Send a Message
                            </p>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-3 sm:mb-4 lg:mb-6">
                                Let's Start a Conversation
                            </h2>
                            <div className="w-12 sm:w-16 lg:w-20 h-px bg-amber-600 mb-6 sm:mb-7 lg:mb-8"></div>

                            {formStatus.submitted && formStatus.success && (
                                <div className="mb-4 sm:mb-5 lg:mb-6 p-3 sm:p-4 bg-green-900/50 border border-green-700 rounded-lg animate-fadeIn">
                                    <p className="text-green-300 text-sm sm:text-base">{formStatus.message}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                                    {/* Phone */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    {/* Event Type */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Event Type
                                        </label>
                                        <select
                                            name="eventType"
                                            value={formData.eventType}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                        >
                                            <option value="">Select event type</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="engagement">Engagement</option>
                                            <option value="reception">Reception</option>
                                            <option value="sangeet">Sangeet</option>
                                            <option value="corporate">Corporate Event</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                                    {/* Event Date */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Tentative Event Date
                                        </label>
                                        <input
                                            type="date"
                                            name="eventDate"
                                            value={formData.eventDate}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                        />
                                    </div>

                                    {/* Budget Range */}
                                    <div>
                                        <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                            Budget Range
                                        </label>
                                        <select
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                        >
                                            <option value="">Select budget</option>
                                            <option value="5-10">₹5L - ₹10L</option>
                                            <option value="10-25">₹10L - ₹25L</option>
                                            <option value="25-50">₹25L - ₹50L</option>
                                            <option value="50-100">₹50L - ₹1Cr</option>
                                            <option value="100+">₹1Cr+</option>
                                        </select>
                                    </div>
                                </div>

                                {/* How did you hear about us? */}
                                <div>
                                    <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                        How did you hear about us?
                                    </label>
                                    <select
                                        name="howDidYouHear"
                                        value={formData.howDidYouHear}
                                        onChange={handleInputChange}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="google">Google Search</option>
                                        <option value="wedding">Wedding Website</option>
                                        <option value="friend">Friend/Family</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">
                                        Your Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows="4"
                                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-600 text-white transition resize-none"
                                        placeholder="Tell us about your vision..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full bg-amber-700 hover:bg-amber-600 text-white py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 lg:px-6 rounded-lg uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>

                                <p className="text-[10px] sm:text-xs text-gray-500 text-center">
                                    * Required fields. We'll respond within 24 hours.
                                </p>
                            </form>
                        </div>

                        {/* Map & Office Info */}
                        <div className="animate-fadeInRight order-1 lg:order-2">
                            {/* Map Placeholder */}
                            <div className="bg-gray-800 rounded-xl lg:rounded-2xl overflow-hidden shadow-xl mb-6 sm:mb-7 lg:mb-8 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative">
                                {!isMapLoaded ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                        <div className="text-center">
                                            <svg className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-amber-600 mx-auto mb-2 sm:mb-3" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <p className="text-gray-400 text-xs sm:text-sm">Loading map...</p>
                                        </div>
                                    </div>
                                ) : (
                                    <img
                                        src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
                                            offices[activeOffice].address
                                        )}&zoom=15&size=800x400&maptype=roadmap&markers=color:red%7C${encodeURIComponent(
                                            offices[activeOffice].address
                                        )}&key=YOUR_API_KEY`}
                                        alt={`Map of ${offices[activeOffice].city}`}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>

                            {/* Office Selector */}
                            <div className="flex space-x-1 sm:space-x-2 mb-4 sm:mb-5 lg:mb-6">
                                {offices.map((office, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveOffice(index)}
                                        className={`flex-1 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm text-center transition-all duration-300 rounded-lg ${activeOffice === index
                                                ? "bg-amber-700 text-white"
                                                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                                            }`}
                                    >
                                        {office.city}
                                    </button>
                                ))}
                            </div>

                            {/* Office Details */}
                            <div className="bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 xl:p-8">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 sm:mb-5 lg:mb-6">
                                    <img
                                        src={offices[activeOffice].image}
                                        alt={offices[activeOffice].city}
                                        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover mb-3 sm:mb-0 sm:mr-4"
                                    />
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-serif text-white">{offices[activeOffice].city} Studio</h3>
                                        <p className="text-xs sm:text-sm text-gray-400">{offices[activeOffice].hours}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-start">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        <p className="text-gray-300 text-xs sm:text-sm">{offices[activeOffice].address}</p>
                                    </div>

                                    <div className="flex items-start">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <a href={`tel:${offices[activeOffice].phone}`} className="text-gray-300 hover:text-amber-500 text-xs sm:text-sm">
                                            {offices[activeOffice].phone}
                                        </a>
                                    </div>

                                    <div className="flex items-start">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <a href={`mailto:${offices[activeOffice].email}`} className="text-gray-300 hover:text-amber-500 text-xs sm:text-sm break-all">
                                            {offices[activeOffice].email}
                                        </a>
                                    </div>
                                </div>

                                <button className="mt-4 sm:mt-5 lg:mt-6 w-full bg-amber-700 hover:bg-amber-600 text-white py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm rounded-lg transition">
                                    Get Directions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FAQ SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-black">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                        <p className="text-amber-500 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                            Got Questions?
                        </p>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-3 sm:mb-4">
                            Frequently Asked Questions
                        </h2>
                        <div className="w-16 sm:w-20 lg:w-24 h-px bg-amber-600 mx-auto"></div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border border-gray-800 rounded-lg overflow-hidden animate-fadeInUp bg-gray-900/50"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left px-4 sm:px-5 lg:px-6 py-3 sm:py-4 flex justify-between items-center hover:bg-gray-800 transition"
                                >
                                    <span className="font-medium text-sm sm:text-base lg:text-lg text-white pr-4">{faq.question}</span>
                                    <svg
                                        className={`w-4 h-4 sm:w-5 sm:h-5 text-amber-500 transform transition-transform flex-shrink-0 ${expandedFaq === index ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {expandedFaq === index && (
                                    <div className="px-4 sm:px-5 lg:px-6 pb-3 sm:pb-4 text-gray-400 text-xs sm:text-sm animate-fadeIn border-t border-gray-800">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SOCIAL CONNECT SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <p className="text-amber-500 text-xs sm:text-sm uppercase tracking-[3px] sm:tracking-[4px] mb-2 sm:mb-3 lg:mb-4">
                        Connect With Us
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white font-serif font-light mb-6 sm:mb-7 lg:mb-8">
                        Follow Our Journey
                    </h2>

                    <div className="flex justify-center space-x-4 sm:space-x-5 lg:space-x-6 mb-8 sm:mb-10 lg:mb-12">
                        <a
                            href="#"
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-700 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                            <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                        </a>
                        <a
                            href="#"
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-700 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                            <FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                        </a>
                        <a
                            href="#"
                            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-700 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
                        >
                            <TwitterIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                        </a>
                    </div>

                    {/* Instagram Feed Preview */}
                    <div className="grid grid-cols-2  md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="relative group overflow-hidden rounded-lg aspect-square">
                                <img
                                    src={`https://images.unsplash.com/photo-${item === 1 ? "1519225421980-715cb0215aed" :
                                        item === 2 ? "1523438885200-e635ba2c371e" :
                                            item === 3 ? "1511795409834-ef04bbd61622" :
                                                "1469371670807-013ccf25f16a"
                                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                                    alt="Instagram feed"
                                    className="w-full h-full  object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="py-12 sm:py-16 lg:py-20 bg-amber-900 text-white">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-light mb-3 sm:mb-4 lg:mb-6">
                        Ready to Create Magic?
                    </h2>
                    <p className="text-sm sm:text-base lg:text-xl text-amber-200 max-w-2xl mx-auto mb-6 sm:mb-7 lg:mb-10 px-4">
                        Let's bring your vision to life. Book your complimentary consultation today.
                    </p>
                    <a
                        href="#"
                        className="inline-block bg-white text-amber-900 hover:bg-amber-100 px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 rounded-lg"
                    >
                        Schedule a Call
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;