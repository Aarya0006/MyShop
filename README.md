for backend to add products in admin 
http://127.0.0.1:8000/admin/login/?next=/admin/

admin can give permisson to a user to become vender during adding if user select that as vender that user will become vender
and once user become vender they can use there dashboard after login to add product directly woithout admin side.

and one vender can just check there products and modify it.
admin credentials:
username:admin
email:aaryasingh@gmail.com
password:Aarya


to run frontend:
npm run dev 

to run backend:
.\venv\Scripts\activate
python manage.py runserver


# E-Commerce Marketplace Assignment

This is a full-stack e-commerce application built for an internship assignment. It features a React frontend and a Django backend.

## Features

- User Authentication (Signup/Login with JWT)
- Multi-Vendor system with Customer/Vendor roles
- Vendors can add and manage their own products via a dashboard
- Public product listing page with filtering
- Functional shopping cart

## How to Run

### Backend (Django)
1. Navigate to the `ecommerce-backend` folder.
2. Create and activate a virtual environment.
3. Run `pip install -r requirements.txt` (Note: We need to create this file).
4. Run `python manage.py migrate`.
5. Run `python manage.py runserver`.

### Frontend (React)
1. Navigate to the `ecommerce-frontend` folder.
2. Run `npm install`.
3. Run `npm run dev`.

