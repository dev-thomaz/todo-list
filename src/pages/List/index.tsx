import React, { useState, useEffect, FormEvent } from 'react';

import { Button, Table, TableBody, TableCell, TableRow, Paper, TableContainer } from '@material-ui/core'
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
    const [toDoList, settoDoList] = useState<Task[]>([])
    const [doneList, setDoneList] = useState<Task[]>([])

    function handleAddTask(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        let task: Task = {
            title: newTask,
            edit: false
        }
        settoDoList([...toDoList, task])
        setNewTask('')
    }

    function handleEditTask(i: number): void {

        let tasks = toDoList
        tasks.map((item, index) => {
            if (i == index) {
                item.title = editTask
            }
        })
        setEditTask('')
        settoDoList(tasks)
    }

    function turnEditable(i: number) {
        let tasks = toDoList
        tasks.map((item, index) => {
            if (i == index) {
                item.edit = true
                setEditTask(item.title)
            }
        })
        settoDoList(tasks)
    }

    function handleDoneTask(task: Task, i: number){
        let tasks = toDoList
        tasks.splice(i, 1)
        setDoneList([...doneList, task])
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
                    <Table >
                        <TableBody>
                            <ListRowArea>
                                {toDoList.map((item, index) => {
                                    let task = item
                                    return (
                                        <TableRow key={index}>
                                            <TableCell><CheckBoxOutlineBlankIcon onClick={() => handleDoneTask(task, index)} color="disabled" /></TableCell>
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

                                                    <DeleteIcon />
                                                </BtnActionArea>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                            </ListRowArea>
                        </TableBody>
                    </Table>
                </ListArea>
                <ListArea>
                    <span>FEITO</span>
                    <Table>
                        <TableBody>
                            <ListRowArea>
                                {doneList.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell><CheckBoxIcon color="disabled" /></TableCell>
                                        
                                        <TableCell>
                                            <BtnActionArea>
                                                <DeleteIcon />
                                            </BtnActionArea>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </ListRowArea>
                        </TableBody>
                    </Table>
                </ListArea>
            </Content>
        </Container>
    );
}

export default List;