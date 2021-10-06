import nc from "next-connect";
import onError from "../../../middleware/error";

const handler = nc({
  onError,
});

handler.get((req, res) => {});

export default handler;
