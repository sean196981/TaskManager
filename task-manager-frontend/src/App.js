import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("获取任务失败:", err));
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        title,
      });
      setTasks([...tasks, res.data]);
      setTitle("");
    } catch (err) {
      console.error("添加任务失败:", err);
    }
  };

  // 在 handleAddTask 之后添加
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("删除任务失败:", err);
    }
  };

  return (
    <div>
      <h1>任务管理</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入任务标题"
          required
        />
        <button type="submit">添加任务</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.completed ? "已完成" : "未完成"}
            <button onClick={() => handleDeleteTask(task._id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
