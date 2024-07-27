package controllers

import (
	"net/http"

	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/gin-gonic/gin"
)

// GET /DiseaseType
func ListDiseasetypes(c *gin.Context) {
	var diseasetypes []entity.DiseaseType
	if err := entity.DB().Raw("SELECT * FROM disease_types").Scan(&diseasetypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": diseasetypes})
}