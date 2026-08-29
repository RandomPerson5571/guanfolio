import { defineArrayMember, defineField, defineType } from "sanity";

export const portfolioSettings = defineType({
  name: "portfolioSettings",
  title: "Portfolio settings",
  type: "document",
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "profile", validation: (rule) => rule.required() }),
    defineField({ name: "alias", title: "Terminal alias", type: "string", group: "profile" }),
    defineField({ name: "title", title: "Professional title", type: "string", group: "profile" }),
    defineField({ name: "bio", title: "Biography", type: "text", rows: 4, group: "profile" }),
    defineField({ name: "profileImage", title: "Profile image", type: "image", options: { hotspot: true }, group: "profile" }),
    defineField({ name: "location", title: "Location", type: "string", group: "contact" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact", validation: (rule) => rule.email() }),
    defineField({ name: "github", title: "GitHub URL", type: "url", group: "contact" }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      group: "contact",
      of: [defineArrayMember({ type: "object", fields: [
        defineField({ name: "platform", type: "string", validation: (rule) => rule.required() }),
        defineField({ name: "url", type: "url", validation: (rule) => rule.required().uri({ allowRelative: false, scheme: ["http", "https", "mailto"] }) }),
        defineField({ name: "username", type: "string", validation: (rule) => rule.required() }),
      ], preview: { select: { title: "platform", subtitle: "username" } } })],
    }),
  ],
  preview: { prepare: () => ({ title: "Portfolio settings" }) },
});
