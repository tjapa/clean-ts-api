module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "5.0.16",
      skipMD5: true,
      downloadDir: "/tmp",
    },

    instance: {
      dbName: "jest",
    },
    autoStart: false,
  },
};
