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
func GetAllHistory(c *gin.Context) {
	// create variable for store data as type of User array
	var historys []entity.HistoryOrder

	// get data form database and check error
	if err := entity.DB().Joins("Order").Joins("StatusType").Find(&historys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(historys)})
}


