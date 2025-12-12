package routes

import (
	"facility-asset-management/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		// Vehicles
		api.GET("/vehicles", handlers.GetVehicles)
		api.GET("/vehicles/:id", handlers.GetVehicle)
		api.POST("/vehicles", handlers.CreateVehicle)
		api.PUT("/vehicles/:id", handlers.UpdateVehicle)
		api.DELETE("/vehicles/:id", handlers.DeleteVehicle)

		// Services
		api.GET("/services", handlers.GetServices)
		api.GET("/services/:id", handlers.GetService)
		api.POST("/services", handlers.CreateService)
		api.PUT("/services/:id", handlers.UpdateService)
		api.DELETE("/services/:id", handlers.DeleteService)

		// Mutations
		api.GET("/mutations", handlers.GetMutations)
		api.GET("/mutations/:id", handlers.GetMutation)
		api.POST("/mutations", handlers.CreateMutation)
		api.PUT("/mutations/:id", handlers.UpdateMutation)
		api.DELETE("/mutations/:id", handlers.DeleteMutation)

		// Sales
		api.GET("/sales", handlers.GetSales)
		api.GET("/sales/:id", handlers.GetSale)
		api.POST("/sales", handlers.CreateSale)
		api.PUT("/sales/:id", handlers.UpdateSale)
		api.DELETE("/sales/:id", handlers.DeleteSale)

		// Contracts
		api.GET("/contracts", handlers.GetContracts)
		api.GET("/contracts/:id", handlers.GetContract)
		api.POST("/contracts", handlers.CreateContract)
		api.PUT("/contracts/:id", handlers.UpdateContract)
		api.DELETE("/contracts/:id", handlers.DeleteContract)

		// Master Vendors
		api.GET("/master-vendors", handlers.GetMasterVendors)
		api.GET("/master-vendors/:id", handlers.GetMasterVendor)
		api.POST("/master-vendors", handlers.CreateMasterVendor)
		api.PUT("/master-vendors/:id", handlers.UpdateMasterVendor)
		api.DELETE("/master-vendors/:id", handlers.DeleteMasterVendor)

		// General Masters (dynamic categories)
		api.GET("/masters/:category", handlers.GetMastersByCategory)
		api.POST("/masters/:category", handlers.CreateMaster)
		api.PUT("/masters/:category/:id", handlers.UpdateMaster)
		api.DELETE("/masters/:category/:id", handlers.DeleteMaster)

		// Assets (ATK/ARK)
		api.GET("/assets", handlers.GetAssets)
		api.POST("/assets", handlers.CreateAsset)
		api.PUT("/assets/:id", handlers.UpdateAsset)
		api.DELETE("/assets/:id", handlers.DeleteAsset)

		// Master Items
		api.GET("/master-items", handlers.GetMasterItems)
		api.POST("/master-items", handlers.CreateMasterItem)
		api.PUT("/master-items/:id", handlers.UpdateMasterItem)
		api.DELETE("/master-items/:id", handlers.DeleteMasterItem)
	}
}
