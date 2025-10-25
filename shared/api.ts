/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Diploma Guide App Types

export type Branch =
  | "COMP"
  | "MECH"
  | "CIVIL"
  | "ELECTRICAL"
  | "ENTC"
  | "CHEMICAL"
  | "AUTOMOBILE"
  | "AI";

export interface BranchInfo {
  id: Branch;
  name: string;
  fullName: string;
  icon: string;
  color: string;
}

export const BRANCHES: Record<Branch, BranchInfo> = {
  COMP: {
    id: "COMP",
    name: "Computer",
    fullName: "Computer Engineering",
    icon: "💻",
    color: "#1E88E5",
  },
  MECH: {
    id: "MECH",
    name: "Mechanical",
    fullName: "Mechanical Engineering",
    icon: "⚙️",
    color: "#FF9800",
  },
  CIVIL: {
    id: "CIVIL",
    name: "Civil",
    fullName: "Civil Engineering",
    icon: "🏗️",
    color: "#795548",
  },
  ELECTRICAL: {
    id: "ELECTRICAL",
    name: "Electrical",
    fullName: "Electrical Engineering",
    icon: "⚡",
    color: "#FDD835",
  },
  ENTC: {
    id: "ENTC",
    name: "Electronics",
    fullName: "Electronics & Telecommunications",
    icon: "📡",
    color: "#E91E63",
  },
  CHEMICAL: {
    id: "CHEMICAL",
    name: "Chemical",
    fullName: "Chemical Engineering",
    icon: "🧪",
    color: "#673AB7",
  },
  AUTOMOBILE: {
    id: "AUTOMOBILE",
    name: "Automobile",
    fullName: "Automobile Engineering",
    icon: "🚗",
    color: "#00BCD4",
  },
  AI: {
    id: "AI",
    name: "Artificial Intelligence",
    fullName: "Artificial Intelligence",
    icon: "🤖",
    color: "#4CAF50",
  },
};

export type Semester = 1 | 2 | 3 | 4 | 5 | 6;

export interface Subject {
  id: string;
  name: string;
  code?: string;
}

export interface ResourceType {
  id: "notes" | "papers" | "manuals" | "lectures";
  name: string;
  icon: string;
}

export const RESOURCE_TYPES: ResourceType[] = [
  { id: "notes", name: "Notes", icon: "📘" },
  { id: "papers", name: "Previous Papers", icon: "📄" },
  { id: "manuals", name: "Practical Manuals", icon: "🧪" },
  { id: "lectures", name: "Live / YouTube Lectures", icon: "🎥" },
];

