export interface User {
  _id: string
  nome: string
  email: string
  tipo: "doador" | "receptor"
  role: "user" | "admin"
  avatar?: string
  createdAt: string
}

export interface Recipe {
  _id: string
  titulo: string
  descricao: string
  ingredientes: string[]
  instrucoes: string[]
  tempoPreparo: number
  porcoes: number
  imagem?: string
  autor: {
    _id: string
    nome: string
  }
  createdAt: string
}

export interface Comment {
  _id: string
  comentario: string
  autor: {
    _id: string
    nome: string
  }
  recipeId: {
    _id: string
    titulo: string
  }
  createdAt: string
}

export interface Donation {
  _id: string
  titulo: string
  categoria: "frutas" | "vegetais" | "graos" | "laticinios" | "proteinas" | "padaria" | "outros"
  quantidade: string
  dataValidade: string
  localizacao: string
  coordenadas: {
    lat: number
    lng: number
  }
  imagem?: string
  descricao?: string
  status: "disponivel" | "reservado" | "coletado"
  reservadoPor?: {
    _id: string
    nome: string
  }
  doador: {
    _id: string
    nome: string
  }
  createdAt: string
}
