import axios from "axios";
import express from "express";
const router = express.Router();
import fs from "fs";
import path from "path";


router.use("/lists", (req, res) => {
    fs.readFile(path.join(__dirname, "templates/list.html"), "utf8", async (err, data) => {
        if (err) {
            return res.send("Loat ui err")
        }
        let list;
        let tableContent = ``;
        await axios.get("http://localhost:4000/api/v1/list")
            .then(res => {
                list = res.data.data;
            })
            .catch(err => {
                list = [];
            })
        list.map((list, index) => {
            tableContent += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td> ${list.completed
                    ? `     <input class="form-check-input me-2" type="checkbox" value="" checked="false" onChange={changeTodo(event,${list.id})}
                         aria-label="..." />`
                    : `     <input class="form-check-input me-2" type="checkbox" value=""  onChange={changeTodo(event,${list.id})}
                         aria-label="..." />`}

                        
                               ${!list.completed ? `<span>${list.title} </span>` : `<span style="text-decoration: line-through">${list.title} </span>`}</td>
                <td>${list.title}</td>
                <td><button onclick={deleteList(${list.id})} type="button" class="btn btn-danger">Delete</button></td>
            </tr>
            `
        })
        res.send(data.replace("{{tableContent}}", tableContent))
        // const modifiedData = data.replace("{{tableContent}}", tableContent);
        // res.setHeader("Content-Type", "text/html");
        // res.send(modifiedData)
    })

})
router.use("/lists", (req, res) => {
    fs.readFile(path.join(__dirname, "templates/list.html"), "utf-8", async (err, data) => {
        if (err) {
            return res.send("Load ui err")
        }
        res.send(data)
    }
    )

})

module.exports = router;