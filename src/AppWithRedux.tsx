import React, {useCallback} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/Todolist";
import {FullInput} from "./components/FullInput";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store.js";
import TodolistWithTasks from "./components/TodolistWithTasks";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    let dispatch = useDispatch()

    const removeTodolist = useCallback((todolisdID: string) => {
        dispatch(removeTodolistAC(todolisdID))
    }, [])

    const addTask = useCallback((todolisdID: string, title: string) => {
        dispatch(addTaskAC(title, todolisdID))
    }, [])

    const removeTask = useCallback((todolisdID: string, taskID: string) => {
        dispatch(removeTaskAC(taskID, todolisdID))
    }, [])

    const changeTaskStatus = useCallback((todolisdID: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolisdID))
    }, [])

    const changeFilter = useCallback((todolisdID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolisdID, filter))
    }, [])

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [])

    const changeTodolistTitle = useCallback((todolisdID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolisdID, newTitle))
    }, [])

    const changeTaskTitle = useCallback((todolisdID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolisdID))
    }, [])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <FullInput callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        return (
                            <Grid item key={el.id}>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        key={el.id}
                                        todolisdID={el.id}
                                        title={el.title}
                                        tasks={tasks[el.id]}
                                        filter={el.filter}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                        changeTaskTitle={changeTaskTitle}
                                    />

                                    {/*<TodolistWithTasks*/}
                                    {/*    todolist={el}*/}
                                    {/*/>*/}

                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
