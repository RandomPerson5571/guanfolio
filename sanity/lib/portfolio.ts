import "server-only";

import {
  FALLBACK_PORTFOLIO_DATA,
  type PortfolioData,
} from "@/app/data/portfolio";
import type { clientInfo } from "@/app/types/clientInfo";
import type {
  BlogPost,
  Education,
  Experience,
  ExtraSkills,
  Project,
  SocialLink,
} from "@/app/types/types";
import { isSanityConfigured } from "../env";
import { sanityClient } from "./client";
import { portfolioQuery } from "./queries";

interface SanityPortfolioResult {
  settings: (Partial<clientInfo> & {
    socials?: SocialLink[];
    experience?: Experience[];
    education?: Education[];
    awards?: string[];
    extraSkills?: Partial<ExtraSkills>;
  }) | null;
  resume: {
    resumeUrl?: string;
    skills?: clientInfo["skills"];
    experience?: Experience[];
    education?: Education[];
    awards?: string[];
    extraSkills?: Partial<ExtraSkills>;
  } | null;
  projects: Project[];
  blogPosts: BlogPost[];
}

export async function getPortfolioData(): Promise<PortfolioData> {
  if (!isSanityConfigured) return FALLBACK_PORTFOLIO_DATA;

  try {
    const result = await sanityClient.fetch<SanityPortfolioResult>(
      portfolioQuery,
      {},
      { next: { revalidate: 60 } },
    );
    const settings = result.settings;
    const resume = result.resume;
    const skills = resume?.skills?.length
      ? resume.skills
      : settings?.skills?.length
        ? settings.skills
        : FALLBACK_PORTFOLIO_DATA.clientInfo.skills;

    return {
      clientInfo: {
        ...FALLBACK_PORTFOLIO_DATA.clientInfo,
        name: settings?.name || FALLBACK_PORTFOLIO_DATA.clientInfo.name,
        alias: settings?.alias || FALLBACK_PORTFOLIO_DATA.clientInfo.alias,
        title: settings?.title || FALLBACK_PORTFOLIO_DATA.clientInfo.title,
        bio: settings?.bio || FALLBACK_PORTFOLIO_DATA.clientInfo.bio,
        location:
          settings?.location || FALLBACK_PORTFOLIO_DATA.clientInfo.location,
        email: settings?.email || FALLBACK_PORTFOLIO_DATA.clientInfo.email,
        github: settings?.github || FALLBACK_PORTFOLIO_DATA.clientInfo.github,
        profileImageUrl: settings?.profileImageUrl,
        skills,
      },
      projects: result.projects?.length
        ? result.projects
        : FALLBACK_PORTFOLIO_DATA.projects,
      blogPosts: result.blogPosts?.length
        ? result.blogPosts
        : FALLBACK_PORTFOLIO_DATA.blogPosts,
      socials: settings?.socials?.length
        ? settings.socials
        : FALLBACK_PORTFOLIO_DATA.socials,
      experience: resume?.experience?.length
        ? resume.experience
        : settings?.experience?.length
          ? settings.experience
        : FALLBACK_PORTFOLIO_DATA.experience,
      education: resume?.education?.length
        ? resume.education
        : settings?.education?.length
          ? settings.education
        : FALLBACK_PORTFOLIO_DATA.education,
      awards: resume?.awards?.length
        ? resume.awards
        : settings?.awards?.length
          ? settings.awards
        : FALLBACK_PORTFOLIO_DATA.awards,
      extraSkills: {
        languages: resume?.extraSkills?.languages?.length
          ? resume.extraSkills.languages
          : settings?.extraSkills?.languages?.length
            ? settings.extraSkills.languages
          : FALLBACK_PORTFOLIO_DATA.extraSkills.languages,
        tools: resume?.extraSkills?.tools?.length
          ? resume.extraSkills.tools
          : settings?.extraSkills?.tools?.length
            ? settings.extraSkills.tools
          : FALLBACK_PORTFOLIO_DATA.extraSkills.tools,
        interests: resume?.extraSkills?.interests?.length
          ? resume.extraSkills.interests
          : settings?.extraSkills?.interests?.length
            ? settings.extraSkills.interests
          : FALLBACK_PORTFOLIO_DATA.extraSkills.interests,
      },
      resumeUrl: resume?.resumeUrl || FALLBACK_PORTFOLIO_DATA.resumeUrl,
    };
  } catch (error) {
    console.error("Unable to load portfolio content from Sanity:", error);
    return FALLBACK_PORTFOLIO_DATA;
  }
}
