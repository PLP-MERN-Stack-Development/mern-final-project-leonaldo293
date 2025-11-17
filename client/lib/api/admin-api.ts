const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface User {
  _id: string;
  nome: string;
  email: string;
  tipo: 'doador' | 'receptor';
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Donation {
  _id: string;
  titulo: string;
  descricao?: string;
  categoria: string;
  quantidade: string;
  dataValidade: string;
  localizacao: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  imagem?: string;
  status: 'disponivel' | 'reservado' | 'coletado';
  doador: {
    _id: string;
    nome: string;
  };
  reservadoPor?: {
    _id: string;
    nome: string;
  };
  createdAt: string;
}

class AdminAPI {
  private getAuthHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  // User management
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar usuários');
    }

    return response.json();
  }

  async updateUserRole(userId: string, role: 'user' | 'admin'): Promise<User> {
    const response = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ role }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao atualizar role do usuário');
    }

    return response.json();
  }

  async deleteUser(userId: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao deletar usuário');
    }
  }

  // Donation management
  async getAllDonations(): Promise<Donation[]> {
    const response = await fetch(`${API_URL}/admin/donations`, {
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar doações');
    }

    return response.json();
  }

  async updateDonation(donationId: string, data: Partial<Donation>): Promise<Donation> {
    const response = await fetch(`${API_URL}/admin/donations/${donationId}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao atualizar doação');
    }

    return response.json();
  }

  async deleteDonation(donationId: string): Promise<void> {
    const response = await fetch(`${API_URL}/admin/donations/${donationId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao deletar doação');
    }
  }
}

export const adminApi = new AdminAPI();
