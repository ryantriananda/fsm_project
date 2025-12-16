import React from 'react';
import { ContractRecord } from '../types';
import { ChevronsUpDown, Eye, FolderX, Pencil, Building2 } from 'lucide-react';

interface Props {
  data: ContractRecord[];
  onEdit?: (item: ContractRecord) => void;
  onView?: (item: ContractRecord) => void;
}

export const ContractTable: React.FC<Props> = ({ data, onEdit, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-700 uppercase tracking-wider">
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Name / Asset No
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Type
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
               <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Ownership
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Location (Branch)
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors w-96">
                <div className="flex items-center justify-between">
                  Address
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 group cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="flex items-center justify-between">
                  Status
                  <ChevronsUpDown size={14} className="text-gray-500 group-hover:text-gray-700"/>
                </div>
              </th>
              <th className="p-4 w-24 text-center">
                 Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {data.length > 0 ? (
                data.map((item) => (
                    <tr key={item.id} className="bg-white hover:bg-gray-50 transition-colors cursor-pointer group">
                        <td className="p-4">
                             <div className="flex items-start gap-3">
                                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                                    <Building2 size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-500 font-mono">{item.assetNumber}</p>
                                </div>
                            </div>
                        </td>
                        <td className="p-4 text-gray-600 font-medium">{item.type}</td>
                        <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold border ${item.ownership === 'Own' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                                {item.ownership}
                            </span>
                        </td>
                        <td className="p-4 text-gray-600">{item.location}</td>
                        <td className="p-4 text-gray-600 truncate max-w-[300px]">{item.address}</td>
                        <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                {item.status}
                            </span>
                        </td>
                        <td className="p-4 text-center">
                             <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); onView?.(item); }}
                                  className="text-gray-400 hover:text-black transition-colors"
                                >
                                    <Eye size={18} />
                                </button>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); onEdit?.(item); }}
                                  className="text-gray-400 hover:text-black transition-colors"
                                >
                                    <Pencil size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={7} className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center min-h-[400px]">
                             <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-2xl mb-4 relative border border-gray-200">
                                <FolderX size={48} className="text-gray-500 z-10 relative" />
                                {/* Simple decoration */}
                                <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-gray-300 rounded-full opacity-50"></div>
                             </div>
                             <h3 className="text-lg font-bold text-gray-900">Tidak ada data...</h3>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer (Only if data exists) */}
      {data.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-white flex items-center justify-between">
                <div className="text-sm text-gray-900">
                    Showing 1 - {data.length} of <span className="text-green-500 font-semibold">{data.length}</span> Row(s)
                </div>
          </div>
      )}
    </div>
  );
};