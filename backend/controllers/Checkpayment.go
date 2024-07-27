package controllers

import (
	"net/http"
	// "time"

	// "strconv"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/Autsada555/PJ480-React/backend/entity"
	// "gorm.io/gorm/clause"
)

func GetAllCheckPayment(c *gin.Context) {
	var checkpayment []entity.Checkpayment
	if err := entity.DB().Raw(`SELECT * From checkpayments`).Scan(&checkpayment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": checkpayment})
}

func UpdateCheckPayment(c *gin.Context) {
	var checkpayment entity.Checkpayment
	id := c.Param("id")

	if err := c.ShouldBindJSON(&checkpayment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(checkpayment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Table("checkpayments").Where("id = ?", id).Updates(&checkpayment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "updated your checkpayment successfully"})
}