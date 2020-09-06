const os = require('os')
const express = require('express')
const app = express()
const port = (process.env.PORT && Number(process.env.PORT)) || 3000

async function getCurrentMachineIp() {
  const ifaces = os.networkInterfaces();
  const ips = [];
  Object.keys(ifaces).forEach(function(ifname) {
    let alias = 0;
    ifaces[ifname].forEach(function(iface) {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        return;
      }
      if (alias >= 1) {
        ips.push({
          ifname: ifname + ':' + alias,
          address: iface.address,
        });
      } else {
        ips.push({
          ifname,
          address: iface.address,
        });
      }
      ++alias;
    });
  });
  return ips;
}

app.get('/', async (req, res) => {
  const ips = await getCurrentMachineIp()
  res.send({
    ips
  })
})

app.get('/_status/healthz', (req, res) => {
  res.send('OK')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})