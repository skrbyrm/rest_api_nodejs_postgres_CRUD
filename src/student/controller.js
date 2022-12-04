
const pool = require("../../db")
const queries = require("./queries");

const getStudents = (req,res) => {
    pool.query(queries.getStudents, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getStudentsByID = (req,res) => {
    pool.query(queries.getStudentsByID, (error,results) => {
        const id = parseInt(req.params.id);
        pool.query(queries.getStudentsByID,[id],(error,results) =>{
            if (error) throw error;
            res.status(200).json(results.rows);
        })
    })
};

const addStudent = (req,res) => {
    const { name,email,age,dob } = req.body;

    // check if email exist
    pool.query(queries.checkEmailExists, [email], (error,results) => {
        if ( results.rows.length) {
            res.send("email already exists.");
        }

        pool.query(queries.addStudent, 
            [name,email,age,dob], (error,results) => {
            if ( error) throw error;
                res.status(201).send("user created.");
            });
        });
};

const removeStudent = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.removeStudent, [id], (error,results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist!")
        }

        pool.query(queries.removeStudent, [id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Student removed successfully!");

        });

    });
};

const updateStudent = (req,res) => {
    const id = parseInt(req.params.id);
    const {name} = req.body;

    pool.query(queries.getStudentsByID, [id],(error,results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist!")
        }

        pool.query(queries.updateStudent, [name,id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Student update succesfully");
        });
    });

};


module.exports = {
    getStudents,
    getStudentsByID,
    addStudent,
    removeStudent,
    updateStudent,
};