# Pocket Notes Web Application

Pocket Notes is a web application built with React and CSS modules for styling on the frontend, and Node.js with JSON Server on the backend. This application allows users to create groups, add notes to those groups, and view notes based on the selected group. It also provides a responsive user interface to ensure a seamless experience on various devices.

## Table of Contents

- [Features](#features)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Usage](#usage)

## Features

### Frontend Features

- **Group Creation:** Users can create groups with a name and select a color.
- **Note Creation:** Users can add notes to selected groups with a note text and automatically generated date and time.
- **Group Selection:** Users can select a group, and notes associated with that group will be displayed.
- **Responsive Design:** The application is fully responsive to ensure a great user experience on different devices.

### Backend Features

- **Data Storage:** JSON Server is used to store and serve group and note data.
- **API Endpoints:** The backend provides API endpoints to create, read, update, and delete groups and notes.
- **Data Hosting:** The backend is hosted on Render, and it is publicly accessible for data storage.

## Usage

1. Visit the [Pocket Notes Web Application](https://earnest-melba-0950b8.netlify.app/).
2. Create groups using the "Create Group" button.
3. Select a group by clicking on its name.
4. Add notes to the selected group by entering text and clicking "Add Note."
5. View notes within the selected group.

## Local Development

If you want to run the application locally or contribute to its development, follow these steps:

### Frontend (React)

1. Clone the Pocket Notes GitHub repository.
2. Navigate to the project directory and install dependencies:

   ```sh
   cd Pocket-Notes
   npm install
           ```
   
1. Start the JSON Server:
    ```npm run dev ```

2 . The React application will be available at http://localhost:5173.

### Backend (Node.js with JSON Server)

1. Clone the Pocket Notes GitHub repository.
2. Navigate to the project directory and install dependencies:

   ```sh
   cd notes-server
   npm install
            ```  
1. Start the JSON Server:
    ```npm start
           ```
2 . The React application will be available at http://localhost:8080 || http://localhost:3000.

## Deployment

- The frontend of the Pocket Notes application is deployed on [Netlify](https://earnest-melba-0950b8.netlify.app/).

- The backend of the Pocket Notes application is deployed on [Render](https://notes-server-hg5p.onrender.com/).

## Contribution

Contributions to the project are welcome. You can contribute in the following ways:

- Open issues to report problems or suggest improvements.
- Provide feedback to help us enhance the application.
- Create pull requests on the GitHub repositories:

  - [Pocket Notes (Frontend)](https://github.com/Arvind78/Pocket-Notes)
  - [Pocket Notes Server (Backend)](https://github.com/Arvind78/notes-server)

We appreciate your contributions and feedback!

## License

This project is open-source and available under the MIT License.
  ```You can copy and paste this Markdown code into your README.md file in your Git repository. This README.md file provides information on local development, deployment, contribution guidelines, and the project's license.
                                                           ```
