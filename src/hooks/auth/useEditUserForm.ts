import { useState } from 'react';
import { formatDate, parseDate } from '@utils';

export interface UseEditUserFormProps {
  name: string;
  email: string;
  phone?: string;
  birthdate?: Date;
}

export function useEditUserForm(userData: UseEditUserFormProps) {
  const [form, setForm] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone || '',
    birthdate: userData.birthdate || null,
  });

  const [error, setError] = useState('');

  const handleInputChange = (field: keyof typeof form, value: string) => {
    if (field === 'birthdate') {
      const date = parseDate(value); // Converte string para Date
      if (date) {
        setError('');
        setForm((prev) => ({ ...prev, [field]: date }));
      } else {
        setError('Data inválida. Use o formato Dia/Mês/Ano.');
      }
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const isFormValid = () => {
    return !error && form.name && form.email;
  };

  return {
    form,
    error,
    handleInputChange,
    isFormValid,
  };
}