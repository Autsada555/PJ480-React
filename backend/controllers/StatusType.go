package controllers

import (
	"net/http"

	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/gin-gonic/gin"
)

// GET /genders
func ListStatustypes(c *gin.Context) {
	var statustypes []entity.StatusType
	if err := entity.DB().Raw("SELECT * FROM status_types").Scan(&statustypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statustypes})
}