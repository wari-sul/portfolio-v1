import React from "react";
import profilepic from "../assets/ppic.png";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { VscAzure } from "react-icons/vsc";
import { 
  DiJavascript1, 
  DiReact, 
  DiNodejsSmall, 
  DiHtml5, 
  DiCss3, 
  DiSass, 
  DiBootstrap,
  DiMongodb, 
  DiGit, 
  DiJava, 
  DiPython, 
  DiNginx, 
  DiLinux, 
  DiPostgresql,
  DiNpm,
  DiStreamline,
} from 'react-icons/di';

import {
  SiCloudflare,
  SiProxmox,
  SiFigma,
  SiKaggle,
  SiOpenstack,
  SiFreebsd,
  SiOpenwrt,
  SiOpnsense,
  SiVite,
  SiOracle,
  SiAmazonwebservices,
  SiAngular,
  SiDocker,
  SiApache,
  SiOpengl,
} from 'react-icons/si';
import ShinyEffect from "./ShinyEffect";



const Hero = () => {
  return (
    <div className="max-w-[1200px] mx-auto grid md:grid-cols-8 gap-6 p-10 md:p-0 md:py-40" id="home">



      <div className="grid grid-cols-2 md:col-span-5 glass p-8">

      <div className="my-auto">
        <img
          className="w-[800px] mx-auto h-auto "
          src={profilepic}
          alt="profile pic"
        />
      </div>



      <div className="my-auto ml-8  flex-col">
        <p className="text-2xl md:text-4xl font-bold text-gray-200">
          Hi! I am <br/> SM WARISUL ALAM RAFIN <br/>
          <span className="inline-block h-[2em] md:h-[2.5em] overflow-hidden">
           <TypeAnimation
               sequence={[
                 "SysOps",
                 1000,
                 "Cloud Architect",
                 1000,
                 "AI/ML Dev",
                 1000,
                 "Network Admin",
                 1000,
                 "Cloud Security Researcher",
                 1000,
                 "Homelab Enthusiast",
                 1000,
                 "DevOps",
                 1000,
                 "SRE",
                 1000,
                 "Web Dev",
                 1000,
                 "Blockchain Dev",
                 1000,
                 "Cybersecurity Analyst",
                 1000,
                 "Tech Blogger",
                 1000,
                 "OSS Contributor",
                 1000,
   
   
               ]}
               wrapper="span"
               speed={50}
               repeat={Infinity}
               className="block text-lg md:text-2xl lg:text-4xl leading-normal md:leading-relaxed"
             />
           </span>  
        </p>

          <p className="text-xl md:text-3xl font-bold text-gray-500">
            with a 3+ years experience
          </p>
          <button
           onClick={() => window.open('/', '_blank')}
           title="Download CV"
           type="button"
           className="mt-4 px-4 py-2 text-lg font-bold text-white bg-primary-color rounded-xl 
                     hover:scale-105 transition-transform duration-300">
           Download CV
         </button>
      </div>
      </div>


      <div className="grid grid-cols-1  md:col-span-3 gap-6">       
        <div className="text-4xl sm:text-5xl p-6 sm:p-12 glass">
          <p className="text-gray-200 text-xl font-bold mb-4 text-center">My Tech Stack</p>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Wrap each icon with ShinyEffect */}
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
             <DiHtml5 className="text-orange-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiCss3 className="text-blue-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiSass className="text-pink-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiBootstrap className="text-purple-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiJavascript1 className="text-yellow-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiReact className="text-blue-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiNodejsSmall className="text-green-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiCloudflare className="text-orange-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiProxmox className="text-[#E57000]" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiLinux className="text-yellow-200" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiFigma className="text-purple-400" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiNginx className="text-green-400" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiMongodb className="text-green-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiGit className="text-red-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiJava className="text-red-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiKaggle className="text-blue-400" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiApache className="text-red-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiNpm className="text-red-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiOpenstack className="text-red-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiPostgresql className="text-blue-700" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiPython className="text-yellow-300" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <DiStreamline className="text-blue-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiOpengl className="text-blue-400" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiFreebsd className="text-red-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiOpenwrt className="text-blue-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiOpnsense className="text-purple-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiVite className="text-yellow-400" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiOracle className="text-red-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiAmazonwebservices className="text-yellow-500" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <VscAzure className="text-blue-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiAngular className="text-red-600" />
            </ShinyEffect>
            <ShinyEffect className="hover:scale-110 transition-all duration-300 flex justify-center items-center">
              <SiDocker className="text-blue-500" />
            </ShinyEffect>
             
          </div>          
        </div>
        

        <div className="flex flex-col justify-center items-center gap-4 glass text-gray-600">
          <p className="text-gray-200 text-xl font-bold mb-4 text-center">Connect with me</p>
          <div className="text-6xl flex justify-center gap-4">
            <a 
              href="https://github.com/wari-sul" 
              className="text-gray-400 hover:text-gray-200 hover:scale-110 transition-all duration-300 flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub size={58} />
            </a>
            <a 
              href="https://www.linkedin.com/in/warisul-rafin" 
              className="text-gray-400 hover:text-gray-200 hover:scale-110 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillLinkedin/>
            </a>
            <a 
              href="https://www.instagram.com/anxiety_kunn" 
              className="text-gray-400 hover:text-gray-200 hover:scale-110 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillInstagram/>
            </a>
            <a 
              href="https://t.me/officialRafin" 
              className="text-gray-400 hover:text-gray-200 hover:scale-110 transition-all duration-300 flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegram size={50} />
            </a>
          </div>
        </div>
          

        

      </div>




    </div>
  );
};

export default Hero;
