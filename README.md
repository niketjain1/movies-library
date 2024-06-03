# Movie Library Web Application

### Overview

This is a web application for managing movie lists. Users can create and view their movie lists, add movies to their lists, and sign in to access their personalized content.

### Features

- User Authentication: Users can sign in to access their personalized movies lists
- Create Movie Lists: Users can create their own movie lists and add movies to them.
- View Movie Lists: Users can view their existing movie lists and see details about each movie.
- Search Movies: Users can search for movies using the search functionality and add them to their lists.
- Public and Private Lists: Users can choose to make their movie lists public or private.

### Technologies Used

- Frontend:

  - React.js
  - Next.js
  - Tailwind CSS

- Backend:
  - Node.js
  - Nest.js
  - PostgresSQL

### Getting Started

#### To test locally -

1. Clone the repository:

```bash
$ git clone https://github.com/niketjain1/movies-library.git
```

2. Install dependencies:

```bash
$ cd movie-library
$ npm install
```

3. Set up the required environment variables.

- Set up db configuration in the .env file. {This is to be done locally}

4. Run the development server:

```bash
$ npm run dev
```

#### To test on prod -

Frontend host link- https://movies-library-puce.vercel.app/
Backend host link- https://movies-library-backend-l2x6.onrender.com

### Steps to add movies in the list
1. Sign into to your account using your email and password.
2. If you haven't created any list, create from the left side panel.
3. Search for any movie in the search box.
4. Select the list from the drop down option in which you want to add the movie in.
5. Click on Add to list button
6. Click on any list on the side panel to redirect to the list page