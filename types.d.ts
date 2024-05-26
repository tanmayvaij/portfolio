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

interface AboutMeProps {
  sectionTitle: string;
  content: string[];
}

interface SkillCardProps {
  sectionTitle: string;
  skills: string[];
}

interface SkillTagProps {
  skill: string;
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

interface SingleProjectProps {
  projectLink: string;
  projectTitle: string;
  projectDescription: string;
}

interface ProjectsCardProps {
  sectionTitle: string;
  projects: SingleProjectProps[];
}
