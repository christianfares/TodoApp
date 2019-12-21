import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles(theme => ({
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center'
	},
	paper: {
		width:"500px",
		height:"500px",
		alignItems: 'center',
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

export default function EditTodo(state) {
	const classes = useStyles()

	const handleClose = () => {
		state.handleClose();
	}

	return (
		<Modal
			className = {classes.modal}
			open={state.open}
			onClose={handleClose}
		>
			<Fade in={state.open}>
				<Card
					className={classes.card}
				>
					<CardHeader
						title="New Todo"
					/>
					<CardContent>
						<form>
							<TextField 
								fullWidth
								label="Summary"
								variant="outlined"
							/>
							<TextField 
								className={classes.textField}
								variant="outlined"
								label="Description"
								multiline
								rows="5"
								fullWidth
							/>
							<Button
								className={classes.button} 
								variant="contained"
								type="submit"
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
