import React from 'react'
import project4 from '../assets/project4.png'
import project7 from '../assets/project7.png'
import { DiJavascript1, DiReact, DiNodejsSmall, DiHtml5, DiCss3, DiSass, DiBootstrap } from 'react-icons/di'

const SkillSection = () => (
  <div className='p-6 col-span-2 md:col-span-1'>
    <h2 className='text-gray-200 text-3xl font-bold mb-6'>Skills</h2>
    <div className='text-gray-300 mb-6 space-y-2'>
      <ul className='space-y-3'>
        {SKILLS_DATA.map((skill, index) => (
          <li key={index}>
            <b>{skill.category}:</b> {skill.items.join(', ')}
          </li>
        ))}
      </ul>
    </div>
    <TechIcons />
  </div>
)

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

const ExperienceSection = () => (
  <div className='p-6 col-span-2 md:col-span-1'>
    <h2 className='text-gray-200 text-3xl font-bold mb-6'>Experience</h2>
    <div className='text-gray-300 space-y-4'>
      {EXPERIENCE_DATA.map((exp, index) => (
        <div key={index} className="mb-4">
          <b>{exp.title}:</b> {exp.description} <i>Result: {exp.result}</i>
        </div>
      ))}
    </div>
  </div>
)

const SKILLS_DATA = [
    { category: 'Cloud Computing', items: ['AWS (EC2, S3, Lambda)', 'Oracle Cloud', 'DigitalOcean'] },
    { category: 'Virtualization', items: ['Proxmox', 'KVM'] },
    { category: 'Operating Systems', items: ['Linux (Ubuntu, Debian, Fedora, Arch)'] },
    { category: 'Networking', items: ['Cisco', 'Juniper', 'MikroTik', 'Ubiquiti'] },
    { category: 'Security', items: ['Firewall (OpenWrt, OPNsense)', 'IDS/IPS', 'VPN', 'PKI'] },
    { category: 'Programming', items: ['Python', 'Bash', 'JavaScript', 'HTML/CSS'] },
    { category: 'Web Development', items: ['React', 'Node.js', 'Express'] },
    { category: 'Distributed Systems', items: ['Kafka', 'RabbitMQ', 'Redis', 'Elasticsearch'] },
    { category: 'AI/ML', items: ['TensorFlow', 'PyTorch'] },
    { category: 'Monitoring', items: ['Prometheus', 'Grafana', 'ELK Stack'] },
    { category: 'CI/CD', items: ['Jenkins', 'GitLab CI', 'GitHub Actions'] },
    { category: 'Database', items: ['MySQL', 'PostgreSQL', 'SQLite', 'MongoDB'] },
    { category: 'Web Servers', items: ['Nginx', 'Apache', 'Caddy'] },
    { category: 'Containerization', items: ['Docker', 'Podman', 'Kubernetes'] },
    { category: 'Automation', items: ['Ansible', 'Terraform', 'Puppet'] },
    { category: 'Version Control', items: ['Git', 'GitHub', 'npm', 'Yarn'] },
    { category: 'Language Models (LLMs/SLMs)', items: ['Model Training', 'Fine-tuning', 'Quantization', 'Optimization'] },
    { category: 'Cloud Platforms', items: [
      'AWS (EC2, S3, Lambda, CloudFront, Route53)',
      'Oracle Cloud (OCI, VCN, Object Storage)',
      'GCP (Compute Engine, Cloud Storage)',
      'DigitalOcean (Droplets, Spaces)'
    ] },
    { category: 'API Development', items: ['RESTful', 'GraphQL', 'OAuth/JWT', 'OpenAPI/Swagger', 'gRPC'] }
  ];

const EXPERIENCE_DATA = [
  {
    title: 'Homelab Infrastructure Management',
    description: 'Built and maintained a homelab environment.',
    result: 'Gained practical experience in systems administration, networking, and security.'
  },
  {
    title: 'Cloud Platform Experience',
    description: 'Deployed and managed applications on AWS/Oracle Cloud/DigitalOcean.',
    result: 'Successfully launched and scaled applications/services.'
  },
  {
    title: 'Automation & Scripting',
    description: 'Developed Python scripts to automate tasks.',
    result: 'Reduced manual effort and improved efficiency.'
  }
];

const About = () => {
  return (
    <section className='mt-24 max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-52' id="about">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
        <SkillSection />
        <div className='space-y-8'>
          <ProjectCard image={project4} alt="project 4" />
          <ProjectCard image={project7} alt="project 7" />
        </div>
        <ExperienceSection />
      </div>
    </section>
  )
}

export default About