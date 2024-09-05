import React from "react";

// Định nghĩa kiểu cho prop `brand` trong `SingleImageProps`
export type SingleImageProps = {
  brand: {
    link: string;
    imageSrc: string;
    lightImageSrc: string;
    altText: string;
  };
};

// Dữ liệu cho các thương hiệu
const brandsData = [
  {
    imageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/graygrids.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/graygrids-white.svg",
    altText: "graygrids",
    link: "#",
  },
  {
    imageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/lineicons.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/lineIcons-white.svg",
    altText: "lineicons",
    link: "#",
  },
  {
    imageSrc: "https://cdn.tailgrids.com/2.2/assets/images/brands/uideck.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/uideck-white.svg",
    altText: "uideck",
    link: "#",
  },
  {
    imageSrc: "https://cdn.tailgrids.com/2.2/assets/images/brands/ayroui.svg",
    lightImageSrc:
      "https://cdn.tailgrids.com/2.2/assets/images/brands/ayroui-white.svg",
    altText: "ayroui",
    link: "#",
  },
];

// Component chính để hiển thị danh sách thương hiệu
export default function Brands() {
  return (
    <section className="bg-slate-100 py-10 lg:py-[60px] dark:bg-dark">
      <h2 className="text-center pb-6">Trusted By</h2>
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center">
              {brandsData.map((brand, i) => (
                // Truyền object `brand` vào component `SingleImage`
                <SingleImage key={i} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Component để hiển thị từng thương hiệu đơn lẻ
const SingleImage = ({ brand }: SingleImageProps) => {
  // Giải nén các thuộc tính từ object `brand`
  const { link, imageSrc, lightImageSrc, altText } = brand;
  return (
    <a
      href={link}
      className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]"
    >
      {/* Hiển thị hình ảnh cho chế độ sáng */}
      <img src={imageSrc} alt={altText} className="h-10 w-full dark:hidden" />
      {/* Hiển thị hình ảnh cho chế độ tối */}
      <img
        src={lightImageSrc}
        alt={altText}
        className="hidden h-10 w-full dark:block"
      />
    </a>
  );
};
