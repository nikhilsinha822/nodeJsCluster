import express from "express"
import cluster from "cluster"
import os from "os"
import { fileURLToPath } from "url"
const cpu_count = os.availableParallelism()
import path, { dirname } from "path"

if (cluster.isPrimary) {

    for (let i = 0; i < cpu_count; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Starting another")
        cluster.fork();
    });

} else {


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
}