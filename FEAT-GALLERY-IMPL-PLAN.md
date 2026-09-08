cat c:\Users\amrutvyasa\.gemini\antigravity\brain\c5728f17-3400-41ef-9bcf-c9667040107a\implementation_plan.md
# Gallery View Implementation

The goal is to implement a modern, phone-gallery style "Gallery" section that is separated from the main page scroll. It will feature albums tied to calendar events, with sorting capabilities and placeholders for future real photos.

## User Review Required

**Image Hosting Recommendations**
Since you correctly identified that storing large images in a git repository is a bad practice (causing repo bloat and potential privacy leaks if the repo is public), you have a few great options for a static site (like GitHub Pages).

Here are my recommendations for integrating images into your site:

1. **Cloudinary (Recommended for UI & Performance):**
   * **Why:** Generous free tier, highly optimized. You upload high-res images, and Cloudinary gives you URLs that automatically resize/compress the images on the fly. This means we can fetch tiny thumbnails for the gallery grid, and large versions for the full screen modal, all from the same original image.
   * **Integration:** You would store a JSON list of Cloudinary URLs in your repo (no bloat), or use their API to dynamically fetch all images in a specific "folder".

2. **Supabase Storage or Firebase Storage:**
   * **Why:** Works well with React, acts like a standard bucket. You can upload photos through their web dashboard and get public URLs.
   * **Integration:** Keep a small `albums.json` in your source code linking to these bucket URLs.

3. **Cloudflare R2 / AWS S3:**
   * **Why:** Standard, ultra-cheap bucket storage. Cloudflare R2 has zero egress fees.
   * **Integration:** Same as above. You would host the images there and just keep the references/URLs in your frontend code.

4. **Headless CMS (Sanity.io, Contentful):**
   * **Why:** If you want officers/staff to easily upload photos and create "Albums" without touching code at all, a CMS provides a nice admin dashboard. The React app then fetches the albums dynamically.

**For this design**, I will create the Gallery using a mock data structure that references external URLs. When you choose a provider (like Cloudinary), you will only need to replace the URL strings in the data!

## Proposed Changes

### App & Navigation

#### [MODIFY] [App.tsx](file:///c:/Development/repos/owl-cyber-club.github.io/App.tsx)
- Add `showGallery` state.
- Render `<GalleryView />` wrapped in `<AnimatePresence>` to create the full-screen overlay effect similar to the CalendarView.

#### [MODIFY] [Navbar.tsx](file:///c:/Development/repos/owl-cyber-club.github.io/components/Navbar.tsx)
- Add 'Gallery' to `NAV_LINKS` (between Staff and Contact).
- Accept an `onViewGallery` prop.
- Wire up the new nav link to trigger the `onViewGallery` function.

### Gallery Components

#### [NEW] [GalleryView.tsx](file:///c:/Development/repos/owl-cyber-club.github.io/components/GalleryView.tsx)
- A full-screen overlay modal (similar to `CalendarView`).
- Features a header with title, close button, and a sort toggle (Most Recent / Oldest).
- Grid layout displaying "Albums" (cover photo, title, date).
- Will import the mock album data.

#### [NEW] [AlbumModal.tsx](file:///c:/Development/repos/owl-cyber-club.github.io/components/AlbumModal.tsx)
- A modal that opens when an album is clicked.
- Displays a masonry/grid layout of photos in the album, resembling a phone's photo gallery.
- Includes a full-screen "Lightbox" viewer when a specific photo is clicked, allowing users to swipe/click next and previous.

### Data & Types

#### [MODIFY] [types.ts](file:///c:/Development/repos/owl-cyber-club.github.io/types.ts)
- Add `Photo` and `Album` TypeScript interfaces.

#### [NEW] [useGallery.ts](file:///c:/Development/repos/owl-cyber-club.github.io/hooks/useGallery.ts)
- A hook to manage gallery data.
- Will contain mock albums that logically link to existing events (e.g., using dates that align with your club events) and populated with high-quality tech/hacker stock photo stubs from Unsplash.

## Verification Plan

### Manual Verification
- Click 'Gallery' in the Navbar to ensure it opens the view smoothly without scrolling the main page.
- Test sorting albums by Most Recent and Oldest.
- Click an album to open its grid of photos.
- Click a photo to open the lightbox and navigate between photos.
- Ensure the layout is responsive and modern (looks good on desktop and mobile).