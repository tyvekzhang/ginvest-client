import React from 'react';
import ReactMarkdown from 'react-markdown';

const privacyContent = `
## 智能价值投资平台隐私政策

### 1. 信息的收集

我们收集以下类型的个人信息：

* **您直接提供的信息：** 姓名、电子邮件地址、密码（加密存储）、支付凭证（由第三方安全处理）。
* **自动收集的信息（使用数据）：** IP 地址、浏览器类型、您在平台上访问的页面、使用的功能。

### 2. 信息的用途

我们收集您的个人信息主要用于：

* 提供和维护服务：确保平台功能正常运行、为您提供个性化内容。
* 改进服务：分析使用数据以优化算法和功能。
* 安全与欺诈预防：验证身份、防止滥用行为。
* 客户支持：回应您的查询。

### 3. 信息的共享与披露

我们仅在以下情况下共享您的信息：

* **服务提供商：** 与协助我们提供服务的第三方（如云托管、支付处理商）共享必要的信息。
* **法律要求：** 为了遵守法律、法规或政府要求。

**我们承诺，不会向任何第三方出售您的个人信息。**

### 4. 信息的存储与安全

我们采取行业标准的物理、技术和管理安全措施来保护您的信息，防止未经授权的访问，包括使用 SSL/TLS 加密技术。

### 5. 您的权利

您有权访问、更正或删除我们持有的关于您的个人信息。您可以通过 [您的客服邮箱] 来行使您的权利。

### 6. 政策更新

我们可能会不时更新本隐私政策。任何更改都将通过在平台上发布新政策或通过电子邮件通知您。

**生效日期：** [2025年12月7日]
`;

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">隐私政策</h1>

      {/* 使用 ReactMarkdown 组件来解析和渲染 Markdown 内容 */}
      <div className="text-gray-700 font-sans leading-relaxed">
        <ReactMarkdown>{privacyContent}</ReactMarkdown>
      </div>
      
      <div className="mt-8 pt-4 border-t text-sm text-gray-500">
        <p>如果您对本政策有任何疑问，请发送邮件至：[graham_investing@163.com]</p>
      </div>
    </div>
  );
}