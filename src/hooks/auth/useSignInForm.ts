import { useAuthContext } from "@/context";
import { useEffect, useState } from "react";

export function useSignInForm() {
  const { signIn } = useAuthContext()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState<{ field: string; message: string } | null>(null);

  useEffect(() => {
    if (buttonLoading) {
      setInterval(() => {
        setButtonLoading(false);
      }, 3000);
    }
  }, [buttonLoading]);

  function validateData() {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return { field: 'email', message: 'Email inválido' };
    if (!password.trim()) return { field: 'password', message: 'Senha é obrigatória' };
    if (password.length < 6) return { field: 'password', message: 'Senha deve ter ao menos 6 caracteres' };
    return null;
  };

  async function handleFinish() {
    const validData = validateData();
    if (validData) {
      setError(validData);
      return;
    };
    setError(null);
    setButtonLoading(true);
    signIn(email, password);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    buttonLoading,
    setError,
    error,
    handleFinish,
  };
}