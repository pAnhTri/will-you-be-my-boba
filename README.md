# Will You Be My Boba

**Your Community-Driven Guide to the Best Boba Spots**

## Description

Craving boba but unsure where to go? **Will You Be My Boba** makes finding your next favorite drink easier than ever. Powered by a community-driven database, this app helps you discover the best boba shops—whether you're chasing bold flavors, relaxing vibes, or hidden gems.

### What You Can Do:

- **Search by Flavor Tags:** Find drinks based on unique flavor profiles—from creamy classics to fruity delights—all curated by the community.
- **Feeling Adventurous?** Let the app surprise you with a random drink suggestion!
- **Anything Local?** Enable your browser's geolocation to find out which shops are the closest to you!
- **Check Local Shops:** Curious about your favorite spot? See what the community thinks of their menu!
- **Share Your Favorites:** Be part of the boba-loving network—recommend your go-to drink and where to find it.

**What are you waiting for? Explore, share, and sip with Will You Be My Boba!**

## Key Features

### Core Features

- **Filter by Flavor Tags**

  - Search for boba drinks by selecting flavor tags such as `earthy`, `fruity`, or specific flavors.
  - Tags are community-driven and constantly updated based on user input.

- **Select Random Flavor Tags**

  - When you need help, click on the "IDK..." button to let the app randomly select POSSIBLE flavor combinations to narrow down your search.
  - Up to 3 flavors can be chosen randomly.

- **Display Boba Listings**

  - Each drink entry shows:
    - **Name**: The drink’s official or popular name.
    - **Flavor Tags**: Community-curated flavor labels.
    - **Community Enjoyment Factor**: An aggregated score based on user ratings.

- **Anonymous Enjoyment Scoring**

  - Users can anonymously submit their enjoyment score for drinks.
  - Scores are averaged to calculate the **Community Enjoyment Factor**.

- **Sort Bobas by Name, Enjoyment, and Distance**

  - Users can sort bobas by their **Name** or **Enjoyment** scores.
  - If location is enabled, the user can also sort their boba by the **Distance** of the closest shop in miles.

- **Google Maps Integration**
  - Drinks are mapped to their respective stores using the **Google Places API**.
  - Displays shop address and a Google Maps Link directly to the shop.

---

### Upcoming Features (WIP)

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
- **MongoDB Server**

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

- **Add Boba to the Database**

  - Click on the **+** button on the bottom right corner of the screen to open the **Add Boba Modal**.
  - Fill out the form with the boba's **Name**, **Flavor** in a comma separated list, **Sweetness Level**, and **Boba Shop**.
  - **Boba Shop** will provide options of the available shops within the database.
  - Click on **Submit** to add the boba to the database.
  - Click anywhere outside the **Add Boba Modal** to exit the modal.

- **Update Boba**

  - Click on the **+** button on the bottom right corner of the screen to open the **Add Boba Modal**.
  - Type in the name of the boba to be updated into the **Name** field.
  - Fill out the rest of the form as above.
  - Click on **Submit** to update the boba within the database.
  - Click anywhere outside the **Add Boba Modal** to exit the modal.

- **Add Shop to the Database**

  - Within the **Add Boba Modal**, click the **+** button next to the boba shop input to open the **Add Location Modal**.
  - Fill out the form with either your city, shop, or relevant keywords in **City or Shop** and _OPTIONALLY_ the **Range** for the search.
  - Click on the **Search** button to fetch a list of found shops.
  - Select a shop from the search results.
  - Click on **Show Me** to open the Google Maps page in a new tab.
  - Once selected, click on the **Add Shop** button to add the selected shop to the database.
  - Click anywhere outside the **Add Location Modal** to exit the modal.

- **Filter by Flavor Tags**

  - Click on a **tag** to filter the boba list by drinks that match the selected flavor.
  - Click on a **blue tag** (indicating it's active) to unselect it.

- **Randomly Choose Flavor Tags**

  - Click on the **"IDK..."** button on top of the flavor card to let the app add a flavor tag to the current ones for you.
  - The **"IDK..."** button can only be clicked when less than 3 flavors have been selected

- **Show Distances in Miles**

  - Click on **Allow Distances** to be prompted with the browser's geolocation permission
  - Once enabled, the app will show the closest available shop from the current location, calculated with the Haversine formula

- **Sort Bobas**

  - Click on the Sort by **Name** button to sort the boba list by name.
  - Click on the Sort by **Enjoyment** button to sort the boba list by the boba's **Enjoyment** score.
  - _OPTIONAL_ If geolocation is allowed, the Sort by **Distance** button becomes avaiable to sort the boba list by the distance from the current location to the closes shop.

- **Viewing Boba Details**
  Click on a boba entry to view:
  - **Flavor Tags:** Displays the drink’s flavor profile (highlighted in blue).
  - **Community Review Details:** See what other users think about this drink.
  - **Location Details:** View the boba shop’s address and link to Google Maps.
