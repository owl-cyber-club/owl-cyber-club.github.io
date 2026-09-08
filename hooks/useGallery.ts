import { useState, useEffect } from "react";
import { Album } from "../types";

// Mock data referencing stock photography for now.
// Eventually, this could be replaced with a fetch call to Cloudinary/Supabase/etc.
const MOCK_ALBUMS: Album[] = [
  {
    id: "album-1",
    title: "Cybersecurity Workshop Spring 2026",
    date: "2026-03-15",
    coverPhoto: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    eventId: "workshop-1",
    photos: [
      {
        id: "p1-1",
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80",
        caption: "Workshop setup",
      },
      {
        id: "p1-2",
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
        caption: "Matrix code screen",
      },
      {
        id: "p1-3",
        url: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "p1-4",
        url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80",
      }
    ],
  },
  {
    id: "album-2",
    title: "Hackathon Fall 2025",
    date: "2025-10-12",
    coverPhoto: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    eventId: "hackathon-2025",
    photos: [
      {
        id: "p2-1",
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
        caption: "Late night coding",
      },
      {
        id: "p2-2",
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
        caption: "Web dev setup",
      },
      {
        id: "p2-3",
        url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
        caption: "Programming laptop",
      },
      {
        id: "p2-4",
        url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
        caption: "Working together",
      },
      {
        id: "p2-5",
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
        caption: "Team collaboration",
      }
    ],
  },
  {
    id: "album-3",
    title: "Club Social Meetup",
    date: "2026-08-20",
    coverPhoto: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    eventId: "social-1",
    photos: [
      {
        id: "p3-1",
        url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
        caption: "Gaming setup",
      },
      {
        id: "p3-2",
        url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "p3-3",
        url: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?auto=format&fit=crop&w=1200&q=80",
        thumbnail: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?auto=format&fit=crop&w=400&q=80",
      }
    ],
  }
];

export const useGallery = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an async fetch call
    const timer = setTimeout(() => {
      setAlbums(MOCK_ALBUMS);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return { albums, loading };
};

