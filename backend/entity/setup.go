package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("DS-DelightDB.db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	database.AutoMigrate(
		// &Baggeg{},
	
	)


	db = database

	// password, _ := bcrypt.GenerateFromPassword([]byte("admin12345"), 14)

	// db.Model(&Member{}).Create(&Member{
	// 	IDcard:         "1111111111111",
	// 	Firstname:      "admin",
	// 	Lastname:       "admin",
	// 	Phone:          "0221415151",
	// 	Email:          "admin@admin.admin",
	// 	Passport:       "A123456789",
	// 	ProfilePicture: "",
	// 	Coin:           1000000,
	// 	Password:       string(password),
	// })



	

}