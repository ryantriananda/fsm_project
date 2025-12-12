package handlers

import (
	"facility-asset-management/config"
	"facility-asset-management/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetVehicles(c *gin.Context) {
	var vehicles []models.VehicleRecord
	config.DB.Find(&vehicles)
	c.JSON(http.StatusOK, vehicles)
}

func GetVehicle(c *gin.Context) {
	var vehicle models.VehicleRecord
	if err := config.DB.First(&vehicle, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}
	c.JSON(http.StatusOK, vehicle)
}

func CreateVehicle(c *gin.Context) {
	var vehicle models.VehicleRecord
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&vehicle)
	c.JSON(http.StatusCreated, vehicle)
}

func UpdateVehicle(c *gin.Context) {
	var vehicle models.VehicleRecord
	if err := config.DB.First(&vehicle, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&vehicle)
	c.JSON(http.StatusOK, vehicle)
}

func DeleteVehicle(c *gin.Context) {
	var vehicle models.VehicleRecord
	if err := config.DB.First(&vehicle, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vehicle not found"})
		return
	}
	config.DB.Delete(&vehicle)
	c.JSON(http.StatusOK, gin.H{"message": "Vehicle deleted"})
}
