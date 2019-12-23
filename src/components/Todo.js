import React, {useState} from 'react'

import EditTodo from './EditTodo';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import IconButton from '@material-ui/core/IconButton'
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
import { makeStyles } from '@material-ui/core';

/*
	These are the classes used for this component.
*/
const useStyles = makeStyles(theme => ({
	iconButton: {
		float: "right"
	}
}))

/*
	This is the component resposible for holding the information, and rendering
	each individual todo. It has 3 states: summary - string, desctription - string,
	and isComplete - boolean.

	Another state used is open - boolean, for the current state of the edit modal.

	The options argument holds initial values as well as the delete handler from the parent component.
*/
function Todo(options) {
	const initialState = options.initialState
	const [summary, setSummary] = useState(initialState.summary);
	const [description, setDescription] = useState(initialState.description);
	const [isComplete, setIsComplete] = useState(initialState.isComplete);

	const [open, setOpen] = useState(false)

	const classes = useStyles()

	/*
		Mark the isComplete state as true or false based on the checkbox value.
	*/
	function handleCheck(e) {
		setIsComplete(e.target.checked)
	}
	
	/*
		Open the modal
	*/
	const openModal = () => {
		setOpen(true)
	}

	/*
		Close the modal
	*/
	const closeModal = () => {
		setOpen(false)
	}

	/*
		Submit the information entered in the modal
	*/
	const handleSubmit = (info) => {
		setSummary(info.summary)
		setDescription(info.description)
	}

	return (
		<ExpansionPanel disabled={isComplete}>
			{/* the pointer event style is to enable the check box while the expansion panel is disabled */}
			<ExpansionPanelSummary 
				style={{pointerEvents:"auto"}}
				expandIcon={<ExpandMoreSharpIcon />}
			>
				{/* stopPropgation is to Stop the expansion panel from opening when the checkbox is clicked */}
				<FormControlLabel
					control = {<Checkbox color="primary"/>}
					label={summary}
					onClick={event => event.stopPropagation()}
					onChange={handleCheck}
					disabled={false}
				/>
			</ExpansionPanelSummary>
			<IconButton 
				className={classes.iconButton}
				onClick={() => {options.delete(options.id)}}
			>
				<DeleteSharpIcon />
			</IconButton>
			<IconButton 
				className={classes.iconButton}
				onClick={openModal}
				disabled={isComplete}
			>
				<EditSharpIcon />
			</IconButton>
			<EditTodo 
				open={open}
				closeModal={closeModal}
				submit={handleSubmit}
				summary={summary}
				description={description}
			/>
			<ExpansionPanelDetails>
				<Typography>
					{description}
				</Typography>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	)
}

export default Todo