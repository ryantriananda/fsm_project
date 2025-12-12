package handlers

import (
	"facility-asset-management/config"
	"facility-asset-management/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetServices(c *gin.Context) {
	var services []models.ServiceRecord
	config.DB.Find(&services)
	c.JSON(http.StatusOK, services)
}

func GetService(c *gin.Context) {
	var service models.ServiceRecord
	if err := config.DB.First(&service, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}
	c.JSON(http.StatusOK, service)
}

func CreateService(c *gin.Context) {
	var service models.ServiceRecord
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&service)
	c.JSON(http.StatusCreated, service)
}

func UpdateService(c *gin.Context) {
	var service models.ServiceRecord
	if err := config.DB.First(&service, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}
	if err := c.ShouldBindJSON(&service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&service)
	c.JSON(http.StatusOK, service)
}

func DeleteService(c *gin.Context) {
	var service models.ServiceRecord
	if err := config.DB.First(&service, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		return
	}
	config.DB.Delete(&service)
	c.JSON(http.StatusOK, gin.H{"message": "Service deleted"})
}
