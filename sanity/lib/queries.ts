import { defineQuery } from "next-sanity";

export const portfolioQuery = defineQuery(`{
  "settings": *[_type == "portfolioSettings" && _id == "portfolioSettings"][0]{
    name,
    alias,
    title,
    bio,
    location,
    email,
    github,
    "profileImageUrl": profileImage.asset->url,
    "skills": coalesce(skills[]{name, level}, []),
    "socials": coalesce(socials[]{platform, url, username}, []),
    "experience": coalesce(experience[]{"id": coalesce(id.current, _key), role, organization, date, description}, []),
    "education": coalesce(education[]{school, address, degree, date, notes}, []),
    "awards": coalesce(awards, []),
    extraSkills{
      "languages": coalesce(languages, []),
      "tools": coalesce(tools, []),
      "interests": coalesce(interests, [])
    }
  },
  "resume": *[_type == "resume" && _id == "resume"][0]{
    "resumeUrl": resumeFile.asset->url,
    "skills": coalesce(skills[]{name, level}, []),
    "experience": coalesce(experience[]{"id": coalesce(id.current, _key), role, organization, date, description}, []),
    "education": coalesce(education[]{school, address, degree, date, notes}, []),
    "awards": coalesce(awards, []),
    extraSkills{
      "languages": coalesce(languages, []),
      "tools": coalesce(tools, []),
      "interests": coalesce(interests, [])
    }
  },
  "projects": *[_type == "project"] | order(order asc, year desc){
    "id": slug.current,
    title,
    description,
    longDescription,
    "tags": coalesce(tags, []),
    link,
    github,
    "status": coalesce(status, []),
    category,
    stats,
    year
  },
  "blogPosts": *[_type == "blogPost"] | order(order asc, publishedAt desc){
    "id": slug.current,
    title,
    "date": coalesce(displayDate, publishedAt),
    readTime,
    excerpt,
    "content": coalesce(content, ""),
    "tags": coalesce(tags, [])
  }
}`);
