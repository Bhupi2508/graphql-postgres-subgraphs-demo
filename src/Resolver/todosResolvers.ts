// Establishing a connection to your PostgreSQL database
import pool from '../db';

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

interface Student {
    name: string;
    class: string;
    gender: string;
    age: number;
}

interface StudentData {
    id: number;
    name: string;
    class: string;
    gender: string;
    age: number;
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

// Function to retrieve students based on optional criteria.
const getStudents = async ({
    id = null,
    name = null,
    class: studentClass = null,
    gender = null,
    age = null,
}: {
    id?: string | null;
    name?: string | null;
    class?: string | null;
    gender?: string | null;
    age?: number | null;
}): Promise<{ data: StudentData[] | null; message: string }> => {
    try {
        // Initialize the SQL query and values array
        let query = 'SELECT * FROM students WHERE 1 = 1';
        const values: any[] = [];

        // Initialize placeholders for optional conditions
        let placeholderCounter = 1;

        // Add conditions based on provided criteria
        if (name !== null) {
            query += ` AND name = $${placeholderCounter}`;
            values.push(name);
            placeholderCounter++;
        }

        if (studentClass !== null) {
            query += ` AND class = $${placeholderCounter}`;
            values.push(studentClass);
            placeholderCounter++;
        }

        if (gender !== null) {
            query += ` AND gender = $${placeholderCounter}`;
            values.push(gender);
            placeholderCounter++;
        }

        if (age !== null) {
            query += ` AND age = $${placeholderCounter}`;
            values.push(age);
            placeholderCounter++;
        }

        if (id !== null) {
            query += ` AND id = $${placeholderCounter}`;
            values.push(id);
            placeholderCounter++;
        }

        // Execute the SQL query and retrieve students
        const result = await pool.query(query, values);
        const students: StudentData[] = result.rows.map((row) => ({
            id: row.id,
            name: row.name,
            class: row.class,
            gender: row.gender,
            age: row.age,
            created: row.created,
        }));

        // Check if students were found and return the result
        if (students.length > 0) {
            return {
                data: students,
                message: 'Successfully fetched students',
            };
        } else {
            return {
                data: null,
                message: 'No students found',
            };
        }
    } catch (error) {
        // Handle errors and return an error message
        console.error('Error fetching students:', error);
        return {
            data: null,
            message: 'Error fetching students',
        };
    }
};

// Function to add a new student item to the database.
const addStudent = async (student: Student): Promise<{ data: Student | null; message: string }> => {
    try {
        const query = `
        INSERT INTO students (name, class, gender, age, created)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`;

        const values = [
            student.name,
            student.class,
            student.gender,
            student.age,
            `${new Date().toLocaleString()}`
        ];

        const result = await pool.query(query, values);
        const newStudent: Student = result.rows[0];

        console.log("new ", typeof(newStudent), " ", newStudent)

        return {
            data: newStudent,
            message: 'Successfully created student',
        };
    } catch (error) {
        console.error('Error adding student:', error);
        return {
            data: null,
            message: 'Error adding student',
        };
    }
};


// This is an object that holds resolver functions for various parts of your GraphQL schema
const todosResolvers = {
    Query: {
        // Resolver for the 'getBooks' query, which retrieves books based on optional criteria.
        // Arguments:
        //   - id: The ID of the book to retrieve (optional).
        //   - author: The author of the book to retrieve (optional).
        //   - published_year: The published year of the book to retrieve (optional).
        // Usage Examples:
        //   1. To fetch all books: { getBooks }
        //   2. To fetch a book by ID: { getBooks(id: "1") }
        //   3. To fetch books by author: { getBooks(author: "John Doe") }
        //   4. To fetch books by published year: { getBooks(published_year: 2023) }
        getBooks: async (_: any, { id, author, published_year }: { id?: string | null; author?: string | null; published_year?: number | null }) => getBooks({ id, author, published_year }),

        // Resolver for the 'getStudents' query, which retrieves students based on optional criteria.
        // Arguments:
        //   - id: The ID of the student to retrieve (optional).
        //   - name: The name of the student to retrieve (optional).
        //   - age: The age of the student to retrieve (optional).
        // Usage Examples:
        //   1. To fetch all students: { getStudents }
        //   2. To fetch a student by ID: { getStudents(id: "1") }
        //   3. To fetch students by name: { getStudents(name: "John Doe") }
        //   4. To fetch students by age: { getStudents(age: 20) }
        getStudents: async (_: any, { id, name, age }: { id?: string | null; name?: string | null; age?: number | null }) => getStudents({ id, name, age }),
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
        // Resolver for the 'createStudent' mutation, which adds a new student.
        addStudent: async (_: any, { name, class: studentClass, age, gender }: Student) => {
            try {
                // Create a new student object to pass to the addStudent function
                const newStudent: Student = {
                    name,
                    class: studentClass,
                    gender,
                    age
                };

                const result = await addStudent(newStudent);
                return result; // Return the result if successful
            } catch (e) {
                console.log("Error:", e);
                throw new Error("Failed to create student."); // Throw an error if there's an exception
            }
        },
    },
    Book: {
        // Resolver functions for Book fields (if needed)
    },
};

// Export the resolvers for use in your GraphQL server.
export default todosResolvers;
