import React from 'react';
import ReactMarkdown from 'react-markdown';

// 为了简洁，将服务条款内容定义为常量
const termsContent = `
## 智能价值投资平台服务条款

### 1. 欢迎与接受条款

在使用我们的服务之前，请仔细阅读本服务条款（以下简称“本条款”）。使用我们的服务，即表示您同意遵守本条款。如果您不同意本条款，请勿使用我们的服务。

### 2. 免责声明（核心）

本平台提供的所有信息、数据、分析和建议仅供参考和教育目的，不构成任何形式的投资建议、财务、法律或税务建议。投资涉及风险，您应对自己的投资决策负全部责任。

### 3. 用户责任与账户安全

您承诺提供的注册信息真实、准确、完整、有效。您负责维护账户和密码的机密性，并对在您的账户下发生的所有活动承担全部责任。

### 4. 知识产权

本平台及其所有内容（包括但不限于算法、软件、数据、文本、图形）的知识产权均归 [您的公司名称] 或其许可方所有。未经书面许可，您不得复制、出售或利用服务的任何部分。

### 5. 服务的终止与中断

如果合理地认为您违反了本条款，我们有权随时暂停或终止您对本服务的访问。

### 6. 责任限制

在适用法律允许的最大范围内，对于因使用或无法使用本平台而产生的任何间接或后果性的损害，我们概不承担责任。

**生效日期：** [2025年12月7日]
`;

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">服务条款</h1>
      
      {/* 替换原有的 <pre> 标签，使用 ReactMarkdown 解析内容 */}
      <div className="text-gray-700 font-sans leading-relaxed">
        <ReactMarkdown>{termsContent.trim()}</ReactMarkdown>
      </div>

      <div className="mt-8 pt-4 border-t text-sm text-gray-500">
        <p>如需了解更多信息，请联系：[graham_investing@163.com]</p>
      </div>
    </div>
  );
}