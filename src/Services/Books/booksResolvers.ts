// Establishing a connection to your PostgreSQL database
import pool from '../../db';

interface Book {
    title: string;
    author: string;
    published_year: number;
    description: string;
}

interface BookData {
    book_id: number;
    title: string;
    author: string;
    published_year: number;
    description: string;
    created: string;
}

// Function to retrieve books based on optional criteria.
const getBooks = async ({
    id = null,
    author = null,
    published_year = null,
}: {
    id?: string | null;
    author?: string | null;
    published_year?: number | null;
}): Promise<{ data: BookData[] | null; message: string }> => {
    try {
        // Initialize the SQL query and values array
        let query = 'SELECT * FROM books WHERE 1 = 1';
        const values: any[] = [];

        // Initialize placeholders for optional conditions
        let placeholderCounter = 1;

        // Add conditions based on provided criteria
        if (author !== null) {
            query += ` AND author = $${placeholderCounter}`;
            values.push(author);
            placeholderCounter++;
        }

        if (published_year !== null) {
            query += ` AND published_year = $${placeholderCounter}`;
            values.push(published_year);
            placeholderCounter++;
        }

        if (id !== null) {
            query += ` AND book_id = $${placeholderCounter}`;
            values.push(id);
            placeholderCounter++;
        }

        // Execute the SQL query and retrieve books
        const result = await pool.query(query, values);
        console.log("result ::::: ", result)
        const books: BookData[] = result.rows.map((row) => ({
            book_id: row.book_id,
            title: row.title,
            author: row.author,
            published_year: row.published_year,
            description: row.description,
            created: row.created,
        }));

        console.log("books :: ", books)

        // Check if books were found and return the result
        if (books.length > 0) {
            return {
                data: books,
                message: 'Successfully fetched books',
            };
        } else {
            return {
                data: null,
                message: 'No books found',
            };
        }
    } catch (error) {
        // Handle errors and return an error message
        console.error('Error fetching books:', error);
        return {
            data: null,
            message: 'Error fetching books',
        };
    }
};

// Function to add a new book item to the database.
const addBook = async (book: Book): Promise<{ data: Book | null; message: string }> => {
    try {
        const query = `
        INSERT INTO books (title, author, published_year, description, created)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`;

        const values = [
            book.title,
            book.author,
            book.published_year,
            book.description,
            `${new Date().toLocaleString()}`
        ];

        const result = await pool.query(query, values);
        const newBook: Book = result.rows[0];

        return {
            data: newBook,
            message: 'Successfully created book',
        };
    } catch (error) {
        console.error('Error adding book:', error);
        return {
            data: null,
            message: 'Error adding book',
        };
    }
};

const booksResolvers = {
    Query: {
        getBooks: async (_: any, { id, author, published_year }: { id?: string | null; author?: string | null; published_year?: number | null }) => getBooks({ id, author, published_year }),
    },
    Mutation: {
        // Resolver for the 'createBook' mutation, which adds a new book.
        createBook: async (_: any, { title, author, published_year, description }: Book) => {
            try {
                // Create a new book object to pass to the addBook function
                const newBook: Book = {
                    title,
                    author,
                    published_year,
                    description
                };

                const result = await addBook(newBook);
                return result; // Return the result if successful
            } catch (e) {
                console.log("Error:", e);
                throw new Error("Failed to create book."); // Throw an error if there's an exception
            }
        },
    },
    Book: {
        // Resolver functions for Book fields (if needed)
    },
};

export default booksResolvers;