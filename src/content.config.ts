import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categories } from "./data/categories";

const allSubSlugs = categories.flatMap((c) => c.subcategories.map((s) => s.slug));

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    category: z.enum(["tech", "life", "notes"]).optional(),
    subcategory: z.enum(allSubSlugs as [string, ...string[]]).optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
