import {Router} from 'express';
import { Todo } from '../models/todos';

type RequestBody = {text: string};
type RequestParams = {todoId: string};

let todos : Todo[] = [];

const router = Router();

router.get("/", (req,res,next) => {
    res.status(200).json({todos: todos});
});

router.post("/todo", (req,res,next) => {
    const body = req.body as RequestBody
    const newtodo : Todo = {
        id: new Date().toISOString(),
        text: body.text,
    };

    todos.push(newtodo);
     res.status(200).json({message: "Todo inserted successfully", todo: newtodo, todos: todos})

});

router.put("/todo/:todoId", (req,res,next) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const body = req.body as RequestBody;
    const todoIndex = todos.findIndex(todoitem => todoitem.id === tid);

    if(todoIndex>=0){

        todos[todoIndex] = {id:todos[todoIndex].id, text: body.text};
        return res.status(200).json({message: "Todo updated successfully"})
    
    }

    res.status(404).json({message: "Could not find todo for this id"})

});


router.delete("/todo/:todoId", (req,res,next) => {
    const params = req.params as RequestParams;
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    res.status(200).json({message: "todo deleted successfully"});
})

export default router;