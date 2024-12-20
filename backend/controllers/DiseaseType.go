package controllers

import (
	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/gin-gonic/gin"
)

// // GET /DiseaseType
// func GetDiseases(c *gin.Context) {
// 	var disease []entity.Disease
// 	if err := entity.DB().Raw("SELECT * FROM diseases").Scan(&disease).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": disease})
// }

func GetDiseases(c *gin.Context) {
	var diseases []entity.Disease
	entity.DB().Find(&diseases)
	c.JSON(200, diseases)
}
