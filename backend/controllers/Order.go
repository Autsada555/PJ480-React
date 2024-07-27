package controllers

import (
	"net/http"
	
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/Autsada555/PJ480-React/backend/entity"
	"gorm.io/gorm/clause"
)

func CreateOrder(c *gin.Context) {
	// create variable for store data as type of Employee
	var order entity.Order

	// get data from body and check error
	if err := c.ShouldBindJSON(&order); err != nil { //ฟังก์ชัน Gin ที่ใช้ในการแยกวิเคราะห์ JSON จากเนื้อหาคำขอและผูกเข้ากับโครงสร้าง employee
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()}) //ส่งคืนการตอบสนอง JSON พร้อมรหัสสถานะคำขอที่ไม่ถูกต้อง 400 
		return
	}

	// validate struct ตรวจสอบemployeeโครงสร้าง ใช้govalidatorแพ็คเกจเพื่อตรวจสอบความถูกต้องของฟิลด์ struct
	if _, err := govalidator.ValidateStruct(order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// create data in database and check error
	if err := entity.DB().Create(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response created data ระบบจะส่งคืนการตอบกลับ JSON พร้อมรหัสสถานะ 201 
	c.JSON(http.StatusCreated, gin.H{"data": "Create Order  Successfully"})
}

func DeleteOrder(c *gin.Context) {
	// create variable for store data as type of TourRegistration
	var order entity.Order

	// get id from url
	id := c.Param("id")

	// delete data in database and check error
	// Clauses(clause.Returning{}) is used to return the deleted data ควรส่งคืนข้อมูลที่ลบไปแล้ว
	if rows := entity.DB().Clauses(clause.Returning{}).Delete(&order, id).RowsAffected; rows == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "record not found"})
		return
	}

	// response deleted data ส่งคืนการตอบสนอง JSON พร้อมรหัสสถานะ 200 OK
	c.JSON(http.StatusOK, gin.H{"data": "Delete Order Successfully"})
}
