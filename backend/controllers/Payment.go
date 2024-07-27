package controllers

import (
	"net/http"
	// "time"

	// "strconv"

	// "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/Autsada555/PJ480-React/backend/entity"
	// "gorm.io/gorm/clause"
)

func GetAllPayments(c *gin.Context) {
	// create variable for store data as type of TourType array
	var payments []entity.Payment

	// get data form database and check error
	if err := entity.DB().Find(&payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(payments)})
}
