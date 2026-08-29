import { defineArrayMember, defineField, defineType } from "sanity";

export const resume = defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  groups: [
    { name: "document", title: "Document", default: true },
    { name: "skills", title: "Skills" },
    { name: "experience", title: "Experience" },
    { name: "credentials", title: "Education & awards" },
  ],
  fields: [
    defineField({
      name: "resumeFile",
      title: "Resume PDF",
      type: "file",
      group: "document",
      description: "The PDF downloaded from the portfolio's Resume window.",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "skills",
      title: "Core skills",
      type: "array",
      group: "skills",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "level",
              type: "number",
              validation: (rule) => rule.required().min(0).max(100),
            }),
          ],
          preview: { select: { title: "name", subtitle: "level" } },
        }),
      ],
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      group: "experience",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Identifier",
              type: "slug",
              options: { source: "role" },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "role",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "organization",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "date",
              title: "Date range",
              type: "string",
            }),
            defineField({
              name: "description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "role", subtitle: "organization" } },
        }),
      ],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      group: "credentials",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "school",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "address", type: "string" }),
            defineField({
              name: "degree",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "date",
              title: "Date range",
              type: "string",
            }),
            defineField({ name: "notes", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "degree", subtitle: "school" } },
        }),
      ],
    }),
    defineField({
      name: "awards",
      title: "Awards",
      type: "array",
      group: "credentials",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "extraSkills",
      title: "Languages, tools, and interests",
      type: "object",
      group: "skills",
      fields: [
        defineField({
          name: "languages",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "tools",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "interests",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Resume" }) },
});
