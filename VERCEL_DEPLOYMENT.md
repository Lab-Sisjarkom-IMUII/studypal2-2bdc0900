# Vercel Deployment Guide - StudyPal

## Overview

This guide will help you deploy the StudyPal application to Vercel with your custom domain `imuii.id`.

## Prerequisites

- GitHub account with this repository
- Vercel account (sign up at https://vercel.com)
- Custom domain `imuii.id` configured in your domain registrar
- Supabase project with credentials
- Firebase project with credentials

## Quick Deployment Steps

### 1. Connect to Vercel

1. Go to https://vercel.com and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository: `Lab-Sisjarkom-IMUII/studypal2-2bdc0900`
4. Vercel will auto-detect it as a Vite project

### 2. Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `vite build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Add Environment Variables

This is **CRITICAL** - the app will not work without these variables.

Go to **Project Settings → Environment Variables** and add:

#### Required Variables (Supabase)

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from: https://app.supabase.com/project/YOUR_PROJECT/settings/api

#### Required Variables (Firebase)

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Get these from: https://console.firebase.google.com/
- Go to Project Settings → General → Your apps → Web app config

#### Optional Variables

```
VITE_OPENAI_API_KEY=sk-proj-your-key
VITE_GOOGLE_CLIENT_ID=your-client-id
VITE_GOOGLE_REDIRECT_URI=https://imuii.id/api/oauth/google/callback
VITE_YOUTUBE_API_KEY=your-youtube-key
```

> **Important**: Make sure to add these variables for **Production** environment in Vercel.

### 4. Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Vercel will provide a deployment URL like `https://studypal2-xxx.vercel.app`

### 5. Configure Custom Domain

1. Go to **Project Settings → Domains**
2. Click **"Add Domain"**
3. Enter `imuii.id`
4. Vercel will provide DNS configuration instructions
5. Add the DNS records to your domain registrar:
   - **Type**: A or CNAME (as instructed by Vercel)
   - **Name**: @ (for root domain) or subdomain
   - **Value**: Vercel's provided value

6. Wait for DNS propagation (can take up to 48 hours, usually much faster)
7. Vercel will automatically provision SSL certificate

### 6. Verify Deployment

Once deployed:

1. Visit `https://imuii.id`
2. Check that the homepage loads correctly
3. Test navigation to different pages
4. Open browser console (F12) and check for errors
5. Test login functionality
6. Verify dashboard access

## Troubleshooting

### Blank Page After Deployment

**Symptoms**: White/blank page, no content visible

**Causes & Solutions**:

1. **Missing Environment Variables**
   - Check browser console for warnings about missing config
   - Verify all required variables are set in Vercel dashboard
   - Redeploy after adding variables

2. **Build Errors**
   - Go to Vercel dashboard → Deployments → Click on failed deployment
   - Check build logs for errors
   - Common issues: missing dependencies, TypeScript errors

3. **Routing Issues**
   - Verify `vercel.json` exists in repository root
   - Check that it contains proper SPA rewrite rules
   - Redeploy if `vercel.json` was added after initial deployment

### 404 on Page Refresh

**Symptoms**: Direct URL access or page refresh shows 404

**Solution**: Ensure `vercel.json` is properly configured with:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Assets Not Loading

**Symptoms**: Images, fonts, or CSS not loading

**Solutions**:
1. Check that `base: "/"` is set in `vite.config.ts`
2. Verify assets are in the `public` folder
3. Check browser Network tab for 404 errors
4. Ensure asset paths don't have leading `/public/` (should be just `/filename`)

### Environment Variables Not Working

**Symptoms**: Features not working despite variables being set

**Solutions**:
1. Verify variable names start with `VITE_` prefix
2. Check that variables are set for **Production** environment in Vercel
3. Redeploy after adding/changing variables (changes require rebuild)
4. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Custom Domain Not Working

**Symptoms**: Domain doesn't resolve or shows error

**Solutions**:
1. Verify DNS records are correctly configured
2. Wait for DNS propagation (check with https://dnschecker.org)
3. Ensure domain is verified in Vercel dashboard
4. Check that SSL certificate is provisioned (automatic, but may take time)

## Monitoring & Logs

### View Deployment Logs

1. Go to Vercel dashboard
2. Click on **Deployments**
3. Select a deployment
4. View **Build Logs** and **Function Logs**

### View Runtime Errors

1. Open your deployed site
2. Open browser DevTools (F12)
3. Check **Console** tab for JavaScript errors
4. Check **Network** tab for failed requests

## Redeployment

To redeploy after making changes:

### Automatic (Recommended)

1. Push changes to GitHub
2. Vercel automatically detects and deploys

### Manual

1. Go to Vercel dashboard
2. Click **Deployments**
3. Click **"Redeploy"** on the latest deployment

## Environment-Specific Deployments

Vercel supports multiple environments:

- **Production**: Deployed from `main` branch → `imuii.id`
- **Preview**: Deployed from pull requests → `studypal2-xxx-git-branch.vercel.app`
- **Development**: Local development → `localhost:3001`

## Performance Optimization

The deployment includes:

- ✅ Automatic code splitting
- ✅ Vendor chunk caching
- ✅ Asset compression
- ✅ CDN distribution
- ✅ Automatic SSL/HTTPS
- ✅ HTTP/2 support

## Security Checklist

- ✅ All environment variables stored securely in Vercel
- ✅ No sensitive data in repository
- ✅ HTTPS enforced automatically
- ✅ `.env` files in `.gitignore`

## Support

If you encounter issues:

1. Check this troubleshooting guide
2. Review Vercel deployment logs
3. Check browser console for errors
4. Verify all environment variables are set correctly
5. Ensure DNS is properly configured for custom domain

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Custom Domain Setup](https://vercel.com/docs/concepts/projects/domains)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
