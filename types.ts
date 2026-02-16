export interface NavItem {
  label: string;
  href: string;
}

export interface Member {
  name: string;
  role: string;
  image: string;
}

export interface Event {
  title: string;
  date: string; // Format: "YYYY-MM-DD" for calendar logic
  time: string;
  location: string;
  type: "Workshop" | "CTF" | "Social" | "Competition";
  description?: string;
  link?: string;
}

