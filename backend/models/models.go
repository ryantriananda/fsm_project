package models

import "gorm.io/gorm"

type Employee struct {
	gorm.Model
	Name   string `json:"name"`
	Phone  string `json:"phone"`
	Role   string `json:"role"`
	Avatar string `json:"avatar"`
}

type AssetRecord struct {
	gorm.Model
	EmployeeID      uint     `json:"employeeId"`
	Employee        Employee `json:"employee" gorm:"foreignKey:EmployeeID"`
	Category        string   `json:"category"`
	ItemName        string   `json:"itemName"`
	ItemDescription string   `json:"itemDescription"`
	Qty             int      `json:"qty"`
	Date            string   `json:"date"`
	RemainingStock  int      `json:"remainingStock"`
	ItemCode        string   `json:"itemCode"`
	Status          string   `json:"status"` // Approved, Pending, Rejected
	AssetType       string   `json:"assetType"` // ATK or ARK
}

type MasterItem struct {
	gorm.Model
	Category          string `json:"category"`
	ItemName          string `json:"itemName"`
	ItemCode          string `json:"itemCode"`
	RemainingStock    int    `json:"remainingStock"`
	PurchaseDate      string `json:"purchaseDate"`
	LastPurchasePrice string `json:"lastPurchasePrice"`
	AveragePrice      string `json:"averagePrice"`
	AssetType         string `json:"assetType"` // ATK or ARK
}

type ContractRecord struct {
	gorm.Model
	AssetNumber   string `json:"assetNumber"`
	AssetCategory string `json:"assetCategory"`
	Type          string `json:"type"`
	Ownership     string `json:"ownership"`
	Location      string `json:"location"`
	Channel       string `json:"channel"`
	Department    string `json:"department"`
	SubLocation   string `json:"subLocation"`
	Address       string `json:"address"`
	Status        string `json:"status"` // Active, Inactive
}


type TimesheetRecord struct {
	gorm.Model
	EmployeeID uint     `json:"employeeId"`
	Employee   Employee `json:"employee" gorm:"foreignKey:EmployeeID"`
	Date       string   `json:"date"`
	DayType    string   `json:"dayType"`
	Task       string   `json:"task"`
	ClockIn    string   `json:"clockIn"`
	ClockOut   string   `json:"clockOut"`
	Status     string   `json:"status"` // Tepat Waktu, Tidak Tepat Waktu, Absen
	Photos     string   `json:"photos"` // JSON array stored as string
}

type VendorRecord struct {
	gorm.Model
	VendorName string `json:"vendorName"`
	VendorCode string `json:"vendorCode"`
	Status     string `json:"status"` // Active, Inactive
}

type VehicleRecord struct {
	gorm.Model
	NoRegistrasi        string `json:"noRegistrasi"`
	Nama                string `json:"nama"`
	NoPolisi            string `json:"noPolisi"`
	Channel             string `json:"channel"`
	Cabang              string `json:"cabang"`
	Status              string `json:"status"` // Aktif, Tidak Aktif
	Merek               string `json:"merek"`
	TipeKendaraan       string `json:"tipeKendaraan"`
	Jenis               string `json:"jenis"`
	ModelKendaraan      string `json:"model"`
	TahunPembuatan      string `json:"tahunPembuatan"`
	Warna               string `json:"warna"`
	IsiSilinder         string `json:"isiSilinder"`
	NoRangka            string `json:"noRangka"`
	NoMesin             string `json:"noMesin"`
	Pengguna            string `json:"pengguna"`
	NoBpkb              string `json:"noBpkb"`
	KeteranganBpkb      string `json:"keteranganBpkb"`
	MasaBerlaku1        string `json:"masaBerlaku1"`
	MasaBerlaku5        string `json:"masaBerlaku5"`
	MasaBerlakuKir      string `json:"masaBerlakuKir"`
	TglBeli             string `json:"tglBeli"`
	HargaBeli           string `json:"hargaBeli"`
	NoPolisAsuransi     string `json:"noPolisAsuransi"`
	JangkaPertanggungan string `json:"jangkaPertanggungan"`
}

