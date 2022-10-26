import { useState } from "react";

import styles from "./CreationForm.module.css";

export default function CreationForm({ setSubmitted, postData, setPostData }) {
	const [formData, setFormData] = useState({ ...postData });
	function submitForm(e) {
		e.preventDefault();
		setPostData(formData);
		setSubmitted(true);
	}

	function handleChange(e, property) {
		setFormData((prev) => ({ ...prev, [property]: e.target.value }));
	}

	return (
		<form onSubmit={submitForm} className={styles.form}>
			<label>
				Title:
				<input
					className={styles.input}
					type="text"
					name="title"
					value={formData.title}
					onChange={(e) => handleChange(e, "title")}
				/>
			</label>
			<label>
				Content:
				<textarea
					className={styles.input}
					name="desc"
                    rows="20"
					value={formData.desc}
					onChange={(e) => handleChange(e, "desc")}
				/>
			</label>

			<input type="submit" className={styles.button} />
		</form>
	);
}
