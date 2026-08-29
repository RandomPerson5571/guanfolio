import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", type: "text", rows: 2, validation: (rule) => rule.required() }),
    defineField({ name: "longDescription", title: "Long description", type: "text", rows: 5 }),
    defineField({ name: "tags", type: "array", of: [defineArrayMember({ type: "string" })], options: { layout: "tags" } }),
    defineField({ name: "category", type: "string", options: { list: ["web", "security", "intelligence", "systems"], layout: "radio" }, validation: (rule) => rule.required() }),
    defineField({ name: "stats", title: "Status label", type: "string", description: "Short badge such as Active or Research." }),
    defineField({ name: "status", title: "Detailed status", type: "array", of: [defineArrayMember({ type: "string" })], options: { list: ["In-Progress", "Maintained", "Active", "Completed", "Deprecated", "Paused"] } }),
    defineField({ name: "year", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "link", title: "Live URL", type: "url" }),
    defineField({ name: "github", title: "GitHub URL", type: "url" }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "year" } },
});
