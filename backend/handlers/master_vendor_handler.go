package handlers

import (
	"facility-asset-management/config"
	"facility-asset-management/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMasterVendors(c *gin.Context) {
	var vendors []models.MasterVendorRecord
	config.DB.Find(&vendors)
	c.JSON(http.StatusOK, vendors)
}

func GetMasterVendor(c *gin.Context) {
	var vendor models.MasterVendorRecord
	if err := config.DB.First(&vendor, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vendor not found"})
		return
	}
	c.JSON(http.StatusOK, vendor)
}

func CreateMasterVendor(c *gin.Context) {
	var vendor models.MasterVendorRecord
	if err := c.ShouldBindJSON(&vendor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&vendor)
	c.JSON(http.StatusCreated, vendor)
}

func UpdateMasterVendor(c *gin.Context) {
	var vendor models.MasterVendorRecord
	if err := config.DB.First(&vendor, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vendor not found"})
		return
	}
	if err := c.ShouldBindJSON(&vendor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&vendor)
	c.JSON(http.StatusOK, vendor)
}

func DeleteMasterVendor(c *gin.Context) {
	var vendor models.MasterVendorRecord
	if err := config.DB.First(&vendor, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Vendor not found"})
		return
	}
	config.DB.Delete(&vendor)
	c.JSON(http.StatusOK, gin.H{"message": "Vendor deleted"})
}
