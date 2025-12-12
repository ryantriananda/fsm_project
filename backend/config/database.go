package config

import (
	"facility-asset-management/models"
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(sqlite.Open("facility.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate models
	database.AutoMigrate(
		&models.Employee{},
		&models.AssetRecord{},
		&models.MasterItem{},
		&models.ContractRecord{},
		&models.TimesheetRecord{},
		&models.VendorRecord{},
		&models.VehicleRecord{},
		&models.ServiceRecord{},
		&models.TaxKirRecord{},
		&models.MutationRecord{},
		&models.SalesRecord{},
		&models.SalesOffer{},
		&models.MasterVendorRecord{},
		&models.GeneralMaster{},
	)

	DB = database
	log.Println("Database connected and migrated")
}
