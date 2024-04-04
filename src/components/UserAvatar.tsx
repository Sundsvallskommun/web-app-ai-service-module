import { Avatar, AvatarProps } from "@sk-web-gui/react";
import { getStyles } from "../services/config-service";

export const UserAvatar = () => {
  const { brandUserColor } = getStyles();
  return (
    <Avatar
      size="sm"
      color={brandUserColor as AvatarProps["color"]}
      aria-label="Du"
      initials="Du"
    />
  );
};
