# Apartment Management System

# Basic Structure

## Functionalities

- Admin
  - Admin can login.
  - Admin can view the tenant and owner details.
  - Admin can create owner.
  - Admin can allot parking slot.
  - Admin can view the complaints.
  - Admin can see total Owners.
  - Admin can see total Tenants.
  - Admin can see total Employee.
- Owner
  - Owner can see the Tenant details of his/her owned room.
  - Owner can create Tenant.
  - Owner can see the complaints from his/her owned room.
  - Owner can see the Room Details.
  - Owner can see Total Complaint.
  - Owner can see Number of Employee.
- Tenant

  - Tenant can see the alloted parking slot.
  - Tenant can pay maintenance fee.
  - Tenant can raise complaints.
  - Tenant can see his/her Tenant id.
  - Tenant can see his/her Name.
  - Tenant can see his/her Age.
  - Tenant can see his/her DOB.
  - Tenant can see his/her Room no.

- Employee

  - Employee can see all the complaints.
  - Employee can see Total number of Complaints

- All the admins, owners, tenant, employees can login and logout.

# Tech Stack

- Frontend - HTML5, Tailwind css, React JS
- Backend - NodeJS, ExpressJS
- Database - MySql

# How to Run

- Clone the github repo
- Then install the dependencies by opening the terminal with path as that of cloned github folder and do the following

  - For Client side, cd client

          npm install

  - For Server side, cd server

          npm install

- Install MySql workbench if you don't have one, and then import the export.sql file under database folder in workbench.

- Then in server folder create a file "config_sql.js" add localhost name, database name, username and password of your sql workbench and export it.

- Now to run, type the following

  - For client,

          npm run start

  - For server,

          npm run start
