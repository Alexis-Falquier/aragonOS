// TODO: pls abstract promisification over web3

module.exports = {
  getBalance(addr) {
    return new Promise((resolve, reject) => {
      web3.eth.getBalance(addr, async (err, res) => {
        if (err || !res) return reject(err)
        resolve(res)
      })
    })
  },

  sendTransaction(payload) {
    return new Promise((resolve, reject) => {
      web3.eth.sendTransaction(payload, async (err, res) => {
        if (err || !res) return reject(err)
        resolve(res)
      })
    })
  },

  sign(payload, address) {
    return new Promise((resolve, reject) => {
      web3.eth.sign(address, payload, async (err, signedPayload) => {
        if (err || !signedPayload) return reject(err)
        const adding0x = x => '0x'.concat(x)
        resolve({
          r: adding0x(signedPayload.substr(2, 64)),
          s: adding0x(signedPayload.substr(66, 64)),
          v: signedPayload.substr(130, 2) == '00' ? 27 : 28,
        })
      })
    })
  }
}
