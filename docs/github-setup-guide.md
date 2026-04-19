# GitHub API Setup Guide

This guide walks through setting up a GitHub Personal Access Token so your website can fetch repository data without hitting API rate limits.

> **Time required:** ~5 minutes
> **Cost:** Free (token works for public repos with no scope needed)

---

## Table of Contents

1. [Why a Token is Needed](#1-why-a-token-is-needed)
2. [Create a Personal Access Token](#2-create-a-personal-access-token)
3. [Configure Environment Variables](#3-configure-environment-variables)
4. [Vercel Deployment Notes](#4-vercel-deployment-notes)
5. [Troubleshooting](#5-troubleshooting)

---

## 1. Why a Token is Needed

The GitHub API has rate limits:
- **Unauthenticated:** 60 requests/hour
- **Authenticated:** 5,000 requests/hour

When rate limited, the GitHub page shows 0 repositories. Adding a token prevents this.

---

## 2. Create a Personal Access Token

1. Go to [GitHub Settings → Personal Access Tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Give it a name (e.g., `erichchampion-com`)
4. **No scopes needed** - this token only reads public repo data
5. Click **Generate token**
6. **Copy the token immediately** - it won't be shown again

---

## 3. Configure Environment Variables

### Local Development

Add to `.env.local`:

```
GITHUB_TOKEN=your_token_here
```

### Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - Key: `GITHUB_TOKEN`
   - Value: your token
   - Environment: **Production** (and Preview/Dev if desired)
4. Click **Save**

Redeploy to apply changes.

---

## 4. Vercel Deployment Notes

- The token is stored securely in Vercel's environment variables
- It cannot be read by users - only server-side code uses it
- Tokens can be rotated or regenerated at any time from GitHub settings

---

## 5. Troubleshooting

If the GitHub page still shows 0 repos after adding a token:

1. **Check Vercel logs** - look for `Failed to fetch repos for` errors
2. **Verify the token is set** - redeploy and check environment
3. **Check token permissions** - ensure no scopes are selected (public read-only)
4. **Rate limit may still apply** - wait an hour if previously rate limited

To debug locally:

```bash
# Test the API directly
curl -H "Authorization: token YOUR_TOKEN" \
  "https://api.github.com/users/erichchampion/repos?per_page=1"
```