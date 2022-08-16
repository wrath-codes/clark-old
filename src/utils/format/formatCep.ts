export const formatCep = async (cep: string) => {
	const test = cep.slice(0, 5);
	const test2 = cep.slice(5, 8);
	const result = test + "-" + test2;

	return result;
};
