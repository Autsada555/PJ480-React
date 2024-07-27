package controllers

import (
	"net/http"
	// "time"

	// "strconv"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/Autsada555/PJ480-React/backend/entity"
	"gorm.io/gorm/clause"
)

type CustomerForUpdate struct {
	GenderID uint ` valid:"required~Gender is required,refer=genders~Gender does not exist"`
	AddressID uint ` valid:"required~Address is required,refer=address~Address does not exist"`
	FirstName string `gorm:"default:UserFirstName"`
	LastName  string `gorm:"default:UserLastName"`
	Email     string `valid:"required~Email is required,email~Invalid email address" gorm:"unique"`
	Phone     string `valid:"required~Phone number is required,stringlength(10|10)~Phone must be at 10 characters"`
}

func GetCustomer(c *gin.Context) {
	// create variable for store data as type of Employee
	var customer entity.Customer
	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Joins("Gender").Joins("EmployeeType").Omit("CheckpaymentID").First(&customer, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": customer})
}

func UpdateCustomer(c *gin.Context) {
	// create variable for store data as type of employee
	var customer CustomerForUpdate
	// get id from url
	id := c.Param("id")

	// get data from body and check error
	if err := c.ShouldBindJSON(&customer); err != nil { //ฟังก์ชัน Gin ที่ใช้ในการแยกวิเคราะห์ JSON จากเนื้อหาคำขอและผูกเข้ากับโครงสร้าง
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct ตรวจสอบemployeeโครงสร้าง ใช้govalidatorแพ็คเกจเพื่อตรวจสอบความถูกต้องของฟิลด์ struct
	if _, err := govalidator.ValidateStruct(customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update data in database and check error
	if err := entity.DB().Table("customers").Where("id = ?", id).Updates(customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data ส่งคืนการตอบกลับ JSON พร้อมรหัสสถานะ 200 OK 
	c.JSON(http.StatusOK, gin.H{"data": "Updated your Customer successfully"})
}

func DeleteCustomer(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var customer entity.Customer

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
func GetAllGenders(c *gin.Context) {
	// create variable for store data as type of TourType array
	var genders []entity.Gender

	// get data form database and check error
	if err := entity.DB().Find(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(genders)})
}

func GetAddress(c *gin.Context) {
	// create variable for store data as type of Employee
	var address entity.Address
	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Joins("Custoer").First(&address, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": address})
}





