import { Avatar } from "@mui/material";
import Photo from "@mui/icons-material/Photo";

type TableRowWithImageAndNameProps = {
  image?: string;
  name: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export function TableRowWithImageAndName({
  image,
  name,
  onClick,
}: TableRowWithImageAndNameProps) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Avatar
        alt={`Imagem de ${name}`}
        src={image}
        style={{ marginRight: 6, width: 30, height: 30 }}
      >
        <Photo />
      </Avatar>
      <p>{name}</p>
    </div>
  );
}
