interface ResumeProps {
  intro: string;
  headline: string;
  profilePicture: string;
  contactInfo: {
    place: string;
    contact: string;
    email: string;
  };
  importantLinks?: {
    link: string;
    text: string;
  }[];
  summary: string;
  workExperience: ResumeEntryProps[];
  education: ResumeEntryProps[];
  skills: string[];
  projects: ProjectCardProps[];
}

interface ProjectCardProps {
  img: string;
  projectName: string;
  developmentPeriod: string;
  description: string;
  skills: string[];
  deploymentLink?: string;
  sourceCodeLink?: string;
}

interface ResumeEntryProps {
  logo: string;
  title: string;
  subTitle: string;
  timeLine: string;
  link: string;
}

interface SkillTagProps {
  skill: string;
}
