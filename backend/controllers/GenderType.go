package controllers

import (
	"net/http"

	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/gin-gonic/gin"
)

// GET /genders
func ListGendertypes(c *gin.Context) {
	var gendertypes []entity.Gender
	if err := entity.DB().Raw("SELECT * FROM genders").Scan(&gendertypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": gendertypes})
}