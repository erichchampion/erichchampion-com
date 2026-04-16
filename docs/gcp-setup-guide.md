# Google Cloud Platform & Google Drive Setup Guide

This guide walks through setting up Google Cloud Platform (GCP) so that your personal website can read content directly from a Google Drive folder. You create a **Service Account**, share your Drive folder with it, and the website reads your content automatically.

> **Time required:** ~15 minutes
> **Cost:** Free (Google Drive API has a generous free tier)

---

## Table of Contents

1. [Create a GCP Project](#1-create-a-gcp-project)
2. [Enable the Google Drive API](#2-enable-the-google-drive-api)
3. [Create a Service Account](#3-create-a-service-account)
4. [Generate a JSON Key](#4-generate-a-json-key)
5. [Share Your Drive Folder](#5-share-your-drive-folder)
6. [Get the Folder ID](#6-get-the-folder-id)
7. [Configure Environment Variables](#7-configure-environment-variables)
8. [Set Up the Drive Folder Structure](#8-set-up-the-drive-folder-structure)
9. [Vercel Deployment Notes](#9-vercel-deployment-notes)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Create a GCP Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with a Google account
3. Click the project dropdown at the top → **New Project**
4. Enter a project name: `erichchampion-site` (or any name you prefer)
5. Click **Create**
6. Select the new project from the dropdown

---

## 2. Enable the Google Drive API

1. In the GCP Console, go to **APIs & Services** → **Library**
2. Search for **Google Drive API**
3. Click **Enable**

---

## 3. Create a Service Account

A Service Account is a special Google identity that your website uses to access Drive.

1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **Service Account**
3. Fill in:
   - **Service account name:** `erichchampion-reader`
   - **Description:** `Read-only access to website content in Google Drive`
4. Click **Create and Continue**
5. Skip the next two steps (click **Continue**, then **Done**)

Copy the service account email — it looks like:
```
erichchampion-reader@your-project.iam.gserviceaccount.com
```

---

## 4. Generate a JSON Key

1. On the **Credentials** page, click your new service account email
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Choose **JSON** → Click **Create**
5. A `.json` file downloads — **keep this secure**

From this file, you need:
- **`client_email`** → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- **`private_key`** → `GOOGLE_PRIVATE_KEY`

> **⚠️ Security:** Never commit this JSON file to Git. Never share it publicly.

---

## 5. Share Your Drive Folder

1. Open [Google Drive](https://drive.google.com/)
2. Right-click your content folder
3. Click **Share**
4. Paste the **Service Account email**
5. Set permission to **Viewer**
6. Uncheck "Notify people"
7. Click **Send**

---

## 6. Get the Folder ID

The Folder ID is the long string in the folder URL:

```
https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ
                                       └──────── This is the Folder ID ────────┘
```

1. Open your content folder in Google Drive
2. Copy the ID from the URL
3. This becomes your `GOOGLE_DRIVE_FOLDER_ID`

---

## 7. Configure Environment Variables

Add to your `.env.local` file:

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=erichchampion-reader@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...paste the full key here...\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=1aBcDeFgHiJkLmNoPqRsTuVwXyZ
```

> **Important:** `GOOGLE_PRIVATE_KEY` must be wrapped in **double quotes** with `\n` for actual newlines.

---

## 8. Set Up the Drive Folder Structure

```
📁 Your Content Root (this folder's ID = GOOGLE_DRIVE_FOLDER_ID)
│
├── 📁 about
│   └── 📄 info.txt              # Name, title, bio, work history
│
└── 📁 projects
    ├── 📁 apps
    │   ├── 📁 sessions-ai
    │   │   └── 📄 info.txt
    │   ├── 📁 electro-spotmatic
    │   │   └── 📄 info.txt
    │   └── ...
    │
    └── 📁 books
        ├── 📁 building-ai-coding-assistants
        │   └── 📄 info.txt
        └── ...
```

See the [Content Authoring Guide](content-authoring-guide.md) for `info.txt` format details.

---

## 9. Vercel Deployment Notes

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add all three variables:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` — paste the full key **with actual line breaks**
   - `GOOGLE_DRIVE_FOLDER_ID`
3. Set for **Production**, **Preview**, and **Development**
4. Redeploy

---

## 10. Troubleshooting

### "Error: The file was not found" or "403 Forbidden"
- Verify the Service Account email was shared with the Drive folder
- Check the Folder ID is correct
- Make sure sharing is set to **Viewer**

### "Invalid grant" or authentication errors
- The private key may be malformed — check for `\n` at beginning/end
- Try regenerating the key
- In `.env.local`, ensure the key is wrapped in double quotes

### Content not updating
- The site uses ISR. Updates appear within 60 seconds
- Trigger a manual revalidation by redeploying

### The info.txt parser ignores some fields
- Field names must be single words (no spaces before colon)
- Field names are case-insensitive
- Values can span multiple lines until the next `Key:` line
