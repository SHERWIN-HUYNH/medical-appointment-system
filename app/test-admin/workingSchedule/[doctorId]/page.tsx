"use client";

import DefaultLayout from "@/components/Layouts/defaultLayout";
import { useParams } from 'next/navigation';
import DoctorSchedule from "@/components/DoctorSchedule";

const WorkingSchedulePage = () => {
  const {doctorId} = useParams();
  if(!doctorId) return null;
  const doctorIdString = typeof doctorId === 'string' ? doctorId : JSON.stringify(doctorId);
  return (
    <DefaultLayout>
    <div className="bg-[#e8f2f7] w-full h-min flex flex-col justify-center ">
   {/* // <Breadcrumb pageName={Breadcrumb} /> */}
      <section className=" flex space-x-7  max-w-screen-xl px-4 pb-6 mt-8">
        <div className=" w-67 rounded-lg bg-white h-max">
            <h1 className="blue-header w-full">Thông tin bác sĩ</h1>
            <ul className="px-3 py-4 flex flex-col gap-3">
              <li className="text-16-normal flex ">
              <div className=" mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hospital"><path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/></svg></div>
                <div className="flex justify-center flex-col">
                  <p>Bệnh viện Đại học Y Dược TP.HCM</p>
                </div>
               
              </li>
              <li className="text-16-normal flex ">
              <div className=" mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-plus"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 14h6"/><path d="M12 17v-6"/></svg></div>
                <div className="flex justify-center flex-col">
                  <p>Chuyên khoa: Khám xương khớp</p>
                  
                </div>
               
              </li>
              <li className="text-16-normal flex ">
              <div className=" mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stethoscope"><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg></div>
                <div className="flex justify-center flex-col">
                  <p>Bác sĩ: Cao Thỉ</p>
                  
                </div>
               
              </li>
              <li className="text-16-normal flex ">
              <div className=" mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stethoscope"><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg></div>
                <div className="flex justify-center flex-col">
                  <p>Học hàm/Học vị: PGS</p>
                  
                </div>
               
              </li>
              <li className="text-16-normal flex ">
              <div className=" mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house-plus"><path d="M13.22 2.416a2 2 0 0 0-2.511.057l-7 5.999A2 2 0 0 0 3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7.354"/><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M15 6h6"/><path d="M18 3v6"/></svg></div>
                <div className="flex justify-center flex-col">
                  <p>Dịch vụ: Khám dịch vụ</p>
                  
                </div>
               
              </li>
              
            </ul>
        </div>
        <main className="bg-white flex flex-col w-[940px] h-min justify-between overflow-hidden"> 
          <h1 className="blue-header w-full">Vui lòng chọn khung giờ làm việc</h1>
          <DoctorSchedule doctorId={doctorIdString}/>
          
        </main >
      </section>
    </div>
    </DefaultLayout>
  );
};

export default WorkingSchedulePage;
function setDeletedEvents(arg0: (prevDeleted: any) => any[]) {
  throw new Error('Function not implemented.');
}

