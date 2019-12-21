import React, {useState} from 'react';

import Todo from './components/Todo'
import EditTodo from './components/EditTodo'

import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab'
import AddSharpIcon from '@material-ui/icons/AddSharp';


function App() {
	const [todos, setTodos] = useState([<Todo/>, <Todo/>, <Todo/>])
	const [open, setOpen] = useState(false)
	
	const newTodo = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
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
					onClick={newTodo}
				>
					<AddSharpIcon />
				</Fab>
				<EditTodo 
					open = {open}
					handleClose = {handleClose}
				/>
			</Container>
		</React.Fragment>
	);
}

export default App;