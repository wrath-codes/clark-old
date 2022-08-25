export const unformatCnpj = async (cnpj: string) => {
  const test = cnpj.slice(0, 2);
  const test2 = cnpj.slice(2, 5);
  const test3 = cnpj.slice(5, 8);
  const test4 = cnpj.slice(8, 12);
  const test5 = cnpj.slice(12, 14);
  const result = `${test}.${test2}.${test3}/${test4}-${test5}`;

  return result;
};