type ServiceRecord struct {
	gorm.Model
	ServiceID       string `json:"id" gorm:"column:service_id"`
	NoPolisi        string `json:"noPolisi"`
	TglRequest      string `json:"tglRequest"`
	Channel         string `json:"channel"`
	Cabang          string `json:"cabang"`
	Status          string `json:"status"`
	StatusApproval  string `json:"statusApproval"`
	Aset            string `json:"aset"`
	TglStnk         string `json:"tglStnk"`
	JenisServis     string `json:"jenisServis"`
	Vendor          string `json:"vendor"`
	TargetSelesai   string `json:"targetSelesai"`
	KmKendaraan     string `json:"kmKendaraan"`
	Masalah         string `json:"masalah"`
	Penyebab        string `json:"penyebab"`
	EstimasiBiaya   string `json:"estimasiBiaya"`
	JenisPembayaran string `json:"jenisPembayaran"`
	NamaBank        string `json:"namaBank"`
	NomorRekening   string `json:"nomorRekening"`
}

type TaxKirRecord struct {
	gorm.Model
	TaxKirID       string `json:"id" gorm:"column:tax_kir_id"`
	NoPolisi       string `json:"noPolisi"`
	TglRequest     string `json:"tglRequest"`
	Jenis          string `json:"jenis"`
	Channel        string `json:"channel"`
	Cabang         string `json:"cabang"`
	Status         string `json:"status"`
	StatusApproval string `json:"statusApproval"`
}

type MutationRecord struct {
	gorm.Model
	MutationID     string `json:"id" gorm:"column:mutation_id"`
	NoPolisi       string `json:"noPolisi"`
	CabangAset     string `json:"cabangAset"`
	TipeMutasi     string `json:"tipeMutasi"`
	TglPermintaan  string `json:"tglPermintaan"`
	LokasiAsal     string `json:"lokasiAsal"`
	LokasiTujuan   string `json:"lokasiTujuan"`
	Status         string `json:"status"`
	StatusApproval string `json:"statusApproval"`
	ChannelAsal    string `json:"channelAsal"`
	ChannelTujuan  string `json:"channelTujuan"`
	AsetID         string `json:"asetId"`
	Alasan         string `json:"alasan"`
}

type SalesOffer struct {
	gorm.Model
	SalesRecordID uint   `json:"salesRecordId"`
	Nama          string `json:"nama"`
	PIC           string `json:"pic"`
	Phone         string `json:"phone"`
	Price         string `json:"price"`
}

type SalesRecord struct {
	gorm.Model
	SalesID        string       `json:"id" gorm:"column:sales_id"`
	NoPolisi       string       `json:"noPolisi"`
	TglRequest     string       `json:"tglRequest"`
	Channel        string       `json:"channel"`
	Cabang         string       `json:"cabang"`
	HargaTertinggi string       `json:"hargaTertinggi"`
	Status         string       `json:"status"`
	StatusApproval string       `json:"statusApproval"`
	AsetID         string       `json:"asetId"`
	TargetSelesai  string       `json:"targetSelesai"`
	Alasan         string       `json:"alasan"`
	Catatan        string       `json:"catatan"`
	Offers         []SalesOffer `json:"offers" gorm:"foreignKey:SalesRecordID"`
}

type MasterVendorRecord struct {
	gorm.Model
	Nama   string `json:"nama"`
	Merek  string `json:"merek"`
	Alamat string `json:"alamat"`
	NoTelp string `json:"noTelp"`
	Tipe   string `json:"tipe"`
	Cabang string `json:"cabang"`
	Aktif  bool   `json:"aktif"`
	PIC    string `json:"pic"`
}

type GeneralMaster struct {
	gorm.Model
	Category string `json:"category"` // e.g., "Jenis Pajak", "Jenis Pembayaran"
	Name     string `json:"name"`
}
