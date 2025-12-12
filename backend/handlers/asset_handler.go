package handlers

import (
	"facility-asset-management/config"
	"facility-asset-management/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAssets(c *gin.Context) {
	assetType := c.Query("type") // ATK or ARK
	var assets []models.AssetRecord
	query := config.DB.Preload("Employee")
	if assetType != "" {
		query = query.Where("asset_type = ?", assetType)
	}
	query.Find(&assets)
	c.JSON(http.StatusOK, assets)
}

func CreateAsset(c *gin.Context) {
	var asset models.AssetRecord
	if err := c.ShouldBindJSON(&asset); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&asset)
	c.JSON(http.StatusCreated, asset)
}

func UpdateAsset(c *gin.Context) {
	var asset models.AssetRecord
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}
	if err := c.ShouldBindJSON(&asset); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&asset)
	c.JSON(http.StatusOK, asset)
}

func DeleteAsset(c *gin.Context) {
	var asset models.AssetRecord
	if err := config.DB.First(&asset, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Asset not found"})
		return
	}
	config.DB.Delete(&asset)
	c.JSON(http.StatusOK, gin.H{"message": "Asset deleted"})
}

// Master Items
func GetMasterItems(c *gin.Context) {
	assetType := c.Query("type")
	var items []models.MasterItem
	query := config.DB
	if assetType != "" {
		query = query.Where("asset_type = ?", assetType)
	}
	query.Find(&items)
	c.JSON(http.StatusOK, items)
}

func CreateMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&item)
	c.JSON(http.StatusCreated, item)
}

func UpdateMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		return
	}
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteMasterItem(c *gin.Context) {
	var item models.MasterItem
	if err := config.DB.First(&item, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		return
	}
	config.DB.Delete(&item)
	c.JSON(http.StatusOK, gin.H{"message": "Item deleted"})
}
