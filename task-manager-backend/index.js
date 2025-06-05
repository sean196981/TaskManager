const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 连接 MongoDB（替换为你的 MongoDB URI）
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/task-manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB 连接成功"))
  .catch((err) => console.error("MongoDB 连接失败:", err));

// 在 mongoose.connect 之后添加
const initData = async () => {
  const count = await Task.countDocuments();
  if (count === 0) {
    await Task.insertMany([
      { title: "学习 Git", completed: false },
      { title: "完成任务管理项目", completed: false },
    ]);
    console.log("初始任务已添加");
  }
};
initData();

// 定义任务模型
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});
const Task = mongoose.model("Task", taskSchema);

// API 路由：获取所有任务
app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// 在 app.get('/api/tasks') 之后添加
app.post("/api/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: "添加任务失败", details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`服务器运行在端口 ${PORT}`));
