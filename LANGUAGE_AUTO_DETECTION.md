# Language Auto-Detection Feature

## 功能说明

网站现在会根据用户的浏览器/系统语言自动选择界面语言，**默认使用英文**。

## 语言检测逻辑

### 自动检测规则

1. **中文用户** → 自动切换到中文
   - 检测浏览器语言：`zh`, `zh-CN`, `zh-TW`, `zh-HK` 等
   - 界面语言：中文

2. **其他所有语言** → 默认英文
   - 英语（`en`, `en-US`, `en-GB` 等）
   - 日语（`ja`）
   - 韩语（`ko`）
   - 法语（`fr`）
   - 德语（`de`）
   - 其他任何语言
   - 界面语言：英文

### 优先级

1. **用户手动选择** - 最高优先级
   - 用户点击语言切换按钮后，会保存到 localStorage
   - 下次访问时使用保存的语言偏好

2. **系统语言检测** - 首次访问
   - 如果没有保存的语言偏好，则根据浏览器语言自动选择
   - 自动保存检测到的语言到 localStorage

## 技术实现

### 核心代码

```typescript
// 检测系统语言
function detectSystemLanguage(): Language {
  if (typeof window === 'undefined') return 'en'

  const browserLang = navigator.language || navigator.languages?.[0] || 'en'

  // 如果是中文语言代码，返回中文
  if (browserLang.toLowerCase().startsWith('zh')) {
    return 'zh'
  }

  // 其他所有语言默认英文
  return 'en'
}
```

### 初始化流程

```typescript
useEffect(() => {
  // 1. 尝试从 localStorage 读取保存的语言
  const saved = localStorage.getItem('language') as Language

  if (saved && (saved === 'zh' || saved === 'en')) {
    // 使用保存的语言偏好
    setLanguageState(saved)
  } else {
    // 2. 没有保存的语言，则自动检测系统语言
    const detected = detectSystemLanguage()
    setLanguageState(detected)
    localStorage.setItem('language', detected) // 保存检测到的语言
  }

  setIsInitialized(true)
}, [])
```

## 测试方法

### 1. 中文用户测试

**Chrome/Edge:**
1. 打开浏览器设置
2. 搜索"语言"
3. 添加中文（简体或繁体）
4. 将中文移到顶部
5. 刷新页面（清除 localStorage 后）

**Firefox:**
1. 设置 → 语言
2. 选择中文
3. 设为首选
4. 刷新页面

**Safari:**
1. 偏好设置 → 通用 → 语言
2. 选择中文
3. 重启浏览器

### 2. 清除语言偏好

在浏览器控制台运行：

```javascript
localStorage.removeItem('language')
location.reload()
```

### 3. 验证当前语言

在浏览器控制台运行：

```javascript
console.log('当前语言:', localStorage.getItem('language'))
console.log('浏览器语言:', navigator.language)
console.log('所有语言:', navigator.languages)
```

## 用户体验

### 首次访问

- ✅ 自动检测系统语言
- ✅ 无需手动选择
- ✅ 自动保存语言偏好
- ✅ 默认英文（对非中文用户友好）

### 后续访问

- ✅ 自动使用之前选择的语言
- ✅ 可随时手动切换
- ✅ 切换后立即生效

### 手动切换

- 点击右上角的语言切换按钮
- 在 中文 / English 之间切换
- 切换后立即保存到 localStorage

## 支持的语言代码

### 中文（→ 中文界面）
- `zh` - 中文（通用）
- `zh-CN` - 简体中文
- `zh-TW` - 繁体中文（台湾）
- `zh-HK` - 繁体中文（香港）
- `zh-SG` - 繁体中文（新加坡）

### 其他语言（→ 英文界面）
- `en`, `en-US`, `en-GB`, `en-CA` 等 - 英语
- `ja` - 日语
- `ko` - 韩语
- `fr`, `fr-FR`, `fr-CA` 等 - 法语
- `de`, `de-DE`, `de-AT` 等 - 德语
- `es`, `es-ES`, `es-MX` 等 - 西班牙语
- 以及其他所有语言

## 文件位置

实现文件：`src/contexts/LanguageContext.tsx`

关键函数：`detectSystemLanguage()`

默认语言：`'en'`（英文）

## 注意事项

1. **服务端渲染兼容**
   - 使用 `typeof window === 'undefined'` 检查
   - 在服务端默认返回英文
   - 避免服务端渲染错误

2. **语言代码格式**
   - 浏览器语言代码格式：`language-REGION`
   - 例如：`zh-CN`, `en-US`, `ja-JP`
   - 只检测 `language` 部分

3. **localStorage 持久化**
   - 语言偏好永久保存
   - 除非用户清除浏览器数据
   - 或手动清除 localStorage

## 更新日志

**2026-01-06**
- ✅ 添加系统语言自动检测功能
- ✅ 默认语言改为英文
- ✅ 中文用户自动显示中文界面
- ✅ 其他语言用户显示英文界面
