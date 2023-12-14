# 1. Authentication Specification

## Registrasi (Sign Up) User

Endpoint : POST /api/v1/auth/signup

Request Body :
```json
{
    "data" : {
        "fullname" : "Aditya Yoga Adnyana Putra",
        "email" : "bimzbossftyoga@capstone.com",
        "vehicle_number_plate" : "DK 2938 ACL",
        "password" : "password"
    }
} 
```

Response Body Success :
```json
{
    "Code" : "201",
    "status" : "Created",
    "message" : "Successful registration",   
    "data" : {
        "token" : "unique-token"
    }
}
```

Response Body Error :
```json
{
    "code" : "409",
    "status" : "conflict",
    "errors" : "email already registered"
}
```

## Login (Sign In) User

Endpoint : POST /api/v1/auth/login

Request Body :
```json
{
    "email" : "bimzbossftyoga@capstone.com",
    "password" : "password",
}
```

Response Body Success :
```json
{
    "code": "200",
    "status": "OK",
    "message": "Successful sign in",
    "data": {
        "token": "user-specific-token",
        "user": {
            "id": "user-id",
            "fullname": "Aditya Yoga Adnyana Putra",
            "email": "bimzbossftyoga@capstone.com"
        }
    }
}
```

Response Body Error :
```json
{
    "code": "401",
    "status": "Unauthorized",
    "errors": "Email or password wrong"
}
```


## Reset Password

Endpoint : POST /api/v1/auth/reset-password

Request Body :
```json
{
    "email" : "bimzbossftyoga@capstone.com"
}
```

Response Body Success :
```json
{
    "code": "200",
    "status": "OK",
    "message": "Password reset request successful. An email with instructions has been sent to bimzbossftyoga@capstone.com"
}
```

{
    "email": "bimzbossftyoga@capstone.com",
    "old_password": "old-password",
    "new_password": "new-password",
    "confirm_new_password": "new-password"
}


{
    "code": "200",
    "status": "OK",
    "message": "Password reset successful"
}


## Verivikasi Account

Endpoint : POST /api/v1/auth/verify-account

Request Body :
```json
{
    "email" : "bimzbossftyoga@capstone.com",
    "otp" : "131313"
}
```

Response Body Success :
```json
{
    "code" : "200",
    "status" : "Ok",
    "message" : "Verification successful"
}
```

Response Body Error :
```json
{
    "code": "422",
    "status": "Unprocessable Entity",
    "message": "Invalid OTP code",
    "details": "Please enter a valid OTP code."
}
```

Endpoint: POST /api/v1/auth/resend-otp

Request Body :
```json
{
    "email" : "bimzbossftyoga@capstone.com",
}
```

Response Body Success :
```json
{
    "code" : "200",
    "status" : "Ok",
    "message" : "OTP code resent successfully"
}
```

Response Body Error :
```json
{
    "code": "422",
    "status": "Unprocessable Entity",
    "message": "Resend OTP code failed",
    "details": "Please try again later."
}
```


## Edit Account

Endpoint : PUT /api/v1/auth/edit-account

Request Body :
```json
{
    "token": "user-specific-token",
    "data": {
        "fullname" : "Aditya Adnyana Sipolan",
        "email" : "sipolanproject@capstone.com",
        "photo": "[Base64-encoded image data]" // Menambahkan field untuk foto profil
    }
}
```

Response Body Success :
```json
{
    "code": "200",
    "status": "OK",
    "message": "Account updated successfully",
    "data": {
        "updatedFields": ["fullname", "email"],
         "photoUrl": "https://example.com/path/to/new/photo.jpg" // Menambahkan URL foto profil baru
    }
}
```

Response Body Error :
```json
{
    "code" : "401",
    "status" : "Unauthorized",
    "errors" : "Invalid or expired token"
}
```


# 2. Article Specification

## List Articles

Endpoint: GET /api/v1/articles

Request Body :
```json
{
    "category" : ["news", "cars", "vehicles"], // bagian cat dan tag bisa diubah tergantung dataset dari ML
    "tags" : ["security", "finance"],
    "limit" : 10,
    "page" : 1
}
```

Response Body Success :
```json
{
    "articles": [
        {
            "id": 1,
            "title": "Article Title 1",
            "category": "news",
            "tags": ["security"],
            "content": "isi kontennya ya...",
            "published_at": "datetime"
        },
        {
            "id": 2,
            "title": "Article Title 2",
            "category": "cars",
            "tags": ["finance"],
            "content": "isi kontennya yaaa...",
            "published_at": "datetime"
        },
        // jumlah artikel sesuai dengan limit
    ],
    "total": 20,
    "page": 1,
    "limit": 10
}
```

Response Body Error :
```json
{
   "code": "404",
    "status": "Not Found",
    "errors": "No articles found matching the provided criteria"
}
```

Endpoint: POST /api/v1/articles/share

Request Body :
```json
{
    "articleId": 1,
    "platform": "whatsapp"
}
```

Response Body Success :
```json
{
    "code": "200",
    "status": "OK",
    "message": "Article shared successfully",
    "data": {
        "shareUrl": "https://example.com/articles/1/share/whatsapp"
    }
}
```

Response Body Error :
```json
{
    "code": "401",
    "status": "Unauthorized",
    "errors": "Invalid or expired token"
}
```


# 3. Violation Specification

## Latest Violations

Endpoint: GET /api/v1/violations/latest-violations

