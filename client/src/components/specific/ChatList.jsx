import { Stack } from "@mui/material";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"}>
      {chats?.map((data) => {
        return <div>{data}</div>;
      })}
    </Stack>
  );
};

export default ChatList;
