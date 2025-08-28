# AI Skill Gap Analysis Tool

**An enterprise-grade educational platform for myOnsite Healthcare**

A comprehensive AI-powered platform that diagnoses student skill mastery, identifies learning gaps, and generates personalized curricula for educational institutions.

![AI SkillGap Dashboard](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=AI+SkillGap+Analytics+Dashboard)

## 🚀 Features

- **Student Management**: Track and manage student profiles with progress indicators
- **AI-Powered Analytics**: Skill mastery assessment with uncertainty quantification
- **Curriculum Generation**: Personalized learning paths with AI recommendations
- **Progress Tracking**: Longitudinal progress monitoring across subjects
- **Intervention Management**: Automated alerts and intervention strategies
- **Admin Authentication**: Secure login with Google and Apple OAuth support
- **Real-time Dashboard**: Live metrics, charts, and student progress visualization

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** with sky blue theme
- **shadcn/ui** component library
- **TanStack React Query** for state management
- **Recharts** for data visualization
- **Wouter** for client-side routing

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** database with Drizzle ORM
- **In-memory storage** for development
- **Zod** for validation schemas

## 🛠️ Installation & Setup

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/myonsite-healthcare/ai-skillgap-tool.git
cd ai-skillgap-tool
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Setup

The application uses environment variables for configuration. In Replit, these are automatically configured:

- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Environment mode (development/production)

For local development, create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your configurations:

```env
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/skillgap
SESSION_SECRET=your-session-secret-key
GOOGLE_CLIENT_ID=your-google-oauth-client-id
APPLE_CLIENT_ID=your-apple-oauth-client-id
```

### Step 4: Database Setup

For development, the application uses in-memory storage with sample data. For production:

```bash
# Run database migrations
npm run db:push

# Seed with initial data (optional)
npm run db:seed
```

## 🚀 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

This command:
- Starts the Express backend server on port 5000
- Launches Vite development server for hot reloading
- Enables TypeScript compilation
- Sets up API proxy for seamless development

The application will be available at: **http://localhost:5000**

### Production Build

Create a production build:

```bash
npm run build
npm start
```

### Using Docker (Optional)

```bash
# Build the container
docker build -t ai-skillgap-tool .

# Run the container
docker run -p 5000:5000 ai-skillgap-tool
```

## 🔐 Authentication

The application includes a comprehensive authentication system with multiple login methods:

### Demo Credentials

For testing purposes, use these demo credentials:

**Email Login:**
- Email: `admin@myonsite.com`
- Password: `any password`

**OAuth Providers:**
- **Google Login**: Click "Google" button (uses mock OAuth)
- **Apple Login**: Click "Apple" button (uses mock OAuth)

### Login Features

- ✅ Email/Password authentication
- ✅ Google OAuth integration (mock)
- ✅ Apple OAuth integration (mock)
- ✅ Session management
- ✅ Automatic logout
- ✅ Protected routes
- ✅ User profile display

### Setting Up Real OAuth (Production)

To enable real OAuth providers:

1. **Google OAuth:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add your domain to authorized origins

