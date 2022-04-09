import { Avatar } from "@mui/material";
import Photo from "@mui/icons-material/Photo";

type TableRowWithImageAndNameProps = {
  imagem?: string;
  nome: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  imagemPadrao?: "Usuário" | "Foto";
};

export function ImagemENomeTabela({
  imagem,
  nome,
  onClick,
  imagemPadrao,
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
        alt={`Imagem de ${nome}`}
        src={imagem}
        style={{ marginRight: 6, width: 30, height: 30 }}
      >
        {imagemPadrao === "Foto" ? <Photo /> : null}
      </Avatar>
      <p>{nome}</p>
    </div>
  );
}
