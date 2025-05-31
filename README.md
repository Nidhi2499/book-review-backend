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


- make sure to have .env file to test the application 
    - MONGO_URI needed
    - PORT needed
    - JWT_SECRET needed
    in order for quick check ping me for these.

- Schema 
    - user model, book model, rreview model

    - user model == wherever a user signs in the {email, username, password(encrypted) gets stored in the collection}
    - book model == book details with the createdby field (stores the id of the user )
    - review model == stores the book id , user id and the commect and rating on the book (min:1 , max :5)