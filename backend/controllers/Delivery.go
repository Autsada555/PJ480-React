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

func CreateDelivery(c *gin.Context) {
	var delivery entity.Delivery

	if err := c.ShouldBindJSON(&delivery); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(delivery); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&delivery).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "Delivery successfully"})
}

func GetDeliveryType(c *gin.Context) {
	// create variable for store data as type of Employee
	var deliverytype entity.Delivery

	// get data form database and check error
	if err := entity.DB().Find(&deliverytype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(deliverytype)})
}



