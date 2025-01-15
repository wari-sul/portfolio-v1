import React, { useState } from 'react';
//import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'

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
      <div className='mt-24 px-6 max-w-[1000px] mx-auto grid md:grid-cols-2 place-items-center' id="contact">



            <div>
                <div className="p-2">
                    <div className="text-gray-300 my-3">
                        <h3 className="text-4xl font-semibold mb-5">About <span>Me</span></h3>
                        <p className="text-justify leading-7 w-11/12 mx-auto">
                        I'm a versatile IT professional passionate about building robust and scalable infrastructure. 
                        My expertise lies in systems administration, virtualization, and containerization, leveraging 
                        technologies like Proxmox, Docker, and Kubernetes. I excel at automating and optimizing 
                        infrastructure and thrive in challenging roles, particularly in DevOps or SRE. I'm a continuous 
                        learner, always expanding my skillset with the latest technologies.
                        </p>     
                    </div>
                </div> 
                

                <div className="flex mt-10 items-center gap-7">
                    <div className="bg-[#333333]/40 p-5 rounded-lg">
                        <h3 className="md:text-4xl text-2xl font-semibold text-white">9
                            <span>+</span>
                        </h3>
                        <p><span className="md:text-base text-xs">Projects</span></p>
                    </div>
                    <div className="bg-[#333333]/40 p-5 rounded-lg">
                        <h3 className="md:text-4xl text-2xl font-semibold text-white">3
                            <span>+</span>
                        </h3>
                        <p><span className="md:text-base text-xs">years experience</span></p>
                    </div>
                    <div className="bg-[#333333]/40 p-5 rounded-lg">
                        <h3 className="md:text-4xl text-2xl font-semibold text-white">11
                            <span>+</span>
                        </h3>
                        <p><span className="md:text-base text-xs">happy clients</span></p>
                    </div>
                </div>



            </div>




            <form onSubmit={handleSubmit} className='max-w-6xl p-5 md:p-12' id="form">
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