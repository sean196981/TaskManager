import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // 获取任务列表
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("获取任务失败:", err));
  }, []);

  return (
    <div>
      <h1>任务管理</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.completed ? "已完成" : "未完成"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
