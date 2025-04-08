import React from 'react'; 
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";
import project5 from "../assets/project5.png";
import { AiFillGithub } from 'react-icons/ai';
import { FaSquareUpwork } from "react-icons/fa6";
import ShinyEffect from './ShinyEffect';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const projects = [
    {
        img: project1,
        title: "Project #1",
        description: "A prototype of a mobile application for a food delivery service startup.",
        links: { site: "https://redirect.warisul.com/", github: "https://redirect.warisul.com/" },
    },
    {
        img: project2,
        title: "Project #2",
        description: "A MERN stack based frontend application for management of Linux containers and VMs.",
        links: { site: "https://redirect.warisul.com/", github: "https://redirect.warisul.com/" },
    },
    {
        img: project3,
        title: "Project #3",
        description: "A responsive portfolio website designed with modern stacks.",
        links: { site: "www.warisul.com", github: "https://github.com/wari-sul/portfolio-v1" },
    },
    {
        img: project4,
        title: "Project #4",
        description: "A native Android app for Gemini inspired from telegrams UI/UX design.",
        links: { site: "https://redirect.warisul.com/", github: "https://github.com/wari-sul/greed-chat" },
    },
    {
        img: project5,
        title: "Project #5",
        description: "A telegram bot utilizing Groq API for AI/ML based responses.",
        links: { site: "https://redirect.warisul.com/", github: "https://github.com/wari-sul/greed-bot" },
    },
    {
        type: 'video',
        iframeHtml: `<iframe title="vimeo-player" src="https://player.vimeo.com/video/1073144612?h=02089279fd&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>`, 
        title: "Project #6 - Fadescrapy Bot",
        description: "FadeScrapy, a Async Python/Telegram bot providing NBA/NCAAB betting insights & 'fade' alerts using Action Network API data stored in MongoDB.",
        links: { site: "https://www.upwork.com/freelancers/warisulrafin?p=1909192942170136576", github: "https://www.upwork.com/freelancers/warisulrafin?p=1909192942170136576" }, 
        linkType: 'upwork'
    },
];

const Portfolio = () => {


  return (
    <div className='my-12 md:my-16 max-w-[1200px] mx-auto px-4 md:px-6' id="portfolio">
      <h2 className='text-3xl md:text-4xl font-bold text-gray-200 text-center mb-12'>
      <span>My</span> Portfolio
      </h2>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'} 
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper w-full pb-10" 
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="!w-[80%] md:!w-[50%] lg:!w-[40%]"> {/* Adjust slide width */}
            <div className='glass rounded-lg overflow-hidden shadow-lg h-full flex flex-col'>
              {/* Media container - removed fixed aspect ratio */}
              <div className='w-full bg-black'> {/* Added bg-black for video letterboxing */}
                {project.type === 'video' ? (
                  // Responsive video container (16:9 aspect ratio)
                  <div className="relative w-full overflow-hidden pt-[56.25%]">
                     <div dangerouslySetInnerHTML={{ __html: project.iframeHtml }} />
                  </div>
                ) : (
                  // Image container
                  <ShinyEffect>
                    <img
                      src={project.img}
                      alt={project.title}
                      className='w-full h-auto object-contain max-h-[60vh]' 
                    />
                  </ShinyEffect>
                )}
              </div>
              <div className='p-6 flex flex-col flex-grow'> {/* Added flex-grow */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-200 mb-2">{project.title}</h3>
                <p className='text-gray-300 text-sm md:text-base mb-4 flex-grow'>{project.description}</p> {/* Removed line-clamp-4 */}
                <div className='flex space-x-4 mt-auto'> {/* Added mt-auto to push links down */}
                  <a href={project.links.site} target="_blank" rel="noopener noreferrer" className='px-4 py-2 bg-slate-600 text-gray-200 rounded-lg hover:bg-slate-700 transition duration-300 text-sm'>
                    View Site
                  </a>
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className='px-4 py-2 bg-gray-800 text-gray-200 text-2xl rounded-lg hover:bg-gray-600 transition duration-300'>
                    {project.linkType === 'upwork' ? <FaSquareUpwork /> : <AiFillGithub />}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Portfolio;