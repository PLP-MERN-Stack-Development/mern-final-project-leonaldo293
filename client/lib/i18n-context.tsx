"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "pt" | "en"

interface Translation {
  [key: string]: string | Translation
}

const translations: Record<Language, Translation> = {
  pt: {
    // Navigation
    home: "Início",
    donations: "Doações",
    map: "Mapa",
    about: "Sobre",
    login: "Entrar",
    register: "Começar",
    dashboard: "Dashboard",
    profile: "Perfil",
    logout: "Sair",

    // Auth
    welcome: "Bem-vindo",
    loginTitle: "Entrar no Food Share",
    loginDescription: "Entre com sua conta para continuar doando ou recebendo alimentos",
    registerTitle: "Criar conta no Food Share",
    registerDescription: "Junte-se a nós no combate à fome e desperdício de alimentos",
    email: "E-mail",
    password: "Senha",
    name: "Nome completo",
    forgotPassword: "Esqueceu a senha?",
    createAccount: "Criar conta gratuita",
    noAccount: "Não tem uma conta?",
    hasAccount: "Já tem uma conta?",
    signUp: "Cadastre-se gratuitamente",
    signIn: "Faça login",

    // Dashboard
    welcomeUser: "Olá, {name}!",
    dashboardSubtitle: "Gerencie suas doações e veja o impacto que você está causando",
    newDonation: "Nova Doação",
    active: "Ativas",
    completed: "Concluídas",
    totalDonations: "Total de Doações",
    activeDonations: "Doações Ativas",
    completedDonations: "Doações Concluídas",
    impactedPeople: "Pessoas Impactadas",

    // Profile
    personalInfo: "Informações Pessoais",
    updateProfile: "Atualize suas informações de perfil",
    profilePicture: "Foto de Perfil",
    changePhoto: "Alterar Foto",
    accountType: "Tipo de conta",
    location: "Localização",
    memberSince: "Membro desde",
    editProfile: "Editar Perfil",
    saveChanges: "Salvar Alterações",
    cancel: "Cancelar",

    // Common
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
    backToDashboard: "Voltar para dashboard",
  },
  en: {
    // Navigation
    home: "Home",
    donations: "Donations",
    map: "Map",
    about: "About",
    login: "Login",
    register: "Get Started",
    dashboard: "Dashboard",
    profile: "Profile",
    logout: "Logout",

    // Auth
    welcome: "Welcome",
    loginTitle: "Login to Food Share",
    loginDescription: "Sign in to your account to continue donating or receiving food",
    registerTitle: "Create Food Share Account",
    registerDescription: "Join us in the fight against hunger and food waste",
    email: "Email",
    password: "Password",
    name: "Full Name",
    forgotPassword: "Forgot password?",
    createAccount: "Create Free Account",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    signUp: "Sign up for free",
    signIn: "Sign in",

    // Dashboard
    welcomeUser: "Hello, {name}!",
    dashboardSubtitle: "Manage your donations and see the impact you're making",
    newDonation: "New Donation",
    active: "Active",
    completed: "Completed",
    totalDonations: "Total Donations",
    activeDonations: "Active Donations",
    completedDonations: "Completed Donations",
    impactedPeople: "People Impacted",

    // Profile
    personalInfo: "Personal Information",
    updateProfile: "Update your profile information",
    profilePicture: "Profile Picture",
    changePhoto: "Change Photo",
    accountType: "Account Type",
    location: "Location",
    memberSince: "Member since",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    cancel: "Cancel",

    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    backToDashboard: "Back to dashboard",
  },
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")

  useEffect(() => {
    const saved = localStorage.getItem("foodshare_language") as Language
    if (saved && (saved === "pt" || saved === "en")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("foodshare_language", lang)
  }

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    if (typeof value !== "string") {
      return key // fallback to key if translation not found
    }

    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => str.replace(`{${paramKey}}`, paramValue),
        value
      )
    }

    return value
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
