import { useState } from "react";
import CreationForm from "../components/CreationForm";
import PostPreview from "../components/PostPreview";

const dummyPost = {
	title: "Hello Website; Hello Next.js!",
	slug: "hello-website-001",
    desc: "Lorem ipsum",
	body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, doloribus ut veniam provident quod et expedita ab voluptatem quaerat exercitationem, iure vitae at! Debitis qui culpa, temporibus amet sequi fugiat.",
	categories: ["programming", "visual"],
	fancyTitle: "⚛️Next is best.🌐",
	thumbStyle: {
		backgroundImage: "linear-gradient(to right, #DAE2F8, #D6A4A4)",
		fontSize: "3rem",
		textShadow: "2px 2px hsl(var(--clr-dark))",
	},
};

export default function Post({ post }) {
	const [submitted, setSubmitted] = useState(false);
	const [postFormData, setPostFormData] = useState({ ...dummyPost });

	function submitToDb() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(postFormData),
		};
		fetch("/api/submitPost", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}

	return submitted ? (
		<>
			<PostPreview post={postFormData} />
			<button onClick={() => setSubmitted(false)}>back to editing</button>
			<button onClick={submitToDb}>add to db</button>
		</>
	) : (
		<CreationForm
			setSubmitted={setSubmitted}
			postData={postFormData}
			setPostData={setPostFormData}
		/>
	);
}
