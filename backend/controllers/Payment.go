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
// Define a struct to only include address-related fields
type AddressResponse struct {
	Address  string `json:"address"`
	District string `json:"district"`
	Province string `json:"province"`
	Postcode string `json:"postcode"`
}

func GetAddressByUserId(c *gin.Context) {
	// Create a variable to store user data with specific fields
	var user struct {
		Address  string `json:"address"`
		District string `json:"district"`
		Province string `json:"province"`
		Postcode string `json:"postcode"`
	}

	// Get the user ID from URL parameters
	id := c.Param("id")

	// Query the database and select only the necessary fields
	if err := entity.DB().
		Model(&entity.User{}).
		Select("address, district, province, postcode").
		Where("id = ?", id).
		First(&user).Error; err != nil {
		// Return error response if no data found or query fails
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found or unable to retrieve address"})
		return
	}

	// Return the address data as JSON response
	c.JSON(http.StatusOK, gin.H{"data": user})
}



func CreatePayment(c *gin.Context) {
	var payment entity.Payment

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "Payment successfully"})
}

func GetDeliveryType(c *gin.Context) {
	// create variable for store data as type of Employee
	var deliverytype entity.DeliveryType

	// get data form database and check error
	if err := entity.DB().Find(&deliverytype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(deliverytype)})
}

func GetPaymentType(c *gin.Context) {
	// create variable for store data as type of Employee
	var paymenttype entity.PaymentType

	// get data form database and check error
	if err := entity.DB().Find(&paymenttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(paymenttype)})
}
