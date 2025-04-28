# Will You Be My Boba

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.12-green?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49-blue?style=flat&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Maps](https://img.shields.io/badge/Google_Maps-API-blue?style=flat&logo=google-maps)](https://developers.google.com/maps)

**Your Community-Driven Guide to the Best Boba Spots**

## Description

Craving boba but unsure where to go? **Will You Be My Boba** makes finding your next favorite drink easier than ever. Powered by a community-driven database, this app helps you discover the best boba shops—whether you're chasing bold flavors, relaxing vibes, or hidden gems.

### What You Can Do:

- **Search by Flavor Tags:** Find drinks based on unique flavor profiles—from creamy classics to fruity delights—all curated by the community.
- **Feeling Adventurous?** Let the app surprise you with a random drink suggestion!
- **Anything Local?** Enable your browser's geolocation to find out which shops are the closest to you!
- **Check Local Shops:** Curious about your favorite spot? See what the community thinks of their menu!
- **Share Your Favorites:** Be part of the boba-loving network—recommend your go-to drink and where to find it.
- **Build Your Boba Journey:** Create an account to keep track of your reviews, edit them anytime, and curate your personal boba history. Your opinions matter, and now they're always at your fingertips!

**What are you waiting for? Explore, share, and sip with Will You Be My Boba!**

## Key Features

### Core Features

#### Community Features

- **User Accounts & Reviews**

  - Create an account to track your boba journey
  - Write, edit, and delete your reviews anytime
  - Keep a personal history of your favorite drinks
  - Build your boba profile with your preferences

- **Community Reviews & Ratings**
  - Share your thoughts anonymously or with your account
  - Rate drinks based on your experience
  - See what others think about different drinks
  - Contribute to the community's knowledge base

#### Discovery Features

- **Smart Flavor Tagging**

  - Search drinks by unique flavor profiles
  - Tags are community-driven and constantly updated
  - Combine multiple tags for precise matching
  - Discover new flavor combinations

- **Location-Based Search**

  - Find boba shops near you with geolocation
  - Sort by distance to find the closest options
  - View shop details and Google Maps integration
  - Get directions to your next boba adventure

- **Dynamic Sorting**
  - Sort by name for alphabetical browsing
  - Sort by community ratings to find popular choices
  - Sort by distance when location is enabled
  - Filter and combine sorting options

### Coming Soon 🚧

#### Personalized Recommendations

- **Smart Suggestions**
  - Get personalized drink recommendations based on your review history
  - Discover new flavors that match your preferences
  - Receive suggestions based on similar users' tastes
  - Build your perfect boba profile

#### Fun Features

- **Boba of the Day**

  - Daily featured drinks based on community favorites
  - Special highlights for seasonal drinks
  - Trending drinks in your area
  - Limited-time recommendations

- **Boba Roulette**
  - Let fate decide your next drink
  - Random selection based on your preferences
  - Challenge mode for adventurous drinkers
  - Share your roulette results with friends

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.3** - App Router, Server Components, API Routes
- **React 19.1** - Hooks, Context API
- **TypeScript 5** - Type safety and better developer experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Hook Form 7.54** - Form handling and validation
- **Zod 3.24** - Schema validation
- **Zustand 5.0** - State management
- **React Icons 5.5** - Icon library
- **Fuse.js 7.1** - Fuzzy search functionality
- **date-fns 4.1** - Date manipulation and formatting

### Backend & Database

- **MongoDB 8.12** - Primary database
- **Mongoose 8.12** - ODM for MongoDB
- **Next.js API Routes** - Serverless API endpoints
- **Supabase** - Authentication and user management
  - Supabase JS Client 2.49
  - Supabase SSR 0.6
- **Jose 6.0** - JWT handling

### APIs & Services

- **Google Maps Platform**
  - Places API - Location and place data
  - Maps JavaScript API - Interactive maps
  - JS API Loader 1.16
- **Resend 4.4** - Email service for contact forms
- **Vercel Analytics 1.5** - Usage analytics

### Development Tools

- **ESLint 9** - Code linting
- **TypeScript 5** - Static type checking
- **Turbopack** - Next.js development server

### Environment Variables

Required environment variables:

```ini
# Database
MONGO_DB_URI=your_mongodb_uri

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_JWT_SECRET=your_supabase_JWT_secret

# Email
RESEND_API_KEY=your_resend_api_key

# Application
NEXT_PUBLIC_API_BASE_URL=your_project_url
```

⚠️ **Important Notes:**

- Never commit your `.env` file to version control
- Ensure all API keys have appropriate restrictions
- Keep your MongoDB connection string secure
- Regularly rotate your Supabase anon key
- Use environment-specific variables (development/production)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** or **yarn**
- **MongoDB Server** (local or Atlas)
- **Supabase Account** (for authentication)
- **Google Cloud Project** (for Maps API)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/pAnhTri/will-you-be-my-boba.git
   cd will-you-be-my-boba
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory with the following:

   ```ini
   # Database
   MONGO_DB_URI=your_mongodb_uri

   # Google Maps
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_JWT_SECRET=your_supabase_JWT_secret

   # Email
   RESEND_API_KEY=your_resend_api_key

   # Application
   NEXT_PUBLIC_API_BASE_URL=your_project_url
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Required API Setup

#### Google Maps Platform

1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable the following APIs:
   - Places API
   - Maps JavaScript API
3. Create API key with appropriate restrictions
4. Add the key to your environment variables

#### Supabase

1. Create a new project in [Supabase](https://supabase.com)
2. Get your project URL and anon key
3. Set up JWT secret for authentication
4. Add credentials to your environment variables

#### MongoDB

1. Set up a [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
2. Create a database user
3. Get your connection string
4. Add to your environment variables

#### Resend

1. Create an account at [Resend](https://resend.com)
2. Get your API key from the dashboard
3. Add the API key to your environment variables
4. Set up email templates for contact forms
5. Configure sender email address

⚠️ **Security Notes:**

- Never commit your `.env` file to version control
- Ensure all API keys have appropriate restrictions
- Keep your MongoDB connection string secure
- Regularly rotate your Supabase anon key
- Use environment-specific variables (development/production)

## 📖 Usage Guide

### Adding and Managing Boba

- **Add New Boba**

  - Click the **+** button next to any boba name
  - Fill in the required details:
    - Name
    - Flavor tags (comma-separated)
    - Sweetness Level
    - Shop selection
  - Submit to add to the database

- **Update Existing Boba**
  - Click the **+** button next to the boba name you want to update
  - Modify any details as needed
  - Submit to update the database

### Reviews and Ratings

- **Viewing Reviews**

  - Click the **Show Reviews** button on any boba card
  - Reviews are displayed with:
    - Rating (0-5 stars)
    - Review text
    - Reviewer (if logged in) or "Anonymous"
    - Date posted
  - Sort reviews by:
    - Rating (highest to lowest)
    - Age (newest to oldest)

- **Adding Reviews**
  - Click the **+** button next to the sort buttons
  - Enter your rating (0-5 stars)
  - Write your review
  - Choose to submit anonymously or with your account
  - Click **Submit** to post or **Clear** to start over

### Managing Shops

- **Add New Shop**
  - In the Add Boba Modal, click **+** next to shop input
  - Search by city/shop name
  - Select from results
  - Verify on Google Maps
  - Add to database

### Discovery Features

- **Filter by Flavor Tags**

  - Click tags to filter the boba list
  - Click active (blue) tags to remove them
  - Combine multiple tags for precise matching

- **Random Suggestions**

  - Use "IDK..." button for random flavor combinations
  - Limited to 3 random flavors at a time

- **Location Features**
  - Enable location to see distances
  - Sort by distance to nearest shop
  - View shop details and directions

### Sorting and Organization

- **Sort Bobas By**

  - Name (alphabetical)
  - Community Rating
  - Distance (when location enabled)

- **View Details**
  Click on any boba to see:
  - Flavor profile
  - Shop information
  - Community reviews
  - Location details
