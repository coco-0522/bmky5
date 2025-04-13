const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// 模拟数据库文件路径
const DB_PATH = path.join(__dirname, 'users.json');

// 初始化空的用户数据文件
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

// 登录接口
app.post('/login', (req, res) => {
    const { username } = req.body;
    const users = JSON.parse(fs.readFileSync(DB_PATH));
    
    // 记录登录者
    users.push({ 
        username, 
        timestamp: new Date().toISOString() 
    });
    
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
    res.json({ message: `欢迎 ${username}! 登录已记录` });
});

// 静态文件服务
app.use(express.static('../public'));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});