import React, {useState} from 'react'
import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";
import project4 from "../assets/project4.png";
import project5 from "../assets/project5.png";
import project6 from "../assets/project6.png";
import arrow from "../assets/arrow.png";
import { AiFillGithub } from 'react-icons/ai'
import ShinyEffect from './ShinyEffect';

const projects = [
    {
        img: project1,
        title: "Project #1",
        description:
          "A prototype of a mobile application for a food delivery service startup.",
        links: {
          site: "#",
          github: "#",
        },
      },
      {
        img: project2,
        title: "Project #2",
        description: "A MERN stack based frontend application for management of Linux containers and VMs .",
        links: {
          site: "#",
          github: "#",
        },
      },
      {

        img: project3,
        title: "Project #3",
        description: "A responsive portfolio website designed with modern stacks.",
        links: {
          site: "www.warisul.com",
          github: "#", 
        },
      },
      {
        img: project4,
        title: "Project #4",
        description:
          "A native Android app for Gemini inspired from telegrams UI/UX design.",
        links: {
          site: "#",
          github: "#",
        },
      },
      {
        img: project5,
        title: "Project #5",
        description: "A telegram bot utilizing Groq API for AI/ML based responses.",
        links: {
          site: "#",
          github: "#",
        },
      },
/*{
      {
        img: project6,
        title: "Project #6",
        description:
          "A data visualization project using D3.js and other libraries.",
        links: {
          site: "#",
          github: "#",
        },
      } */
]

const Portfolio = () => {
    const [currentProject, setCurrentProject] = useState(0)

  return (
    <div className='my-6 max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-8 gap-6 md:py-40' id="portfolio">


<div className='z-10 col-span-1 md:col-span-3 grid place-items-center grid-cols-1 relative'>
 <div className='relative w-full flex flex-col items-center md:items-start'>
   <p className='text-gray-200 font-bold text-3xl md:text-4xl md:-skew-y-6'>Select Project</p>
   <img src={arrow} className='hidden md:block absolute w-[50px] top-10 right-12'/>
  </div>

  <ul className='flex flex-wrap justify-center w-full gap-4 md:flex-col md:gap-1
                 md:space-y-4 text-xl md:text-2xl mt-4 md:mt-0'>
    {projects.map((project, index) => (
      <li
        key={index}
        onClick={() => setCurrentProject(index)}
        className={`cursor-pointer text-gray-300 rounded-lg px-2 text-center
                     hover:bg-slate-600 transition duration-300 ${
                  currentProject === index ? 'active-project' : ''
        }`}
      >
        {project.title}
      </li>
    ))}
  </ul>
</div>

        




        <div className='z-10 glass  w-full border-2 col-span-5'>
            <div className='w-full h-80'>
                <img src={projects[currentProject].img} alt={projects[currentProject].title} 
                className='w-full h-full object-cover rounded-lg mb-4'/>
            </div>


            <div className='p-6'>
              <p className='text-gray-200 my-4'>
                  {projects[currentProject].description}
              </p>
              <div className='flex space-x-4'>
                  <a href={projects[currentProject].links.site} className='px-4 py-2 bg-slate-600
                   text-gray-200 rounded-lg hover:bg-slate-700 transition duration-300'>View Site</a>
                  <a href={projects[currentProject].links.github} className='px-4 py-2 bg-gray-800
                   text-gray-200 text-2xl rounded-lg hover:bg-gray-600 transition duration-300'>
                    <AiFillGithub/>
                    </a>
              </div>
            </div>
            
        </div>


    </div>
  )
}

export default Portfolio