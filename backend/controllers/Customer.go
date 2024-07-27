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

func GetAllCustomer(c *gin.Context) {
	// create variable for store data as type of User array
	var customers []entity.Customer

	// get data form database and check error
	if err := entity.DB().Where("role_id = ?", 201).Joins("Gender").Joins("Address").Omit("Password").Find(&customers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(customers)})
}

// Get Gender
// func GetAllGenders(c *gin.Context) {
// 	// create variable for store data as type of TourType array
// 	var genders []entity.Gender

// 	// get data form database and check error
// 	if err := entity.DB().Find(&genders).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// response data
// 	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(genders)})
// }

func GetAllGender(c *gin.Context) {
	// create variable for store data as type of Gender array
	var genders []entity.Gender

	// get data form database and check error
	if err := entity.DB().Find(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": genders})
}


// func GetEmployee(c *gin.Context) {
// 	// create variable for store data as type of Employee
// 	var employee entity.Employee
// 	// get id from url
// 	id := c.Param("id")

// 	// get data form database and check error
// 	if err := entity.DB().Joins("Gender").Joins("EmployeeType").Omit("CheckpaymentID").First(&employee, id).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// response data
// 	c.JSON(http.StatusOK, gin.H{"data": employee})
// }

