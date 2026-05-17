import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    videoUrl: z.string().optional(),
    links: z.object({
      site: z.string().url().optional(),
      github: z.string().url().optional()
    }),
    featured: z.boolean().default(false),
    order: z.number().default(0)
  })
});

const experienceCollection = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/experience" }),
  schema: z.object({
    title: z.string(),
    duration: z.string(),
    company: z.string().optional(),
    description: z.array(z.string()),
    result: z.string(),
    order: z.number().default(0)
  })
});

const skillsCollection = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/skills" }),
  schema: z.object({
    groupTitle: z.string(),
    order: z.number().default(0),
    skills: z.array(z.object({
      category: z.string(),
      items: z.array(z.string())
    }))
  })
});

export const collections = {
  'projects': projectsCollection,
  'experience': experienceCollection,
  'skills': skillsCollection
};
