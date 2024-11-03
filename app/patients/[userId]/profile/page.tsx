"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RiEmpathizeFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { FaBookMedical, FaNewspaper } from "react-icons/fa";
import { Cake, PencilLine, Smartphone, Trash2, UserRoundPen } from "lucide-react";
import Link from "next/link";
import Header from "@/app/homepage/Header";
import MedicalRecord from "./MedicalRecord";
import Footer from "@/app/homepage/Footer";
import PaymentHistory from "./PaymentHistory";
import Modal from "@/components/Modal";
import { toast } from "sonner";

interface Profile {
  id: number;
  name: string;
  phone: string;
  birthDate: Date;
}

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState(1);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState<number | null>(null);
  const[profileToShow, setProfileToShow] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(`/api/profile/${session?.user?.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu hồ sơ");
        }
        const profiles = await response.json();
        if (Array.isArray(profiles)) {
          setProfiles(profiles);
        } else {
          setProfiles([]); 
        }     
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hồ sơ:", error);
      }
    };

    if (session?.user?.id) {
      fetchProfiles();
    }
  }, [session]);

  // Hàm xóa hồ sơ
  const handleDeleteProfile = async () => {
    if (profileToDelete === null) return;

    try {
      const response = await fetch(`/api/profile/${session?.user?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileValues: { id: profileToDelete },
        }),
        
      });

      if (!response.ok) {
        toast.error("Lỗi khi xóa hồ sơ");
      }

      setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== profileToDelete));
      toast.success("Xóa hồ sơ thành công");
    } catch (error) {
      toast.error("Lỗi khi xóa hồ sơ");
    } finally {
      setIsModalOpen(false);
      setProfileToDelete(null);     
    }
  };
  const handleShowProfile =async () => {
    if (profileToShow === null) return;
    try {
      const response = await fetch(`/api/profile/${session?.user?.id}`, {
        method: "GET2",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileValues: { id: profileToShow },
        }),
        
      });}
      catch (error) {
        toast.error("Lỗi khi lấy hồ sơ");
      } finally {
        setIsModalOpen(false);
        setProfileToShow(null);     
      }
    
  }

  const Buttons = [
    { id: 1, name: "Hồ sơ bệnh nhân", icon: <FaBookMedical /> },
    { id: 2, name: "Phiếu khám bệnh", icon: <FaNewspaper /> },
    {
      id: 3,
      name: "Lịch sử thanh toán viện phí",
      icon: <RiMoneyDollarCircleLine />,
    },
  ];

  return (
    <div>
      <Header />
      <div className="mt-[80px] flex justify-center p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Left Side (Buttons) */}
          <div className="rounded-lg flex flex-col items-center p-4 w-full lg:w-auto">
            <Link href={`/patients/${session?.user.id}/profile/add-profile`}>
              <Button className="justify-start border-slate-300 bg-white hover:bg-sky-200 w-full gap-2 items-center p-3 rounded-lg border-2">
                <RiEmpathizeFill className="text-blue-400" />
                Thêm hồ sơ khám bệnh
              </Button>
            </Link>
            <hr className="w-full border-t-2 border-blue-300 mt-4" />
            <ul className="mt-4 w-full">
              {Buttons.map((item) => (
                <li key={item.id} className="mt-2 w-full">
                  <Button
                    className={`w-full gap-2 flex items-center justify-start p-3 hover:bg-sky-200 bg-white ${
                      selectedOption === item.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedOption(item.id)}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg lg:col-span-2 p-4 bg-white w-full">
            {selectedOption === 1 && (
              <div>
                <p className="text-slate-300 text-xs">PATIENT'S RECORDS</p>
                <h2 className="text-lg font-bold">Danh sách hồ sơ bệnh nhân</h2>
                <hr className="w-full border-t-2 border-blue-300 mt-4" />
                <br />

                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    
                    <div
                      key={profile.id}
                      className="bg-slate-50 p-4 text-sm rounded-lg shadow-md transition-all ease-in-out duration-100 cursor-pointer mb-4"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
                        <div className="rounded-lg bg-gray-200 flex-1">
                          <p className="text-primary mt-2 text-lg flex items-center gap-2">
                            <UserRoundPen className="w-5 h-5" />
                            <span className="text-lg uppercase">{profile.name}</span>
                          </p>
                          <p className="mt-2 text-lg flex items-center gap-2">
                            <Smartphone className="w-5 h-5" />
                            <span>{profile.phone}</span>
                          </p>
                          <p className="mt-2 text-lg flex items-center gap-2">
                            <Cake className="w-5 h-5" />
                            <span>
                              {profile.birthDate
                                ? new Date(profile.birthDate).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </p>
                        </div>

                        <div className="rounded-lg bg-gray-200 flex-1">
                          <div className="mt-4 flex justify-end">
                            <Button className="bg-slate-50 text-green-400 hover:bg-green-400 hover:text-white text-sm px-4 py-2">
                              Xem chi tiết
                            </Button>
                          </div>
                        </div>
                      </div>

                      <hr className="mt-2" />
                      <div className="mt-2 flex justify-end gap-2">
                        <Button
                          className="bg-slate-50 text-pink-400 hover:bg-pink-400 hover:text-white text-sm"
                          onClick={() => {
                            setProfileToDelete(profile.id);
                            setIsModalOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 inline mr-1" />
                          Xóa hồ sơ
                        </Button>
                        <Link href={`/patients/${profile.id}/profile/edit-profile`}>
                          <Button className="bg-slate-50 text-primary hover:bg-primary hover:text-white text-sm">
                            <PencilLine className="w-4 h-4 inline mr-1" />
                            Sửa hồ sơ
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-xs">
                    Bạn chưa có hồ sơ bệnh nhân. Vui lòng tạo mới hồ sơ để được đặt khám.
                  </p>
                )}
              </div>
            )}

            {selectedOption === 2 && (
              <div>
                <p className="text-slate-300 text-xs">MEDICAL BILLS</p>
                <h2 className="text-lg font-bold">Danh sách phiếu khám bệnh</h2>
                <hr className="w-full border-t-2 border-blue-300 mt-4" />
                <br />
                <MedicalRecord />
              </div>
            )}
            {selectedOption === 3 && (
              <div>
                <p className="text-slate-300 text-xs">PAYMENT HISTORY</p>
                <h2 className="text-lg font-bold">Lịch sử thanh toán viện phí</h2>
                <hr className="w-full border-t-2 border-blue-300 mt-4" />
                <br />
                <PaymentHistory />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteProfile}
        message="Bạn có chắc chắn muốn xóa hồ sơ này không?"
      />
    </div>
  );
};

export default Profile;
