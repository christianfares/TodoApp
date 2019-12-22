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

function Todo(options) {
	//console.log(options)
	const initialState = options.initialState
	const [summary, setSummary] = useState(initialState.summary);
	const [description, setDescription] = useState(initialState.description);
	const [isComplete, setIsComplete] = useState(initialState.isComplete);

	function handleCheck(e) {
		setIsComplete(e.target.checked)
	}

	const [open, setOpen] = useState(false)
	
	const openModal = () => {
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
	}

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
				<FormControlLabel
					control = {<Checkbox color="primary"/>}
					label={summary}
					onClick={event => event.stopPropagation()}
					onChange={handleCheck}
					disabled={false}
				/>
			</ExpansionPanelSummary>
			<IconButton 
				style={{float:"right"}}
				onClick={() => {options.delete(options.id)}}
			>
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