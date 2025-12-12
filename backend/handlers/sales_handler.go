package handlers

import (
	"facility-asset-management/config"
	"facility-asset-management/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetSales(c *gin.Context) {
	var sales []models.SalesRecord
	config.DB.Preload("Offers").Find(&sales)
	c.JSON(http.StatusOK, sales)
}

func GetSale(c *gin.Context) {
	var sale models.SalesRecord
	if err := config.DB.Preload("Offers").First(&sale, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sale not found"})
		return
	}
	c.JSON(http.StatusOK, sale)
}

func CreateSale(c *gin.Context) {
	var sale models.SalesRecord
	if err := c.ShouldBindJSON(&sale); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&sale)
	c.JSON(http.StatusCreated, sale)
}

func UpdateSale(c *gin.Context) {
	var sale models.SalesRecord
	if err := config.DB.First(&sale, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sale not found"})
		return
	}
	if err := c.ShouldBindJSON(&sale); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&sale)
	c.JSON(http.StatusOK, sale)
}

func DeleteSale(c *gin.Context) {
	var sale models.SalesRecord
	if err := config.DB.First(&sale, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sale not found"})
		return
	}
	config.DB.Delete(&sale)
	c.JSON(http.StatusOK, gin.H{"message": "Sale deleted"})
}
