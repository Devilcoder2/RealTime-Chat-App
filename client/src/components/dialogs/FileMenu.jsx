import { Menu } from "@mui/material";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} open={false}>
      <div
        style={{
          width: "10rem",
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis debitis
        ex, iure eum tenetur unde rem quasi adipisci nemo nobis nisi eligendi
        obcaecati eius, voluptas mollitia! Sint dignissimos cumque repellendus?
      </div>
    </Menu>
  );
};

export default FileMenu;
