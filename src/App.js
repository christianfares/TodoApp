import React, {useState} from 'react';
import uuid from 'uuid';

import Todo from './components/Todo'
import AddTodoButton from './components/AddTodoButton';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
	paper: {
		height: "100%", 
		width:"70%", 
		position:"fixed", 
		left:"15%"
	},
	header: {
		padding: "20px",
		//background: "#141D26"
	},
	title: {
		alignSelf: "center"
	},
	container: {
		paddingTop:"100px", 
		background: "white"
	},
	search: {
		paddingBottom: "15px"
	}
}))

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#141D26"
		} 
	},
});

function App() {
	const [todos, setTodos] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	
	const classes = useStyles()

	const newTodo = (info) => {
		const newTodoState = {
			summary : info.summary,
			description: info.description,
			isComplete: false
		}
		const newId = uuid.v4()
		const newTodo = {
			id : newId,
			todo : newTodoState
		}
		setTodos([...todos, newTodo])
		setSearchTerm("")
	}

	const deleteTodo = (id) => {
		setTodos([...todos.filter(todo => todo.id !== id)])
	}

	const newSearch = (event) => {
		setSearchTerm(event.target.value.toLowerCase())
	}

	const filterTodos = (todo) => {
		const loweredSummary = todo.todo.summary.toLowerCase()
		const loweredDescription = todo.todo.description.toLowerCase()
		if (loweredSummary.includes(searchTerm) || loweredDescription.includes(searchTerm)) {
			return true
		} else {
			return false
		}
	}

	const todoComponent = (todo) => {
		return <Todo
			key={todo.id}
			id={todo.id}
			initialState={todo.todo}
			delete={deleteTodo}
		/> 
	}

	return (
		<ThemeProvider theme={theme}>
			<Paper className={classes.paper}>
				<AppBar className={classes.header}>
					<Typography 
						className = {classes.title} 
						variant="h4"
						>
						Todo Application
					</Typography>
				</AppBar>
				<Container className = {classes.container}>
					<TextField 
						className={classes.search}
						fullWidth
						variant="outlined"
						label="Search Todos"
						type="search"
						value={searchTerm}
						onChange={newSearch}
						/>
					{todos.filter(filterTodos).map(todoComponent)}
					<AddTodoButton 
						submit={newTodo}
						/>
				</Container>
			</Paper>
		</ThemeProvider>
	);
}

export default App;