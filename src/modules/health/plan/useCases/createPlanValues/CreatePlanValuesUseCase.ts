import { prisma } from "@database/prismaClient";

interface ICreatePlanValues {
	id_plan: string;
	values: {
		age_0_18: number;
		age_19_23: number;
		age_24_28: number;
		age_29_33: number;
		age_34_38: number;
		age_39_43: number;
		age_44_48: number;
		age_49_53: number;
		age_54_58: number;
		age_59_above: number;
	};
}

export class CreatePlanValuesUseCase {
	async execute({ id_plan, values }: ICreatePlanValues) {
		// creates values for the plan with the provided id
		const planWithValues = await prisma.plans.update({
			where: { id: id_plan },
			data: {
				values: {
					create: {
						age_0_18: values.age_0_18,
						age_19_23: values.age_19_23,
						age_24_28: values.age_24_28,
						age_29_33: values.age_29_33,
						age_34_38: values.age_34_38,
						age_39_43: values.age_39_43,
						age_44_48: values.age_44_48,
						age_49_53: values.age_49_53,
						age_54_58: values.age_54_58,
						age_59_above: values.age_59_above,
					},
				},
			},
			include: { values: true },
		});

		return planWithValues;
	}
}
