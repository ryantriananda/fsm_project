package handlers

import (
	"facility-asset-management/config"
	"facility-asset-management/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetContracts(c *gin.Context) {
	var contracts []models.ContractRecord
	config.DB.Find(&contracts)
	c.JSON(http.StatusOK, contracts)
}

func GetContract(c *gin.Context) {
	var contract models.ContractRecord
	if err := config.DB.First(&contract, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contract not found"})
		return
	}
	c.JSON(http.StatusOK, contract)
}

func CreateContract(c *gin.Context) {
	var contract models.ContractRecord
	if err := c.ShouldBindJSON(&contract); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&contract)
	c.JSON(http.StatusCreated, contract)
}

func UpdateContract(c *gin.Context) {
	var contract models.ContractRecord
	if err := config.DB.First(&contract, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contract not found"})
		return
	}
	if err := c.ShouldBindJSON(&contract); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&contract)
	c.JSON(http.StatusOK, contract)
}

func DeleteContract(c *gin.Context) {
	var contract models.ContractRecord
	if err := config.DB.First(&contract, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Contract not found"})
		return
	}
	config.DB.Delete(&contract)
	c.JSON(http.StatusOK, gin.H{"message": "Contract deleted"})
}
