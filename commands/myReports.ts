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
    return acc;
  }, []);

  if (!isEmpty(oneReportData)) {
    const {
      startingTime,
      workedProjects,
      tasksCount,
      callsCounter,
      callsLength,
      finishingTime,
      blocksOrQuestions,
      date
    } = reportData[0].toObject();
    console.log('ka reportData');
    return {
      startingTime,
      workedProjects,
      tasksCount,
      callsCounter,
      callsLength,
      finishingTime,
      blocksOrQuestions,
      date
    };
  }
  else {
    return 'Oops! You have no data';
  }
};

export const myReports = (ctx, calendar) => {
  const today = new Date();
  const minDate = new Date();
  minDate.setMonth(today.getMonth() - 2);
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 2);
  maxDate.setDate(today.getDate());
  ctx.reply('Նշեք, թե որ օրվա համար', calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar());
}