import cluster from "cluster"
import os from "os"
import { fileURLToPath } from "url"
const cpu_count = os.availableParallelism()
import path, { dirname } from "path"

console.log("Total cpu count", cpu_count)
console.log("Primary pid", process.pid)

const __dirname = dirname(fileURLToPath(import.meta.url))

cluster.setupPrimary({
    exec: path.join(__dirname, "server.js")
})

for (let i = 0; i < cpu_count; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Starting another")
    cluster.fork();
});