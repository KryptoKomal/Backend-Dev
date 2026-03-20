const fs = require('fs').promises;
const db = require('../modules/');

const getAllStudents = async (req, res) => {
    try {
        const students = await db.getStudents();
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching students data' });
    }
};

const createStudent = async (req, res) => {
    try {
        const { id, name, branch } = req.body;
        if (!name || !branch) {
            return res.status(400).send('Details missing')
        }

        let existingStudent = await db.readStudentsFromFile();

        if(!existingStudent) {
            existingStudent = [];
        }

        const newStudent = {
            id: existingStudent.length + 1,
            name,
            branch,
            CreatedAt: new Date().toLocaleString()
        };
        existingStudent.push(newStudent);
        await db.writeStudentsToFile(existingStudent); 
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating student' });
    }
};



module.exports = { getAllStudents, createStudent };