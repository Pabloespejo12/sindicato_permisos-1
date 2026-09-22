import React, { useState } from 'react';
import type { Autorizado } from '../types';

interface Props {
  autorizados: Autorizado[];
  onAgregarAutorizado: (nombre: string) => void;
  onEliminarAutorizado: (id: string) => void;
}

export const GestionAutorizados: React.FC<Props> = ({
  autorizados,
  onAgregarAutorizado,
  onEliminarAutorizado,
}) => {
  const [nuevoNombre, setNuevoNombre] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;
    onAgregarAutorizado(nuevoNombre.trim());
    setNuevoNombre('');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6 border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 border-b pb-3">
        Gestión de Funcionarios Autorizados
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          placeholder="Nombre del funcionario (Ej. Dr. Javier Pérez)"
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition shadow cursor-pointer"
        >
          Agregar
        </button>
      </form>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-sm">
              <th className="p-3">Nombre del Funcionario</th>
              <th className="p-3 text-end">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-600">
            {autorizados.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-4 text-center text-slate-400 italic">
                  No hay funcionarios registrados.
                </td>
              </tr>
            ) : (
              autorizados.map((auth) => (
                <tr key={auth.id} className="hover:bg-slate-50">
                  <td className="p-3">{auth.nombre}</td>
                  <td className="p-3 text-end">
                    <button
                      onClick={() => onEliminarAutorizado(auth.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-xs px-2 py-1 bg-red-50 hover:bg-red-100 rounded transition cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};