Request Body :
```json
{
    "limit": 10  // bisa ditambah nanti  
}
```

Response Body Success :
```json
{
    "code": "200",
    "status": "OK",
    "message": "Successfully fetched the latest violations",
    "data": {
        "violations": [
            {
                "id": 1,
                "location": "Jalan Kaliurang" ,
                // bagian ini masih opsional
                "type": "Tidak memakai helm",
                "vehicle-number-plate" : "DK 2938 ACL",
                "timestamp": "2023-03-01 (14:45:30)"
            },
        ]
    }
}
```

Response Body Error :
```json
{
   "code": "404",
    "status": "Not Found",
    "errors": "No latest violations found"
}
```

## List User Violations

Endpoint: GET /api/v1/violations/user-violations

Request Body :
```json
{
    "userId": "user-specific-id",
    "limit": 10    
}
```
Response Body Success :
```json
{
    "code": "200",
    "status": "OK",
    "message": "User violations retrieved successfully",
    "data": {
        "violations": [
            {
                "id": 1,
                "location": "Jalan Kaliurang" ,
                // bagian ini masih opsional
                "type": "Tidak memakai helm",
                "vehicle-number-plate" : "DK 2938 ACL",
                "timestamp": "2023-03-01 (14:45:30)"
            },
        ]
    }
}
```

Response Body Error :
```json
{
   "code": "404",
    "status": "Not Found",
    "errors": "No violations found for the user"
}
```


## Violation Detail

Endpoint: GET /api/v1/violations/{violationId}

Response Body Success :
```json
{
    "code": "200",
    "status": "OK",
    "message": "Violation details retrieved successfully",
    "data": {
        "id": 1,
        "type": "Tidak memakai helm",
        "vehicle-number-plate" : "DK 2938 ACL",
        "timestamp": "2023-03-01 (14:45:30)"
        "user": {
            "id": "user-specific-id",
            "fullname": "Bimo"
        },
    }
}
```

Response Body Error :
```json
{
   "code": "404",
    "status": "Not Found",
    "errors": "Violations not found"
}
```


# 4. Payment

## Payment History

Endpoint: GET /api/v1/payment/payment-history

Request Body :
```json
{
    "userId": "user-specific-id",
    "limit": 5                     
}
```

Response Body Success :
```json
{
    "code": "200",
    "status": "OK",
    "message": "Payment history retrieved successfully",
    "data": {
        "payments": [
            {
                "id-pembayaran": "#29112023",
                "biaya": "Rp 500.223",
                "timestamp": "2023-03-01",
                "status" : "Belum Terbayar"
            },
        ]
    }
}
```

Response Body Error :
```json
{
   "code": "404",
    "status": "Not Found",
    "errors": "No payment history found"
}
```

## Payment Method

Endpoint: GET /api/v1/payment/payment-method

Request Parameters :
```json
{
    "userId": "user-specific-id",                    
}
```
Response Body Success :
```json
{
   "code": "200",
    "status": "OK",
    "message": "Payment methods retrieved successfully",
    "data": {
        "payment_methods": [
            {
                "id": "credit_card",
                "name": "Credit Card",
                "description": "Pay with your credit card",
                "provider": "Midtrans"
            },
            {
                "id": "bank_transfer",
                "name": "Bank Transfer",
                "description": "Transfer payment through your bank",
                "provider": "Midtrans"
            },
            // metode pembayaran lainnya jika ada
        ]
    }
}
```

Response Body Error :
```json
{
    "code": "404",
    "status": "Not Found",
    "errors": "No payment method found"
}
```

## Payment Process

Endpoint: POST /api/v1/payment/process-payment

Request Body :
```json
{
    "userId": "user-specific-id",
    "invoiceId": "invoice-specific-id",
    "methodId": 1
}
```

Response Body Success :
```json
{
    "code": "201",
    "status": "Created",
    "message": "Pembayaran Berhasil",
    "data": {
        "transactionId": "unique-transaction-id"
    }
}
```

Response Body Error :
```json
{
   "code": "400",
    "status": "Bad Request",
    "errors": "Invalid payment request. Please check the details and try again."
}
```

# 5. Pusat Bantuan

## Kategori Bantuan

Endpoint: GET /api/v1/help/categories

Response Body Success :

```json
{
  "code": "200",
  "status": "OK",
  "message": "List of help categories retrieved successfully",
  "data": [
    {
      "categoryId": 1,
      "categoryName": "Account"
    },
    {
      "categoryId": 2,
      "categoryName": "Payments"
    },
    // Add more categories as needed
  ]
}
```

Response Body Error:

```json
{
  "code": "500",
  "status": "Internal Server Error",
  "error": "Failed to retrieve help categories"
}
```


## Pesan (Messages)

Endpoint: POST /api/v1/help/messages

Headers: Authorization: Bearer user-specific-token

Request Body:

```json
{
  "userId": "user-specific-id",
  "categoryId": 1,
  "message": "I'm having issues accessing my account."
}
```


Response Body Success:

```json
{
  "code": "201",
  "status": "Created",
  "message": "Help message sent successfully",
  "data": {
    "messageId": 123,
    "userId": "user-specific-id",
    "categoryId": 1,
    "message": "I'm having issues accessing my account.",
    "timestamp": "2023-04-01T09:30:00Z"
  }
}```

Response Body Error

```json
{
  "code": "400",
  "status": "Bad Request",
  "error": "Invalid request body"
}
```