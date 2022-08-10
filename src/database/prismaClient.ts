import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

// slugify middleware for slug field
prisma.$use(async (params, next) => {
	if (
		(params.action === "create" || params.action === "update") &&
		params.model === "Operators"
	) {
		let {
			args: { data },
		} = params;
		// Check if slug exists by `findUnique` (did not test)
		data.slug = slugify(`${data.name}`, {
			lower: true,
			strict: true,
			remove: /[*+~.()'"!:@]/g,
		});
	}
	const result = await next(params);
	return result;
});

export { prisma };
