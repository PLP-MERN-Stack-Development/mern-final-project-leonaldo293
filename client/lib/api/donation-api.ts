const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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

export interface CreateDonationData {
  titulo: string;
  categoria: string;
  quantidade: string;
  dataValidade: string;
  localizacao: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  imagem?: string;
  descricao?: string;
}

export interface UpdateDonationData extends Partial<CreateDonationData> {
  status?: 'disponivel' | 'reservado' | 'coletado';
}

class DonationAPI {
  private getAuthHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async getAllDonations(): Promise<Donation[]> {
    const response = await fetch(`${API_URL}/donations`, {
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar doações');
    }

    return response.json();
  }

  async getDonationById(id: string): Promise<Donation> {
    const response = await fetch(`${API_URL}/donations/${id}`, {
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar doação');
    }

    return response.json();
  }

  async getUserDonations(userId: string): Promise<Donation[]> {
    const response = await fetch(`${API_URL}/donations/user/${userId}`, {
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar doações do usuário');
    }

    return response.json();
  }

  async createDonation(data: CreateDonationData): Promise<Donation> {
    const response = await fetch(`${API_URL}/donations`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar doação');
    }

    return response.json();
  }

  async updateDonation(id: string, data: UpdateDonationData): Promise<Donation> {
    const response = await fetch(`${API_URL}/donations/${id}`, {
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

  async deleteDonation(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/donations/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao deletar doação');
    }
  }

  async reserveDonation(id: string): Promise<Donation> {
    const response = await fetch(`${API_URL}/donations/${id}/reserve`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao reservar doação');
    }

    return response.json();
  }

  async cancelReservation(id: string): Promise<Donation> {
    const response = await fetch(`${API_URL}/donations/${id}/cancel-reservation`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao cancelar reserva');
    }

    return response.json();
  }

  async markAsCollected(id: string): Promise<Donation> {
    const response = await fetch(`${API_URL}/donations/${id}/collect`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao marcar como coletada');
    }

    return response.json();
  }
}

export const donationApi = new DonationAPI();
