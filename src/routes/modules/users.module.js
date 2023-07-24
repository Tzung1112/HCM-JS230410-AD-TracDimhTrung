import express from "express";
const router = express.Router();
import fs from "fs";
import path from "path";
router.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, "users.json"), (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Lay meo that bai1"
            })
        }
        return res.status(200).json({
            message: "lay list thanh cong",
            data: JSON.parse(data)
        })
    })
})
router.get("/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    fs.readFile(path.join(__dirname, "users.json"), (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Lấy dữ liệu thất bại"
            });
        }

        const users = JSON.parse(data);
        const user = users.find((user) => user.id === userId);

        if (user) {
            return res.status(200).json({
                message: "Lấy dữ liệu thành công",
                data: user
            });
        } else {
            return res.status(404).json({
                message: "Không tìm thấy người dùng"
            });
        }
    });
});
router.get('/:id/posts', (req, res) => {
    if (req.params.id) {
        fs.readFile(path.join(__dirname, "users.json"), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lấy users thất bại!"
                });
            }

            const users = JSON.parse(data);
            const user = users.find(user => user.id == req.params.id);

            if (!user) {
                return res.status(500).json({
                    message: `Không tìm được user có ID ` + req.params.id
                });
            }

            fs.readFile(path.join(__dirname, "posts.json"), 'utf-8', (err, postData) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lấy posts thất bại!"
                    });
                }

                const posts = JSON.parse(postData);
                const userPosts = posts.filter(post => post.userId == req.params.id);

                return res.status(200).json({
                    message: "Lấy posts thành công!",
                    data: userPosts
                });
            });
        });
    } else {
        return res.status(500).json({
            message: "Vui lòng truyền idUser!"
        });
    }
});
router.delete('/:id', (req, res) => {
    if (req.params.id) {
        fs.readFile(path.join(__dirname, "users.json"), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lấy users thất bại!"
                })
            }
            let users = JSON.parse(data);
            users = users.filter(meo => meo.id != req.params.id);

            fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(users), (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lưu file thất bại!"
                    })
                }
                return res.status(200).json(
                    {
                        message: "Xóa thành công!"
                    }
                )


            })
        })
    } else {
        return res.status(500).json(
            {
                message: "Vui lòng truyền id!"
            }
        )
    }
})
router.post('/', (req, res) => {
    console.log(req.body)

    fs.readFile(path.join(__dirname, "users.json"), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json(
                {
                    message: "Đọc dữ liệu thất bại!"
                }
            )
        }

        let oldData = JSON.parse(data);
        let newData = {
            id: Date.now(),
            ...req.body
        }
        oldData.push(newData)

        fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(oldData), (err) => {
            if (err) {
                return res.status(500).json(
                    {
                        message: "Ghi file thất bại!"
                    }
                )
            }

            res.status(200).json({
                message: "Add user success!",
                data: newData
            })
        })
    })

})
router.put('/:id', (req, res) => {
    if (req.params.id) {
        fs.readFile(path.join(__dirname, "users.json"), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lấy users thất bại!"
                })
            }
            let users = JSON.parse(data);
            let userIndex = users.findIndex(user => user.id == req.params.id);

            if (userIndex !== -1) {
                let updatedUser = { ...users[userIndex], ...req.body };
                users[userIndex] = updatedUser;

                fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(users), (err) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Lưu file thất bại!"
                        })
                    }
                    return res.status(200).json({
                        message: "Cập nhật người dùng thành công!",
                        data: updatedUser
                    });
                });
            } else {
                return res.status(404).json({
                    message: "Không tìm thấy người dùng"
                });
            }
        });
    } else {
        return res.status(500).json({
            message: "Vui lòng truyền id!"
        });
    }
});


router.patch('/:id', (req, res) => {
    // console.log(req.body)
    if (req.params.id) {
        let flag = false;
        fs.readFile(path.join(__dirname, "users.json"), 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({
                    message: "Lấy users thất bại!"
                })
            }
            let users = JSON.parse(data);

            users = users.map(todo => {
                if (todo.id == req.params.id) {
                    flag = true;
                    return {
                        ...todo,
                        ...req.body
                    }
                }
                return todo
            })

            fs.writeFile(path.join(__dirname, "users.json"), JSON.stringify(users), (err) => {
                if (err) {
                    return res.status(500).json({
                        message: "Lưu file thất bại!"
                    })
                }
                return res.status(200).json(
                    {
                        message: "Patch users thanh cong"
                    }
                )
            })
        })
    }

})
module.exports = router;