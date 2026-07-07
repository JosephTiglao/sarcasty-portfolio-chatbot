import { loadJson } from "../lib/fileLoader.mjs";

export const knowledge = {
  profile: loadJson("profile.json"),
  skills: loadJson("skills.json"),
  projects: loadJson("projects.json"),
  contact: loadJson("contacts.json"),
  faq: loadJson("faq.json"),
};
