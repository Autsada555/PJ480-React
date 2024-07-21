package entity

import (
	// "time"

	// "github.com/Autsada555/PJ480-React/backend/utils"
	"gorm.io/gorm"
)

func SetupData(db *gorm.DB) {
	
	// gender data
	genders := []Gender{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Male",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "Female",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "Others",
		},
	}

	db.Create(&genders)
}