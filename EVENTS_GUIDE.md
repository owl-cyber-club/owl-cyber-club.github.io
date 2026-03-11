# 📅 Owl Cyber Club Event Management Guide

Welcome! This guide explains how to add, edit, or remove events on the **Owl Cyber Club** website without writing any code. All event data is stored in the `public/events.json` file.

## 🚀 How to Add or Edit an Event

1. Go to the [events.json file on GitHub](https://github.com/owl-cyber-club/owl-cyber-club.github.io/blob/main/public/events.json).
2. Click the **✏️ Pencil Icon** (Edit this file) in the top right corner of the file box.
3. You will see a list of events inside square brackets `[ ... ]`. Each event is enclosed in curly braces `{ ... }`.
4. Copy the template below and paste it as a new item in the list, or edit an existing one. **Make sure to add a comma `,` between events!**

### 📋 Event Template

```json
{
  "title": "Your Event Title Here",
  "date": "YYYY-MM-DD",
  "time": "5:00 PM - 6:00 PM",
  "location": "Location Name (e.g., Teams or Room 123)",
  "type": "Workshop",
  "link": "https://teams.microsoft.com/...",
  "flyer": "your-flyer-name.png"
}
```

#### Field Explanations:

- `"title"`: Name of the event.
- `"date"`: The date of the event in `YYYY-MM-DD` format (e.g., `2026-10-31`). If unsure, use `"TBD"`.
- `"time"`: A short string representing the time range.
- `"location"`: Where it takes place.
- `"type"`: Must be one of: `"Workshop"`, `"CTF"`, `"Social"`, or `"Competition"`.
- `"link"`: _(Optional)_ URL to a Teams meeting or registration page. If you don't have one, just delete this line completely.
- `"flyer"`: _(Optional)_ The exact filename of the flyer image you uploaded (see instructions below). If you don't have a flyer, just delete this line completely.

5. **Save Changes**: Scroll to the top right and click the green **Commit changes...** button.
6. Write a short message like "Added Fall CTF Event" and click **Commit changes**.
7. _The website will automatically update within 1-2 minutes!_

---

## 🖼️ How to Add an Event Flyer

If your event has a promotional image (flyer), you need to upload it to the repo **before** adding its name to the `events.json` file.

1. Go to the [public/event-flyers folder on GitHub](https://github.com/owl-cyber-club/owl-cyber-club.github.io/tree/main/public/event-flyers).
2. Click the **Add file** button in the top right, then select **Upload files**.
3. Drag and drop your image file (e.g., `ctf-poster.png` or `workshop.jpg`) onto the screen.
4. Click the green **Commit changes** button.
5. Now, go back to the `events.json` file and add `"flyer": "your-filename.ext"` to your event, being sure the filename matches exactly!
