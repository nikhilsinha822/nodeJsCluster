import express from "express"

const app = express()
const port = 3000

app.get("/heavy", (req, res) => {
    let total = 0;
    for (let i = 0; i < 50_000_000; i++) {
        total++;
    }

    res.send(`The result of the CPU intresive task is ${total}`)
})

app.listen(port, () => {
    console.log("process id", process.pid)
    console.log("server is running at", port)
})