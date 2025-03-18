# Will You Be My Boba

**Your Community-Driven Guide to the Best Boba Spots**

## Description

Craving boba but unsure where to go? **Will You Be My Boba** makes finding your next favorite drink easier than ever. Powered by a community-driven database, this app helps you discover the best boba shops—whether you're chasing bold flavors, relaxing vibes, or hidden gems.

### What You Can Do:

- **Search by Flavor Tags:** Find drinks based on unique flavor profiles—from creamy classics to fruity delights—all curated by the community.
- **Feeling Adventurous?** Let the app surprise you with a random drink suggestion! (WIP)
- **Check Local Shops:** Curious about your favorite spot? See what the community thinks of their menu! (WIP)
- **Share Your Favorites:** Be part of the boba-loving network—recommend your go-to drink and where to find it.

**What are you waiting for? Explore, share, and sip with Will You Be My Boba!**

## Key Features

### Core Features

- **Filter by Flavor Tags**

  - Search for boba drinks by selecting flavor tags such as `earthy`, `fruity`, or specific flavors.
  - Tags are community-driven and constantly updated based on user input.

- **Display Boba Listings**

  - Each drink entry shows:
    - **Name**: The drink’s official or popular name.
    - **Flavor Tags**: Community-curated flavor labels.
    - **Community Enjoyment Factor**: An aggregated score based on user ratings.

- **Anonymous Enjoyment Scoring**

  - Users can anonymously submit their enjoyment score for drinks.
  - Scores are averaged to calculate the **Community Enjoyment Factor**.

- **Google Maps Integration**
  - Drinks are mapped to their respective stores using the **Google Places API**.
  - Displays shop address and a Google Maps Link directly to the shop.

---

### Upcoming Features (WIP)

- **Random Drink Suggestion**

  - Can't decide? A "Surprise Me!" feature will suggest a random boba drink based on popular community picks.

- **Community Shop Reviews**

  - Users will soon be able to browse shop profiles and their drink menus based on the community's submission.

- **User Recommendations**
  - Users will be able to suggest and add new boba drinks directly to the database.

## Tech Stack

### Frontend

- **Next.js**
- **React**
- **Tailwind CSS**

### Backend

- **MongoDB**
- **Node.js**
- **Next.js**

### APIs

- **Google Places API**

### Other Tools

- **Axios**
- **Zod**
- **React-Form-Hook**

## Installation

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** or **yarn**
- **Google Places API Key** (for location data)

---

### 1. Clone the Repository

```bash
git clone https://github.com/pAnhTri/will-you-be-my-boba.git
cd will-you-be-my-boba
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Environment Variables

Create a .env file in the root directory with the following:

```ini
GOOGLE_MAPS_API_KEY=your_google_api_key
MONGO_DB_URI=your_mongodb_uri
API_BASE_URL=your_project_url
NEXT_PUBLIC_API_BASE_URL=your_project_url
```

**Note:** Never commit .env files to your repository

### 4. Run the Development Server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

By default, your app will be available at http://localhost:3000

### 5. Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

### Troubleshooting

If issues arise:

- Ensure your .env file is correctly configured.
- Verify your Google Places API Key is active and has the correct permissions.
- If dependency issues persist, run:

```bash
npm cache clean --force
```

## Usage

- **Filter by Flavor Tags**

  - Click on a **tag** to filter the boba list by drinks that match the selected flavor.
  - Click on a **blue tag** (indicating it's active) to unselect it.

- **Viewing Boba Details**
  Click on a boba entry to view:
  - **Flavor Tags:** Displays the drink’s flavor profile (highlighted in blue).
  - **Community Review Details:** See what other users think about this drink.
  - **Location Details:** View the boba shop’s address and link to Google Maps.
