/**
 * 显示时间格式化
 * @param time
 */
export const timeFormat = (time: string = "") => {
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
