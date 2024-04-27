import mongoose from "mongoose";
let connected = false;
export const ensureDbConnect = async () => {
  if (!connected) {
    await mongoose.connect(
      "mongodb+srv://sanketh:sanketh74@x-db.l2lycif.mongodb.net/"
    );
  } else {
    console.log("already connected");
  }
};
