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

interface DropDownProps {
  username: string;
  className?: string;
}
const DropDown = ({ username, className }: DropDownProps) => {
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
          <DropdownMenuItem>
            <BookPlus className="mr-2 h-4 w-4" />

            <span>Hồ sơ bệnh nhân</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Phiếu khám bệnh</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellRing className="mr-2 h-4 w-4" />
            <span>Thông báo</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-slate-300" />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
