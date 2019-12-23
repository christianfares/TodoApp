import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

/*
	These are the classes used for this component.
	These are only adjusments to the Material UI components.
*/
const useStyles = makeStyles(theme => ({
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center'
	},
	textField: {
		marginTop: "15px"
	},
	button: {
		marginTop: "15px",
		float:"right"
	},
	card: {
		padding: "20px"
	}
}))

/**
 * This is the component responsible for the modal content, either when editing a current todo or a new one.
 * I has one state: todo - object containing a string summary and a string description of a todo.
 *  
 * @param {*} options
 * 	contains initial summary and description values, parent handler function to close the modal,
 * 	and a parent handler function to submit the information. 
 */
function EditTodo(options) {
	const [todo, setTodo] = useState({
		summary: options.summary,
		description: options.description
	})

	const classes = useStyles()

	/*
		Call the parent handler to close this modal.
	*/
	const handleClose = () => {
		options.closeModal();
	}

	/*
		Handle a change the summary input field, by updating the summary in the state.
	*/
	const handleSummaryChange = (e) => {
		setTodo({
			...todo,
			summary: e.target.value
		})
	}

	/*
		Handle a change in the description input field by updating the description in the state.
	*/
	const handleDescriptionChange = (e) => {
		setTodo({
			...todo,
			description: e.target.value
		})
	}

	/*
		Handle submit. Closes the modal and then calls the parent submit function to submit the information.
	*/
	const handleSubmit = (e) => {
		e.preventDefault()
		options.closeModal();
		options.submit({
			summary: todo.summary, 
			description: todo.description
		})
	}

	return (
		<Modal
			className = {classes.modal}
			open={options.open}
			onClose={handleClose}
		>
			<Fade in={options.open}>
				<Card
					className={classes.card}
				>
					<CardHeader
						title="New Todo"
					/>
					<CardContent>
						<form
							onSubmit={handleSubmit}
						>
							<TextField 
								fullWidth
								required
								label="Summary"
								variant="outlined"
								value={todo.summary}
								onChange={handleSummaryChange}
							/>
							<TextField 
								className={classes.textField}
								variant="outlined"
								label="Description"
								multiline
								rows="5"
								fullWidth
								value={todo.description}
								onChange={handleDescriptionChange}
							/>
							<Button
								className={classes.button} 
								variant="contained"
								type="submit"
								color="primary"
							>
								Confirm
							</Button>
						</form>
					</CardContent>
				</Card>
			</Fade>
		</Modal>
	)
}

export default EditTodo