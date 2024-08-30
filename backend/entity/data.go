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
			BaseModel:  BaseModel{ID: 1},
			FirstName:  "Somchai",
			LastName:   "Somchai",
			Email:      "somchai@somchai.com",
			Password:   "somchai1234",
			UserTypeID: 100,
			GenderID:   1,
			Phone:      "0988888888",
			UserName:   "Somchai",
			Address:    "555 Suranari",
			District:   "Meaung",
			Province:   "Nakhon Ratcasima",
			Postcode:   "30000",
		},
		{
			BaseModel:  BaseModel{ID: 2},
			FirstName:  "Peter",
			LastName:   "Peter",
			Email:      "peter@peter.com",
			Password:   "peter1234",
			UserTypeID: 100,
			GenderID:   1,
			Phone:      "0988888888",
			UserName:   "Peter",
			Address:    "666 Suranari",
			District:   "Meaung",
			Province:   "Nakhon Ratcasima",
			Postcode:   "30000",
		},
		{
			BaseModel:  BaseModel{ID: 3},
			FirstName:  "Veter",
			LastName:   "Veter",
			Email:      "veter@veter.com",
			Password:   "veter1234",
			UserTypeID: 200,
			GenderID:   1,
			Phone:      "0988888888",
			UserName:   "veter",
			Address:    "777 Suranari",
			District:   "Meaung",
			Province:   "Nakhon Ratcasima",
			Postcode:   "30000",
		},
		{
			BaseModel:  BaseModel{ID: 4},
			FirstName:  "Pinky",
			LastName:   "Pinky",
			Email:      "pinky@pinky.com",
			Password:   "pinky1234",
			UserTypeID: 201,
			GenderID:   2,
			Phone:      "0999999999",
			UserName:   "Pinky",
			Address:    "888 Suranari",
			District:   "Meaung",
			Province:   "Nakhon Ratcasima",
			Postcode:   "30000",
		},
		{
			BaseModel:  BaseModel{ID: 5},
			FirstName:  "Jezzy",
			LastName:   "Jezzy",
			Email:      "jezzy@jezzy.com",
			Password:   "jezzy1234",
			UserTypeID: 202,
			GenderID:   2,
			Phone:      "0999999999",
			UserName:   "Jezzy",
			Address:    "999 Suranari",
			District:   "Meaung",
			Province:   "Nakhon Ratcasima",
			Postcode:   "30000",
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
			BaseModel: BaseModel{ID: 1},
			Name:      "ชำระด้วยเงินสด",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "ชำระด้วยการโอน",
		},
	}
	db.Create(&paymenttype)

	// delivery data
	deliverytype := []DeliveryType{
		{
			BaseModel: BaseModel{ID: 1},
			Name:      "รับเองที่หน้าร้าน",
		},
		{
			BaseModel: BaseModel{ID: 2},
			Name:      "จัดส่งตามที่อยู่",
		},
	}
	db.Create(&deliverytype)

	menu := []Menu{
		{
			BaseModel:   BaseModel{ID: 1},
			Name:        "ข้าวหมูสับ",
			Cost:        45,
			Description: "อร่อย",
			Component:   map[string]interface{}{"Component": []string{"หมูสับ", "กระเทียม", "น้ำปลา"}},
			MenuImage:   "/src/assets/kawkookkapi.webp",
			DiseaseType: []DiseaseType{
				diseasetypes[0], diseasetypes[1],diseasetypes[2], diseasetypes[3], diseasetypes[4],
			},
			MenuTypeID: 1,
		},
		{
			BaseModel:   BaseModel{ID: 2},
			Name:        "เค้กกล้วยหอม",
			Cost:        30,
			Description: "หวานนิดๆ",
			Component:   map[string]interface{}{"Component": []string{"แป้ง", "น้ำตาล 1 %", "กล้วยหอม"}},
			MenuImage:   "/src/assets/kawkookkapi.webp",
			DiseaseType: []DiseaseType{
				diseasetypes[1], diseasetypes[2],
			},
			MenuTypeID: 2,
		},{
			BaseModel:   BaseModel{ID: 3},
			Name:        "ซุปเห็ดทัปเฟิล",
			Cost:        40,
			Description: "อร่อย",
			Component:   map[string]interface{}{"Component": []string{"เห็ดทัปเฟิล", "เห็ดทัปเฟิล", "เห็ดทัปเฟิล"}},
			MenuImage:   "/src/assets/kawkookkapi.webp",
			DiseaseType: []DiseaseType{
				diseasetypes[3], diseasetypes[4],
			},
			MenuTypeID: 3,
		},{
			BaseModel:   BaseModel{ID: 4},
			Name:        "น้ำเปล่า",
			Cost:        10,
			Description: "ทำได้ทุกอย่าง",
			Component:   map[string]interface{}{"Component": []string{}},
			MenuImage:   "/src/assets/kawkookkapi.webp",
			DiseaseType: []DiseaseType{
				diseasetypes[0], diseasetypes[1],diseasetypes[4],
			},
			MenuTypeID: 4,
		},{
			BaseModel:   BaseModel{ID: 5},
			Name:        "กะเพราหมู",
			Cost:        50,
			Description: "delicius",
			Component:   map[string]interface{}{"Component": []string{"หมูชิ้น", "กะเพรา", "กะเทียม"}},
			MenuImage:   "/src/assets/kawkookkapi.webp",
			DiseaseType: []DiseaseType{
				diseasetypes[0], diseasetypes[1],diseasetypes[3],
			},
			MenuTypeID: 1,
		},{
			BaseModel:   BaseModel{ID: 6},
			Name:        "กะเพราไก่",
			Cost:        50,
			Description: "ไม่ใช้น้ำมัน",
			Component:   map[string]interface{}{"Component": []string{"ไก่ชิ้น", "กะเพรา", "กะเทียม"}},
			MenuImage:   "/src/assets/kawkookkapi.webp",
			DiseaseType: []DiseaseType{
				diseasetypes[0], diseasetypes[1],diseasetypes[3],
			},
			MenuTypeID: 1,
		},{
			BaseModel:   BaseModel{ID: 7},
			Name:        "สลัดอกไก่",
			Cost:        50,
			Description: "ไม่ใช้น้ำมัน",
			Component:   map[string]interface{}{"Component": []string{"สลัด", "ผลไม้", "อกไก่"}},
			MenuImage:   "/src/assets/kawkookkapi.webp",
			DiseaseType: []DiseaseType{
				diseasetypes[0], diseasetypes[1],diseasetypes[3],
			},
			MenuTypeID: 1,
		},{
			BaseModel:   BaseModel{ID: 8},
			Name:        "สลัดไข่",
			Cost:        50,
			Description: "ไม่ใช้น้ำมัน",
			Component:   map[string]interface{}{"Component": []string{"สลัด", "ผลไม้", "ไข่"}},
			MenuImage:   "/src/assets/kawkookkapi.webp",
			DiseaseType: []DiseaseType{
				diseasetypes[0], diseasetypes[1],diseasetypes[3],
			},
			MenuTypeID: 1,
		},
	}
	db.Create(&menu)

}
