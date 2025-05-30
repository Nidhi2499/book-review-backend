# Book-Review-Backend

- This is a Backend application for a book review System.
- following are the APIs in this application.
    - Implemented JWT-based user authentication
        - POST /signup – register a new user
        - POST /login – authenticate and return a token

    - Core Features:
        - POST /books – Add a new book (Authenticated users only)
        - GET /books – Get all books (with pagination and optional filters by author and genre)
        - GET /books/:id – Get book details by ID, including:
            - Average rating
            - Reviews (with pagination)
        - POST /books/:id/reviews – Submit a review (Authenticated users only, one review per user per book)
        - PUT /reviews/:id – Update your own review
        - DELETE /reviews/:id – Delete your own review

    - Additional Feature:
        - GET /search – Search books by title or author (partial and case-insensitive)

- To run the application locally download the zip file from the repository, extract the zip file locally.
- open the project in the code editor.
- open terminal: put the command - npm i (install the node-modules)
- install nodemon using npm install --save-dev nodemon (if nodemon dependency is not there in the package.json).
- once done execute npm start command.
- navigate to the port to check if it is working on the localhost.
