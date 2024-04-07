import { nanoid } from "nanoid";
import { supabase } from "../supabaseClient";

export const createPage = async () => {
	const { data: userData } = await supabase.auth.getUser();
	const user = userData.user;
	if (!user) {
		throw new Error("You must be logged in to create a page.");
	}
	const slug = nanoid();

	const page = {
		id: undefined,
		title: "Untitled",
		slug,
		nodes: [],
		created_by: user.id,
	};

	await supabase.from("pages").insert(page);
	const { data: pageData } = await supabase
		.from("pages")
		.select("id")
		.match({ slug, created_by: user.id })
		.single();

	page.id = pageData?.id;

	return page;
};

