import React, { useState, useEffect, FormEvent, } from 'react';

import { Button, Table, TableBody, TableCell, TableRow} from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import logoimg from '../../assets/emix.png'


import { Container, Header, Appname, Content, Form, ListArea, BtnActionArea, ListRowArea } from './styles';

interface Task {
    title: string,
    edit: boolean,

}

const List: React.FC = () => {
    const [newTask, setNewTask] = useState('')
    const [editTask, setEditTask] = useState('')
    const [toDoList, settoDoList] = useState<Task[]>(() => {
        const storagedTodoList = localStorage.getItem('@TodoList:todotasks')

        if (storagedTodoList) {
            return JSON.parse(storagedTodoList)
        } else {
            return []
        }

    })
    const [doneList, setDoneList] = useState<Task[]>(() => {
        const storagedDoneList = localStorage.getItem('@TodoList:donetasks')

        if (storagedDoneList) {
            return JSON.parse(storagedDoneList)
        } else {
            return []
        }

    })


    useEffect(() => {
        localStorage.setItem('@TodoList:todotasks', JSON.stringify(toDoList))

    }, [toDoList])
    useEffect(() => {
        localStorage.setItem('@TodoList:donetasks', JSON.stringify(doneList))
    }, [doneList])

    function handleAddTask(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        let task: Task = {
            title: newTask,
            edit: false
        }
        settoDoList([...toDoList, task])
        setNewTask('')
    }

    async function handleEditTask(i: number) {

        let tasks = toDoList
        tasks.map((item, index) => {
            if (i === index) {
                item.title = editTask
                console.log(editTask);
                
            }
            return null
        })
        setEditTask('')
        console.log(tasks);
        
        settoDoList(tasks.filter((item, index) => index === i || index !== i))
    }

    function turnEditable(i: number) {
        let tasks = toDoList
        tasks.map((item, index) => {
            if (i === index) {
                item.edit = true
                setEditTask(item.title)
            }
            return null
        })
        settoDoList(tasks)
    }

    async function handleMoveTask(task: Task, i: number, origin: string) {
        if (origin === 'todo') {
            let toDo = toDoList

            settoDoList(toDo.filter((item, index) => index !== i))
            toDo.splice(i, 1)

            setDoneList([...doneList, task])
        } else if (origin === 'done') {
            let done = doneList

            setDoneList(done.filter((item, index) => index !== i))
            done.splice(i, 1)

            settoDoList([...toDoList, task])
        }

    }

    async function handleDeleteTask(i: number, origin: string) {
        if (origin === 'todo') {
            let toDo = toDoList

            settoDoList(toDo.filter((item, index) => index !== i))
            toDo.splice(i, 1)

        } else if (origin === 'done') {
            let done = doneList
            setDoneList(done.filter((item, index) => index !== i))
            done.splice(i, 1)
        }
    }


    return (
        <Container>
            <Header >
                <Appname>
                    <span className="todo">TODO</span>
                    <span className="list">LIST</span>
                </Appname>
                <img src={logoimg} alt="Emix" />
            </Header>
            <Content>
                <Form onSubmit={handleAddTask}>
                    <input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Digite aqui a sua tarefa..." />
                    <Button variant="contained" type="submit">Adicionar</Button>
                </Form>
                <ListArea>
                    <span>A FAZER</span>
                    <ListRowArea>
                        <Table >
                            <TableBody>
                                {toDoList.map((item, index) => {
                                    let task = item
                                    return (
                                        <TableRow key={index}>
                                            <TableCell><CheckBoxOutlineBlankIcon onClick={() => handleMoveTask(task, index, 'todo')} color="disabled" /></TableCell>
                                            <TableCell align="center">
                                                {task.edit ? <input className="edit" type="text" autoFocus onChange={(e => setEditTask(e.target.value))} />
                                                    : <p>{item.title}</p>
                                                }
                                            </TableCell>



                                            <TableCell align="center">
                                                <BtnActionArea>
                                                    {task.edit ?
                                                        <EditIcon onClick={() => {
                                                            task.edit = !task.edit
                                                            handleEditTask(index)
                                                        }} />
                                                        : <EditIcon onClick={() => turnEditable(index)} />
                                                    }

                                                    <DeleteIcon onClick={() => handleDeleteTask(index, 'todo')} />
                                                </BtnActionArea>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </ListRowArea>
                </ListArea>
                <ListArea>
                    <span>FEITO</span>
                    <ListRowArea>
                        <Table>
                            <TableBody>
                                {doneList.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell><CheckBoxIcon color="disabled" onClick={() => handleMoveTask(item, index, 'done')} /></TableCell>
                                        <TableCell align="center">

                                            <p>{item.title}</p>
                                        </TableCell>
                                        <TableCell>
                                            <BtnActionArea>
                                                <DeleteIcon onClick={() => { handleDeleteTask(index, 'done') }} />
                                            </BtnActionArea>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </ListRowArea>
                </ListArea>
            </Content>
        </Container>
    );
}

export default List;