import { useState } from "react";

import styles from "./CreationForm.module.css";

export default function CreationForm({ setSubmitted, postData, setPostData }) {
	const [formData, setFormData] = useState({ ...postData });
	const [styleData, setStyleData] = useState(
		JSON.stringify(postData.thumbStyle)
			.replace("{", "{\n  ")
			.replace("}", "\n}")
			.replaceAll('",', '",\n  ')
	);
	function submitForm(e) {
		e.preventDefault();
		setPostData({ ...formData, thumbStyle: JSON.parse(styleData) });
		setSubmitted(true);
	}

	function handleChange(e, property) {
		setFormData((prev) => ({ ...prev, [property]: e.target.value }));
	}

	const handleFileUpload = (e) => {
		const fileReader = new FileReader();
		fileReader.readAsText(e.target.files[0], "UTF-8");
		fileReader.onload = (e) => {
			console.log("e.target.result", e.target.result);
			setFormData(JSON.parse(e.target.result));
			setStyleData(
				JSON.stringify(JSON.parse(e.target.result).thumbStyle)
					.replace("{", "{\n  ")
					.replace("}", "\n}")
					.replaceAll('",', '",\n  ')
			);
		};
	};
	function handleCategoryChange(e, catName) {
		if (formData.categories.includes(catName))
			setFormData((prev) => ({
				...prev,
				categories: prev.categories.filter((item) => item !== catName),
			}));
		else
			setFormData((prev) => ({
				...prev,
				categories: [...prev.categories, catName],
			}));
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
				Slug:
				<input
					className={styles.input}
					type="text"
					name="slug"
					value={formData.slug}
					onChange={(e) => handleChange(e, "slug")}
				/>
			</label>
			<label>
				Thumbnail title:
				<input
					className={styles.input}
					type="text"
					name="fancyTitle"
					value={formData.fancyTitle}
					onChange={(e) => handleChange(e, "fancyTitle")}
				/>
			</label>
			<label>
				Thumbnail style:
				<textarea
					className={styles.input}
					name="thumbStyle"
					rows="10"
					value={styleData}
					onChange={(e) => {
						setStyleData(e.target.value);
					}}
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
			Categories:
			<div style={{ display: "flex", gap: "1rem" }}>
				<div>
					Programming:
					<input
						type={"checkbox"}
						checked={formData.categories.includes("programming")}
						onChange={(e) => {
							handleCategoryChange(e, "programming");
						}}
					/>
				</div>
				<div>
					Audio:
					<input
						type={"checkbox"}
						checked={formData.categories.includes("audio")}
						onChange={(e) => {
							handleCategoryChange(e, "audio");
						}}
					/>
				</div>
				<div>
					Visual:
					<input
						type={"checkbox"}
						checked={formData.categories.includes("visual")}
						onChange={(e) => {
							handleCategoryChange(e, "visual");
						}}
					/>
				</div>
			</div>
			<input type="submit" className={styles.button} />
			<input
				type="file"
				className={styles.button}
				onChange={handleFileUpload}
			/>
			<a
				type="button"
				href={`data:text/json;charset=utf-8,${encodeURIComponent(
					JSON.stringify(formData, null, 2)
				)}`}
				download="post.json"
			>
				Download Post as Json
			</a>
		</form>
	);
}
