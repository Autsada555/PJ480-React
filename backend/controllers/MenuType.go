package controllers

import (
	"net/http"

	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/gin-gonic/gin"
)

// GET /Menutypes
func ListMenutypes(c *gin.Context) {
	var menutypes []entity.MenuType
	if err := entity.DB().Raw("SELECT * FROM menu_types").Scan(&menutypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": menutypes})
}