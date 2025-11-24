export interface Skill {
  id: string;
  name: string;
  value: number;
}

export interface Equipment {
  id: string;
  name: string;
  skillName: string;
  value: number;
}

export interface Template {
  name: string;
  skills: Skill[];
  equipment: Equipment[];
}

export interface SkillSummary {
  name: string;
  realValue: number;
  adjustedValue: number;
  boostValue: number;
}

export interface SavedTemplate extends Template {
  id: string;
  updatedAt: number;
}
