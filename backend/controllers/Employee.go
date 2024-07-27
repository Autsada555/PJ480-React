package controllers

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/Autsada555/PJ480-React/backend/entity"
	"gorm.io/gorm/clause"
)

// this is Employee controller refer = ค่าของฟิลด์ควรมีอยู่ในตารางฐานข้อมูล
type EmployeeForUpdate struct {
	PositionID uint ` valid:"required~Position is required,refer=positions~Position does not exist"`
	GenderID   uint ` valid:"required~Gender is required,refer=genders~Gender does not exist"`
	PrecedeID  uint ` valid:"required~Precede is required,refer=precedes~Precede does not exist"`
	FirstName  string
	LastName   string
	Email      string    `valid:"required~Email is required,email~Invalid email"`
	DayOfBirth time.Time `valid:"required~DayOfBirth is required,past~DayOfBirth must be in the past"`
	Phone      string    `valid:"required~Phone is required,stringlength(10|10)~Phone must be at 10 characters"`
}

func GetAllEmployee(c *gin.Context) {

	// create variable for store data as type of Employee array
	var employees []entity.Employee

	// get data form database and check error
	if err := entity.DB().Joins("Gender").Joins("GenderType").Omit("CheckpaymentID").Find(&employees).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(employees)})
}

func GetEmployee(c *gin.Context) {
	// create variable for store data as type of Employee
	var employee entity.Employee
	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Joins("Gender").Joins("GenderType").Omit("CheckpaymentID").First(&employee, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": employee})
}

func CreateEmployee(c *gin.Context) {
	// create variable for store data as type of Employee
	var employee entity.Employee

	// get data from body and check error
	if err := c.ShouldBindJSON(&employee); err != nil { //ฟังก์ชัน Gin ที่ใช้ในการแยกวิเคราะห์ JSON จากเนื้อหาคำขอและผูกเข้ากับโครงสร้าง employee
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()}) //ส่งคืนการตอบสนอง JSON พร้อมรหัสสถานะคำขอที่ไม่ถูกต้อง 400 
		return
	}

	// validate struct ตรวจสอบemployeeโครงสร้าง ใช้govalidatorแพ็คเกจเพื่อตรวจสอบความถูกต้องของฟิลด์ struct
	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create data in database and check error
	if err := entity.DB().Create(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response created data ระบบจะส่งคืนการตอบกลับ JSON พร้อมรหัสสถานะ 201 
	c.JSON(http.StatusCreated, gin.H{"data": "Create Employee  Successfully"})
}

func UpdateEmployee(c *gin.Context) {
	// create variable for store data as type of employee
	var employee EmployeeForUpdate
	// get id from url
	id := c.Param("id")

	// get data from body and check error
	if err := c.ShouldBindJSON(&employee); err != nil { //ฟังก์ชัน Gin ที่ใช้ในการแยกวิเคราะห์ JSON จากเนื้อหาคำขอและผูกเข้ากับโครงสร้าง
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct ตรวจสอบemployeeโครงสร้าง ใช้govalidatorแพ็คเกจเพื่อตรวจสอบความถูกต้องของฟิลด์ struct
	if _, err := govalidator.ValidateStruct(employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update data in database and check error
	if err := entity.DB().Table("employees").Where("id = ?", id).Updates(employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data ส่งคืนการตอบกลับ JSON พร้อมรหัสสถานะ 200 OK 
	c.JSON(http.StatusOK, gin.H{"data": "Updated your Employee successfully"})
}

func DeleteEmployee(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var employee entity.Employee

	// get id from url
	id := c.Param("id")

	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data ควรส่งคืนข้อมูลที่ลบไปแล้ว
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&employee, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data ส่งคืนการตอบสนอง JSON พร้อมรหัสสถานะ 200 OK
	c.JSON(http.StatusOK, gin.H{"data": "Delete Employee Successfully"})
}

// GET /employee/position
func GetAllEmployeeType(c *gin.Context) {
	// create variable for store data as type of Position array
	var employeetypes []entity.EmployeeType

	// get data form database and check error
	if err := entity.DB().Find(&employeetypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(employeetypes)})
}

// GET /employee/gender
func GetAllGender(c *gin.Context) {
	// create variable for store data as type of Gender array
	var genders []entity.Gender

	// get data form database and check error
	if err := entity.DB().Find(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data omit ลบค่าว่างใดๆ ออกจากบันทึกเพศก่อนที่จะส่งการตอบกลับ 
	c.JSON(http.StatusOK, gin.H{"data": OmitEmpty(genders)})
}