2. **Apple OAuth:**
   - Go to [Apple Developer Console](https://developer.apple.com/)
   - Create an App ID with Sign In with Apple capability
   - Configure your domain and return URLs

## 📁 Project Structure

```
ai-skillgap-tool/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── dashboard/  # Dashboard-specific components
│   │   │   ├── layout/     # Layout components (Header, Sidebar)
│   │   │   └── ui/         # shadcn/ui components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and configs
│   │   ├── pages/          # Page components
│   │   └── types/          # TypeScript type definitions
│   └── index.html          # HTML template
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route handlers
│   ├── storage.ts         # Data storage logic
│   └── vite.ts            # Vite development integration
├── shared/                 # Shared code between client/server
│   └── schema.ts          # Database schemas and types
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── vite.config.ts         # Vite build configuration
```

## 🎨 UI Theme

The application uses a beautiful **sky blue and white** color scheme:

- **Primary Color**: Sky blue (`hsl(200, 98%, 39%)`)
- **Background**: Clean white with subtle sky blue accents
- **Cards**: White with soft shadows
- **Navigation**: Sky blue active states
- **Charts**: Sky blue gradients and highlights

### Theme Customization

Colors are defined in `client/src/index.css`:

```css
:root {
  --primary: hsl(200 98% 39%);        /* Sky blue */
  --primary-foreground: hsl(210 40% 98%);
  --background: hsl(0 0% 100%);       /* White */
  --secondary: hsl(210 40% 96%);      /* Light sky blue */
  /* ... more theme variables */
}
```

## 🧪 Testing

### Running Tests

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Generate test coverage
npm run test:coverage
```

### Manual Testing Checklist

- [ ] **Authentication Flow**
  - [ ] Login with email/password
  - [ ] Login with Google OAuth
  - [ ] Login with Apple OAuth
  - [ ] Logout functionality
  - [ ] Session persistence

- [ ] **Dashboard Features**
  - [ ] Metrics cards display correctly
  - [ ] Skill mastery chart loads
  - [ ] Recent alerts shown
  - [ ] Student table populated

- [ ] **Navigation**
  - [ ] All sidebar links work
  - [ ] Progress tracking page loads
  - [ ] Interventions page displays
  - [ ] Settings page functional

- [ ] **AI Features**
  - [ ] Curriculum generator works
  - [ ] Student selection functional
  - [ ] Generated plans display
  - [ ] AI recommendations shown

## 🚢 Deployment

### Replit Deployment

The application is optimized for Replit deployment:

1. **Fork the Repl**: Click "Fork" in Replit
2. **Set Environment Variables**: Configure in Replit Secrets
3. **Run the Application**: Click "Run" button
4. **Access via URL**: Use your Repl's public URL

### Other Deployment Options

**Heroku:**
```bash
heroku create ai-skillgap-tool
git push heroku main
heroku config:set NODE_ENV=production
```

**Vercel:**
```bash
npm install -g vercel
vercel --prod
```

**DigitalOcean App Platform:**
- Connect your GitHub repository
- Configure build and run commands
- Set environment variables

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | `development` |
| `DATABASE_URL` | PostgreSQL connection | No | In-memory |
| `SESSION_SECRET` | Session encryption key | Yes | Auto-generated |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No | Mock |
| `APPLE_CLIENT_ID` | Apple OAuth client ID | No | Mock |

### Application Settings

Configure application behavior in `shared/schema.ts`:

```typescript
// Adjust sample data size
const INITIAL_STUDENTS = 3;
const INITIAL_ASSESSMENTS = 10;

// Modify skill categories
const SUBJECTS = ['mathematics', 'language_arts', 'science', 'social_studies'];
```

## 📊 API Documentation

### Authentication Endpoints

```
POST /api/auth/login     - Email/password login
POST /api/auth/google    - Google OAuth login
POST /api/auth/apple     - Apple OAuth login
POST /api/auth/logout    - User logout
GET  /api/auth/user      - Get current user
```

### Core API Endpoints

```
GET    /api/students              - List all students
GET    /api/students/:id          - Get student details
POST   /api/students              - Create new student
GET    /api/dashboard/metrics     - Dashboard metrics
GET    /api/assessments           - List assessments
POST   /api/ai/generate-curriculum - Generate AI curriculum
GET    /api/alerts               - List alerts
```

### Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "timestamp": "2025-08-28T10:30:00Z"
}
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: Application won't start
```bash
# Solution: Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Issue**: Database connection errors
```bash
# Solution: Check DATABASE_URL environment variable
echo $DATABASE_URL
# Restart the application
npm run dev
```

**Issue**: Authentication not working
```bash
# Solution: Clear browser localStorage
# Open Developer Tools > Application > Storage > Clear All
```

**Issue**: Build errors
```bash
# Solution: Check TypeScript errors
npx tsc --noEmit
# Fix errors and rebuild
npm run build
```

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub repository
- **Support**: Contact myOnsite Healthcare support team

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the coding standards
4. **Run tests**: `npm test`
5. **Commit changes**: `git commit -m "Add amazing feature"`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Coding Standards

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages

## 📝 License

This project is proprietary software owned by **myOnsite Healthcare, LLC**.

© 2025 myOnsite Healthcare, LLC. All rights reserved.

---

## 🎯 Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:5000

# 4. Login with demo credentials:
#    Email: admin@myonsite.com
#    Password: any password

# 5. Explore the dashboard and features!
```

**That's it! You're ready to use the AI Skill Gap Analysis Tool.** 🚀

For questions or support, contact the myOnsite Healthcare development team.