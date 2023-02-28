import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {useRouter} from "next/router";
import {AiOutlineLink} from "react-icons/ai";

import styles from "./PostBody.module.css";

export default function PostBody({ children }) {
    const router = useRouter();
	return (
		<ReactMarkdown
			rehypePlugins={[rehypeRaw]}
			children={children}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");
					return !inline && match ? (
						<SyntaxHighlighter
							children={String(children).replace(/\n$/, "")}
							language={match[1]}
							PreTag="div"
							style={darcula}
							customStyle={{
								background: "hsl(var(--clr-less-dark))",
								textShadow: "none",
								fontSize: "var(--fs-200)",
							}}
							{...props}
						/>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					);
				},
				h1: ({ node, ...props }) => {
					const idTag = props.children[0].toLowerCase().replaceAll(" ", "_");
					return (
						<a className={styles.headingLink} href={`${router.asPath}#${idTag}`}>
							<h1 id={idTag}>
								{props.children[0]} <AiOutlineLink className={styles.icon} />
							</h1>
						</a>
					);
				},
                a: ({node, ... props}) => <a target="_blank" className={styles.link} {...props}/>
			}}
		/>
	);
}
