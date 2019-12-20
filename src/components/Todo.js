import React, {useState} from 'react'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Todo() {
	const [summary, setSummary] = useState("Summary");
	const [description, setDescription] = useState("");
	const [isComplete, setIsComplete] = useState(false);

	function handleChange(e) {
		setIsComplete(e.target.checked)
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
			<ExpansionPanelDetails>
				{description}
			</ExpansionPanelDetails>
		</ExpansionPanel>
	)
}

export default Todo