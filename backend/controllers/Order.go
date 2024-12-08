package controllers

import (
	"net/http"
	
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/Autsada555/PJ480-React/backend/entity"
	"gorm.io/gorm/clause"
)

func CreateOrder(c *gin.Context) {
	var order entity.Order

	if err := c.ShouldBindJSON(&order); err != nil { 
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()}) 
		return
	}

	if _, err := govalidator.ValidateStruct(order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": "Create Order  Successfully"})
}

func DeleteOrder(c *gin.Context) {
	var order entity.Order

	id := c.Param("id")

	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&order, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "Delete Order Successfully"})
}

func GetAllOrder(c *gin.Context) {
	var customers []entity.Order

	if err := entity.DB().
		InnerJoins("Gender").InnerJoins("UserType").
		Find(&customers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": customers})
}

func GetOrderByID(c *gin.Context) {
	var order entity.Order
	orderID := c.Param("id")  

	if err := entity.DB().Model(&entity.User{}).
		Where("id = ?", orderID). 
		First(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": order})
}