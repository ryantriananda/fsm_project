import { AssetRecord, MasterItem, ContractRecord, TimesheetRecord, VendorRecord, VehicleRecord, ServiceRecord, TaxKirRecord, MutationRecord, SalesRecord, MasterVendorRecord } from './types';

export const MOCK_DATA: AssetRecord[] = [
  // ... (Asset Records remain same)
  {
    id: 1,
    employee: {
      name: 'Aan Junaidi',
      phone: '0808.0766',
      role: 'Technician Team Leader (East)',
      avatar: 'https://picsum.photos/id/1012/100/100'
    },
    category: 'Tinta Printer',
    itemName: 'HP Laserjet 204A Black',
    itemDescription: 'Original HP Toner',
    qty: 5,
    date: '27/08/2008',
    remainingStock: 12,
    itemCode: 'TP-HP0048',
    status: 'Approved'
  },
  // ... (Other asset records)
];

export const MOCK_MASTER_DATA: MasterItem[] = [
    // ... (Master data)
    {
    id: 1,
    category: 'Tinta Printer',
    itemName: 'HP Laserjet 204A Black',
    itemCode: 'TP-HP0048',
    remainingStock: 5,
    purchaseDate: '27/08/2008',
    lastPurchasePrice: 'Rp. 22.000',
    averagePrice: 'Rp. 21.082'
  }
];

export const MOCK_ARK_DATA: AssetRecord[] = [
    // ... (ARK Data)
    {
      id: 1,
      employee: {
        name: 'Alam Anugrah Akbar',
        phone: 'SI2311.0013',
        role: 'Cleaning Service',
        avatar: 'https://picsum.photos/id/111/100/100'
      },
      category: 'Tissue',
      itemName: 'Nice Tissue Toilet',
      itemDescription: 'Roll 2 Ply',
      qty: 8,
      date: '01/06/2010',
      remainingStock: 2,
      itemCode: 'TS-TNICE002',
      status: 'Approved'
    }
];

export const MOCK_MASTER_ARK_DATA: MasterItem[] = [
    // ...
    {
      id: 1,
      category: 'Tissue',
      itemName: 'Nice Tissue Toilet',
      itemCode: 'TS-TNICE002',
      remainingStock: 250,
      purchaseDate: '01/06/2010',
      lastPurchasePrice: 'Rp. 4.500',
      averagePrice: 'Rp. 4.200'
    }
  ];

export const MOCK_CONTRACT_DATA: ContractRecord[] = [
  {
    id: 1,
    assetNumber: 'BDG-SUB-001',
    assetCategory: 'Building',
    name: 'Kantor Cabang Surabaya',
    type: 'Office + Warehouse',
    ownership: 'Rent',
    location: 'Surabaya',
    address: 'Jl. Rungkut Industri Raya No. 15',
    status: 'Proposal',
    pic: 'Budi Santoso',
    picEmail: 'budi.santoso@modena.com',
    periodStart: '2024-01-01',
    periodEnd: '2026-12-31',
    rentalCost: 'Rp. 450.000.000 / Tahun',
    landlord: 'H. Sutrisno',
    
    workflow: [
        { role: 'BM', status: 'Approved', approverName: 'Achmad Alin', date: '2023-10-01', note: 'Harga masih masuk budget, lokasi strategis.' },
        { role: 'Regional', status: 'Approved', approverName: 'Regional Head East', date: '2023-10-05', note: 'Proceed.' },
        { role: 'Jemmy Liem', status: 'Pending' },
        { role: 'DJ', status: 'Pending' }
    ],

    comparisons: [
        {
            id: 'existing',
            type: 'Existing',
            name: 'Gedung Lama Rungkut',
            address: 'Jl. Rungkut Industri Raya No. 15',
            rentalPrice: 'Rp 450jt/thn',
            buildingSize: '500m2',
            landSize: '600m2',
            mapUrl: 'https://maps.google.com',
            pros: 'Sudah renovasi, lokasi dikenal customer',
            cons: 'Parkiran sempit',
            pnlSummary: 'ROI 15%',
            photos: ['https://picsum.photos/id/1/200/150', 'https://picsum.photos/id/2/200/150']
        },
        {
            id: 'opt1',
            type: 'Option',
            name: 'Ruko Merr Pandugo',
            address: 'Jl. Dr. Ir. H. Soekarno No. 88',
            rentalPrice: 'Rp 550jt/thn',
            buildingSize: '600m2',
            landSize: '700m2',
            mapUrl: 'https://maps.google.com',
            pros: 'Jalan utama, parkir luas',
            cons: 'Perlu renovasi besar',
            pnlSummary: 'ROI 12%',
            photos: ['https://picsum.photos/id/10/200/150']
        },
        {
            id: 'opt2',
            type: 'Option',
            name: 'Gudang Margomulyo',
            address: 'Jl. Margomulyo Indah A-5',
            rentalPrice: 'Rp 300jt/thn',
            buildingSize: '800m2',
            landSize: '1000m2',
            mapUrl: 'https://maps.google.com',
            pros: 'Murah, sangat luas',
            cons: 'Jauh dari pusat kota, akses macet',
            pnlSummary: 'ROI 18%',
            photos: ['https://picsum.photos/id/20/200/150']
        },
        {
            id: 'opt3',
            type: 'Option',
            name: 'Ruko HR Muhammad',
            address: 'Jl. HR Muhammad No. 102',
            rentalPrice: 'Rp 750jt/thn',
            buildingSize: '450m2',
            landSize: '450m2',
            mapUrl: 'https://maps.google.com',
            pros: 'Area elite, branding bagus',
            cons: 'Sangat mahal, ukuran kecil',
            pnlSummary: 'ROI 10%',
            photos: ['https://picsum.photos/id/30/200/150']
        }
    ],
    documents: {
        imb: true,
        ktpOwner: true,
        draftContract: true
    }
  },
  {
    id: 2,
    assetNumber: 'BDG-JKT-009',
    assetCategory: 'Building',
    name: 'Gedung Pusat Satrio',
    type: 'Head Office',
    ownership: 'Own',
    location: 'Jakarta',
    address: 'Jl. Prof. DR. Satrio No.C4',
    status: 'Close',
    pic: 'General Affair',
    certificateNo: 'SHM-99887766',
    acquisitionDate: '2010-02-15',
    landArea: '1500',
    buildingArea: '3000',
    insuranceProvider: 'Allianz',
    documents: {
        imb: true,
        ktpOwner: true,
        signedContract: true
    }
  }
];

