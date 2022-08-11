import slugify from "slugify";

/** ------------------------------------------------------------------------------ */
export const slugifyName = async (name: string) => {
	const newName = slugify(`${name}`, {
		lower: true,
		strict: true,
		remove: /[*+~.()'"!:@]/g,
	});
	return newName;
};

/** ------------------------------------------------------------------------------ */
