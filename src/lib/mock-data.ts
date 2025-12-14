

export interface CompanyData {
  rank: number
  code: string
  name: string
  revenue: number
  growth: number
  industry: string
}

const companyNames = [
  "中国石油",
  "中国石化",
  "中国建筑",
  "工商银行",
  "建设银行",
  "中国平安",
  "农业银行",
  "中国银行",
  "中国人寿",
  "交通银行",
  "招商银行",
  "中国中铁",
  "上汽集团",
  "中国铁建",
  "兴业银行",
  "中国神华",
  "浦发银行",
  "民生银行",
  "中信银行",
  "光大银行",
  "华夏银行",
  "贵州茅台",
  "五粮液",
  "万科A",
  "保利地产",
  "中国国旅",
  "格力电器",
  "美的集团",
  "海康威视",
  "京东方A",
  "立讯精密",
  "中兴通讯",
  "海尔智家",
  "TCL科技",
  "比亚迪",
  "长城汽车",
  "长江电力",
  "宁德时代",
  "三一重工",
  "中联重科",
  "海螺水泥",
  "中国联通",
  "中国移动",
  "中国电信",
  "华为概念",
  "字节跳动概念",
  "腾讯控股概念",
  "阿里巴巴概念",
  "百度概念",
  "小米集团概念",
  "恒瑞医药",
  "云南白药",
  "同仁堂",
  "片仔癀",
  "东阿阿胶",
  "伊利股份",
  "蒙牛乳业概念",
  "双汇发展",
  "海天味业",
  "洋河股份",
  "泸州老窖",
  "山西汾酒",
  "中国中免",
  "永辉超市",
  "苏宁易购",
  "国美零售概念",
  "中国宝武概念",
  "鞍钢股份",
  "包钢股份",
  "河钢股份",
  "华能国际",
  "国电电力",
  "大唐发电",
  "华电国际",
  "中信证券",
  "海通证券",
  "国泰君安",
  "广发证券",
  "招商证券",
  "东方财富",
  "中金公司",
  "申万宏源",
  "国信证券",
  "银河证券",
  "平安证券概念",
  "中国太保",
  "新华保险",
  "中国人保",
  "中国太平概念",
  "阳光保险概念",
  "紫金矿业",
  "洛阳钼业",
  "江西铜业",
  "中国铝业",
  "云南铜业",
  "中芯国际概念",
  "长电科技",
  "华虹半导体概念",
]

export const industries = [
  "银行",
  "石油化工",
  "保险",
  "房地产",
  "汽车",
  "电力",
  "钢铁",
  "通信",
  "医药",
  "食品饮料",
  "电子",
  "互联网",
  "证券",
  "零售",
  "建筑",
]

const industriesOriginal = [
  "银行",
  "石油化工",
  "保险",
  "房地产",
  "汽车",
  "电力",
  "钢铁",
  "通信",
  "医药",
  "食品饮料",
  "电子",
  "互联网",
  "证券",
  "零售",
  "建筑",
]

function generateCompanyCode(index: number): string {
  const exchanges = ["600", "601", "000", "002", "300"]
  const exchange = exchanges[index % exchanges.length]
  const num = String(index).padStart(3, "0")
  return `${exchange}${num}`
}

export function generateMockData(period: TimePeriod): CompanyData[] {
  const count = 100
  const data: CompanyData[] = []

  const baseRevenueMultiplier = {
    "1year": 1,
    "3years": 0.85,
    "5years": 0.7,
    "10years": 0.5,
  }

  const growthRange = {
    "1year": { min: -15, max: 45 },
    "3years": { min: -10, max: 35 },
    "5years": { min: -8, max: 30 },
    "10years": { min: -5, max: 25 },
  }

  for (let i = 0; i < count; i++) {
    const baseRevenue = Math.random() * 500000000000 + 10000000000
    const revenue = baseRevenue * baseRevenueMultiplier[period]
    const { min, max } = growthRange[period]
    const growth = Math.random() * (max - min) + min

    data.push({
      rank: i + 1,
      code: generateCompanyCode(i),
      name: companyNames[i % companyNames.length],
      revenue: revenue,
      growth: growth,
      industry: industries[Math.floor(Math.random() * industries.length)],
    })
  }

  return data
    .sort((a, b) => b.revenue - a.revenue)
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }))
}

export function getCompanyByCode(code: string, period: TimePeriod): CompanyData | undefined {
  const data = generateMockData(period)
  return data.find((item) => item.code === code)
}

export function generateDetailData(code: string, period: TimePeriod) {
  const periodCounts = {
    "1year": 4,
    "3years": 3,
    "5years": 5,
    "10years": 10,
  }

  const periodLabels = {
    "1year": ["Q1", "Q2", "Q3", "Q4"],
    "3years": ["2022", "2023", "2024"],
    "5years": ["2020", "2021", "2022", "2023", "2024"],
    "10years": ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  }

  const count = periodCounts[period]
  const labels = periodLabels[period]
  const data = []

  const seed = code.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const baseRevenue = (seed % 500) + 50

  for (let i = 0; i < count; i++) {
    const trendFactor = 1 + i * 0.15
    const randomFactor = 1 + ((seed * (i + 1)) % 30) / 100 - 0.15
    const revenue = Math.round(baseRevenue * trendFactor * randomFactor)

    const prevRevenue = i > 0 ? data[i - 1].revenue : revenue * 0.9
    const growth = Number.parseFloat((((revenue - prevRevenue) / prevRevenue) * 100).toFixed(2))

    data.push({
      period: labels[i],
      revenue,
      growth: i === 0 ? Number.parseFloat((Math.random() * 30 - 10).toFixed(2)) : growth,
    })
  }

  return data
}
