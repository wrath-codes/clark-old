import fetch from "node-fetch";

export const operatorInfo = async (
	cnpj: string,
	token: string
): Promise<any> => {
	return fetch(`${process.env.CNPJJA_URL}/office/${cnpj}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => {
			if (response.status === 400) {
				throw new Error("CNPJ not found");
			} else {
				return response.json();
			}
		})
		.then((data) => {
			return {
				name: data.alias !== null ? data.alias : data.company.name,
				cnpj: data.taxId,
				address: data.address,
			};
		});
};
