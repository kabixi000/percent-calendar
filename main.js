const yearBar = document.getElementById('yearBar')
const monthBar = document.getElementById('monthBar')
const weekBar = document.getElementById('weekBar')
const dayBar = document.getElementById('dayBar')
const hourBar = document.getElementById('hourBar')
const minBar = document.getElementById('minBar')
const secBar = document.getElementById('secBar')

const weekStartDay = 0

const bars = {
  yearBar,monthBar,weekBar,dayBar,hourBar,minBar,secBar,
}
const barsKeys = Object.keys(bars)

const timeRatio = (now)=>{
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDate = now.getDate()
  const nowDay = now.getDay()
  const nowWeekStartOffset = now.getDay() === 0 ? 6 : now.getDay()-1
  const nowWeekEndOffset = now.getDay() === 0 ? 0 : 7-now.getDay()
  const nowWeekStartOffset2 = nowDay - weekStartDay
  const nowWeekEndOffset2 = 7-(nowDay-weekStartDay)-1
  const nowHour = now.getHours()
  const nowMin = now.getMinutes()
  const nowSec = now.getSeconds()
  let nowYearStart = new Date(nowYear,0,1,0,0,0,0)
  let nextYear = new Date(nowYear+1,0,1,0,0,0,0)
  let nowMonthStart = new Date(nowYear,nowMonth,1,0,0,0,0)
  let nextMonth = new Date(nowYear,nowMonth+1,1,0,0,0,0)
  let nowWeekStart = new Date(nowYear,nowMonth,nowDate-nowWeekStartOffset,0,0,0,0)
  let nextWeekEnd = new Date(nowYear,nowMonth,nowDate+nowWeekEndOffset,23,59,59,999)
  let nowWeekStart_N = new Date(nowYear,nowMonth,nowDate-nowDay+weekStartDay,0,0,0,0)
  let nowWeekEnd_N = new Date(nowWeekStart_N.getTime()+6*24*60*60*1000)
  let nowDateStart = new Date(nowYear,nowMonth,nowDate,0,0,0,0)
  let nowDateEnd = new Date(nowYear,nowMonth,nowDate,23,59,59,999)
  let nowHourStart = new Date(nowYear,nowMonth,nowDate,nowHour,0,0,0)
  let nowHourEnd = new Date(nowYear,nowMonth,nowDate,nowHour,59,59,999)
  let nowMinStart = new Date(nowYear,nowMonth,nowDate,nowHour,nowMin,0,0)
  let nowMinEnd = new Date(nowYear,nowMonth,nowDate,nowHour,nowMin,59,999)
  let nowSecStart = new Date(nowYear,nowMonth,nowDate,nowHour,nowMin,nowSec,0)
  let nowSecEnd = new Date(nowYear,nowMonth,nowDate,nowHour,nowMin,nowSec,999)
  const yearRatio = 100*( now.getTime() - nowYearStart.getTime() ) / ( nextYear.getTime() - nowYearStart.getTime() )
  const monthRatio= 100*( now.getTime() - nowMonthStart.getTime() ) / ( nextMonth.getTime() - nowMonthStart.getTime() )
  const weekRatio = 100*( now.getTime() - nowWeekStart.getTime() ) / ( nextWeekEnd.getTime() - nowWeekStart.getTime() )
  const dateRatio = 100*( now.getTime() - nowDateStart.getTime() ) / ( nowDateEnd.getTime() - nowDateStart.getTime() )
  const hourRatio = 100*( now.getTime() - nowHourStart.getTime() ) / ( nowHourEnd.getTime() - nowHourStart.getTime() )
  const minRatio  = 100*( now.getTime() - nowMinStart.getTime() ) / ( nowMinEnd.getTime() - nowMinStart.getTime() )
  const secRatio = 100*( now.getTime() - nowSecStart.getTime() ) / ( nowSecEnd.getTime() - nowSecStart.getTime() )
  return {yearRatio,monthRatio,weekRatio,dateRatio,hourRatio,minRatio,secRatio,}
}

const changeStyleWidthWithPercent = (elm,percent)=>{
  elm.style.width = `${percent}%`
  return
}

const changeInnerText = (elm,text)=>{
  elm.innerText = `${text}`
  return
}

const changeBarAppearance = (barElm,percent)=>{
  changeStyleWidthWithPercent(barElm,percent)
  changeInnerText(barElm,percent+'%')
  return
}

const loop = ()=>{
  const res = timeRatio(new Date())
  const resKeys = Object.keys(res)
  for(let i=0;i<barsKeys.length;i++){
    changeBarAppearance(bars[barsKeys[i]],res[resKeys[i]])
  }
  requestAnimationFrame( loop )
}

loop()