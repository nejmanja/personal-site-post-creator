import Head from "next/head";
import PostBody from "../components/PostBody";

import styles from "./PostPreview.module.css";
import utilStyles from "../styles/utils.module.css";

export default function PostPreview({post}) {
	return (
		<div className={styles.post}>
			<Head>
				<title>{post.title}</title>
			</Head>
			<div
				className={`${styles.imgContainer} ${
					post.categories.includes("programming") ? styles.accentR : ""
				} ${post.categories.includes("audio") ? styles.accentG : ""}
        ${post.categories.includes("visual") ? styles.accentB : ""}`}
			>
				{post.photo ? (
					<Image src={post.photo} layout="fill" objectFit="cover" />
				) : (
					<div
                        className={`${utilStyles.uppercase} ${utilStyles.bold}`}
						style={{
							...post.thumbStyle,
							backgroundColor: "black",
							height: "100%",
							width: "100%",
							display: "flex",
							textAlign: "center",
                            fontSize: "4vw",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							position: "absolute",
							letterSpacing: "-0.025em",
							color: "white",
							width: "100%",
							lineHeight: 1.4,
						}}
					>
						{post.fancyTitle + " " + post.title}
					</div>
				)}
			</div>
			<div className={styles.content}>
				<div className={`${styles.desc} ${utilStyles.fs400}`}>
					<PostBody>{post.body}</PostBody>
				</div>
			</div>
		</div>
	);
}
