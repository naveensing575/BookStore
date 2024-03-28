# Bookstore

Bookstore is a web application built using the MERN stack, TypeScript, and Tailwind CSS, allowing users to manage books with CRUD operations.

## Features

- Book catalog: Display a list of books with details such as title, author, date in a table format where you can rearrange your order of perfernce using the drag and drop feature.
- CRUD operations for books: Implement Create, Read, Update, and Delete operations for managing books.

## Technologies Used

- MongoDB: NoSQL database for storing book data.
- Express.js: Node.js web application framework for building the backend.
- React.js: JavaScript library for building the user interface.
- Node.js: JavaScript runtime environment for running server-side code.
- TypeScript: A superset of JavaScript that adds static typing to the language.
- Tailwind CSS: A utility-first CSS framework for styling web applications.

## Installation

1. Clone the repository:

git clone <repository-url>

2. Navigate to the project directory:

cd bookstore

3. Install dependencies for both the client and server:
   
cd frontend
npm install
cd ../backend
npm install


4. Set up environment variables:

   - Create a `.env` file in the `server` directory.
   - Define the following variables:

mongodb+srv://usernam:pass@mongo.x2o6ohj.mongodb.net/?retryWrites=true&w=majority&appName=your_app_name

PORT = 4000


5. Run the application:

- Start the server:

npm run dev


The application will be running at `http://localhost:3000`.

## API Endpoints

- **GET /api/books**: Retrieve all books.
- **GET /api/books/:id**: Retrieve a specific book by ID.
- **POST /api/books**: Create a new book.
- **PUT /api/books/:id**: Update a specific book by ID.
- **DELETE /api/books/:id**: Delete a specific book by ID.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
