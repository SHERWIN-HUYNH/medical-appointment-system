import React from "react";
import { BellRing, BookPlus, CreditCard, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface DropDownProps {
  username: string;
  className?: string;
}
const DropDown = ({ username, className }: DropDownProps) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className} variant="outline">
          {username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-60 bg-white cursor-pointer z-50">
        <DropdownMenuLabel>
          Xin chào <span className="text-xl text-primary">{username}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-300" />
        <DropdownMenuGroup>
          <Link href={`/patients/${userId}/profile`}>
            <DropdownMenuItem className="hover:bg-slate-200 cursor-pointer">
              <BookPlus className="mr-2 h-4 w-4" />
              <span>Hồ sơ bệnh nhân</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="hover:bg-slate-200 cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Phiếu khám bệnh</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-slate-200 cursor-pointer">
            <BellRing className="mr-2 h-4 w-4" />
            <span>Thông báo</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-slate-300" />
        <DropdownMenuItem className="hover:bg-slate-200 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <Button
            className="bg-white"
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: `/login`,
              })
            }
          >
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
