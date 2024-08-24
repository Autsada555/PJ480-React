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

	// UserType
	usertypes := []UserType{
		{
			BaseModel: BaseModel{ID: 100},
			Name:      "customer",
		},
		{
			BaseModel: BaseModel{ID: 200},
			Name:      "admin",
		},
		{
			BaseModel: BaseModel{ID: 201},
			Name:      "cash",
		},
		{
			BaseModel: BaseModel{ID: 202},
			Name:      "deliver",
		},
	}
	db.Create(&usertypes)

	// employee
	users := []User{
		{
			BaseModel:      BaseModel{ID: 1},
			FirstName:      "Somchai",
			LastName:       "Somchai",
			Email:          "somchai@somchai.com",
			Password:       "somchai1234",
			UserTypeID: 100,
			GenderID:       1,
			Phone:          "0988888888",
			UserName:       "Somchai",
			Address:      "555 Suranari",
			District:       "Meaung",
			Province:          "Nakhon Ratcasima",
			Postcode:       "30000",
		},
		{
			BaseModel:      BaseModel{ID: 2},
			FirstName:      "Peter",
			LastName:       "Peter",
			Email:          "peter@peter.com",
			Password:       "peter1234",
			UserTypeID: 100,
			GenderID:       1,
			Phone:          "0988888888",
			UserName:       "Peter",
			Address:      "666 Suranari",
			District:       "Meaung",
			Province:          "Nakhon Ratcasima",
			Postcode:       "30000",
		},
		{
			BaseModel:      BaseModel{ID: 3},
			FirstName:      "Veter",
			LastName:       "Veter",
			Email:          "veter@veter.com",
			Password:       "veter1234",
			UserTypeID: 200,
			GenderID:       1,
			Phone:          "0988888888",
			UserName:       "veter",
			Address:      "777 Suranari",
			District:       "Meaung",
			Province:          "Nakhon Ratcasima",
			Postcode:       "30000",
		},
		{
			BaseModel:      BaseModel{ID: 4},
			FirstName:      "Pinky",
			LastName:       "Pinky",
			Email:          "pinky@pinky.com",
			Password:       "pinky1234",
			UserTypeID: 201,
			GenderID:       2,
			Phone:          "0999999999",
			UserName:       "Pinky",
			Address:      "888 Suranari",
			District:       "Meaung",
			Province:          "Nakhon Ratcasima",
			Postcode:       "30000",
		},
		{
			BaseModel:      BaseModel{ID: 5},
			FirstName:      "Jezzy",
			LastName:       "Jezzy",
			Email:          "jezzy@jezzy.com",
			Password:       "jezzy1234",
			UserTypeID: 202,
			GenderID:       2,
			Phone:          "0999999999",
			UserName:       "Jezzy",
			Address:      "999 Suranari",
			District:       "Meaung",
			Province:          "Nakhon Ratcasima",
			Postcode:       "30000",
		},
	}
	db.Create(&users)

	// diseasetypes data
	diseasetypes := []DiseaseType{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Heathy Food",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "Diabetes Food",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "Gastritict Food",
		},
		{
			BaseModel: BaseModel{ID: 4},
			Name:      "Thyroid Food",
		},
		{
			BaseModel: BaseModel{ID: 5},
			Name:      "Kidny Food",
		},
	}
	db.Create(&diseasetypes)

	// diseasetypes data
	menutypes := []MenuType{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Savory",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "Dessert",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "Soup",
		},
		{
			BaseModel: BaseModel{ID: 4},
			Name:      "Drink",
		},
	}
	db.Create(&menutypes)

	// statustypes data
	statustypes := []StatusType{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "Success",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "Waiting",
		},
		{
			BaseModel: BaseModel{ID: 3},
			Name:      "Fail",
		},
	}
	db.Create(&statustypes)

	// payment data
	paymenttype := []PaymentType{
		{
			BaseModel:  BaseModel{ID: 1},
			Name:       "ชำระด้วยเงินสด",
			
		},
		{
			BaseModel:  BaseModel{ID: 2},
			Name:       "ชำระด้วยการโอน",
			
		},
	}
	db.Create(&paymenttype)

	// delivery data
	deliverytype := []DeliveryType{
		{
			BaseModel:  BaseModel{ID: 1},
			Name:       "รับเองที่หน้าร้าน",
			
		},
		{
			BaseModel:  BaseModel{ID: 2},
			Name:       "จัดส่งตามที่อยู่",
			
		},
	}
	db.Create(&deliverytype)

	menu := []Menu{
		{
			BaseModel:     BaseModel{ID: 1},
			Name:          "bacon",
			Cost:          1500,
			Description:   "ทำได้ทุกอย่าง",
			Component:     map[string]interface{}{"Component": []string{"Ford", "BMW", "Fiat"}},
			MenuImage:     "asdasdasd",
			DiseaseTypeID: 1,
			MenuTypeID:    1,
		},
		{
			BaseModel:     BaseModel{ID: 2},
			Name:          "pool",
			Cost:          1500,
			Description:   "นอนบนพุง",
			Component:     map[string]interface{}{"Component": []string{"Ford", "BMW", "Fiat"}},
			MenuImage:     "asdasdasd",
			DiseaseTypeID: 2,
			MenuTypeID:    2,
		},
	}
	db.Create(&menu)

	
}
