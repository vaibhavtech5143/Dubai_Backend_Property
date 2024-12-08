I'll provide you with a comprehensive guide for testing the API endpoints using Postman. I'll break it down by functionality and include all necessary details.

Base URL

http://localhost:5000
1. Admin Authentication
Register Admin

POST /api/admin/register
Content-Type: application/json

Body:
{
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123"
}

Response (201):
{
    "_id": "generated_id",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
}
Login Admin

POST /api/admin/login
Content-Type: application/json

Body:
{
    "email": "john@example.com",
    "password": "password123"
}

Response (200):
{
    "_id": "generated_id",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
}
Logout Admin

POST /api/admin/logout
Authorization: JWT token (from cookies)

Response (200):
{
    "message": "Logged out successfully"
}
2. Property Management
Create Property

POST /api/properties
Authorization: JWT token (from cookies)
Content-Type: multipart/form-data

Form Data:
- title: "Luxury Villa"
- description: "Beautiful luxury villa with ocean view"
- price: 1500000
- location: "Miami Beach, FL"
- bedrooms: 4
- bathrooms: 3
- area: 3500
- image: [file upload]

Response (201):
{
    "_id": "generated_id",
    "title": "Luxury Villa",
    "description": "Beautiful luxury villa with ocean view",
    "price": 1500000,
    "location": "Miami Beach, FL",
    "imageUrl": "cloudinary_url",
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 3500,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
Get All Properties

GET /api/properties

Response (200):
{
    "properties": [
        {
            "_id": "property_id",
            "title": "Luxury Villa",
            ...
        }
    ]
}
Get Property Gallery (with filters)

GET /api/properties/gallery?minPrice=1000000&maxPrice=2000000&minBedrooms=3&location=Miami&sortBy=price:desc&page=1&limit=10

Query Parameters (all optional):
- minPrice
- maxPrice
- minBedrooms
- maxBedrooms
- minBathrooms
- maxBathrooms
- location
- sortBy (field:order)
- page
- limit

Response (200):
{
    "properties": [...],
    "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "totalItems": 48,
        "hasNextPage": true,
        "hasPrevPage": false
    }
}
Get Property by ID

GET /api/properties/:id

Response (200):
{
    "_id": "property_id",
    "title": "Luxury Villa",
    ...
}
Update Property

PUT /api/properties/:id
Authorization: JWT token (from cookies)
Content-Type: multipart/form-data

Form Data (all fields optional):
- title: "Updated Luxury Villa"
- description: "Updated description"
- price: 1600000
- location: "Miami Beach, FL"
- bedrooms: 4
- bathrooms: 3
- area: 3500
- image: [file upload]

Response (200):
{
    "_id": "property_id",
    "title": "Updated Luxury Villa",
    ...
}
Delete Property

DELETE /api/properties/:id
Authorization: JWT token (from cookies)

Response (200):
{
    "message": "Property removed"
}