package controllers

import (
	"net/http"

	"github.com/Autsada555/PJ480-React/backend/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

func GetMenuByDiseaseID(c *gin.Context) {
	// รับ DiseaseID จากพารามิเตอร์ใน URL
	diseaseID := c.Param("id")

	var menus []entity.Menu
	// ค้นหาเมนูที่มี DiseaseID ตรงกัน
	entity.DB().
		Preload("Diseases").
		Joins("JOIN menu_diseases ON menus.id = menu_diseases.menu_id").
		Where("menu_diseases.disease_id = ?", diseaseID).
		Find(&menus)

	// ส่งผลลัพธ์กลับในรูปแบบ JSON
	c.JSON(200, menus)
}


func GetMenu(c *gin.Context) {
	var menus []entity.Menu
	entity.DB().Preload("Diseases").Find(&menus)
	c.JSON(200, menus)
}


// func CreateMenu(c *gin.Context) {
// 	var menu entity.Menu

// 	if err := c.ShouldBindJSON(&menu); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if _, err := govalidator.ValidateStruct(menu); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if err := entity.DB().Create(&menu).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": "Menu successfully"})
// }

func CreateMenu(c *gin.Context) {
	var request entity.Menu

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var diseases []entity.Disease
	if len(request.Diseases) > 0 {
		entity.DB().Where("id IN ?", request.Diseases).Find(&diseases)
	}

	var menu entity.Menu
	if err := entity.DB().Create(&menu).Error; err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Menu created successfully", "menu": menu})
}

func UpdateMenu(c *gin.Context) {
	var menu entity.Menu
	id := c.Param("id")

	if err := c.ShouldBindJSON(&menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(menu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Table("menus").Where("id = ?", id).Updates(&menu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "updated your menu successfully"})
}

func DeleteMenu(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM menus WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "menu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "delete menu success"})
}
