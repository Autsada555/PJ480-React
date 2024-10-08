package controllers

import (
	"net/http"
	// "time"

	// "strconv"

	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

type CustomerForUpdate struct {
	GenderID   uint ` valid:"required~Gender is required,refer=genders~Gender does not exist"`

	FirstName string `gorm:"default:UserFirstName"`
	LastName  string `gorm:"default:UserLastName"`
	Email     string `valid:"required~Email is required,email~Invalid email address" gorm:"unique"`
	Phone     string `valid:"required~Phone number is required,stringlength(10|10)~Phone must be at 10 characters"`
	Address   string `valid:"required~Address is required,minstringlength(2)~Address must be at least 2 characters"`
	District  string `valid:"required~District is required,minstringlength(2)~District must be at least 2 characters"`
	Province  string `valid:"required~Province is required,minstringlength(2)~Province must be at least 2 characters"`
	Postcode  string `valid:"required~Postcode is required,stringlength(5|5)~Postcode must be at 5 characters"`
}

func GetCustomer(c *gin.Context) {
	// create variable for store data as type of Employee
	var customer entity.User
	EmailOrUsername := c.GetString("EmailOrUsername")

	// id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Joins("Gender").Joins("UserType").Omit("CheckpaymentID","Password").Where("email = ? or user_name = ? ", EmailOrUsername, EmailOrUsername).First(&customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": customer})
}

func CreateCustomer(c *gin.Context) {
	var customer entity.User

	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "customer successfully"})
}

func UpdateCustomer(c *gin.Context) {
	var customer CustomerForUpdate
	id := c.Param("id")

	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ShouldBindJSON"})
		return
	}

	if _, err := govalidator.ValidateStruct(customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "govalidator"})
		return
	}

	if err := entity.DB().Table("users").Where("id = ?", id).Save(&customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":"map"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "updated your customer successfully"})
}

func DeleteCustomer(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var customer entity.User

	// get id from url
	id := c.Param("id")

	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data ควรส่งคืนข้อมูลที่ลบไปแล้ว
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&customer, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data ส่งคืนการตอบสนอง JSON พร้อมรหัสสถานะ 200 OK
	c.JSON(http.StatusOK, gin.H{"data": "Delete Customer Successfully"})
}

// Get Gender
func GetAllGender(c *gin.Context) {
	// create variable for store data as type of Gender array
	var genders []entity.Gender

	// get data form database and check error
	if err := entity.DB().Find(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(genders)})
}

func GetAllUserType(c *gin.Context) {
	// create variable for store data as type of Employee
	var usertypes []entity.UserType

	// get data form database and check error
	if err := entity.DB().Find(&usertypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(usertypes)})
}

func GetAllCustomer(c *gin.Context) {
	var customers []entity.User

	if err := entity.DB().
		InnerJoins("Gender").InnerJoins("UserType").
		Find(&customers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": customers})
}

func GetCustomerByID(c *gin.Context) {
	// Create variable to store data as type of User
	var customer entity.User
	customerID := c.Param("id")  // Get the customer ID from the URL parameter

	// Get data from the database and check for errors
	if err := entity.DB().Model(&entity.User{}).
		Preload("Gender").    // Preload Gender to load the related gender data
		Omit("CheckpaymentID","UserName", "Password","UserType").  // Preload UserType to load the related user type data
		Where("id = ?", customerID). // Explicitly use users.id to avoid ambiguity
		First(&customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Respond with customer data
	c.JSON(http.StatusOK, gin.H{"data": customer})
}


func DeleteCustomerID(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var customer entity.User

	// get id from url
	id := c.Param("id")

	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data ควรส่งคืนข้อมูลที่ลบไปแล้ว
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&customer, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data ส่งคืนการตอบสนอง JSON พร้อมรหัสสถานะ 200 OK
	c.JSON(http.StatusOK, gin.H{"data": "Delete Customer Successfully"})
}

func UpdateCustomerByID(c *gin.Context) {
	var customer CustomerForUpdate
	id := c.Param("id")

	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Table("users").Where("id = ?", id).Save(&customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "updated your customer successfully"})
}

