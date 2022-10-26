import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function PostBody({ children }) {
	return (
		<ReactMarkdown
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
			}}
		/>
	);
}
