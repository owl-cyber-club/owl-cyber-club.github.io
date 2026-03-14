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
  date?: string; // Optional for series events
  startDate?: string; // Format: "YYYY-MM-DD" for series
  endDate?: string; // Format: "YYYY-MM-DD" for series
  time: string;
  location: string;
  type: "Workshop" | "CTF" | "Social" | "Competition" | "Club Meet";
  series?: "weekly" | "bi-weekly" | "monthly";
  description?: string;
  link?: string;
  flyer?: string;
}
