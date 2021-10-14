import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import TodoModel from './schemas/todo_schemas.js'

dotenv.config()

const app = express();



app.use(express.json());  // state that you want data to be returned in json format
const port = 3000;
const db = process.env.DB_URL;


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch(
    (err) => {
        console.log(err)
    }
)

    // get all todos (completed or not)
    // get one todo
    // create todo
    // patch (update) one todo
    // delete todo
    // patch one todo


    
app.get('/', (req, res) => {
    return res.status(200).json({
          message: 'Welcome to the todo API.'
    })
})


// get all todos (completed or not)
app.get('/todos', async (req, res) => {
    const todoModel = await TodoModel.find({});
    if(todoModel){
        return res.status(200).json({
            status:true,
            message: 'Todo fetched successfully',
            data: todoModel
        })
    } 
    else{
        return res.status(400).json({
            status:false,
            message: 'Todos not found'
        })
    }
})

// get one todo
app.get('/todo/:id', async (req, res) => {

const {id} = req.params;

    const todoModel = await TodoModel.findById(id);
    if(todoModel){
        return res.status(200).json({
            status:true,
            message: 'Todo fetched successfully',
            data: todoModel
        })
    } 
    else{
        return res.status(400).json({
            status:false,
            message: 'Todos not found'
        })
    }
})

// create todo
app.post('/todos', async(request, res) => {

const {title, description, date_time} = request.body;
const todoModel = TodoModel.create({
    title, 
    description,
    date_time
})
    if(todoModel){
        return res.status(200).json({
            status:true,
            message: 'Todo created',
            data: todoModel
        })
    } 
    else{
        return res.status(400).json({
            status:false,
            message: 'Todos not found'
        })
    }
})


///update todo
app.patch('/todos/:id', async(req, res) => {
    const {id} = req.params;
    const {status} = req.params;

    const todoModel = await TodoModel.updateOne({status: status}).where({_id: id});

    if(todoModel){
        return res.status(200).json({
            status:true,
            message: 'Todos marked as completed',
            data: todoModel
        })
    } 
    else{
        return res.status(400).json({
            status:false,
            message: 'Todos not found'
        })
    }
})


// delete todo
app.delete('/todos/:id', async(req, res) => {
    const todoModel = await TodoModel.findByIdAndDelete(req.param.id);

    if(todoModel){
        return res.status(200).json({
            status:true,
            message: 'Todo deleted',
            data: todoModel
        })
    } 
    else{
        return res.status(400).json({
            status:false,
            message: 'Todos failed to delete'
        })
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

