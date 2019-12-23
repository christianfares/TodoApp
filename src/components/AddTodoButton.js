import React, {useState} from 'react';

import EditTodo from './EditTodo'

import Fab from '@material-ui/core/Fab'
import AddSharpIcon from '@material-ui/icons/AddSharp';
import { makeStyles } from '@material-ui/core';

/*
	These are the classes used for this component.
*/
const useStyles = makeStyles(theme => ({
	addButton: {
		margin: "10px",
		float: "right"
	}
}))

/*
	This component is resposible for handle the new todo button and modal.
	The only state is open - boolean, to indicate whether the modal is open.
	The options argument holds the submit handler function from the parent component.
*/
function AddTodoButton(options) {
	const [open, setOpen] = useState(false)

	const classes = useStyles()
	
	const openModal = () => {
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
	}

	/*
		Submit the information by calling the submit function from parent.
	*/
	const handleSubmit = (info) => {
		options.submit(info)
	}

	return (
		<div>
			<Fab 
					className={classes.addButton}
					color="primary"
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
		</div>
	)
}

export default AddTodoButton