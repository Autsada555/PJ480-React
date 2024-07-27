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

func CreateDelivery(c *gin.Context) {
	var delivery entity.Delivery

	if err := c.ShouldBindJSON(&delivery); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(delivery); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&delivery).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "Delivery successfully"})
}


func GetAddresss(c *gin.Context) {
	// create variable for store data as type of Employee
	var address entity.Address
	// get id from url
	id := c.Param("id")

	// get data form database and check error
	if err := entity.DB().Joins("Customer").First(&address, id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response data
	c.JSON(http.StatusOK, gin.H{"data": address})
}

func UpdateAddress(c *gin.Context) {
	// create variable for store data as type of employee
	var address entity.Address
	// get id from url
	id := c.Param("id")

	// get data from body and check error
	if err := c.ShouldBindJSON(&address); err != nil { //ฟังก์ชัน Gin ที่ใช้ในการแยกวิเคราะห์ JSON จากเนื้อหาคำขอและผูกเข้ากับโครงสร้าง
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// validate struct ตรวจสอบemployeeโครงสร้าง ใช้govalidatorแพ็คเกจเพื่อตรวจสอบความถูกต้องของฟิลด์ struct
	if _, err := govalidator.ValidateStruct(address); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update data in database and check error
	if err := entity.DB().Table("customers").Where("id = ?", id).Updates(address).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// response updated data ส่งคืนการตอบกลับ JSON พร้อมรหัสสถานะ 200 OK 
	c.JSON(http.StatusOK, gin.H{"data": "Updated your Address successfully"})
}


