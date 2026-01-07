"use client"

// SPDX-License-Identifier: MIT

import { Form, Button, Select, DatePicker, Input } from "antd"
import type { FormInstance } from "antd/es/form"
import { RotateCcw, Search } from "lucide-react"
import type React from "react"
import dayjs from "dayjs"

interface QueryReportIncomeStatementProps {
  onQueryReportIncomeStatementFinish: (values: any) => void
  onQueryReportIncomeStatementReset: () => void
  onQueryReportIncomeStatementForm: FormInstance
}

const queryReportIncomeStatementFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
}

const QueryReportIncomeStatementComponent: React.FC<QueryReportIncomeStatementProps> = ({
  onQueryReportIncomeStatementFinish,
  onQueryReportIncomeStatementReset,
  onQueryReportIncomeStatementForm,
}) => {
  const handleQueryReportIncomeStatementReset = () => {
    onQueryReportIncomeStatementReset()
  }

  const handleQueryReportIncomeStatementSubmit = async () => {
    try {
      const values = await onQueryReportIncomeStatementForm.validateFields()

      const processedValues = {
        stock_code: values.stock_code?.trim() || "",
        year: values.year ? values.year.year() : null, // 直接调用 .year() 返回数字，如 2024
        quarter: values.quarter || null,
      }

      onQueryReportIncomeStatementFinish(processedValues)
    } catch (error) {
      console.error("表单验证失败:", error)
    }
  }

  return (
    <Form
      {...queryReportIncomeStatementFormItemLayout}
      form={onQueryReportIncomeStatementForm}
      name="queryReportIncomeStatement"
    >
      <div className="flex flex-wrap items-center gap-4 pt-6 justify-between">
        <Form.Item name="stock_code" label="股票信息">
          <Input placeholder="请输入股票代码或名称" allowClear style={{ width: 200 }} />
        </Form.Item>

        <Form.Item
          name="year"
          label="年份"
          rules={[
            { required: false, message: "请选择年份" },
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve()
                }

                const year = dayjs.isDayjs(value) ? value.year() : dayjs(value).year()
                const currentYear = new Date().getFullYear()

                if (year < 1990 || year > currentYear + 1) {
                  return Promise.reject(new Error(`年份范围：1990-${currentYear + 1}`))
                }

                return Promise.resolve()
              },
            },
          ]}
        >
          <DatePicker
            picker="year"
            format="YYYY"
            placeholder="请选择年份"
            allowClear
            style={{ width: 150 }}
            disabledDate={(current) => {
              if (!current) return false

              const currentYear = new Date().getFullYear()
              const year = current.year()

              return year < 1990 || year > currentYear
            }}
          />
        </Form.Item>

        <Form.Item
          name="quarter"
          label="季度"
          rules={[
            { required: false, message: "请选择季度" },
            {
              validator: (_, value) => {
                if (value && ![1, 2, 3, 4].includes(value)) {
                  return Promise.reject(new Error("请选择有效的季度"))
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          <Select
            placeholder="请选择季度"
            allowClear
            style={{ width: 150 }}
            options={[
              { label: "一季报", value: 1 },
              { label: "中报", value: 2 },
              { label: "三季报", value: 3 },
              { label: "年报", value: 4 },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex items-center gap-2 justify-start pr-4">
            <Button
              onClick={handleQueryReportIncomeStatementReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button type="primary" icon={<Search size={14} />} onClick={handleQueryReportIncomeStatementSubmit}>
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  )
}

export default QueryReportIncomeStatementComponent
