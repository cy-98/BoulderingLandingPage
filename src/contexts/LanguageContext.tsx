'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Language = 'zh' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  zh: {
    // Navigation
    'nav.home': '主页',
    'nav.pricing': '价格',
    'nav.photos': '照片',
    'nav.calendar': '日历',
    
    // Hero Section
    'hero.title': '嘿抱攀岩',
    'hero.subtitle': '挑战自我，攀登巅峰',
    'hero.description': '专业的抱石攀岩场馆，提供顶级设施和社区体验',
    
    // Venues Section
    'venues.title': '我们的场馆',
    'venues.filter.all': '全部场馆',
    'venue.address': '地址',
    'venue.hours': '营业时间',
    'venue.phone': '联系电话',
    'venue.facilities': '设施',
    'venue.facility.restroom': '卫生间',
    'venue.facility.shower': '淋浴',
    'venue.facility.training': 'T板训练区',
    'venue.viewDetails': '查看详情',
    
    // Venue Details (Sample data)
    'venue1.name': '嘿抱',
    'venue1.address': '北京市朝阳区建国门外大街1号',
    'venue1.hours': '周一至周日 10:00-22:00',
    'venue1.phone': '010-8888-8888',
    
    'venue2.name': '嘿抱2',
    'venue2.address': '北京市朝阳区三里屯路11号',
    'venue2.hours': '周一至周日 10:00-23:00',
    'venue2.phone': '010-6666-6666',
    
    'venue3.name': '粉抱',
    'venue3.address': '北京市朝阳区望京街道10号',
    'venue3.hours': '周一至周日 09:00-22:00',
    'venue3.phone': '010-5555-5555',
    
    // Pricing Section
    'pricing.title': '价格方案',
    'pricing.description': '灵活的价格选项，满足您的攀岩需求',
    'pricing.single': '单次票',
    'pricing.single.price': '¥98',
    'pricing.single.duration': '当日有效',
    'pricing.single.feature1': '全场馆设施使用',
    'pricing.single.feature2': '免费攀岩鞋租赁',
    'pricing.single.feature3': '免费储物柜',
    
    'pricing.monthly': '月卡',
    'pricing.monthly.price': '¥688',
    'pricing.monthly.duration': '30天有效',
    'pricing.monthly.feature1': '无限次入场',
    'pricing.monthly.feature2': '免费攀岩鞋租赁',
    'pricing.monthly.feature3': '免费储物柜',
    'pricing.monthly.feature4': '会员活动优先参与',
    
    'pricing.annual': '年卡',
    'pricing.annual.price': '¥5,888',
    'pricing.annual.duration': '365天有效',
    'pricing.annual.feature1': '无限次入场',
    'pricing.annual.feature2': '免费攀岩鞋租赁',
    'pricing.annual.feature3': '专属储物柜',
    'pricing.annual.feature4': '会员活动优先参与',
    'pricing.annual.feature5': '免费私教体验课',
    'pricing.annual.feature6': '生日月免费带一位朋友',
    
    'pricing.choose': '选择方案',
    
    // Photos Section
    'photos.title': '精彩瞬间',
    'photos.all': '全部',
    'photos.description': '记录每一次突破与成长',
    'photos.loadMore': '加载更多',
    
    // Calendar Section
    'calendar.title': '活动日历',
    'calendar.description': '了解最新的换线时间和活动安排',
    'calendar.routeSetting': '换线日',
    'calendar.event': '活动',
    'calendar.filter.all': '全部',
    'calendar.filter.routeSetting': '换线',
    'calendar.filter.events': '活动',
    
    // Footer
    'footer.followUs': '关注我们',
    'footer.wechat': '微信公众号',
    'footer.instagram': 'Instagram',
    'footer.contact': '联系我们',
    'footer.copyright': '© 2025 嗨抱攀岩. 保留所有权利.',
    'footer.wechat.scan': '扫描二维码关注我们',
    'footer.wechat.close': '关闭',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.pricing': 'Pricing',
    'nav.photos': 'Photos',
    'nav.calendar': 'Calendar',
    
    // Hero Section
    'hero.title': 'Hi Boulder',
    'hero.subtitle': 'Challenge Yourself, Reach the Peak',
    'hero.description': 'Professional bouldering gyms with top facilities and community experience',
    
    // Venues Section
    'venues.title': 'Our Venues',
    'venues.filter.all': 'All Venues',
    'venue.address': 'Address',
    'venue.hours': 'Hours',
    'venue.phone': 'Phone',
    'venue.facilities': 'Facilities',
    'venue.facility.restroom': 'Restroom',
    'venue.facility.shower': 'Shower',
    'venue.facility.training': 'Training Board',
    'venue.viewDetails': 'View Details',
    
    // Venue Details (Sample data)
    'venue1.name': 'Hey Bao',
    'venue1.address': 'No.1 Jianguomenwai Ave, Chaoyang District, Beijing',
    'venue1.hours': 'Mon-Sun 10:00-22:00',
    'venue1.phone': '010-8888-8888',
    
    'venue2.name': 'Hey Bao 2',
    'venue2.address': 'No.11 Sanlitun Rd, Chaoyang District, Beijing',
    'venue2.hours': 'Mon-Sun 10:00-23:00',
    'venue2.phone': '010-6666-6666',
    
    'venue3.name': 'Pink Bao',
    'venue3.address': 'No.10 Wangjing St, Chaoyang District, Beijing',
    'venue3.hours': 'Mon-Sun 09:00-22:00',
    'venue3.phone': '010-5555-5555',
    
    // Pricing Section
    'pricing.title': 'Pricing Plans',
    'pricing.description': 'Flexible pricing options to meet your climbing needs',
    'pricing.single': 'Day Pass',
    'pricing.single.price': '¥98',
    'pricing.single.duration': 'Valid for 1 day',
    'pricing.single.feature1': 'Full gym access',
    'pricing.single.feature2': 'Free shoe rental',
    'pricing.single.feature3': 'Free locker',
    
    'pricing.monthly': 'Monthly Pass',
    'pricing.monthly.price': '¥688',
    'pricing.monthly.duration': 'Valid for 30 days',
    'pricing.monthly.feature1': 'Unlimited access',
    'pricing.monthly.feature2': 'Free shoe rental',
    'pricing.monthly.feature3': 'Free locker',
    'pricing.monthly.feature4': 'Priority event registration',
    
    'pricing.annual': 'Annual Pass',
    'pricing.annual.price': '¥5,888',
    'pricing.annual.duration': 'Valid for 365 days',
    'pricing.annual.feature1': 'Unlimited access',
    'pricing.annual.feature2': 'Free shoe rental',
    'pricing.annual.feature3': 'Private locker',
    'pricing.annual.feature4': 'Priority event registration',
    'pricing.annual.feature5': 'Free coaching session',
    'pricing.annual.feature6': 'Birthday month guest pass',
    
    'pricing.choose': 'Choose Plan',
    
    // Photos Section
    'photos.title': 'Gallery',
    'photos.all': 'All',
    'photos.description': 'Capturing every breakthrough and growth',
    'photos.loadMore': 'Load More',
    
    // Calendar Section
    'calendar.title': 'Event Calendar',
    'calendar.description': 'Stay updated with route setting schedules and events',
    'calendar.routeSetting': 'Route Setting',
    'calendar.event': 'Event',
    'calendar.filter.all': 'All',
    'calendar.filter.routeSetting': 'Route Setting',
    'calendar.filter.events': 'Events',
    
    // Footer
    'footer.followUs': 'Follow Us',
    'footer.wechat': 'WeChat',
    'footer.instagram': 'Instagram',
    'footer.contact': 'Contact Us',
    'footer.copyright': '© 2025 Hi Boulder. All rights reserved.',
    'footer.wechat.scan': 'Scan QR code to follow us',
    'footer.wechat.close': 'Close',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh')

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['zh']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

