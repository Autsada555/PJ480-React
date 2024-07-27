package controllers

import (
	"net/http"

	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/gin-gonic/gin"
)

// GET /employeetypes
func ListEmployeetypes(c *gin.Context) {
	var employeetypes []entity.EmployeeType
	if err := entity.DB().Raw("SELECT * FROM employee_types").Scan(&employeetypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": employeetypes})
}