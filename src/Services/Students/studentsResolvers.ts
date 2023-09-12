// Establishing a connection to your PostgreSQL database
import pool from '../../db';

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

        console.log("new ", typeof (newStudent), " ", newStudent)

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

const studentsResolvers = {
    Query: {
        getStudents: async (_: any, { id, name, age }: { id?: string | null; name?: string | null; age?: number | null }) => getStudents({ id, name, age }),
    },
    Mutation: {
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
}


export default studentsResolvers;