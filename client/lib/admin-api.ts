import { User, Recipe, Comment, Donation } from "@/types"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export const adminApi = {
  // User management
  getAllUsers: async (): Promise<User[]> => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_BASE}/auth/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error("Failed to fetch users")
    return res.json()
  },

  updateUserRole: async (userId: string, role: "user" | "admin"): Promise<User> => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_BASE}/auth/admin/users/${userId}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    })
    if (!res.ok) throw new Error("Failed to update user role")
    return res.json()
  },

  deleteUser: async (userId: string): Promise<void> => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_BASE}/auth/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error("Failed to delete user")
  },

  // Donation management
  getAllDonations: async (): Promise<Donation[]> => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_BASE}/donations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error("Failed to fetch donations")
    return res.json()
  },

  updateDonation: async (donationId: string, data: Partial<Donation>): Promise<Donation> => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_BASE}/donations/${donationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update donation")
    return res.json()
  },

  deleteDonation: async (donationId: string): Promise<void> => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_BASE}/donations/${donationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error("Failed to delete donation")
  },

  // Recipe management
  getAllRecipes: async (): Promise<Recipe[]> => {
    const res = await fetch(`${API_BASE}/recipes`)
    if (!res.ok) throw new Error("Failed to fetch recipes")
    return res.json()
  },

  updateRecipe: async (recipeId: string, data: Partial<Recipe>): Promise<Recipe> => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_BASE}/recipes/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update recipe")
    return res.json()
  },

  deleteRecipe: async (recipeId: string): Promise<void> => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_BASE}/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error("Failed to delete recipe")
  },

  // Comment management
  getAllComments: async (): Promise<Comment[]> => {
    const res = await fetch(`${API_BASE}/comments`)
    if (!res.ok) throw new Error("Failed to fetch comments")
    return res.json()
  },

  deleteComment: async (commentId: string): Promise<void> => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${API_BASE}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error("Failed to delete comment")
  },
}
