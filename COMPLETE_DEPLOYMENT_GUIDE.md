# Bloggy - Complete Deployment Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Production Deployment Options](#production-deployment-options)
5. [Deployment to Render (Recommended)](#deployment-to-render)
6. [Deployment to Vercel + Render](#deployment-to-vercel--render)
7. [Deployment to Heroku](#deployment-to-heroku)
8. [Environment Variables](#environment-variables)
9. [Post-Deployment Testing](#post-deployment-testing)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Bloggy** is a full-stack MERN blog application with:
- **Frontend**: React (Create React App)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Features**: User authentication (bcrypt), blog posts, categories, image uploads (multer)

**API Endpoints:**
- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/post` - CRUD operations for posts
- `/api/categories` - Category management
- `/api/user` - User profile management
- `/api/upload` - Image upload

---

## Prerequisites

Before deploying, ensure you have:
- ✅ Node.js (v14 or higher)
- ✅ npm or yarn package manager
- ✅ MongoDB Atlas account with database created
- ✅ Git installed
- ✅ Accounts on deployment platforms (Render/Vercel/Heroku)

---

## Local Development Setup

### Step 1: Setup MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up or log in

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Create username and password (remember these!)
   - Set privileges to "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for deployment
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual password
   - Add your database name after `.net/`: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/bloggy?retryWrites=true&w=majority`

### Step 2: Configure Backend Environment

1. **Create Environment File**
   ```powershell
   cd c:\Projects\Bloggy-master\api
   New-Item -Path . -Name ".env" -ItemType File
   ```

2. **Add Environment Variables to `.env`**
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000
   NODE_ENV=development
   ```

3. **Update `db.js` to use Environment Variable**
   - The file should read from `process.env.MONGO_URI` instead of hardcoded string

### Step 3: Install Backend Dependencies

```powershell
cd c:\Projects\Bloggy-master\api
npm install
```

### Step 4: Install Frontend Dependencies

```powershell
cd c:\Projects\Bloggy-master\api\frontend
npm install
```

### Step 5: Test Locally

1. **Start Backend** (from `api` folder):
   ```powershell
   cd c:\Projects\Bloggy-master\api
   npm start
   ```
   Backend should run on `http://localhost:5000`

2. **Start Frontend** (new terminal, from `api/frontend` folder):
   ```powershell
   cd c:\Projects\Bloggy-master\api\frontend
   npm start
   ```
   Frontend should open on `http://localhost:3000`

3. **Test Features:**
   - Register a new user
   - Login
   - Create a post
   - Upload an image
   - View posts
   - Edit/delete your posts

---

## Production Deployment Options

### Option 1: Full Stack on Render (Easiest - Recommended)
- Deploy both frontend and backend on Render
- Free tier available
- Automatic deployments from Git

### Option 2: Frontend on Vercel + Backend on Render
- Frontend on Vercel (optimized for React)
- Backend on Render
- Both have free tiers

### Option 3: Heroku (Full Stack)
- Deploy as monolithic app
- Free tier discontinued, but affordable paid tiers

---

## Deployment to Render (Recommended)

Render is excellent for full-stack MERN apps with free tier support.

### Step 1: Prepare Your Code

1. **Update `api/index.js` for Production**
   
   Add these lines after your routes to serve the React build:

   ```javascript
   // Serve static assets in production
   if (process.env.NODE_ENV === 'production') {
     app.use(express.static(path.join(__dirname, 'frontend/build')));
     
     app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
     });
   }
   ```

2. **Update `api/package.json` scripts**

   Add these scripts:
   ```json
   "scripts": {
     "start": "node index.js",
     "server": "nodemon index.js",
     "frontend": "npm start --prefix frontend",
     "dev": "concurrently \"npm run server\" \"npm run frontend\"",
     "build": "cd frontend && npm install && npm run build",
     "heroku-postbuild": "npm run build"
   }
   ```

3. **Create `.env` for local use** (don't commit this)
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=production
   ```

4. **Update `api/config/db.js`** to use environment variable:
   ```javascript
   const mongoose = require("mongoose");
   require('dotenv').config();

   const uri = process.env.MONGO_URI || "your_fallback_connection_string";

   const connectDatabase = async () => {
     try {
       await mongoose.connect(uri, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
       console.log("Database connected successfully.");
     } catch (error) {
       console.log("Database connection error:", error);
       process.exit(1);
     }
   };

   module.exports = connectDatabase;
   ```

5. **Update Port in `api/index.js`**:
   ```javascript
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Backend is running on port ${PORT}`);
   });
   ```

### Step 2: Push to GitHub

1. **Initialize Git** (if not already):
   ```powershell
   cd c:\Projects\Bloggy-master
   git init
   ```

2. **Create `.gitignore`**:
   ```
   node_modules/
   .env
   api/images/*
   !api/images/.gitkeep
   api/frontend/build
   .DS_Store
   *.log
   ```

3. **Commit and Push**:
   ```powershell
   git add .
   git commit -m "Prepare for deployment"
   git branch -M main
   git remote add origin your_github_repo_url
   git push -u origin main
   ```

### Step 3: Deploy on Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the Bloggy repository

3. **Configure Build Settings**:
   - **Name**: `bloggy-app` (or your choice)
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**:
   Click "Advanced" → Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render default, or leave empty)

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Render will build frontend and start backend

6. **Access Your App**
   - Once deployed, Render provides a URL: `https://bloggy-app.onrender.com`
   - Test all features!

### Step 4: Configure Frontend API Calls (if needed)

If deploying frontend separately, update `api/frontend/package.json`:
```json
{
  "proxy": "https://your-backend-url.onrender.com/api/"
}
```

Or create `api/frontend/src/config.js`:
```javascript
export const API_URL = process.env.REACT_APP_API_URL || '/api';
```

Then update all axios calls to use `API_URL`:
```javascript
import { API_URL } from '../../config';
const res = await axios.post(`${API_URL}/auth/login`, {...});
```

---

## Deployment to Vercel + Render

This option splits frontend (Vercel) and backend (Render).

### Backend on Render

Follow "Deployment to Render" steps above, but skip the frontend build:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `api`

### Frontend on Vercel

1. **Prepare Frontend**
   
   Create `api/frontend/.env.production`:
   ```env
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

2. **Update axios calls** to use environment variable:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || '/api';
   const res = await axios.post(`${API_URL}/auth/login`, {...});
   ```

3. **Install Vercel CLI**:
   ```powershell
   npm install -g vercel
   ```

4. **Deploy to Vercel**:
   ```powershell
   cd c:\Projects\Bloggy-master\api\frontend
   vercel
   ```

5. **Follow prompts**:
   - Login to Vercel
   - Setup project
   - Deploy

6. **Add Environment Variable on Vercel**:
   - Go to Vercel dashboard
   - Select your project
   - Settings → Environment Variables
   - Add `REACT_APP_API_URL` with your Render backend URL

7. **Redeploy**:
   ```powershell
   vercel --prod
   ```

### Update Backend CORS

In `api/index.js`, add CORS support:
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',
  credentials: true
}));
```

Install cors:
```powershell
npm install cors
```

---

## Deployment to Heroku

### Step 1: Prepare Code

Follow the code preparation steps from Render deployment above.

### Step 2: Install Heroku CLI

Download from [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

### Step 3: Deploy

```powershell
cd c:\Projects\Bloggy-master\api
heroku login
heroku create bloggy-app-unique-name
heroku config:set MONGO_URI="your_mongodb_connection_string"
heroku config:set NODE_ENV=production
git push heroku main
heroku open
```

---

## Environment Variables

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/bloggy` |
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (auto-assigned on platforms) | `5000` (local), auto in production |

### Optional Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret for JWT tokens (if you add JWT later) | `your_random_secret_key_here` |

---

## Post-Deployment Testing

### Test Checklist

1. **Homepage Loads**
   - ✅ Homepage displays correctly
   - ✅ No console errors

2. **User Registration**
   - ✅ Register new user
   - ✅ Check if user saved in MongoDB

3. **User Login**
   - ✅ Login with registered user
   - ✅ User data displays correctly

4. **Create Post**
   - ✅ Navigate to Write page
   - ✅ Create post with title and description
   - ✅ Upload image
   - ✅ Add categories
   - ✅ Submit post

5. **View Posts**
   - ✅ Posts display on homepage
   - ✅ Click post to view details
   - ✅ Images load correctly

6. **Edit/Delete Post**
   - ✅ Edit your own post
   - ✅ Delete your own post

7. **User Settings**
   - ✅ Update profile picture
   - ✅ Update username/email

### Check MongoDB Atlas

1. Go to MongoDB Atlas
2. Browse Collections
3. Verify data is being saved:
   - `users` collection has users
   - `posts` collection has posts
   - `categories` collection has categories

---

## Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**
- Check MongoDB Atlas Network Access (allow 0.0.0.0/0)
- Verify connection string format
- Ensure password doesn't have special characters (URL encode if needed)

### Issue: "Images not uploading"

**Solution:**
- On free hosting, file uploads may not persist (use cloud storage like Cloudinary)
- For Render: Files are ephemeral, implement cloud storage solution

### Issue: "API calls failing"

**Solution:**
- Check CORS configuration
- Verify API URL in frontend environment variables
- Check browser console for errors
- Verify backend is running (check logs)

### Issue: "Build fails on deployment"

**Solution:**
- Ensure `package.json` has correct dependencies
- Check build logs for specific errors
- Verify Node.js version compatibility
- Clear cache and rebuild

### Issue: "Frontend shows blank page"

**Solution:**
- Check browser console for errors
- Verify build folder exists
- Check if backend is serving static files correctly
- Verify routing setup for single-page app

### Issue: "404 on page refresh"

**Solution:**
- Add catch-all route in backend:
  ```javascript
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
  ```

---

## Important Notes

### Image Upload Considerations

The current implementation uses local file storage (`multer`). This works locally but has issues in production:
- **Problem**: Most cloud platforms (Render, Heroku) use ephemeral file systems
- **Solution**: Integrate cloud storage (Cloudinary, AWS S3, etc.)

**Quick Cloudinary Integration** (recommended):

1. Install cloudinary:
   ```powershell
   npm install cloudinary multer-storage-cloudinary
   ```

2. Update `api/index.js` (example):
   ```javascript
   const cloudinary = require('cloudinary').v2;
   const { CloudinaryStorage } = require('multer-storage-cloudinary');

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });

   const storage = new CloudinaryStorage({
     cloudinary: cloudinary,
     params: {
       folder: 'bloggy',
       allowed_formats: ['jpg', 'png', 'jpeg']
     }
   });

   const upload = multer({ storage: storage });
   ```

### Database Considerations

- MongoDB Atlas free tier: 512MB storage
- Monitor usage in Atlas dashboard
- Setup indexes for better performance:
  ```javascript
  UserSchema.index({ email: 1 });
  PostSchema.index({ username: 1, createdAt: -1 });
  ```

### Security Recommendations

1. **Never commit `.env` file** (already in .gitignore)
2. **Use strong MongoDB passwords**
3. **Implement rate limiting**:
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   app.use(limiter);
   ```
4. **Add helmet for security headers**:
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

---

## Next Steps After Deployment

1. **Custom Domain** (optional)
   - Purchase domain
   - Configure DNS on Render/Vercel

2. **SSL Certificate**
   - Automatic on Render/Vercel/Heroku

3. **Monitoring**
   - Setup error tracking (Sentry)
   - Monitor performance
   - Check logs regularly

4. **Backup Database**
   - MongoDB Atlas provides automated backups
   - Configure backup schedule

5. **CI/CD**
   - Automatic deployments from GitHub
   - Already configured on Render/Vercel

---

## Support

If you encounter issues:
1. Check deployment platform logs
2. Check MongoDB Atlas logs
3. Review browser console errors
4. Verify environment variables
5. Test API endpoints with Postman

---

**Deployment Complete! 🎉**

Your Bloggy application should now be live and fully functional with all APIs working correctly.
