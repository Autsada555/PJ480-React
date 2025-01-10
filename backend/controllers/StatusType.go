package controllers

import (
	"net/http"

	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/gin-gonic/gin"
)

// GET /genders
func ListStatusOrderTypes(c *gin.Context) {
	var statusordertypes []entity.StatusOrderType
	if err := entity.DB().Raw("SELECT * FROM status_order_types").Scan(&statusordertypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusordertypes})
}

func ListStatusPaymentTypes(c *gin.Context) {
	var statusordertypes []entity.StatusPaymentType
	if err := entity.DB().Raw("SELECT * FROM status_payment_types").Scan(&statusordertypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": statusordertypes})
}

func CheckPayment(c *gin.Context) {
    id := c.Param("id")
	status_payment_type_id := c.Param("status_payment_type_id")


    if err := entity.DB().Model(&entity.Order{}).
        Where("id = ?", id).
        Updates(map[string]interface{}{"status_payment_type_id": status_payment_type_id}).
        Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"data": "Order status updated successfully"})
}
