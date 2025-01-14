import React from 'react'
import project4 from '../assets/project4.png'
import project7 from '../assets/project7.png'
import {
    DiJavascript1,
    DiReact,
    DiNodejsSmall,
    DiHtml5,
    DiCss3,
    DiSass,
    DiBootstrap
} from 'react-icons/di'
const About = () => {
  return (
    <div className='mt-24 max-w-[1000px] mx-auto p-6 grid grid-cols-2 gap-8 place-items-center md:py-52' id="about">

<div className='p-6 col-span-2 md:col-span-1'> {/* Skills Section */}
                <h2 className='text-gray-200 text-3xl font-bold mb-4'>Skills</h2>
                 <div className='text-gray-300 mb-4' dangerouslySetInnerHTML={{ __html: `
                    <ul>
                        <li><b>Cloud Computing:</b> AWS (EC2, S3, Lambda), Oracle Cloud, DigitalOcean</li>
                        <li><b>Virtualization:</b> Proxmox, KVM</li>
                        <li><b>Operating Systems:</b> Linux (Ubuntu, Debian, Fedora)</li>
                        <li><b>Networking:</b> Routing, DNS, Firewalls (OpenWrt, OPNsense), VPNs</li>
                        <li><b>Security:</b> Intrusion Detection/Prevention, Security Hardening, Cloud Security</li>
                        <li><b>Containerization & Orchestration:</b> Docker, Podman, Kubernetes</li>
                        <li><b>Automation & Scripting:</b> Python, Bash, Java, Terraform, Ansible</li>
                        <li><b>CI/CD:</b> Jenkins, GitLab CI, GitHub Actions</li>
                        <li><b>Data Storage & Management:</b> NAS solutions, Cloud storage services</li>
                        <li><b>Blockchain & Distributed Systems:</b>  Specific protocols/platforms</li>
                        <li><b>AI/ML:</b> LLMs, OpenAI API, Google Gemini API, Telegram Bots</li>
                        <li><b>Web Servers & Services:</b> Apache, Nginx, Cloudflare</li>
                    </ul>
                `}} />
                <div className='md:flex flex-wrap gap-4 text-4xl justify-center hidden'>
                <DiHtml5 className="text-orange-600" />
                <DiCss3 className="text-blue-600" />
                <DiSass className="text-pink-600" />
                <DiBootstrap className="text-purple-600" />
                <DiJavascript1 className="text-yellow-500" />
                <DiReact className="text-blue-500" />
                <DiNodejsSmall className="text-green-500" />
                </div>
            </div>

           <div className='relative group max-w-[600px]'> {/* Projects Section */}
               <div className='w-full h-full absolute -inset-1 bg-gradient-to-r from-purple-100 to-orange-900 rounded-lg
                               blur opacity-25 group-hover:opacity-100 transition duration-300'></div>    
               <div className='relative w-full p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg'>
                   <img src={project4} alt="project 4" className='rounded-lg md:max-w-[520px]' />
               </div>
           </div>

           <div className='relative group'>
            <div className='w-full h-full absolute -inset-1 bg-gradient-to-r from-purple-100 to-orange-900 rounded-lg
                               blur opacity-25 group-hover:opacity-100 transition duration-300'></div>
            <div className='relative w-full p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg'>
                <img src={project7} alt="project 7" className='rounded-lg md:max-w-[500px]' />
            </div>
        </div>

        <div className='p-6 col-span-2 md:col-span-1'> {/* Experiences Section */}
                <h2 className='text-gray-200 text-3xl font-bold mb-4'>Experience</h2>
                <div className='text-gray-300 mb-4' dangerouslySetInnerHTML={{ __html: `
                    <ul>
                        <li><b>Homelab Infrastructure Management:</b> Built and maintained a homelab environment. <i>Result: Gained practical experience in systems administration, networking, and security.</i></li>
                        <li><b>Cloud Platform Experience:</b> Deployed and managed applications on AWS/Oracle Cloud/DigitalOcean. <i>Result: Successfully launched and scaled applications/services.</i></li>
                        <li><b>Automation & Scripting:</b> Developed Python scripts to automate tasks. <i>Result: Reduced manual effort and improved efficiency.</i></li>
                        <li><b>Other Relevant Experiences:</b> List other experiences and quantify achievements.</li>
                    </ul>
                `}} />
            </div>
        
    </div>
  )
}

export default About