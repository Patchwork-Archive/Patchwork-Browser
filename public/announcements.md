# 2026/01/14
Huge improvements have been made to the backend of things. For the past months, yt-dlp downloads wouldn't work without solving a JS challenge. This actually does put some strain on the tiny VPS which was handling both the archival as well as hosting the DB. So that's why Patchwork was down every now and then.

I've taken the time to seperate the Worker and the DB into seperate VPS machines which basically resolves this issue! While I was at it, all the DB code has been migrated to Postgres. MySQL was originally chosen due to how Patchwork was being hosted in 2022/2023 (on PythonAnywhere). I've always preferred Postgres but just never took the time to make the change.

# 2025/4/04
It has been a while. Many graduations have happened since December...

These past few months have most been changes on the backend. Ideally the new method for handling archival jobs should reduce the times the pipeline breaks.

Additionally, we have switched from a self-hosted Umami analytics to GoatCounter instead.

Radio has been updated: 17998 songs now in cycle!
Archival Continues...

---

# 2025/01/15
Added new feature to channel and video pages to show previous names of channels if they are recorded
- Other metadata such as profile pics, banners, and channel descriptions won't have this history

---

# 2024/12/15
Archival continues...

## Radio:
- Holiday music rate increased!
- 15934 songs now in cycle!

## Archive:
- Most recent archival round date now shown on homepage
- Number of unique channels in DB shown on homepage
- Project button added to homepage

---

# 2024/11/04
Announcements and changes will now be posted here!

## Radio:
- Patchwork Radio will have an increased chance of playing holiday music. Rates will slowly ramp up as wel approach the end of December.
- 14842 songs now in cycle! Next update to song list will be some time in December.

## Archive:
- Channels will now show up with videos when you search using the search bar
- Youtube Timed Text now shows up in fullscreen mode
- Popular videos section added to landing page

---
