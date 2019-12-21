import React, {useState} from 'react';
import uuid from 'uuid';

import Todo from './components/Todo'
import EditTodo from './components/EditTodo'

import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab'
import AddSharpIcon from '@material-ui/icons/AddSharp';


function App() {
	const emptyInitial = {
		summary: "Summary",
		description: "This is some text",
		isComplete: false
	}
	const [todos, setTodos] = useState([<Todo key="4" initialState={emptyInitial}/>])
	const [open, setOpen] = useState(false)
	
	const openModal = () => {
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
	}

	const handleSubmit = (summary, description) => {
		const newTodoState = {
			summary : summary,
			description: description,
			isComplete: false
		}
		const newTodo = <Todo key="1" initialState = {newTodoState}/>
		setTodos([...todos, newTodo])
	}

	return (
		<React.Fragment>
			<AppBar style={{padding:"10px"}}>
				<Typography style={{alignSelf:"center"}} variant="h4">Todo Application</Typography>
			</AppBar>
			<Container style = {{paddingTop:"70px"}}>
				{todos}
				<Fab 
					style={{margin: "10px", float:"right"}}
					onClick={openModal}
				>
					<AddSharpIcon />
				</Fab>
				<EditTodo 
					open = {open}
					closeModal = {closeModal}
					submit = {handleSubmit}
					summary=""
					description=""
				/>
			</Container>
		</React.Fragment>
	);
}

export default App;