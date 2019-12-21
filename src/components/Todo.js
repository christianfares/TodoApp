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

function Todo({initialState}) {
	//console.log(initialState)
	const [summary, setSummary] = useState(initialState.summary);
	const [description, setDescription] = useState(initialState.description);
	const [isComplete, setIsComplete] = useState(initialState.isComplete);

	function handleChange(e) {
		setIsComplete(e.target.checked)
	}

	const [open, setOpen] = useState(false)
	
	const openModal = () => {
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
	}

	const handleSubmit = (summary, description) => {
		setSummary(summary)
		setDescription(description)
	}

	return (
		<ExpansionPanel disabled={isComplete}>
			{/* the pointer event style is to enable the check box while the expansion panel is disabled */}
			
			<ExpansionPanelSummary style={{pointerEvents:"auto"}}>
				<FormControlLabel
					control = {<Checkbox />}
					label={summary}
					onClick={event => event.stopPropagation()}
					onChange={handleChange}
					disabled={false}
				/>
			</ExpansionPanelSummary>
			<IconButton style={{float:"right"}}>
				<DeleteSharpIcon />
			</IconButton>
			<IconButton 
				style={{float:"right"}}
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