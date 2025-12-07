import { AntdActivationForm } from "@/components/antd-activation-form"
import { Layout } from "antd"

const { Content } = Layout

export default function ActivatePage() {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          paddingTop: "48px",
          paddingBottom: "48px",
        }}
      >
        <AntdActivationForm />
      </Content>
    </Layout>
  )
}
