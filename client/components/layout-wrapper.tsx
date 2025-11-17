"use client"

import { ReactNode } from "react"

interface LayoutWrapperProps {
  children: ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Para desktop, centralizar verticalmente o conteúdo se for curto */}
      <div className="flex-1 flex items-center justify-center lg:flex lg:items-center lg:justify-center">
        {/* Limitar largura máxima e centralizar horizontalmente */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}
