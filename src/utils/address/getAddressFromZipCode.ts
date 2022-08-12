import fetch from "node-fetch";

export const operatorAddress = async (zipCode: string): Promise<any> => {
	return fetch(`${process.env.CPF_API_URL}/${zipCode}/json/`)
		.then((response) => {
			if (response.status === 400) {
				throw new Error("Zipcode not found");
			} else {
				return response.json();
			}
		})
		.then((data) => {
			return {
				logradouro: data.logradouro,
				bairro: data.bairro,
				localidade: data.localidade,
				uf: data.uf,
				cep: data.cep,
			};
		});
};
