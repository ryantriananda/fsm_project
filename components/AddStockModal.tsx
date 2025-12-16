
import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image as ImageIcon, List, DollarSign, Wrench, Upload, ShieldCheck, Home, FileText, CheckCircle, Clock, MapPin, BarChart2 } from 'lucide-react';
import { VehicleRecord, ServiceRecord, MutationRecord, SalesRecord, SalesOffer, ContractRecord, GeneralMasterItem, MasterVendorRecord, BuildingComparisonItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  moduleName?: string;
  onSaveVehicle?: (vehicle: Partial<VehicleRecord>) => void;
  onSaveService?: (service: Partial<ServiceRecord>) => void;
  onSaveMutation?: (mutation: Partial<MutationRecord>) => void;
  onSaveSales?: (sales: Partial<SalesRecord>) => void;
  onSaveContract?: (contract: Partial<ContractRecord>) => void;
  onSaveMaster?: (master: Partial<GeneralMasterItem>) => void;
  onSaveMasterVendor?: (masterVendor: Partial<MasterVendorRecord>) => void;
  
  initialVehicleData?: VehicleRecord;
  initialServiceData?: ServiceRecord;
  initialMutationData?: MutationRecord;
  initialSalesData?: SalesRecord;
  initialContractData?: ContractRecord;
  initialMasterData?: GeneralMasterItem;
  initialMasterVendorData?: MasterVendorRecord;
  
  mode?: 'create' | 'edit' | 'view';
  vehicleList?: VehicleRecord[];
  masterData?: Record<string, GeneralMasterItem[]>;
  t: any;
}

