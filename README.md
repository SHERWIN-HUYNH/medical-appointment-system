
# Overview 

The Medical Appointment System is a web-based platform designed to streamline the process of managing and scheduling medical examinations. It connects patients with healthcare facilities, allowing for 
 
✔️ Efficient online booking  
✔️ Medical record management  
✔️ Workflow optimization for doctors and staff

# 🚀 Features  

### 👩‍⚕️ For Patients  
- 🔐 Secure registration & login (email/password)  
- 📅 Book appointments (choose doctor, specialty, service, date & time)  
- 📝 Manage medical profiles (allergies, history, ID)  
- 📲 View, cancel, and rate appointments + SMS notifications  
- 💳 View payment history  
- 🔍 Search doctors by name, title, or specialty  

### 🛠 For Administrators  
- 👨‍⚕️ Doctor management (add/edit/delete, schedules, lock accounts)  
- 🏷 Specialty management (add/edit/delete specialties & services)  
- 💰 Service management with pricing  
- 📅 Appointment oversight (view/confirm/cancel/filter)  
- ⭐ Review management (delete reviews, auto-lock doctors < 1.5 rating)  
- 📊 Reporting & Analytics (revenue, top specialties, booking trends, Excel export, charts)  

### 🌐 General  
- 🔒 JWT-based authentication & role-based authorization  
- 📩 SMS/email notifications (Twilio, NodeMailer)  
- 📊 Data visualization with TanStack Table 
# ⚙️ Technologies Used
**Frontend**  
- React.js, Next.js (SSR/SSG), TypeScript  
- TailwindCSS, Shadcn/UI  
- Zod (validation), TanStack Table (data tables & charts)  

**Backend**  
- Next.js (API routes)  
- Prisma ORM, PostgreSQL  

**Authentication & Authorization**  
- NextAuth with JWT  
- Middleware for protected routes  

**Other Tools & Services**  
- 📩 NodeMailer (email)  
- 📱 Twilio (SMS notifications)  
- 📅 FullCalendar (scheduling)  
- RESTful APIs (JSON/XML)  
- Git & VSCode for development  
# Demo

I will go through main interfaces and explain the most important features of my website 

## BOOK AN APPOINTMENT

Since this system uses real schedules, old time slots will become unavailable.

To make an appointment:  

1. **Login as admin**  
   <img width="1897" height="908" alt="image" src="https://github.com/user-attachments/assets/c8dc39cc-3b5a-48fc-b281-f9547669e886" />


2. **Admin Dashboard**  
   <img width="1893" height="903" alt="image" src="https://github.com/user-attachments/assets/6dab4afa-83af-46f3-b174-b500efeaaaf1" />
 

3. **Doctor Management** → Create doctor schedules  
   <img width="1897" height="890" alt="image" src="https://github.com/user-attachments/assets/a5f6e92f-db2c-4f17-8650-b3405ad802eb" />


4. **Create Schedules** by selecting available dates  
   <img width="1541" height="910" alt="image" src="https://github.com/user-attachments/assets/fc2f10ef-b3b5-493d-bef0-dcd468a36c22" />
 

5. **Add Timeslots** (30-minute blocks, limited to near-future dates)  
   <img width="1531" height="837" alt="image" src="https://github.com/user-attachments/assets/2e7f6a2a-6711-45ab-a5ef-85a285137b92" />

6. After you created schedules, now you can test book an appointment with the doctor whose shedule you just made

You should follow this path: login -> choose doctor -> choose faculty -> choose service -> payment 

To be short, I'll just show the UI of payment 





# 🛠 Installation  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/SHERWIN-HUYNH/medical-appointment-system.git
cd medical-appointment-system
```

### 2️⃣ Install Dependencies
```bash
pnpm install
```
### 3️⃣ Setup Environment Variables
Create a .env file and fill in the following:
```bash
DATABASE_URL=
SECRET_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_SERVER_URL=
NODE_ENV=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_API_KEY=
CRON_SECRET=

# Email
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=
```

# 📌 Future Improvements

📱 Mobile app integration (React Native / Expo)

🤖 AI-based appointment suggestions

📊 More detailed patient health analytics
