import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://getform.io/f/amddlekb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) throw new Error('Failed to send message');
        
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className='mt-24 md:mt-16 px-6 max-w-[1000px] mx-auto grid md:grid-cols-2' id="contact">





            <form onSubmit={handleSubmit} className='max-w-6xl p-5 md:p-12 md:col-span-2' id="form">
              <p className='text-gray-100 font-bold text-xl mb-2'>Let´s connect!</p>
              
              {error && (
                <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-500/20 text-green-200 p-3 rounded-lg mb-4">
                  Message sent successfully!
                </div>
              )}
      
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                autoComplete="name"
                className="w-full p-3 bg-[#18191E] mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color text-white placeholder-gray-400"
              />
              
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                autoComplete="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className="w-full p-3 bg-[#18191E] mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color text-white placeholder-gray-400"
              />
              
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                autoComplete="off"
                className="w-full p-3 bg-[#18191E] mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color text-white placeholder-gray-400"
              />
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 rounded-lg bg-primary-color text-white font-bold
                           hover:opacity-90 transition duration-300
                           ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
    );
};

export default Contact;