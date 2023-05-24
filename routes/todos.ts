import {Router} from 'express';
import { Todo } from '../models/todos';

let todos : Todo[] = [];

const router = Router();

router.get("/", (req,res,next) => {
    res.status(200).json({todos: todos});
});

router.post("/todo", (req,res,next) => {
    const newtodo : Todo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };

    todos.push(newtodo);
     res.status(200).json({message: "Todo inserted successfully", todo: newtodo, todos: todos})

});

router.put("/todo/:todoId", (req,res,next) => {
    const tid = req.params.todoId;

    const todoIndex = todos.findIndex(todoitem => todoitem.id === tid);

    if(todoIndex>=0){

        todos[todoIndex] = {id:todos[todoIndex].id, text: req.body.text};
        return res.status(200).json({message: "Todo updated successfully"})
    
    }

    res.status(404).json({message: "Could not find todo for this id"})

});


router.delete("/todo/:todoId", (req,res,next) => {
    todos = todos.filter(todoItem => todoItem.id !== req.params.todoId);
    res.status(200).json({message: "todo deleted successfully"});
})

export default router;