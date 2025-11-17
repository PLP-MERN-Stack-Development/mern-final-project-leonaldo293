import { Donation } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface CreateDonationData {
  titulo: string;
  categoria: string;
  quantidade: number;
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

class DonationsAPI {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async getAllDonations(): Promise<Donation[]> {
    const response = await fetch(`${API_BASE_URL}/donations`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch donations');
    }

    return response.json();
  }

  async getDonationById(id: string): Promise<Donation> {
    const response = await fetch(`${API_BASE_URL}/donations/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch donation');
    }

    return response.json();
  }

  async getUserDonations(): Promise<Donation[]> {
    const response = await fetch(`${API_BASE_URL}/donations/user`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user donations');
    }

    return response.json();
  }

  async createDonation(data: CreateDonationData): Promise<Donation> {
    const response = await fetch(`${API_BASE_URL}/donations`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create donation');
    }

    return response.json();
  }

  async updateDonation(id: string, data: UpdateDonationData): Promise<Donation> {
    const response = await fetch(`${API_BASE_URL}/donations/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update donation');
    }

    return response.json();
  }

  async deleteDonation(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/donations/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete donation');
    }
  }

  async reserveDonation(id: string): Promise<Donation> {
    const response = await fetch(`${API_BASE_URL}/donations/${id}/reserve`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to reserve donation');
    }

    return response.json();
  }

  async cancelReservation(id: string): Promise<Donation> {
    const response = await fetch(`${API_BASE_URL}/donations/${id}/cancel-reservation`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to cancel reservation');
    }

    return response.json();
  }

  async markAsCollected(id: string): Promise<Donation> {
    const response = await fetch(`${API_BASE_URL}/donations/${id}/collect`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to mark donation as collected');
    }

    return response.json();
  }
}

export const donationsAPI = new DonationsAPI();
