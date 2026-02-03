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
  date: string;
  type: 'Workshop' | 'CTF' | 'Social' | 'Competition';
  description: string;
}

export enum ImageSize {
  OneK = "1K",
  TwoK = "2K",
  FourK = "4K"
}

export interface GeminiImageState {
  loading: boolean;
  error: string | null;
  imageUrl: string | null;
}