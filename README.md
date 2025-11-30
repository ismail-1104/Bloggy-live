# Bloggy 📝

Bloggy is a full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, edit, and share blog posts with image uploads, user authentication, and category management.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Express](https://img.shields.io/badge/Backend-Express-lightgrey)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-green)

## ✨ Features

- 🔐 **User Authentication**: Secure registration and login with bcrypt password hashing
- ✍️ **Create & Edit Posts**: Rich text editor for writing blog posts
- 🖼️ **Image Upload**: Upload and manage post cover images
- 📂 **Categories**: Organize posts with categories
- 👤 **User Profiles**: Customizable user profiles with profile pictures
- 🔍 **Filter Posts**: Filter by user or category
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Clean UI**: Modern and intuitive user interface

## 🛠️ Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.4.4
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose 6.7.5
- bcrypt for password hashing
- Multer for file uploads
- dotenv for environment variables

### Database
- MongoDB Atlas (Cloud Database)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bloggy.git
cd bloggy
```

### 2. Setup MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add a database user (Database Access)
4. Whitelist your IP or allow access from anywhere (0.0.0.0/0) for deployment
5. Get your connection string

### 3. Configure Environment Variables

Create a `.env` file in the `api` directory:

```bash
cd api
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/bloggy?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 4. Install Dependencies

**Backend:**
```bash
cd api
npm install
```

**Frontend:**
```bash
cd api/frontend
npm install
```

### 5. Run the Application

**Development Mode (Backend + Frontend):**
```bash
cd api
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

**Or run separately:**

Backend:
```bash
cd api
npm start
```

Frontend (in a new terminal):
```bash
cd api/frontend
npm start
```

### 6. Access the Application

Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
Bloggy/
├── api/                          # Backend application
│   ├── config/
│   │   └── db.js                # Database configuration
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Post.js              # Post model
│   │   └── Category.js          # Category model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── user.js              # User routes
│   │   ├── posts.js             # Post routes
│   │   └── categories.js        # Category routes
│   ├── images/                  # Uploaded images storage
│   ├── frontend/                # React frontend application
│   │   ├── public/
│   │   └── src/
│   │       ├── components/      # React components
│   │       ├── pages/           # Page components
│   │       ├── context/         # Context API for state management
│   │       └── App.js           # Main App component
│   ├── index.js                 # Express server entry point
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Environment variables template
├── .gitignore
├── README.md
├── COMPLETE_DEPLOYMENT_GUIDE.md # Detailed deployment instructions
└── QUICK_REFERENCE.md           # Quick deployment reference

```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/post` - Get all posts (supports query params: `?user=username` or `?cat=category`)
- `GET /api/post/:id` - Get single post
- `POST /api/post` - Create new post (requires authentication)
- `PUT /api/post/:id` - Update post (requires authentication)
- `DELETE /api/post/:id` - Delete post (requires authentication)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Users
- `GET /api/user/:id` - Get user details
- `PUT /api/user/:id` - Update user (requires authentication)
- `DELETE /api/user/:id` - Delete user (requires authentication)

### File Upload
- `POST /api/upload` - Upload image file

## 🌐 Deployment

### Quick Deployment to Render (Recommended)

**See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete step-by-step instructions.**

**Quick Steps:**
1. Setup MongoDB Atlas (get connection string)
2. Create `.env` file with your MongoDB URI
3. Test locally with `npm run dev`
4. Push your code to GitHub
5. Create account on [Render](https://render.com)
6. Create new Web Service and connect your GitHub repo
7. Configure:
   - Root Directory: `api`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
8. Add environment variables (MONGO_URI, NODE_ENV)
9. Deploy!

**Total Time: ~30-40 minutes**

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration
- [ ] User login
- [ ] Create a new post
- [ ] Upload post image
- [ ] Edit own post
- [ ] Delete own post
- [ ] View all posts
- [ ] Filter posts by category
- [ ] Filter posts by user
- [ ] Update user profile
- [ ] Change profile picture

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- Environment variables for sensitive data
- Protected routes on backend
- Input validation
- User-specific post operations (can only edit/delete own posts)

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |

## 🐛 Troubleshooting

### Common Issues

**Database connection fails:**
- Verify MongoDB Atlas connection string
- Check Network Access settings in MongoDB Atlas
- Ensure IP address is whitelisted (or use 0.0.0.0/0)

**Images not uploading:**
- Check if `api/images` directory exists
- Verify multer configuration
- For production: Consider using cloud storage (Cloudinary, AWS S3)

**Frontend can't connect to backend:**
- Verify proxy setting in `frontend/package.json`
- Check if backend is running on correct port
- Verify CORS settings (if deploying separately)

**Build fails:**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Verify Node.js version compatibility
- Check for missing dependencies

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Your Name**

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- MongoDB Atlas for database hosting
- Inspired by modern blogging platforms

## 📞 Support

If you have any questions or need help with deployment, please:
1. Check the [COMPLETE_DEPLOYMENT_GUIDE.md](./COMPLETE_DEPLOYMENT_GUIDE.md)
2. Review the [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
3. Open an issue on GitHub

---

**Made with ❤️ using the MERN Stack**

## 🔮 Future Enhancements

- [ ] JWT authentication
- [ ] Comment system
- [ ] Like/favorite posts
- [ ] Rich text editor (Quill/TinyMCE)
- [ ] Social media sharing
- [ ] Email notifications
- [ ] Search functionality
- [ ] Pagination for posts
- [ ] Admin dashboard
- [ ] Cloud image storage (Cloudinary)
- [ ] Dark mode
- [ ] Post tags
- [ ] Draft posts
- [ ] SEO optimization

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

