# Bloggy - Quick Deployment Reference

## 🚀 Fastest Path to Deployment (Render)

### 1. Setup MongoDB Atlas (5 minutes)
```
1. Create account at mongodb.com/cloud/atlas
2. Create FREE cluster (M0)
3. Add database user (Database Access)
4. Allow all IPs: 0.0.0.0/0 (Network Access)
5. Get connection string and replace <password>
```

### 2. Prepare Code (2 minutes)

**Update `api/config/db.js`:**
```javascript
const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGO_URI || "mongodb+srv://...";

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

**Update `api/index.js` - Change port:**
```javascript
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
```

**Add to end of `api/index.js` (before app.listen):**
```javascript
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}
```

**Update `api/package.json` scripts:**
```json
"scripts": {
  "start": "node index.js",
  "server": "nodemon index.js",
  "frontend": "npm start --prefix frontend",
  "dev": "concurrently \"npm run server\" \"npm run frontend\"",
  "build": "cd frontend && npm install && npm run build"
}
```

### 3. Create `.gitignore`
```
node_modules/
.env
api/images/*
!api/images/.gitkeep
api/frontend/build
.DS_Store
*.log
```

### 4. Push to GitHub (3 minutes)
```powershell
git init
git add .
git commit -m "Prepare for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 5. Deploy on Render (5 minutes)
```
1. Go to render.com and sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - Name: bloggy-app
   - Environment: Node
   - Root Directory: api
   - Build Command: npm install && npm run build
   - Start Command: npm start
   - Plan: Free
5. Add Environment Variables:
   - MONGO_URI: your_mongodb_connection_string
   - NODE_ENV: production
6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. Access your app at the provided URL!
```

---

## 🧪 Testing Checklist

- [ ] Homepage loads
- [ ] Register new user
- [ ] Login with user
- [ ] Create a post
- [ ] Upload image
- [ ] View post
- [ ] Edit post
- [ ] Delete post
- [ ] Update profile

---

## 📝 Required Environment Variables

| Variable | Value |
|----------|-------|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/bloggy` |
| `NODE_ENV` | `production` |

---

## 🔧 Common Commands

### Local Development
```powershell
# Backend
cd c:\Projects\Bloggy-master\api
npm install
npm start

# Frontend (new terminal)
cd c:\Projects\Bloggy-master\api\frontend
npm install
npm start
```

### Build Frontend
```powershell
cd c:\Projects\Bloggy-master\api\frontend
npm run build
```

### Test Production Build Locally
```powershell
cd c:\Projects\Bloggy-master\api
$env:NODE_ENV="production"
npm start
# Visit http://localhost:5000
```

---

## 🐛 Quick Troubleshooting

**Database connection fails:**
- Check MongoDB Atlas Network Access (0.0.0.0/0)
- Verify connection string has correct password
- Ensure password is URL encoded if it has special characters

**Images not showing in production:**
- Implement Cloudinary (ephemeral file systems on cloud platforms)
- Local storage doesn't persist on Render/Heroku

**API calls failing:**
- Check CORS settings
- Verify environment variables are set
- Check deployment logs

**Blank page on deployment:**
- Verify frontend build completed successfully
- Check if static files are being served
- Look at browser console for errors

---

## 🎯 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/post` | Create post |
| GET | `/api/post` | Get all posts |
| GET | `/api/post/:id` | Get single post |
| PUT | `/api/post/:id` | Update post |
| DELETE | `/api/post/:id` | Delete post |
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category |
| PUT | `/api/user/:id` | Update user |
| DELETE | `/api/user/:id` | Delete user |
| POST | `/api/upload` | Upload image |

---

## 📚 Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Auth:** bcrypt
- **File Upload:** Multer
- **Styling:** CSS

---

## ⚡ Performance Tips

1. Add indexes to MongoDB collections
2. Implement caching for posts
3. Use CDN for images (Cloudinary)
4. Enable compression in Express
5. Implement lazy loading for images

---

## 🔒 Security Best Practices

1. Never commit `.env` file
2. Use strong database passwords
3. Implement rate limiting
4. Add helmet.js for security headers
5. Validate user inputs
6. Implement JWT for better auth (future enhancement)

---

## 🌐 Alternative Deployment Options

### Vercel (Frontend) + Render (Backend)
- Deploy React on Vercel
- Deploy API on Render
- Update frontend API URLs

### Heroku (Full Stack)
```powershell
heroku create bloggy-app
heroku config:set MONGO_URI="your_uri"
git push heroku main
```

### Railway
- Similar to Render
- Easy GitHub integration
- Good free tier

---

## 📞 Support Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Render Docs](https://render.com/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Deployment](https://create-react-app.dev/docs/deployment/)

---

**Total Deployment Time: ~15-20 minutes** ⏱️
