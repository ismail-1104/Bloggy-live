import "./settings.css";
import Sidebar from "../../components/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const Settings = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState("");

  const { user, dispatch } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
    };
    
    // Only include fields that have been modified
    if (username && username.trim()) {
      updatedUser.username = username;
    }
    if (email && email.trim()) {
      updatedUser.email = email;
    }
    if (password && password.trim()) {
      updatedUser.password = password;
    }
    
    if (file) {
      const data = new FormData();
      data.append("file", file);
      try {
        const uploadRes = await axios.post("/api/upload", data);
        updatedUser.profilePic = uploadRes.data.imageUrl; // Store Base64 string
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }
    try {
      const res = await axios.put("/api/user/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Pitcure</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) : (user.profilePic || "https://via.placeholder.com/150")} alt="" />
            <label htmlFor="fileInput">
              <i class="settingsPPIcon fa-solid fa-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
