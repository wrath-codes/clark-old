declare namespace Express {
	export interface Request {
		id_user: string;
		id_operator: string;
		id_plan: string;
		idToken: string;
		ttl: number;
		cnpj_info: {
			name: string;
			cnpj: string;
			address: {
				street: string;
				number: number;
				complement?: string;
				neighborhood: string;
				city: string;
				state: string;
				zipCode: string;
			};
		};
	}
}
