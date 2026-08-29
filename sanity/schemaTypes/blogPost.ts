import { defineArrayMember, defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({ name: "displayDate", title: "Display date", type: "string", description: "Optional friendly date, for example May 14, 2026." }),
    defineField({ name: "readTime", title: "Read time", type: "string", initialValue: "5 min read" }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "content", title: "Article content", type: "text", rows: 15, description: "Plain text. Separate paragraphs with blank lines; prefix headings with ###." }),
    defineField({ name: "tags", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "displayDate" } },
});
