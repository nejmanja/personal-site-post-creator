import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const client = await clientPromise;
			const db = client.db("test");
			req.body.categories = req.body.categories.map((item) => {
				switch (item) {
					case "programming":
						return ObjectId("634c60a70980c0847341425e");
					case "audio":
						return ObjectId("634c60c10980c08473414261");
					case "visual":
						return ObjectId("634c60cb0980c08473414263");
					default:
						break;
				}
			});

			const ind = await db
				.collection("posts")
				.findOne({}, { sort: { index: -1 }, projection: { _id: 0, index: 1 } });
			const posts = await db.collection("posts").insertOne({
				...req.body,
				createdAt: new Date(),
				updatedAt: new Date(),
				index: ind.index + 1,
			});

			return res.status(200).json(posts);
		} catch (e) {
			return res.status(500).json({ msg: e });
		}
	}
}
