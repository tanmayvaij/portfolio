// Props for IdCard component
interface IdCardProps {
  profileImageLink: string;
  fullName: string;
  roleImage: string;
  role: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  instagramLink: string;
  githubLink: string;
  linkedinLink: string;
}

// Props for AboutMeCard component
interface AboutMeProps {
  sectionTitle: string;
  content: string[];
}

// Props for SkillsCard components
interface SkillCardProps {
  sectionTitle: string;
  skills: string[];
}

interface SkillTagProps {
  skill: string;
}

// Props for ExpEduCard component
interface ExpEduCardProps {
  experiences: ExpCardProps[];
  education: EduCardProps[];
}

interface ExpCardProps {
  companyName: string;
  companyLogo: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EduCardProps {
  instituteName: string;
  institueLogo: string;
  education: string;
  startYear: string;
  endYear: string;
}

// Props for ProjectsCard component
interface SingleProjectProps {
  projectLink: string;
  projectTitle: string;
  projectDescription: string;
  projectImage: string;
}

interface ProjectsCardProps {
  sectionTitle: string;
  projects: SingleProjectProps[];
}
