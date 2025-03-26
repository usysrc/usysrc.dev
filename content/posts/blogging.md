---
draft: false 
title: How I blog
date: 2025-03-26
---
# How I blog

I want to describe my process of blogging on [untilde.co](https://untilde.co).

![blog](../howiblog.png)

## Obsidian
I want to be able to jot down a post as quickly as possible. I use Obsidian for a number of different things do enjoy it for writing and editing. [I even made a plugin for it](https://github.com/usysrc/obsidian-text-focus-plugin). 

I have a special folder called `public/` in my Obsidian Vault. The individual blogs live in a subdirectory here. Blog posts are numbered for [untilde.co](https://untilde.co) so that they appear in order.

Directory structure in Obsidian:

```text
Notes/
	|-- Attachments
public/
|-- untilde/
|-- 01 Knolling
|-- 02 Packing
....
|--- usysrc/
templates/
|-- blogpost
```

The template for the blog post is applied using the [Templater plugin](https://github.com/SilentVoid13/Templater). I use template tags to populate the date into the frontmatter:
  
```markdown
---
title: <% tp.file.title %>
draft: false
date: <% tp.file.creation_date("YYYY-MM-DD") %>
tags:
---
Your blogpost here
```

To build the site from the markdown content I use [hugo](https://gohugo.io/) with a custom theme that I made from scratch called 'untilde'. I usually have a preview server running with `hugo server -D -t untilde`.

I then use [Commander](https://github.com/phibr0/obsidian-commander) to execute the scripts from my ribbon in Obsidian. These are needed to sync my writing from the public/untilde folder to the local copy of my blog. I have two buttons: Sync and Publish.

The Sync button executes a python script. This script is the actual workhorse in this process. Essentially it copies and transforms the markdown from Obsidian-style markdown to Hugo-style markdown. It changes the link, updates image embeds to the right path and optimizes the images.

The Publish button `cd`s to the local copy of my blog repo, creates a new git commit and pushes it. That then kicks off the workflow on GitHub:

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  prod-deploy:
    name: prod-deploy
    runs-on: ubuntu-latest
    steps:
      - name: get latest
        uses: actions/checkout@v2
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: "0.139.4"
      - name: Build
        run: hugo --minify
      - name: sync files
        uses: SamKirkland/FTP-Deploy-Action@4.3.0
        with:
          server: ${{ secrets.ftp_server }}
          username: ${{ secrets.ftp_user }}
          password: ${{ secrets.ftp_password }}
          local-dir: "public/"
```

There are many things that could improve about this workflow, but it works, and it makes it super easy to publish something quickly.