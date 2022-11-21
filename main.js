const yearBar = document.getElementById('yearBar')

const timeRatio = (now)=>{
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDate = now.getDate()
  const nowWeekStartOffset = now.getDay() === 0 ? 6 : now.getDay()-1
  const nowWeekEndOffset = now.getDay() === 0 ? 0 : 7-now.getDay()
  const nowHour = now.getHours()
  const nowMin = now.getMinutes()
  let nowYearStart = new Date(nowYear,0,1,0,0,0,0)
  let nextYear = new Date(nowYear+1,0,1,0,0,0,0)
  let nowMonthStart = new Date(nowYear,nowMonth,1,0,0,0,0)
  let nextMonth = new Date(nowYear,nowMonth+1,1,0,0,0,0)
  let nowWeekStart = new Date(nowYear,nowMonth,nowDate-nowWeekStartOffset,0,0,0,0)
  let nextWeekEnd = new Date(nowYear,nowMonth,nowDate+nowWeekEndOffset,23,59,59,999)
  let nowDateStart = new Date(nowYear,nowMonth,nowDate,0,0,0,0)
  let nowDateEnd = new Date(nowYear,nowMonth,nowDate,23,59,59,999)
  let nowHourStart = new Date(nowYear,nowMonth,nowDate,nowHour,0,0,0)
  let nowHourEnd = new Date(nowYear,nowMonth,nowDate,nowHour,59,59,999)
  let nowMinStart = new Date(nowYear,nowMonth,nowDate,nowHour,nowMin,0,0)
  let nowMinEnd = new Date(nowYear,nowMonth,nowDate,nowHour,nowMin,59,999)
  const yearRatio = 100*( now.getTime() - nowYearStart.getTime() ) / ( nextYear.getTime() - nowYearStart.getTime() )
  const monthRatio= 100*( now.getTime() - nowMonthStart.getTime() ) / ( nextMonth.getTime() - nowMonthStart.getTime() )
  const weekRatio = 100*( now.getTime() - nowWeekStart.getTime() ) / ( nextWeekEnd.getTime() - nowWeekStart.getTime() )
  const dateRatio = 100*( now.getTime() - nowDateStart.getTime() ) / ( nowDateEnd.getTime() - nowDateStart.getTime() )
  const hourRatio = 100*( now.getTime() - nowHourStart.getTime() ) / ( nowHourEnd.getTime() - nowHourStart.getTime() )
  const minRatio  = 100*( now.getTime() - nowMinStart.getTime() ) / ( nowMinEnd.getTime() - nowMinStart.getTime() )
  now = null
  nowYearStart = null
  nextYear = null
  return {yearRatio,monthRatio,weekRatio,dateRatio,hourRatio,minRatio}
}

// setInterval(()=>{
//   const res = timeRatio(new Date())
//   yearBar.style.width = `${res.minRatio}%`
// },1000)

const loop = ()=>{
  const res = timeRatio(new Date())
  yearBar.style.width = `${res.minRatio}%`
  yearBar.innerText = `${res.minRatio}%`
  requestAnimationFrame( loop )
}

loop()