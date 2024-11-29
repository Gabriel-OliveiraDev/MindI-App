// Função para formatar a data no formato 'dd/MM/yyyy'
export const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Meses começam do zero
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
