import Image from "next/image";

import React from "react";

const ProfileImage = ({
  src,
  className,
}: {
  src: string;
  className: string;
}) => {
  return (
    <div>
      <Image
        className={`relative h-10 w-10 overflow-hidden rounded-full object-contain ${className}`}
        src={src}
        alt={"profile-image"}
        width={300}
        height={300}
        priority
      />
    </div>
  );
};

export default ProfileImage;