export const MOCK_TIMESHEET_DATA: TimesheetRecord[] = [
    // ... (Keep existing)
    {
        id: 1,
        employee: {
            name: 'Muhammad Herlambang',
            phone: 'SI2311.0012',
            role: 'Cleaning Service',
            avatar: 'https://picsum.photos/id/55/100/100'
        },
        date: '14/03/2024',
        dayType: 'Thursday - WD',
        task: '',
        clockIn: '07:35',
        clockOut: '16:32',
        status: 'Tepat Waktu',
        photos: ['https://picsum.photos/id/101/50/50', 'https://picsum.photos/id/102/50/50']
    }
];

export const MOCK_VENDOR_DATA: VendorRecord[] = [
    {
        id: 1,
        vendorName: 'PT Indo Makmur Energy',
        vendorCode: '2209010032',
        status: 'Active'
    }
];

export const MOCK_MASTER_VENDOR_DATA: MasterVendorRecord[] = [
    // ... (Keep existing)
    {
        id: 1,
        nama: 'PT. Mitra Ananta Megah',
        merek: 'Toyota',
        alamat: 'Bintaro komersial CBD B7 kavling A1/02',
        noTelp: '081289841070',
        tipe: 'Vendor Mutasi',
        cabang: 'Pusat',
        aktif: true
    }
];

export const MOCK_VEHICLE_DATA: VehicleRecord[] = [
    // ... (Keep existing)
    {
        id: 1,
        noRegistrasi: '301-00208',
        nama: 'Toyota Avanza 1.3 CVT E Warna Putih Q2 BM Purwokerto',
        noPolisi: 'B 1708 CZY',
        channel: 'Human Capital Operation',
        cabang: 'Pusat',
        status: 'Aktif'
    }
];

export const MOCK_SERVICE_DATA: ServiceRecord[] = [
    // ... (Keep existing)
    {
        id: 'S2024060003',
        noPolisi: 'B 9433 CCA',
        tglRequest: '28 Jun 2024 17:24',
        channel: 'Warehouse & Distribution',
        cabang: 'Pusat',
        status: 'Draf',
        statusApproval: '-'
    }
];

export const MOCK_TAX_KIR_DATA: TaxKirRecord[] = [];

export const MOCK_MUTATION_DATA: MutationRecord[] = [
    // ... (Keep existing)
    {
        id: 'M2023090001',
        noPolisi: 'BE 9353 YD',
        cabangAset: 'Lampung',
        tipeMutasi: 'Kirim',
        tglPermintaan: '23 Sep 2023 21:18',
        lokasiAsal: 'Lampung',
        lokasiTujuan: 'Palembang',
        status: 'Persetujuan Biaya Diterima',
        statusApproval: 'COMPLETED'
    }
];

export const MOCK_SALES_DATA: SalesRecord[] = [
  // ... (Keep existing)
  {
    id: 'J2023090001',
    noPolisi: 'B 9433 CCA',
    tglRequest: '20 Sep 2023 20:51',
    channel: 'Warehouse & Distribution',
    cabang: 'Pusat',
    hargaTertinggi: 'Rp292.000.000',
    status: 'Persetujuan Permintaan',
    statusApproval: 'ONPROGRESS',
  }
];