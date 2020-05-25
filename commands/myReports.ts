import { reduce, isEmpty } from 'lodash';
import { Report } from './../model/report';
import { Context } from 'telegraf';

export const myReportsByDate = async (ctx: Context, date: Date) => {
  const model = await Report();
  const userId = ctx.from.id;
  const reportData = await model.find({ id: userId });
  
  const oneReportData = reduce(reportData, (acc, el) => {
    const shortCreationTime = el.createdAt.toISOString().split('T')[0];
    if (shortCreationTime === date) {
      acc.push(el);
    }
    console.log('5555555555555',date);
    
    return acc;
  }, []);
  
  if ( !isEmpty(oneReportData) ) {
    const {
      startingTime,
      workedProjects,
      tasksCount,
      blocksOrQuestions,
      date
    } = reportData[0].toObject();
    console.log('ka reportData');    
    return {
      startingTime,
      workedProjects,
      tasksCount,
      blocksOrQuestions,
      date
    };
  }
  else {
    return 'Oops! You have no data';
  }
};

