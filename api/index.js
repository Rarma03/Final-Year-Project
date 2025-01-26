// exporting mongodb models 
import mongoose from 'mongoose'
import BookModel from './models/BookModel'
import JobpostModel from './models/JobpostModel'
import StudentModel from './models/StudentModel'
import TeacherModel from './models/TeacherModel'

// connection with db
mongoose.connect(process.env.MONGO_URL);