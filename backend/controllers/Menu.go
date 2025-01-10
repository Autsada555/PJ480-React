package controllers

import (
	"net/http"

	"github.com/Autsada555/PJ480-React/backend/entity"
	// "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

func GetMenuByDiseaseID(c *gin.Context) {
	diseaseID := c.Param("id")

	var menus []entity.Menu
	if err := entity.DB().
		Preload("Diseases").       
		Preload("MenuType").       
		Joins("JOIN menu_diseases ON menus.id = menu_diseases.menu_id"). 
		Where("menu_diseases.disease_id = ?", diseaseID).               
		Find(&menus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ส่งผลลัพธ์กลับในรูปแบบ JSON
	c.JSON(http.StatusOK, gin.H{"data": menus})
}


func GetMenu(c *gin.Context) {
	var menus []entity.Menu
	entity.DB().Preload("Diseases").Preload("MenuType").Find(&menus)
	c.JSON(http.StatusOK, gin.H{"data": menus})
}

func CreateMenu(c *gin.Context) {
	// Struct ที่ใช้สำหรับรับ JSON
    type MenuRequest struct {
        Name        string   `json:"Name"`
        MenuTypeID  uint     `json:"MenuTypeID"`
        Cost        float32  `json:"Cost"`
        Description string   `json:"Description"`
        Component   []string `json:"Component"`
        MenuImage   string   `json:"MenuImage"`
        DiseasesID  []uint   `json:"DiseasesID"`
    }

    var request MenuRequest

    // Bind JSON ไปยัง struct
    if err := c.ShouldBindJSON(&request); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    // สร้าง Menu ใหม่
    menu := entity.Menu{
        Name:        request.Name,
        Cost:        request.Cost,
        Description: request.Description,
        Component:   request.Component,
        MenuImage:   request.MenuImage,
        MenuTypeID:  request.MenuTypeID,
    }

    // เชื่อมโยงกับโรค (DiseasesID)
    var diseases []entity.Disease
    if err := entity.DB().Where("id IN ?", request.DiseasesID).Find(&diseases).Error; err != nil {
        c.JSON(400, gin.H{"error": "Diseases not found"})
        return
    }
    menu.Diseases = diseases

    // บันทึกเมนูและความสัมพันธ์ Many-to-Many ในตารางที่มีอยู่แล้ว
    if err := entity.DB().Save(&menu).Error; err != nil {
        c.JSON(500, gin.H{"error": "Failed to save menu"})
        return
    }

    c.JSON(200, gin.H{"message": "Menu created successfully", "data": menu})
}

// func UpdateMenu(c *gin.Context) {
//     // Struct ที่ใช้สำหรับรับ JSON
//     type MenuRequest struct {
//         Name        string   `json:"Name"`
//         MenuTypeID  uint     `json:"MenuTypeID"`
//         Cost        float32  `json:"Cost"`
//         Description string   `json:"Description"`
//         Component   []string `json:"Component"`
//         MenuImage   string   `json:"MenuImage"`
//         DiseasesID  []uint   `json:"DiseasesID"`
//     }

//     var request MenuRequest

//     // Bind JSON ไปยัง struct
//     if err := c.ShouldBindJSON(&request); err != nil {
//         c.JSON(400, gin.H{"error": err.Error()})
//         return
//     }

//     // ดึงเมนูที่ต้องการแก้ไขจาก Database โดยใช้ ID ที่ส่งมาจาก URL หรือ Body
//     menuID := c.Param("id") // หรืออาจจะใช้ c.ShouldBindUri() ขึ้นอยู่กับวิธีที่ส่ง id
//     var menu entity.Menu
//     if err := entity.DB().First(&menu, menuID).Error; err != nil {
//         c.JSON(404, gin.H{"error": "Menu not found"})
//         return
//     }

//     // อัปเดตค่าของเมนูที่ส่งมาใหม่
//     menu.Name = request.Name
//     menu.MenuTypeID = request.MenuTypeID
//     menu.Cost = request.Cost
//     menu.Description = request.Description
//     menu.Component = request.Component
//     menu.MenuImage = request.MenuImage

//     // เชื่อมโยงกับโรค (DiseasesID)
//     var diseases []entity.Disease
//     if err := entity.DB().Where("id IN ?", request.DiseasesID).Find(&diseases).Error; err != nil {
//         c.JSON(400, gin.H{"error": "Diseases not found"})
//         return
//     }
//     menu.Diseases = diseases

//     // บันทึกการอัปเดตเมนู
//     if err := entity.DB().Save(&menu).Error; err != nil {
//         c.JSON(500, gin.H{"error": "Failed to update menu"})
//         return
//     }

//     c.JSON(200, gin.H{"message": "Menu updated successfully", "data": menu})
// }
func UpdateMenu(c *gin.Context) {
    // Struct ที่ใช้สำหรับรับ JSON
    type MenuRequest struct {
        Name        string   `json:"Name"`
        MenuTypeID  uint     `json:"MenuTypeID"`
        Cost        float32  `json:"Cost"`
        Description string   `json:"Description"`
        Component   []string `json:"Component"`
        MenuImage   string   `json:"MenuImage"`
        DiseasesID  []uint   `json:"DiseasesID"`
    }

    var request MenuRequest

    // Bind JSON ไปยัง struct
    if err := c.ShouldBindJSON(&request); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    // ดึงเมนูที่ต้องการแก้ไขจาก Database โดยใช้ ID ที่ส่งมาจาก URL หรือ Body
    menuID := c.Param("id") // หรืออาจจะใช้ c.ShouldBindUri() ขึ้นอยู่กับวิธีที่ส่ง id
    var menu entity.Menu
    if err := entity.DB().First(&menu, menuID).Error; err != nil {
        c.JSON(404, gin.H{"error": "Menu not found"})
        return
    }

    // อัปเดตค่าของเมนูที่ส่งมาใหม่
    menu.Name = request.Name
    menu.MenuTypeID = request.MenuTypeID
    menu.Cost = request.Cost
    menu.Description = request.Description
    menu.Component = request.Component
    menu.MenuImage = request.MenuImage

    // เชื่อมโยงกับโรค (DiseasesID)
    var diseases []entity.Disease
    if err := entity.DB().Where("id IN ?", request.DiseasesID).Find(&diseases).Error; err != nil {
        c.JSON(400, gin.H{"error": "Diseases not found"})
        return
    }

    // เคลียร์ความสัมพันธ์เดิมจากตารางการเชื่อมโยง menu_diseases
    if err := entity.DB().Model(&menu).Association("Diseases").Clear(); err != nil {
        c.JSON(500, gin.H{"error": "Failed to clear old disease associations"})
        return
    }

    // อัปเดตความสัมพันธ์ใหม่
    menu.Diseases = diseases

    // บันทึกการอัปเดตเมนู
    if err := entity.DB().Save(&menu).Error; err != nil {
        c.JSON(500, gin.H{"error": "Failed to update menu"})
        return
    }

    c.JSON(200, gin.H{"message": "Menu updated successfully", "data": menu})
}



func DeleteMenu(c *gin.Context) {
    // รับ ID ของเมนูที่ต้องการลบจาก URL
    menuID := c.Param("id")

    // ตรวจสอบว่าเมนูมีอยู่ในฐานข้อมูลหรือไม่
    var menu entity.Menu
    if err := entity.DB().Where("id = ?", menuID).First(&menu).Error; err != nil {
        c.JSON(404, gin.H{"error": "Menu not found"})
        return
    }

    // ลบเมนู
    if err := entity.DB().Delete(&menu).Error; err != nil {
        c.JSON(500, gin.H{"error": "Failed to delete menu"})
        return
    }

    c.JSON(200, gin.H{"message": "Menu deleted successfully"})
}
