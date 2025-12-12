package handlers

import (
	"facility-asset-management/config"
	"facility-asset-management/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMutations(c *gin.Context) {
	var mutations []models.MutationRecord
	config.DB.Find(&mutations)
	c.JSON(http.StatusOK, mutations)
}

func GetMutation(c *gin.Context) {
	var mutation models.MutationRecord
	if err := config.DB.First(&mutation, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mutation not found"})
		return
	}
	c.JSON(http.StatusOK, mutation)
}

func CreateMutation(c *gin.Context) {
	var mutation models.MutationRecord
	if err := c.ShouldBindJSON(&mutation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Create(&mutation)
	c.JSON(http.StatusCreated, mutation)
}

func UpdateMutation(c *gin.Context) {
	var mutation models.MutationRecord
	if err := config.DB.First(&mutation, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mutation not found"})
		return
	}
	if err := c.ShouldBindJSON(&mutation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	config.DB.Save(&mutation)
	c.JSON(http.StatusOK, mutation)
}

func DeleteMutation(c *gin.Context) {
	var mutation models.MutationRecord
	if err := config.DB.First(&mutation, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Mutation not found"})
		return
	}
	config.DB.Delete(&mutation)
	c.JSON(http.StatusOK, gin.H{"message": "Mutation deleted"})
}
