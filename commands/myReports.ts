import { Report } from './../model/report';

export const myReportsByDate = async (ctx) => {

  const model = await Report();
  const userId = ctx.from.id;
  const reportData = await model.findOne({ id: userId })

  // console.log(reportData)

  if (reportData) {
    const {
      question1,
      question2,
      question3,
      question4,
      question5,
      question6
    } = reportData.toObject();
     return { 
      question1,
      question2,
      question3,
      question4,
      question5,
      question6
    }
      console.log("ka reportData")
  } else {
    ctx.reply("Oops! You have no data")
    console.log("CHka reportData")
  }

}