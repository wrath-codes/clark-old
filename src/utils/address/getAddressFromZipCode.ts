// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from "node-fetch";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
