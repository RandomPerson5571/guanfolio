export interface clientInfo {
  name: string;
  alias: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  skills: {
    name: string;
    level: number;
  }[];
}
