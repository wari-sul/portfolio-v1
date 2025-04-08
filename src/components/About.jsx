import React, { useState } from 'react'
import project4 from '../assets/project4.png'
import project7 from '../assets/project7.png'
import { DiJavascript1, DiReact, DiNodejsSmall, DiHtml5, DiCss3, DiSass, DiBootstrap } from 'react-icons/di';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS_DATA_GROUPED } from '../data/skillsData';
import { EXPERIENCE_DATA } from '../data/experienceData';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};


const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};


const experienceContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};


const panelVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.15 } // Faster open
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.1 } // Faster close
  }
};

const SkillSection = () => {
  const [expanded, setExpanded] = useState(null);

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className='p-6 col-span-2 md:col-span-1'>
      <h2 className='text-gray-200 text-3xl font-bold mb-6'><span>Skills</span></h2>
      <div className='space-y-2'> {/* Accordion container */}
        {SKILLS_DATA_GROUPED.map((group, index) => (
          <motion.div
            key={group.groupTitle}
            className="bg-gray-800/50 rounded-lg overflow-hidden"

            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // Trigger slightly earlier
            transition={{ duration: 0.3, delay: index * 0.1 }} // Stagger entrance
          >
            <motion.button
              className="w-full p-4 text-left text-lg font-semibold text-gray-100 flex justify-between items-center"
              onClick={() => handleToggle(index)}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              {group.groupTitle}
              <motion.span
                animate={{ rotate: expanded === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                &#9660; {/* Down arrow */}
              </motion.span>
            </motion.button>
            <AnimatePresence initial={false}>
              {expanded === index && (
                <motion.div
                  key="content"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={panelVariants}
                  className="px-4 pb-4"
                >
                  {group.skills.map((skill) => (
                     <div key={skill.category} className="mb-2 last:mb-0">
                       <h4 className="font-medium text-gray-200">{skill.category}</h4>
                       <p className="text-sm text-gray-400 ml-2">{skill.items.join(', ')}</p>
                     </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const TechIcons = () => (
  <div className='md:flex flex-wrap gap-6 text-4xl justify-center hidden'>
    <DiHtml5 className="text-orange-600 hover:scale-110 transition-all duration-300" />
    <DiCss3 className="text-blue-600 hover:scale-110 transition-all duration-300" />
    <DiSass className="text-pink-600 hover:scale-110 transition-all duration-300" />
    <DiBootstrap className="text-purple-600 hover:scale-110 transition-all duration-300" />
    <DiJavascript1 className="text-yellow-500 hover:scale-110 transition-all duration-300" />
    <DiReact className="text-blue-500 hover:scale-110 transition-all duration-300" />
    <DiNodejsSmall className="text-green-500 hover:scale-110 transition-all duration-300" />
  </div>
)

const ProjectCard = ({ image, alt }) => (
  <div className='relative group w-full md:max-w-[600px] mb-8 md:mb-0'>
    <div className='w-full h-full absolute -inset-1 bg-gradient-to-r from-purple-100 to-orange-900 rounded-lg
                    blur opacity-25 group-hover:opacity-100 transition duration-300'></div>
    <div className='relative w-full p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg'>
      <img
        src={image}
        alt={alt}
        className='rounded-lg w-full md:max-w-[360px] hover:scale-105 transition-all duration-300'
        loading="lazy"
      />
    </div>
  </div>
)

const ExperienceSection = () => {
  const [expandedExp, setExpandedExp] = useState(null); // State for experience accordion

  const handleToggleExp = (index) => {
    setExpandedExp(expandedExp === index ? null : index);
  };

  return (
    <div className='p-6 col-span-2 md:col-span-1'>
      <h2 className='text-gray-200 text-3xl font-bold mb-6'><span>Experience</span></h2>
      <div className='space-y-2'> {/* Accordion container */}
        {EXPERIENCE_DATA.map((exp, index) => (
          <motion.div
            key={exp.title}
            className="bg-gray-800/50 rounded-lg overflow-hidden"
            // Animate each accordion item in
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: index * 0.15 }} // Slightly different stagger
          >
            <motion.button
              className="w-full p-4 text-left text-lg font-semibold text-gray-100 flex justify-between items-center"
              onClick={() => handleToggleExp(index)}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              {exp.title}
              <motion.span
                animate={{ rotate: expandedExp === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                &#9660; {/* Down arrow */}
              </motion.span>
            </motion.button>
            <AnimatePresence initial={false}>
              {expandedExp === index && (
                <motion.div
                  key="content"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={panelVariants} // Use same panel animation
                  className="px-4 pb-4 text-gray-300"
                >
                  <ul className="list-disc list-inside ml-2 mt-1 text-sm"> {/* Indent list */}
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                  <i className="block mt-2 text-xs text-gray-400">Result: {exp.result}</i> {/* Style result */}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


const FEATURED_PROJECTS = [
  { image: project4, alt: 'project 4' },
  { image: project7, alt: 'project 7' },
];

const About = () => {
  return (
    <section className='mt-24 max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16' id="about">
        <div className='mb-12'> {/* Added margin-bottom */}
            <div className="p-2">
                <div className="text-gray-300 my-3 text-center"> {/* Added text-center */}
                    <h3 className="text-4xl font-semibold mb-5">About <span>Me</span></h3>
                    <p className="text-justify leading-7 w-11/12 md:w-3/4 mx-auto"> {/* Adjusted width */}
                    I'm a versatile IT professional passionate about building robust and scalable infrastructure.
                    My expertise lies in systems administration, virtualization, and containerization, leveraging
                    technologies like Proxmox, Docker, and Kubernetes. I excel at automating and optimizing
                    infrastructure and thrive in challenging roles, particularly in DevOps or SRE. I'm a continuous
                    learner, always expanding my skillset with the latest technologies.
                    </p>
                </div>
            </div>

            <div className="flex mt-10 items-center gap-7 justify-center"> {/* Added justify-center */}
                <div className="bg-[#333333]/40 p-5 rounded-lg text-center"> {/* Added text-center */}
                    <h3 className="md:text-4xl text-2xl font-semibold text-white">9
                        <span>+</span>
                    </h3>
                    <p><span className="md:text-base text-xs">Projects</span></p>
                </div>
                <div className="bg-[#333333]/40 p-5 rounded-lg text-center"> {/* Added text-center */}
                    <h3 className="md:text-4xl text-2xl font-semibold text-white">3
                        <span>+</span>
                    </h3>
                    <p><span className="md:text-base text-xs">years experience</span></p>
                </div>
                <div className="bg-[#333333]/40 p-5 rounded-lg text-center"> {/* Added text-center */}
                    <h3 className="md:text-4xl text-2xl font-semibold text-white">11
                        <span>+</span>
                    </h3>
                    <p><span className="md:text-base text-xs">happy clients</span></p>
                </div>
            </div>
        </div>

      {/* Grid for Skills and Experience */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
        <SkillSection />
        <ExperienceSection />
      </div>

      {/* Featured Project Cards below the grid */}
      <div className='mt-16 flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-12'>
        {FEATURED_PROJECTS.map((project, index) => (
          <ProjectCard key={index} image={project.image} alt={project.alt} />
        ))}
      </div>
    </section>
  )
}

export default About