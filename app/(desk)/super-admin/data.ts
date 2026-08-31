export const session = "2025/2026";
export const officer = {
  name: "Prof. Uju Clara Umo",
  role: "Director",
  initials: "CU",
};

export const kpis = [
  {
    label: "Academic programmes",
    value: "428",
    hint: "NUC-approved, all campuses",
    delta: "+6 this cycle",
  },
  {
    label: "Full accreditation",
    value: "91%",
    hint: "Last NUC panel, 2025",
    delta: "+4 pts",
  },
  {
    label: "Faculties & institutes",
    value: "17",
    hint: "Nsukka · Enugu · Ituku-Ozalla",
    delta: "Stable",
  },
  {
    label: "Resource files",
    value: "12",
    hint: "Awaiting Directorate review",
    delta: "3 overdue",
  },
];

export const facultyAccreditation = [
  { faculty: "Arts", full: 86, interim: 10, due: 4 },
  { faculty: "Biological Sciences", full: 78, interim: 16, due: 6 },
  { faculty: "Business Administration", full: 88, interim: 8, due: 4 },
  { faculty: "Education", full: 92, interim: 6, due: 2 },
  { faculty: "Engineering", full: 74, interim: 18, due: 8 },
  { faculty: "Law", full: 90, interim: 10, due: 0 },
  { faculty: "Medicine", full: 82, interim: 12, due: 6 },
  { faculty: "Pharmaceutical Sciences", full: 94, interim: 6, due: 0 },
  { faculty: "Physical Sciences", full: 80, interim: 14, due: 6 },
  { faculty: "Social Sciences", full: 85, interim: 11, due: 4 },
  { faculty: "Veterinary Medicine", full: 88, interim: 8, due: 4 },
  { faculty: "Agriculture", full: 83, interim: 12, due: 5 },
];

export type ProgrammeStatus = "Full" | "Interim" | "Due" | "Denied";

export const programmes = [
  {
    code: "CSC",
    name: "B.Sc. Computer Science",
    faculty: "Physical Sciences",
    campus: "Nsukka",
    status: "Full" as ProgrammeStatus,
    visit: "Mar 2028",
  },
  {
    code: "MED",
    name: "MBBS",
    faculty: "Medicine",
    campus: "Ituku-Ozalla",
    status: "Interim" as ProgrammeStatus,
    visit: "Nov 2026",
  },
  {
    code: "LAW",
    name: "LL.B. Law",
    faculty: "Law",
    campus: "Enugu",
    status: "Full" as ProgrammeStatus,
    visit: "Jun 2027",
  },
  {
    code: "CVE",
    name: "B.Eng. Civil Engineering",
    faculty: "Engineering",
    campus: "Nsukka",
    status: "Due" as ProgrammeStatus,
    visit: "Sep 2026",
  },
  {
    code: "PHA",
    name: "B.Pharm.",
    faculty: "Pharmaceutical Sciences",
    campus: "Nsukka",
    status: "Full" as ProgrammeStatus,
    visit: "Jan 2028",
  },
  {
    code: "ENG",
    name: "B.A. English & Literary Studies",
    faculty: "Arts",
    campus: "Nsukka",
    status: "Full" as ProgrammeStatus,
    visit: "Oct 2027",
  },
  {
    code: "DVM",
    name: "Doctor of Veterinary Medicine",
    faculty: "Veterinary Medicine",
    campus: "Nsukka",
    status: "Interim" as ProgrammeStatus,
    visit: "Feb 2027",
  },
  {
    code: "SED",
    name: "B.Ed. Science Education",
    faculty: "Education",
    campus: "Nsukka",
    status: "Due" as ProgrammeStatus,
    visit: "Oct 2026",
  },
];

export const diary = [
  {
    date: "28 Aug",
    title: "Senate: 2026/2027 academic calendar",
    place: "Council Chambers",
  },
  {
    date: "2 Sep",
    title: "NUC resource visit — Faculty of Law",
    place: "Enugu Campus",
  },
  {
    date: "8 Sep",
    title: "BMAS workshop for new programmes",
    place: "APU Conference Room",
  },
  {
    date: "12 Sep",
    title: "Enrolment statistics lock",
    place: "All faculties",
  },
  {
    date: "19 Sep",
    title: "Directorate review of resource files",
    place: "Vice-Chancellor’s Office",
  },
];

export const notices = [
  {
    tag: "NUC",
    title: "Revised BMAS for Computing programmes circulated",
    time: "Today",
  },
  {
    tag: "Senate",
    title: "First-semester results window closes 30 August",
    time: "Yesterday",
  },
  {
    tag: "Campus",
    title: "Ituku-Ozalla facility audit returned for correction",
    time: "21 Aug",
  },
];

export const resources = [
  {
    unit: "Faculty of Engineering",
    item: "Staff mix (professorial cadre)",
    status: "Shortfall",
    note: "3 additional readers required",
  },
  {
    unit: "Faculty of Law",
    item: "Moot court & library seating",
    status: "Ready",
    note: "Cleared for NUC visit",
  },
  {
    unit: "Faculty of Medicine",
    item: "Clinical teaching beds",
    status: "Review",
    note: "UNTH figures pending",
  },
  {
    unit: "Physical Sciences",
    item: "Computer laboratory workstations",
    status: "Shortfall",
    note: "40 stations below BMAS",
  },
  {
    unit: "Education",
    item: "Micro-teaching studio",
    status: "Ready",
    note: "Commissioned May 2026",
  },
];

export const reports = [
  {
    title: "Annual academic statistics",
    period: "2024/2025",
    format: "PDF",
  },
  {
    title: "Programme accreditation register",
    period: "August 2026",
    format: "XLSX",
  },
  {
    title: "Resource parameters vs NUC minima",
    period: "2025/2026",
    format: "PDF",
  },
  {
    title: "Enrolment by faculty and sex",
    period: "First semester",
    format: "CSV",
  },
];

export type UserRole =
  | "Super Admin"
  | "Director"
  | "Admin Staff"
  | "External Assessor";
export type UserStatus = "Active" | "Invited" | "Suspended";

export const users = [
  {
    name: "Prof. Uju Clara Umo",
    email: "uju.umo@unn.edu.ng",
    role: "Director" as UserRole,
    status: "Active" as UserStatus,
    lastActive: "Today",
  },
  {
    name: "Dr. Chinedu Okeke",
    email: "chinedu.okeke@unn.edu.ng",
    role: "Admin Staff" as UserRole,
    status: "Active" as UserStatus,
    lastActive: "Today",
  },
  {
    name: "Mrs. Ngozi Eze",
    email: "ngozi.eze@unn.edu.ng",
    role: "Admin Staff" as UserRole,
    status: "Active" as UserStatus,
    lastActive: "Yesterday",
  },
  {
    name: "Mr. Ibrahim Musa",
    email: "ibrahim.musa@unn.edu.ng",
    role: "External Assessor" as UserRole,
    status: "Active" as UserStatus,
    lastActive: "22 Aug",
  },
  {
    name: "Ms. Adaobi Nwosu",
    email: "adaobi.nwosu@unn.edu.ng",
    role: "External Assessor" as UserRole,
    status: "Invited" as UserStatus,
    lastActive: "—",
  },
  {
    name: "Mr. Emeka Obi",
    email: "emeka.obi@unn.edu.ng",
    role: "Super Admin" as UserRole,
    status: "Suspended" as UserStatus,
    lastActive: "4 Jul",
  },
];
