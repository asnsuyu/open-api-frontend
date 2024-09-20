/**
 * 显示时间格式化
 * @param time
 */
export const formatTime = (time: string = ""): string => {
  const date = new Date(time)
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    // timeZone: 'UTC' // 如果希望以 UTC 时间显示，可以设置 timeZone
  }
  // @ts-ignore
  return new Intl.DateTimeFormat("zh-CN", options).format(date)
}

/**
 * 将键值对参数格式化为json文本
 * @param params
 */
export const formatParamsToJson = (params: Record<string, any>): string => {
  if (!params || Object.keys(params).length === 0) {
    // 如果没有参数，则返回空的对象格式
    return `{\n  \n}`;
  }

  // 遍历参数并生成字符串
  const formattedParams = Object.keys(params)
    .map((key) => `  "${key}": ""`) // 为每个键值对格式化为空字符串
    .join(',\n'); // 用换行符和逗号连接

  // 返回格式化后的字符串
  return `{\n${formattedParams}\n}`;
}
