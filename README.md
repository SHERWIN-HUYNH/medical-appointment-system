This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## How to Use This Website
1. Admin: Create Doctor Schedules
Log in with an admin account to open up appointment slots for patients.

Access the Admin Dashboard.

Navigate to Doctor Schedules.

Click Add New Schedule and specify:

Doctor name

Date & time range

Maximum patients per slot

Save the schedule. Once saved, those slots become available for patient booking.

2. Patient: Book an Appointment
After an admin has published schedules, switch to a patient role to reserve a slot.

Log out of the admin account.

Log in with a patient account.

Go to Book Appointment.

Select your preferred doctor and available time slot.

Fill in any required details and confirm.

3. Test Credentials
Use these accounts to try out both roles without creating new users:

Role	Email	Password
Admin	admin@test.com	Admin@123
User	patient@test.com	Patient@123
4. Scheduling Notes
All schedules and appointments are time-sensitive. Slots in the past will automatically expire.

If you see no available slots, double-check that the admin has created future schedules.

To avoid “no slots available” errors, keep your system clock accurate and work with dates at least one hour ahead.
## Admin account 
![image](https://github.com/user-attachments/assets/247d8dcf-c378-47f1-bf2b-ff9ab0268520)

## User interfaces for admin 
![image](https://github.com/user-attachments/assets/3ef3fc56-2222-4c4b-8754-59865d86a872)

