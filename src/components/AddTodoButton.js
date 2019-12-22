import React, {useState} from 'react';

import EditTodo from './EditTodo'

import Fab from '@material-ui/core/Fab'
import AddSharpIcon from '@material-ui/icons/AddSharp';

function AddTodoButton(options) {
	const [open, setOpen] = useState(false)
	
	const openModal = () => {
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
	}

	const handleSubmit = (info) => {
		options.submit(info)
	}

	return (
		<div>
			<Fab 
					style={{margin: "10px", float:"right"}}
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