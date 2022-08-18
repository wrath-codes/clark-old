import { operatorInfo } from "@utils/address/getInfoFromCnpj";
import { formatCep } from "@utils/format/formatCep";
import { unformatCnpj } from "@utils/format/unformatCnpj";

interface ISearchOperatorOutside {
	token: string;
	cnpj_operator: string;
}

export class SearchOperatorOutsideUseCase {
	async execute({ cnpj_operator, token }: ISearchOperatorOutside) {
		const info = await operatorInfo(cnpj_operator, token);
		const formatedZipCode = await formatCep(info.address.zip);
		return {
			name: info.name,
			cnpj: await unformatCnpj(info.cnpj),
			address: {
				street: info.address.street,
				number: Number(info.address.number),
				complement: info.address.details,
				neighborhood: info.address.district,
				city: info.address.city,
				state: info.address.state,
				country: "Brasil",
				zipCode: formatedZipCode,
			},
		};
	}
}
