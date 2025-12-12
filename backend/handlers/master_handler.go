package handlers

import (
	"facility-asset-management/config"
	"facility-asset-management/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMastersByCategory(c *gin.Context) {
	category := c.Param("category")
	var masters []models.GeneralMaster
	config.DB.Where("category = ?", category).Find(&masters)
	c.JSON(http.StatusOK, masters)
}

func CreateMaster(c *gin.Context) {
	category := c.Param("category")
	var master models.GeneralMaster
	if err := c.ShouldBindJSON(&master); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	master.Category = category
	config.DB.Create(&master)
	c.JSON(http.StatusCreated, master)
}

func UpdateMaster(c *gin.Context) {
	var master models.GeneralMaster
	if err := config.DB.First(&master, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master not found"})
		return
	}
	if err := c.ShouldBindJSON(&master); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&master)
	c.JSON(http.StatusOK, master)
}

func DeleteMaster(c *gin.Context) {
	var master models.GeneralMaster
	if err := config.DB.First(&master, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Master not found"})
		return
	}
	config.DB.Delete(&master)
	c.JSON(http.StatusOK, gin.H{"message": "Master deleted"})
}
