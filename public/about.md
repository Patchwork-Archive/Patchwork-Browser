# About Patchwork Archive
Patchwork Archive aims to archive original songs and covers created by VTubers.

With many VTubers "graduating" from their activities, content is often privated or deleted. The goal of Patchwork Archive is to preserve and archive a subset of content produced by VTubers.

# Why Music?
There are some great music videos and very talented singers in the VTuber community, it would be a shame to lose them. Archiving a subset of VTuber content allows us to pull content from a wide range of VTubers while keeping costs low.

# What's Archived?
Original songs and covers are archived. Short form content is archived on a case by case basis. All archived content was publicly available at the time of processing.

Currently we only archive the following for each video
- 1080p version of each video (lower if unavailable)
- Highest resolution thumbnail available (maxresdefault.jpg)
- Metadata (in the form of .info.json generated via yt-dlp)
- All non-livechat and non-auto-generated captions in srv3 (YouTube Timed Text)

The idea of Patchwork is greatly inspired by [Ragtag Archive](https://archive.ragtag.moe). Thank you for your hard work!

# How is Content Sourced?
Content is queried via the [Patchwork Crawler](https://github.com/Patchwork-Archive/Patchwork-Crawler) which crawls both Holodex and individual YouTube channels for potential videos. Otherwise we manually enqueue appropriate content.

**Note:** Some videos are missing metadata or captions. Since these 2 functionalities were added after archival had already started, some content had already been deleted by the time we went back for them. In those cases only the info stored within our database is available.

# Playback
Due to the nature of how some content was previously archived. Playback for certain videos may be broken on non-Chromium based browsers.

# API
We have a basic API at `https://archive.pinapelz.moe`

[API Docs](https://knowledge.pinapelz.com/patchwork-api.html)

[Patchwork Archive is open-source on GitHub](https://github.com/Patchwork-Archive)


# Contact
Any inquiries can be emailed to `pinapelz@moekyun.me`  