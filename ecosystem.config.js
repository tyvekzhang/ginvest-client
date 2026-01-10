module.exports = {
  apps: [{
    name: 'ginvest',            // 服务名称
    script: 'pnpm',             // 使用 pnpm 作为脚本解释器
    args: 'start',              // 传递给 pnpm 的参数
    interpreter: 'none',        // 不使用默认的 node 解释器
    instances: 1,               // 单实例运行
    autorestart: true,          // 崩溃时自动重启
    watch: false,               // 不监听文件变化
    max_memory_restart: '500M', // 内存超过500M时重启
    env: {
      NODE_ENV: 'production'    // 生产环境
    }
  }]
};