// Sample curriculum structure
export const CURRICULUM: Record<Branch, Record<Semester, Subject[]>> = {
  COMP: {
    1: [
      { id: "1-1", name: "Basic Mathematics", code: "BM101" },
      { id: "1-2", name: "Communication Skills", code: "CS101" },
      { id: "1-3", name: "ICT", code: "ICT101" },
      { id: "1-4", name: "Basic Science", code: "BS101" },
      { id: "1-5", name: "Computer Engineering", code: "CE101" },
    ],
    2: [
      { id: "2-1", name: "Data Structures", code: "DS201" },
      { id: "2-2", name: "Database Management", code: "DBM201" },
      { id: "2-3", name: "Web Development", code: "WD201" },
      { id: "2-4", name: "Networking", code: "NET201" },
    ],
    3: [
      { id: "3-1", name: "Software Engineering", code: "SE301" },
      { id: "3-2", name: "Operating Systems", code: "OS301" },
      { id: "3-3", name: "Advanced Database", code: "ADB301" },
      { id: "3-4", name: "Web Technologies", code: "WT301" },
    ],
    4: [
      { id: "4-1", name: "Cloud Computing", code: "CC401" },
      { id: "4-2", name: "Mobile Development", code: "MD401" },
      { id: "4-3", name: "AI/ML Basics", code: "ML401" },
    ],
    5: [
      { id: "5-1", name: "Advanced Web Dev", code: "AWD501" },
      { id: "5-2", name: "Cyber Security", code: "CS501" },
      { id: "5-3", name: "Capstone Project", code: "CAP501" },
    ],
    6: [
      { id: "6-1", name: "Industry Integration", code: "II601" },
      { id: "6-2", name: "Final Project", code: "FP601" },
    ],
  },
  MECH: {
    1: [
      { id: "1-1", name: "Engineering Mechanics", code: "EM101" },
      { id: "1-2", name: "Technical Drawing", code: "TD101" },
      { id: "1-3", name: "Basic Science", code: "BS101" },
    ],
    2: [
      { id: "2-1", name: "Thermodynamics", code: "THD201" },
      { id: "2-2", name: "Machine Design", code: "MD201" },
    ],
    3: [
      { id: "3-1", name: "Manufacturing Processes", code: "MP301" },
      { id: "3-2", name: "Fluid Mechanics", code: "FM301" },
    ],
    4: [
      { id: "4-1", name: "Heat Transfer", code: "HT401" },
      { id: "4-2", name: "Power Engineering", code: "PE401" },
    ],
    5: [
      { id: "5-1", name: "Industrial Automation", code: "IA501" },
    ],
    6: [
      { id: "6-1", name: "Final Project", code: "FP601" },
    ],
  },
  CIVIL: {
    1: [
      { id: "1-1", name: "Building Materials", code: "BM101" },
      { id: "1-2", name: "Surveying", code: "SUR101" },
    ],
    2: [
      { id: "2-1", name: "Structural Analysis", code: "SA201" },
    ],
    3: [
      { id: "3-1", name: "Design of Structures", code: "DS301" },
    ],
    4: [
      { id: "4-1", name: "Water Resources", code: "WR401" },
    ],
    5: [
      { id: "5-1", name: "Environmental Engg", code: "EE501" },
    ],
    6: [
      { id: "6-1", name: "Final Project", code: "FP601" },
    ],
  },
  ELECTRICAL: {
    1: [
      { id: "1-1", name: "Basic Electrical", code: "BE101" },
    ],
    2: [
      { id: "2-1", name: "Circuits & Systems", code: "CS201" },
    ],
    3: [
      { id: "3-1", name: "Electrical Machines", code: "EM301" },
    ],
    4: [
      { id: "4-1", name: "Power Systems", code: "PS401" },
    ],
    5: [
      { id: "5-1", name: "Control Systems", code: "CTL501" },
    ],
    6: [
      { id: "6-1", name: "Final Project", code: "FP601" },
    ],
  },
  ENTC: {
    1: [
      { id: "1-1", name: "Basic Electronics", code: "BE101" },
    ],
    2: [
      { id: "2-1", name: "Digital Electronics", code: "DE201" },
    ],
    3: [
      { id: "3-1", name: "Analog Circuits", code: "AC301" },
    ],
    4: [
      { id: "4-1", name: "Communication Systems", code: "COM401" },
    ],
    5: [
      { id: "5-1", name: "Signal Processing", code: "SP501" },
    ],
    6: [
      { id: "6-1", name: "Final Project", code: "FP601" },
    ],
  },
  CHEMICAL: {
    1: [
      { id: "1-1", name: "Chemistry Basics", code: "CB101" },
    ],
    2: [
      { id: "2-1", name: "Chemical Processes", code: "CP201" },
    ],
    3: [
      { id: "3-1", name: "Process Control", code: "PC301" },
    ],
    4: [
      { id: "4-1", name: "Plant Design", code: "PD401" },
    ],
    5: [
      { id: "5-1", name: "Safety Engineering", code: "SE501" },
    ],
    6: [
      { id: "6-1", name: "Final Project", code: "FP601" },
    ],
  },
  AUTOMOBILE: {
    1: [
      { id: "1-1", name: "Auto Basics", code: "AB101" },
    ],
    2: [
      { id: "2-1", name: "Engine Design", code: "ED201" },
    ],
    3: [
      { id: "3-1", name: "Chassis Design", code: "CH301" },
    ],
    4: [
      { id: "4-1", name: "Vehicle Dynamics", code: "VD401" },
    ],
    5: [
      { id: "5-1", name: "Automotive Systems", code: "AS501" },
    ],
    6: [
      { id: "6-1", name: "Final Project", code: "FP601" },
    ],
  },
  AI: {
    1: [
      { id: "1-1", name: "AI Fundamentals", code: "AI101" },
    ],
    2: [
      { id: "2-1", name: "Machine Learning", code: "ML201" },
    ],
    3: [
      { id: "3-1", name: "Deep Learning", code: "DL301" },
    ],
    4: [
      { id: "4-1", name: "NLP", code: "NLP401" },
    ],
    5: [
      { id: "5-1", name: "AI Applications", code: "AA501" },
    ],
    6: [
      { id: "6-1", name: "Capstone Project", code: "CAP601" },
    ],
  },
};
