const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  nome: string
  email: string
  password: string
  tipo: 'doador' | 'receptor'
}

export interface Recipe {
  _id: string
  titulo: string
  descricao: string
  ingredientes: string[]
  instrucoes: string
  tempoPreparo: number
  porcoes: number
  imagem?: string
  autor: string
  createdAt: string
}

export interface Donation {
  _id: string
  titulo: string
  descricao: string
  quantidade: number
  unidade: string
  localizacao: string
  dataValidade: string
  imagem?: string
  doador: string
  status: 'disponivel' | 'reservada' | 'entregue'
  createdAt: string
}

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  async login(data: LoginData) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erro no login')
    }

    return response.json()
  }

  async register(data: RegisterData) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erro no registro')
    }

    return response.json()
  }

  async getRecipes() {
    const response = await fetch(`${API_URL}/api/recipes`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar receitas')
    }

    return response.json()
  }

  async createRecipe(recipe: Omit<Recipe, '_id' | 'autor' | 'createdAt'>) {
    const response = await fetch(`${API_URL}/api/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(recipe),
    })

    if (!response.ok) {
      throw new Error('Erro ao criar receita')
    }

    return response.json()
  }

  async updateRecipe(id: string, recipe: Partial<Recipe>) {
    const response = await fetch(`${API_URL}/api/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(recipe),
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar receita')
    }

    return response.json()
  }

  async deleteRecipe(id: string) {
    const response = await fetch(`${API_URL}/api/recipes/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Erro ao deletar receita')
    }

    return response.json()
  }

  async getDonations() {
    const response = await fetch(`${API_URL}/api/donations`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar doações')
    }

    return response.json()
  }

  async createDonation(donation: Omit<Donation, '_id' | 'doador' | 'createdAt'>) {
    const response = await fetch(`${API_URL}/api/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(donation),
    })

    if (!response.ok) {
      throw new Error('Erro ao criar doação')
    }

    return response.json()
  }

  async updateDonation(id: string, donation: Partial<Donation>) {
    const response = await fetch(`${API_URL}/api/donations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(donation),
    })

    if (!response.ok) {
      throw new Error('Erro ao atualizar doação')
    }

    return response.json()
  }

  async deleteDonation(id: string) {
    const response = await fetch(`${API_URL}/api/donations/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Erro ao deletar doação')
    }

    return response.json()
  }
}

export const api = new ApiService()
