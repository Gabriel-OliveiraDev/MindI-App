import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getLocales } from 'react-native-localize';

import { LanguagesType } from '@types';
import { useAuthContext } from '@/context';


export function useSignUpForm() {
  const { signUp } = useAuthContext()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingButton, setLoadingButton] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [language, setLanguage] = useState<LanguagesType>({} as LanguagesType);
  const [formStep, setFormStep] = useState<'nameEmail' | 'password'>('nameEmail');
  const [error, setError] = useState<{ field: string; message: string } | null>(null);


  function validateStepOne() {
    if (!name.trim()) return { field: 'name', message: 'Nome é obrigatório' };
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return { field: 'email', message: 'Email inválido' };
    return null;
  };

  function validatePasswords() {
    if (!password.trim()) return { field: 'password', message: 'Senha é obrigatória' };
    if (password.length < 6) return { field: 'password', message: 'Senha deve ter ao menos 6 caracteres' };
    if (password !== confirmPassword) return { field: 'confirmPassword', message: 'As senhas não conferem' };
    return null;
  };

  function handleContinue() {
    const validationError = validateStepOne();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setFormStep('password');
  };

  async function handleFinish() {
    const validationError = validatePasswords();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setLoadingButton(true);
    signUp({ name, email, password, language })
  };

  function handleBack() { setFormStep('nameEmail'); };

  useEffect(() => {
    getLocales()[0].languageTag === 'pt-BR' ?
      setLanguage('pt-BR')
      :
      setLanguage('en-US');
  }, [])

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    formStep,
    error,
    setError,
    handleContinue,
    handleFinish,
    handleBack,
    loadingButton,
  };
}
