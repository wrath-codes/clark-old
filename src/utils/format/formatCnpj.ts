export const formatCnpj = async (cnpj: string) => {
  return cnpj.replace(".", "").replace("/", "").replace("-", "").replace(".", "");
};
