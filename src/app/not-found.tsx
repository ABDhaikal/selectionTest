import { redirect } from "next/navigation";

const notfound = () => {
  return redirect("/");
};

export default notfound;
