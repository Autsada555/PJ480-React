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
	employees := []User{
		{
			BaseModel:      BaseModel{ID: 1},
			FirstName:      "VeterA",
			LastName:       "VeterA",
			Email:          "veterA@veter.com",
			Password:       "veterA",
			UserTypeID: 100,
			GenderID:       1,
			Phone:          "0988888888",
			UserName:       "veterA",
		},
		{
			BaseModel:      BaseModel{ID: 2},
			FirstName:      "VeterB",
			LastName:       "VeterB",
			Email:          "veterB@veter.com",
			Password:       "veterB",
			UserTypeID: 100,
			GenderID:       1,
			Phone:          "0988888888",
			UserName:       "veterB",
		},
		{
			BaseModel:      BaseModel{ID: 3},
			FirstName:      "Veter",
			LastName:       "Veter",
			Email:          "veter@veter.com",
			Password:       "veter",
			UserTypeID: 200,
			GenderID:       1,
			Phone:          "0988888888",
			UserName:       "veter",
		},
		{
			BaseModel:      BaseModel{ID: 4},
			FirstName:      "Groomer",
			LastName:       "Groomer",
			Email:          "groom@groom.com",
			Password:       "groom",
			UserTypeID: 201,
			GenderID:       2,
			Phone:          "0999999999",
			UserName:       "Groomer",
		},
		{
			BaseModel:      BaseModel{ID: 5},
			FirstName:      "Broomer",
			LastName:       "Broomer",
			Email:          "broom@groom.com",
			Password:       "broom",
			UserTypeID: 202,
			GenderID:       2,
			Phone:          "0999999999",
			UserName:       "Broomer",
		},
	}
	db.Create(&employees)

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
	payment := []Payment{
		{
			BaseModel:  BaseModel{ID: 1},
			Name:       "ชำระด้วยเงินสด",
			UserID: 1,
		},
		{
			BaseModel:  BaseModel{ID: 2},
			Name:       "ชำระด้วยการโอน",
			UserID: 2,
		},
	}
	db.Create(&payment)

	// delivery data
	delivery := []Delivery{
		{
			BaseModel:  BaseModel{ID: 1},
			Name:       "รับเองที่หน้าร้าน",
			UserID: 1,
		},
		{
			BaseModel:  BaseModel{ID: 2},
			Name:       "จัดส่งตามที่อยู่",
			UserID: 2,
		},
	}
	db.Create(&delivery)

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

	// address
	address := []Address{
		{
			BaseModel:      BaseModel{ID: 1},
			Address:      "555 Suranari",
			District:       "Meaung",
			Province:          "Nakhon Ratcasima",
			Postcode:       30000,
			UserID: 1,			
		},		
	}
	db.Create(&address)
}