export const AddStockModal: React.FC<Props> = ({ 
    isOpen, 
    onClose, 
    moduleName = 'ATK', 
    onSaveVehicle,
    onSaveService,
    onSaveMutation,
    onSaveSales,
    onSaveContract,
    onSaveMaster,
    onSaveMasterVendor,
    initialVehicleData,
    initialServiceData,
    initialMutationData,
    initialSalesData,
    initialContractData,
    initialMasterData,
    initialMasterVendorData,
    mode = 'create',
    vehicleList = [],
    masterData = {},
    t
}) => {
  const [activeTab, setActiveTab] = useState('general'); // For Contract Modal: 'general', 'proposal', 'workflow', 'documents'

  // Local state for Contract (Building) form
  const defaultContractForm: Partial<ContractRecord> = {
    assetNumber: '[Auto Generate]',
    assetCategory: 'Building',
    name: '',
    type: 'Office',
    ownership: 'Rent',
    location: '',
    channel: '',
    department: '',
    subLocation: '',
    address: '',
    pic: '',
    status: 'Draft',
    // Rent specific
    landlord: '',
    periodStart: '',
    periodEnd: '',
    rentalCost: '',
    // Own specific
    certificateNo: '',
    acquisitionDate: '',
    acquisitionValue: '',
    landArea: '',
    buildingArea: '',
    // Insurance & Maintenance
    insuranceProvider: '',
    insurancePolicyNo: '',
    insuranceExpiry: '',
    insuranceCost: '',
    maintenanceVendor: '',
    maintenanceSchedule: '',
    maintenanceCost: '',
    // Proposal Default
    comparisons: [
        { id: 'existing', type: 'Existing', name: 'Existing Building', address: '', rentalPrice: '', buildingSize: '', landSize: '', mapUrl: '', pros: '', cons: '', pnlSummary: '', photos: [] },
        { id: 'opt1', type: 'Option', name: 'Option 1', address: '', rentalPrice: '', buildingSize: '', landSize: '', mapUrl: '', pros: '', cons: '', pnlSummary: '', photos: [] },
        { id: 'opt2', type: 'Option', name: 'Option 2', address: '', rentalPrice: '', buildingSize: '', landSize: '', mapUrl: '', pros: '', cons: '', pnlSummary: '', photos: [] },
        { id: 'opt3', type: 'Option', name: 'Option 3', address: '', rentalPrice: '', buildingSize: '', landSize: '', mapUrl: '', pros: '', cons: '', pnlSummary: '', photos: [] },
    ]
  };

  const defaultVehicleForm: Partial<VehicleRecord> = { status: 'Aktif', channel: 'Human Capital Operation', cabang: 'Pusat' };
  const defaultServiceForm: Partial<ServiceRecord> = { jenisServis: 'Servis Rutin', jenisPembayaran: 'Kasbon' };
  const defaultMutationForm: Partial<MutationRecord> = { tipeMutasi: 'Kirim' };
  const defaultSalesForm: Partial<SalesRecord> = { offers: [] };
  const defaultMasterForm: Partial<GeneralMasterItem> = { name: '' };
  const defaultMasterVendorForm: Partial<MasterVendorRecord> = { aktif: true };

  const [vehicleForm, setVehicleForm] = useState<Partial<VehicleRecord>>(defaultVehicleForm);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceRecord>>(defaultServiceForm);
  const [mutationForm, setMutationForm] = useState<Partial<MutationRecord>>(defaultMutationForm);
  const [salesForm, setSalesForm] = useState<Partial<SalesRecord>>(defaultSalesForm);
  const [contractForm, setContractForm] = useState<Partial<ContractRecord>>(defaultContractForm);
  const [masterForm, setMasterForm] = useState<Partial<GeneralMasterItem>>(defaultMasterForm);
  const [masterVendorForm, setMasterVendorForm] = useState<Partial<MasterVendorRecord>>(defaultMasterVendorForm);
  const [salesOffers, setSalesOffers] = useState<SalesOffer[]>([{ nama: '', pic: '', phone: '', price: '' }]);

  // Derived state
  const [selectedServiceAsset, setSelectedServiceAsset] = useState<VehicleRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
        if ((mode === 'edit' || mode === 'view')) {
            if (initialVehicleData) setVehicleForm(initialVehicleData);
            if (initialServiceData) {
                setServiceForm(initialServiceData);
                if (initialServiceData.aset) {
                     const asset = vehicleList.find(v => v.id.toString() === initialServiceData.aset);
                     setSelectedServiceAsset(asset || null);
                }
            }
            if (initialMutationData) setMutationForm(initialMutationData);
            if (initialSalesData) {
                setSalesForm(initialSalesData);
                if (initialSalesData.offers) setSalesOffers(initialSalesData.offers);
            }
            if (initialContractData) {
                setContractForm({ ...defaultContractForm, ...initialContractData });
            }
            if (initialMasterData) setMasterForm(initialMasterData);
            if (initialMasterVendorData) setMasterVendorForm(initialMasterVendorData);
        } else {
            // Reset to defaults
            setVehicleForm(defaultVehicleForm);
            setServiceForm(defaultServiceForm);
            setMutationForm(defaultMutationForm);
            setSalesForm(defaultSalesForm);
            setContractForm(defaultContractForm);
            setMasterForm(defaultMasterForm);
            setMasterVendorForm(defaultMasterVendorForm);
            setSalesOffers([{ nama: '', pic: '', phone: '', price: '' }]);
            setSelectedServiceAsset(null);
        }
        setActiveTab('general');
    }
  }, [isOpen, initialVehicleData, initialServiceData, initialContractData, mode]);

  const handleVehicleChange = (field: keyof VehicleRecord, value: string) => setVehicleForm(prev => ({ ...prev, [field]: value }));
  const handleServiceChange = (field: keyof ServiceRecord, value: string) => {
      setServiceForm(prev => ({ ...prev, [field]: value }));
      if (field === 'aset') {
          const asset = vehicleList.find(v => v.id.toString() === value);
          setSelectedServiceAsset(asset || null);
      }
  };
  const handleMutationChange = (field: keyof MutationRecord, value: string) => setMutationForm(prev => ({ ...prev, [field]: value }));
  const handleSalesChange = (field: keyof SalesRecord, value: string) => setSalesForm(prev => ({ ...prev, [field]: value }));
  
  const handleContractChange = (field: keyof ContractRecord, value: any) => {
      setContractForm(prev => ({ ...prev, [field]: value }));
      // Logic Difference: If Own, we reset tab to General because Proposal/Workflow tabs will be hidden
      if (field === 'ownership' && value === 'Own') {
          setActiveTab('general');
      }
  };
  
  const handleMasterChange = (value: string) => setMasterForm(prev => ({ ...prev, name: value }));
  const handleMasterVendorChange = (field: keyof MasterVendorRecord, value: any) => setMasterVendorForm(prev => ({ ...prev, [field]: value }));
  
  const handleComparisonChange = (id: string, field: keyof BuildingComparisonItem, value: string) => {
      setContractForm(prev => ({
          ...prev,
          comparisons: prev.comparisons?.map(c => c.id === id ? { ...c, [field]: value } : c)
      }));
  };

  const addOfferRow = () => setSalesOffers([...salesOffers, { nama: '', pic: '', phone: '', price: '' }]);

  const handleSave = () => {
      if (moduleName === 'Contract' && onSaveContract) onSaveContract(contractForm);
      else if (moduleName === 'Daftar Aset' && onSaveVehicle) onSaveVehicle(vehicleForm);
      else if (moduleName === 'Servis' && onSaveService) onSaveService(serviceForm);
      else if (moduleName === 'Mutasi' && onSaveMutation) onSaveMutation(mutationForm);
      else if (moduleName === 'Penjualan' && onSaveSales) onSaveSales({ ...salesForm, offers: salesOffers });
      else if (moduleName === 'Master Vendor' && onSaveMasterVendor) onSaveMasterVendor(masterVendorForm);
      else if (onSaveMaster) onSaveMaster(masterForm);
      onClose();
  };

  if (!isOpen) return null;

  const isContract = moduleName === 'Contract';
  const isVehicle = moduleName === 'Daftar Aset';
  const isService = moduleName === 'Servis';
  const isMutation = moduleName === 'Mutasi';
  const isSales = moduleName === 'Penjualan';
  const isMasterVendor = moduleName === 'Master Vendor';
  const isMaster = !isContract && !isVehicle && !isService && !isMutation && !isSales && !isMasterVendor && moduleName?.includes('Master');
  const isViewMode = mode === 'view';

  // Helper for section header
  const SectionHeader: React.FC<{ title: string; orange?: boolean; icon?: React.ReactNode }> = ({ title, orange, icon }) => (
      <div className={`flex items-center gap-2 border-b pb-2 mb-4 ${orange ? 'border-orange-200' : 'border-gray-200'}`}>
         {icon && <span className={orange ? 'text-orange-500' : 'text-gray-700'}>{icon}</span>}
         <h3 className={`font-bold text-sm uppercase tracking-wide ${orange ? 'text-orange-500' : 'text-gray-900'}`}>{title}</h3>
      </div>
  );

  return (
    <>
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm p-4">
      <div className={`bg-white w-full ${isContract ? 'max-w-[95vw] h-[90vh]' : (isVehicle || isService || isMutation || isSales ? 'max-w-7xl' : 'max-w-xl')} rounded-lg shadow-xl overflow-hidden flex flex-col`}>
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between">
          <div>
              <h2 className="text-lg font-bold tracking-wide text-gray-900">
                {isContract ? (mode === 'create' ? 'New Branch Improvement' : contractForm.name) : 
                 isVehicle ? 'Vehicle Asset' : 
                 isService ? 'Service Request' : 
                 moduleName}
              </h2>
              {isContract && (
                  <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          contractForm.status === 'Draft' ? 'bg-gray-100 text-gray-600 border-gray-300' :
                          contractForm.status === 'Proposal' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                          'bg-green-50 text-green-600 border-green-200'
                      }`}>
                          {contractForm.status}
                      </span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-xs text-gray-500">Asset No: {contractForm.assetNumber}</span>
                  </div>
              )}
          </div>
          <button className="text-gray-400 hover:text-black transition-colors">
            <X size={24} onClick={onClose} className="cursor-pointer"/>
          </button>
        </div>

        {/* Contract Specific Tabs */}
        {isContract && (
            <div className="bg-gray-50 border-b border-gray-200 px-6 flex gap-6">
                {/* Dynamically filter tabs: 'Own' does not need Proposal or Workflow */}
                {(contractForm.ownership === 'Rent' 
                    ? ['General', 'Proposal & Comparison', 'Workflow', 'Documents'] 
                    : ['General', 'Documents']
                ).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                        className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === tab.toLowerCase().split(' ')[0]
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 custom-scrollbar">
          
          {isContract ? (
            <>
                {/* --- TAB: GENERAL --- */}
                {activeTab === 'general' && (
                    <div className="flex flex-col gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <SectionHeader title={t.detailInfo} icon={<Home size={18} />} />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">{t.buildingName} <span className="text-red-500">*</span></label>
                                    <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:border-black" value={contractForm.name} onChange={(e) => handleContractChange('name', e.target.value)} disabled={isViewMode} />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                                    <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:border-black" value={contractForm.type} onChange={(e) => handleContractChange('type', e.target.value)} disabled={isViewMode}>
                                        <option value="Office">Office</option>
                                        <option value="Warehouse">Warehouse</option>
                                        <option value="Head Office">Head Office</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Ownership</label>
                                    <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:border-black" value={contractForm.ownership} onChange={(e) => handleContractChange('ownership', e.target.value)} disabled={isViewMode}>
                                        <option value="Rent">Rent (Sewa)</option>
                                        <option value="Own">Own (Milik Sendiri)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                                    <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:border-black" value={contractForm.location} onChange={(e) => handleContractChange('location', e.target.value)} disabled={isViewMode} />
                                </div>
                                 <div className="md:col-span-3">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                                    <textarea className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:border-black" rows={2} value={contractForm.address} onChange={(e) => handleContractChange('address', e.target.value)} disabled={isViewMode} />
                                </div>
                            </div>
                        </div>

                        {/* Ownership Specifics */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            {contractForm.ownership === 'Rent' ? (
                                <>
                                    <SectionHeader title="Rental Details" icon={<DollarSign size={18} />} />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">Landlord Name</label>
                                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={contractForm.landlord} onChange={(e) => handleContractChange('landlord', e.target.value)} disabled={isViewMode} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">Rental Cost</label>
                                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={contractForm.rentalCost} onChange={(e) => handleContractChange('rentalCost', e.target.value)} disabled={isViewMode} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">Bank Account</label>
                                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={contractForm.bankAccount} onChange={(e) => handleContractChange('bankAccount', e.target.value)} disabled={isViewMode} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                                            <input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={contractForm.periodStart} onChange={(e) => handleContractChange('periodStart', e.target.value)} disabled={isViewMode} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                                            <input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={contractForm.periodEnd} onChange={(e) => handleContractChange('periodEnd', e.target.value)} disabled={isViewMode} />
                                        </div>
                                        <div className="flex items-center mt-6">
                                            <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-2 rounded-md border border-orange-200 w-full">
                                                <Clock size={16} />
                                                <span className="text-xs font-medium">Auto-reminder active (H-6 Months)</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <SectionHeader title="Ownership Details" icon={<DollarSign size={18} />} />
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">Certificate No (SHM/HGB)</label>
                                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={contractForm.certificateNo} onChange={(e) => handleContractChange('certificateNo', e.target.value)} disabled={isViewMode} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">Acquisition Value</label>
                                            <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={contractForm.acquisitionValue} onChange={(e) => handleContractChange('acquisitionValue', e.target.value)} disabled={isViewMode} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* --- TAB: PROPOSAL & COMPARISON --- */}
                {activeTab === 'proposal' && (
                    <div className="flex flex-col gap-6">
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-full text-blue-600"><BarChart2 size={20} /></div>
                            <div>
                                <h4 className="text-sm font-bold text-blue-900">Proposal Comparison Matrix</h4>
                                <p className="text-xs text-blue-700 mt-1">
                                    Each proposal must include 1 Existing building and 3 Alternative options. 
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto pb-4">
                            <div className="min-w-[1000px] grid grid-cols-4 gap-4">
                                {contractForm.comparisons?.map((item, idx) => (
                                    <div key={item.id} className={`bg-white rounded-lg border ${item.id === 'existing' ? 'border-gray-300' : 'border-blue-200 shadow-sm'} flex flex-col`}>
                                        <div className={`p-3 border-b ${item.id === 'existing' ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-800'} font-bold text-sm text-center uppercase`}>
                                            {item.type} {item.id !== 'existing' && `#${idx}`}
                                        </div>
                                        <div className="p-4 flex flex-col gap-4 flex-1">
                                            {/* Photos */}
                                            <div className="aspect-video bg-gray-100 rounded-md flex flex-col items-center justify-center border border-dashed border-gray-300 relative overflow-hidden group cursor-pointer hover:bg-gray-200 transition-colors">
                                                {item.photos && item.photos.length > 0 ? (
                                                    <img src={item.photos[0]} className="w-full h-full object-cover" alt="Building" />
                                                ) : (
                                                    <>
                                                        <ImageIcon size={24} className="text-gray-400 mb-1" />
                                                        <span className="text-[10px] text-gray-500">Add Photo</span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Fields */}
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase">Building Name</label>
                                                <input type="text" className="w-full border-b border-gray-200 focus:border-blue-500 outline-none text-sm py-1 font-medium" placeholder="Building Name" value={item.name} onChange={(e) => handleComparisonChange(item.id, 'name', e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase">Address & Map</label>
                                                <input type="text" className="w-full border-b border-gray-200 focus:border-blue-500 outline-none text-sm py-1" placeholder="Full Address" value={item.address} onChange={(e) => handleComparisonChange(item.id, 'address', e.target.value)} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Price / Year</label>
                                                    <input type="text" className="w-full border-b border-gray-200 focus:border-blue-500 outline-none text-sm py-1" placeholder="Rp" value={item.rentalPrice} onChange={(e) => handleComparisonChange(item.id, 'rentalPrice', e.target.value)} />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Size (m2)</label>
                                                    <input type="text" className="w-full border-b border-gray-200 focus:border-blue-500 outline-none text-sm py-1" placeholder="Total" value={item.buildingSize} onChange={(e) => handleComparisonChange(item.id, 'buildingSize', e.target.value)} />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase">P&L Summary</label>
                                                <input type="text" className="w-full border-b border-gray-200 focus:border-blue-500 outline-none text-sm py-1 font-semibold text-green-600" placeholder="e.g. ROI 15%" value={item.pnlSummary} onChange={(e) => handleComparisonChange(item.id, 'pnlSummary', e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: WORKFLOW --- */}
                {activeTab === 'workflow' && (
                    <div className="max-w-3xl mx-auto">
                        <SectionHeader title="Approval Workflow" icon={<CheckCircle size={18} />} />
                        <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 my-8">
                            {contractForm.workflow?.map((step, idx) => (
                                <div key={idx} className="relative pl-8">
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                                        step.status === 'Approved' ? 'bg-green-500 border-green-500' : 
                                        step.status === 'Rejected' ? 'bg-red-500 border-red-500' : 
                                        'bg-white border-gray-300'
                                    }`}></div>
                                    
                                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-900">{step.role}</h4>
                                                <p className="text-xs text-gray-500">{step.approverName || '-'}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                                step.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                                step.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-500'
                                            }`}>
                                                {step.status}
                                            </span>
                                        </div>
                                        {step.date && <p className="text-xs text-gray-400 flex items-center gap-1 mb-2"><Clock size={10}/> {step.date}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- TAB: DOCUMENTS --- */}
                {activeTab === 'documents' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <SectionHeader title="Legal Documents" icon={<FileText size={18} />} />
                            <div className="space-y-4">
                                {['IMB / PBG', 'KTP Pemilik', 'Surat Kuasa (Power of Attorney)', 'Draft Sewa (Legal Reviewed)'].map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded bg-gray-50">
                                        <span className="text-sm font-medium text-gray-700">{doc}</span>
                                        <button className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1">
                                            <Upload size={14} /> Upload
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <SectionHeader title="Finance Documents" icon={<DollarSign size={18} />} />
                            <div className="space-y-4">
                                {['Invoice / Kuitansi', 'NPWP Pemilik', 'Bukti Potong Pajak', 'Final Signed Contract'].map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded bg-gray-50">
                                        <span className="text-sm font-medium text-gray-700">{doc}</span>
                                        <button className="text-blue-600 hover:text-blue-800 text-xs font-bold flex items-center gap-1">
                                            <Upload size={14} /> Upload
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </>
          ) : isVehicle ? (
            /* --- VEHICLE FORM --- */
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <SectionHeader title={t.detailInfo} />
                        <div className="grid grid-cols-3 gap-4">
                            <div><label className="block text-xs font-medium text-gray-600 mb-1">No. Registrasi *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.noRegistrasi} onChange={(e) => handleVehicleChange('noRegistrasi', e.target.value)} /></div>
                            <div className="col-span-2"><label className="block text-xs font-medium text-gray-600 mb-1">Deskripsi Lengkap *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.nama} onChange={(e) => handleVehicleChange('nama', e.target.value)} /></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div><label className="block text-xs font-medium text-gray-600 mb-1">No. Polisi *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.noPolisi} onChange={(e) => handleVehicleChange('noPolisi', e.target.value)} /></div>
                            <div><label className="block text-xs font-medium text-gray-600 mb-1">Merek *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.merek} onChange={(e) => handleVehicleChange('merek', e.target.value)} /></div>
                            <div><label className="block text-xs font-medium text-gray-600 mb-1">Tipe *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.tipeKendaraan} onChange={(e) => handleVehicleChange('tipeKendaraan', e.target.value)} /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div><label className="block text-xs font-medium text-gray-600 mb-1">No. Rangka</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.noRangka} onChange={(e) => handleVehicleChange('noRangka', e.target.value)} /></div>
                             <div><label className="block text-xs font-medium text-gray-600 mb-1">No. Mesin</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.noMesin} onChange={(e) => handleVehicleChange('noMesin', e.target.value)} /></div>
                        </div>
                    </div>
                    <div className="space-y-6">
                         <div>
                             <SectionHeader title={t.documents} />
                             <div className="grid grid-cols-2 gap-4 mb-4">
                                <div><label className="block text-xs font-medium text-gray-600 mb-1">No. BPKB *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.noBpkb} onChange={(e) => handleVehicleChange('noBpkb', e.target.value)} /></div>
                                <div><label className="block text-xs font-medium text-gray-600 mb-1">Masa Berlaku STNK</label><input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.masaBerlaku1} onChange={(e) => handleVehicleChange('masaBerlaku1', e.target.value)} /></div>
                             </div>
                        </div>
                        <div>
                             <SectionHeader title={t.purchase} />
                             <div className="grid grid-cols-2 gap-4">
                                <div><label className="block text-xs font-medium text-gray-600 mb-1">Tgl Beli *</label><input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.tglBeli} onChange={(e) => handleVehicleChange('tglBeli', e.target.value)} /></div>
                                <div><label className="block text-xs font-medium text-gray-600 mb-1">Harga Beli *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={vehicleForm.hargaBeli} onChange={(e) => handleVehicleChange('hargaBeli', e.target.value)} /></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
          ) : isService ? (
            /* --- SERVICE FORM --- */
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <SectionHeader title={t.detailInfo} icon={<List size={18} />} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                             <label className="block text-xs font-medium text-gray-600 mb-1">Aset / Kendaraan *</label>
                             <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={serviceForm.aset || ''} onChange={(e) => handleServiceChange('aset', e.target.value)}>
                                <option value="">(Pilih Kendaraan)</option>
                                {vehicleList.map(v => ( <option key={v.id} value={v.id}>{v.noPolisi} - {v.nama}</option> ))}
                             </select>
                        </div>
                        <div><label className="block text-xs font-medium text-gray-600 mb-1">Odometer (KM) *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={serviceForm.kmKendaraan} onChange={(e) => handleServiceChange('kmKendaraan', e.target.value)} /></div>
                        <div><label className="block text-xs font-medium text-gray-600 mb-1">Target Selesai *</label><input type="date" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={serviceForm.targetSelesai} onChange={(e) => handleServiceChange('targetSelesai', e.target.value)} /></div>
                        <div className="md:col-span-2"><label className="block text-xs font-medium text-gray-600 mb-1">Keluhan / Masalah *</label><textarea className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" rows={3} value={serviceForm.masalah} onChange={(e) => handleServiceChange('masalah', e.target.value)} /></div>
                    </div>
                </div>
            </div>
          ) : isMasterVendor ? (
             /* --- MASTER VENDOR FORM --- */
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-xs font-medium text-gray-600 mb-1">Nama Vendor *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={masterVendorForm.nama} onChange={(e) => handleMasterVendorChange('nama', e.target.value)} /></div>
                    <div><label className="block text-xs font-medium text-gray-600 mb-1">PIC *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={masterVendorForm.pic} onChange={(e) => handleMasterVendorChange('pic', e.target.value)} /></div>
                    <div><label className="block text-xs font-medium text-gray-600 mb-1">No Telp *</label><input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={masterVendorForm.noTelp} onChange={(e) => handleMasterVendorChange('noTelp', e.target.value)} /></div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Tipe Vendor *</label>
                        <select className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={masterVendorForm.tipe} onChange={(e) => handleMasterVendorChange('tipe', e.target.value)}>
                            <option value="Vendor Servis">Vendor Servis</option>
                            <option value="Vendor Mutasi">Vendor Mutasi</option>
                        </select>
                    </div>
                </div>
             </div>
          ) : isMaster ? (
              /* --- MASTER GENERIC FORM --- */
              <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                      <input type="text" className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm" value={masterForm.name} onChange={(e) => handleMasterChange(e.target.value)} />
                  </div>
              </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
                Form for {moduleName} is under construction.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {mode !== 'view' && (
            <div className="px-8 py-4 bg-white border-t border-gray-200 flex justify-end gap-3">
            <button onClick={onClose} className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                {t.draft}
            </button>
            <button onClick={handleSave} className="px-6 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 shadow-sm">
                {t.save}
            </button>
            </div>
        )}
      </div>
    </div>
    </>
  );
};
