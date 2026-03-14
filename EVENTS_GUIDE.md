# 📅 Owl Cyber Club Event Management Guide

Welcome! This guide explains how to add, edit, or remove events on the **Owl Cyber Club** website without writing any code. All event data is stored in the `public/events.json` file.

## 🚀 How to Add or Edit an Event

1. Go to the [events.json file on GitHub](https://github.com/owl-cyber-club/owl-cyber-club.github.io/blob/main/public/events.json).
2. Click the **✏️ Pencil Icon** (Edit this file) in the top right corner of the file box.
3. You will see a list of events inside square brackets `[ ... ]`. Each event is enclosed in curly braces `{ ... }`.
4. Copy the template below and paste it as a new item in the list, or edit an existing one. **Make sure to add a comma `,` between events!**

### 📋 Event Template (Single Event)

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

### 🔄 Event Template (Recurring Series)

Use `startDate`, `endDate`, and `series` instead of `date` if the event repeats automatically.

```json
{
  "title": "Weekly Club Meet",
  "startDate": "2026-03-20",
  "endDate": "2026-05-31",
  "time": "6:00 PM - 7:00 PM",
  "location": "KSU Marietta Campus",
  "type": "Club Meet",
  "series": "weekly"
}
```

#### Field Explanations:

- `"title"`: Name of the event.
- `"date"`: The date of a single event in `YYYY-MM-DD` format (e.g., `2026-10-31`). If unsure, use `"TBD"`.
- `"startDate"` / `"endDate"`: Use these *instead* of `date` for a recurring series to define the start and end span of the event.
- `"series"`: _(Optional)_ How often the event repeats. Must be one of: `"weekly"`, `"bi-weekly"`, or `"monthly"`.
- `"time"`: A short string representing the time range.
- `"location"`: Where it takes place.
- `"type"`: Must be one of: `"Workshop"`, `"CTF"`, `"Social"`, `"Competition"`, or `"Club Meet"`.
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
