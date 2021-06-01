import React, { useState } from "react";
import { Form } from "react-bootstrap";

const InputTags = () => {
	const [tags, setTags] = useState([]);
	const [error, setError] = useState("");

	const removeTag = (i) => {
		console.log(i);
		const newTags = [...tags];
		newTags.splice(i, 1);
		setTags(newTags);
	};

	const keyDownHandler = (e) => {
		setError("");
		const val = e.target.value;
		if (e.keyCode == 188 || e.keyCode == 13) {
			e.preventDefault();

			// Check if tag already exists
			if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
				setError("Tag exists already");
				return;
			}

			// Add tag if value is not empty
			val && setTags([...tags, val]);
			e.target.value = null;

			// Remove tag with backspace if input is empty
		} else if (e.keyCode == 8 && !val) {
			removeTag(tags.length - 1);
		}
	};

	let tagList = tags.map((tag, index) => {
		return (
			<li key={index} className='d-flex align-items-center input-tag__tag'>
				{tag}
				<button
					type='button'
					onClick={() => removeTag(index)}
					className='input-tag__remove-btn'
				>
					<span className='visually-hidden'>Remove tag</span>
					<span aria-hidden className='input-tag__remove-btn__text'>
						+
					</span>
				</button>
			</li>
		);
	});

	return (
		<div>
			<Form.Group controlId='audioTags'>
				<Form.Label>Enter tags</Form.Label>

				<Form.Control
					type='text'
					onKeyDown={keyDownHandler}
					className='input-tag__tags__input'
				/>
				<Form.Text className='text-muted'>
					{error ? (
						<span className='text-danger'>{error}</span>
					) : (
						"Press ENTER to add tag"
					)}
				</Form.Text>
			</Form.Group>
			<ul className='d-flex align-items-center flex-wrap input-tag__tags'>
				{tagList}
			</ul>
		</div>
	);
};

export default InputTags;
