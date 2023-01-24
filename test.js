// test.js

// const weekStartDays = [0,1,2,3,4,5,6]
// const nowDay = [0,1,2,3,4,5,6]

// for(let strDayCnt=0;strDayCnt<weekStartDays.length;strDayCnt++){
//   for(let nowDayCnt=0;nowDayCnt<nowDay.length;nowDayCnt++){
//     const startOffset = ( nowDay[nowDayCnt] - weekStartDays[strDayCnt] ) %7
//     const endOffset = ( 7 - ( nowDay[nowDayCnt] - weekStartDays[strDayCnt] ) -1 ) %7
//     console.log(`weekStartDays:${weekStartDays[strDayCnt]}, nowDay:${nowDay[nowDayCnt]}, startOffset:${startOffset}, endOffset:${endOffset}`)
//   }
//   console.log('--- --- ---')
// }

// const weekStartDay_N = 1

// const ima = new Date('2022-12-01T09:30:00+09:00')

// const wsdOffset = weekStartDay_N < ima.getDay()? weekStartDay_N : weekStartDay_N-7

// const weekStart = new Date(ima.getFullYear(),ima.getMonth(),ima.getDate()-ima.getDay()+wsdOffset)
// const weekEnd = new Date((weekStart.getTime()+ 7 * 24 * 60 * 60 * 1000)-1)


// const localeOption = {
//   timeZone: 'JST',
//   year: 'numeric',
//   month: '2-digit',
//   day: '2-digit',
//   hour: '2-digit',
//   minute: '2-digit',
//   second: '2-digit',
//   hour12: false,
//   timeZoneName: 'short',
// }

// const imaStr = ima.toLocaleString('ja-JP', localeOption)
// const weekStartStr = weekStart.toLocaleString('ja-JP', localeOption)

// const weekEndStr = weekEnd.toLocaleString('ja-JP', localeOption)

// console.table({
//   ima:ima,
//   weekStart:weekStart,
//   weekEnd:weekEnd,
// })


const getWeekStartDate = (date,weekStartDay) => {
  const offset = date.getDay()>=weekStartDay?0:-7
  return new Date(date.getFullYear(),date.getMonth(),date.getDate()-date.getDay()+weekStartDay+offset)
}

const getWeekEndDate = (date,weekStartDay) => {
  const weekStart = getWeekStartDate(date,weekStartDay)
  return new Date((weekStart.getTime()+ 7 * 24 * 60 * 60 * 1000)-1)
}

const test = ()=>{
  const kd = new Date('2022-12-04T10:00:00+09:00')
  const offsets = [0,1,2,3,4,5,6]
  const dates = [...Array(7)].map((_,i)=>{return new Date(kd.getFullYear(),kd.getMonth(),kd.getDate()+i)})
  offsets.forEach((offset)=>{
    console.log('offset:',offset)
    dates.forEach((date)=>{
      const calcedDate = getWeekStartDate(date,offset)
      const calcedDateEnd=getWeekEndDate(date,offset)
      console.log(`date:${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}\nstart:${calcedDate.getFullYear()}/${calcedDate.getMonth()+1}/${calcedDate.getDate()}\nend:${calcedDateEnd.getFullYear()}/${calcedDateEnd.getMonth()+1}/${calcedDateEnd.getDate()}`)
    })
    console.log('------------')
  })
}

test()