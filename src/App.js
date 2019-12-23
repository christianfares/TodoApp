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

/*
	These are the classes used for this component.
	These are only adjusments to the Material UI components.
*/
const useStyles = makeStyles(theme => ({
	paper: {
		height: "100%", 
		width:"70%", 
		position:"fixed", 
		left:"15%"
	},
	header: {
		padding: "20px",
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

/*
	Updating the primary color of the theme globally.
*/
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#141D26"
		} 
	},
});

/**
 * This the main controller of the App. 
 * It has 2 states: todos - a list of id and todo object pairs and searchTerm - a string holding the current search term
 * which is then used to filter the todos, either by description or summary.
 */
function App() {
	const [todos, setTodos] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	
	const classes = useStyles()

	/*
		Create a new todo object, assign it an id using uuid, and add it to the list.
		This also clears the search term.
	*/
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

	/*
		Delete a todo with the give id.
	*/
	const deleteTodo = (id) => {
		setTodos([...todos.filter(todo => todo.id !== id)])
	}

	/*
		Change the search term state according to user input.
	*/
	const newSearch = (event) => {
		setSearchTerm(event.target.value.toLowerCase())
	}

	/*
		Filter function used for todos.filter below.
		Checks if the given todo contains the search term as a substring either in the 
		summary or in the desctiption. Case insesitive.
	*/
	const filterTodos = (todo) => {
		const loweredSummary = todo.todo.summary.toLowerCase()
		const loweredDescription = todo.todo.description.toLowerCase()
		if (loweredSummary.includes(searchTerm) || loweredDescription.includes(searchTerm)) {
			return true
		} else {
			return false
		}
	}

	/*
		This creats a new todo component for rendering.
	*/
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
					{/* for every todo in the list, filter it using the search term and then create a component to display. */}
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