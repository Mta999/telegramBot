import { reduce, isEmpty } from 'lodash';
import { Report } from './../model/report';
import { Context } from 'telegraf';

export const myReportsByDate = async (ctx:Context, date:Date) => {
  const model = await Report();
  const userId = ctx.from.id;
  const reportData = await model.find({ id: userId });
  // console.log(reportData);
  const oneReportData = reduce(reportData, (acc, el) => {
    const shortCreationTime = el.createdAt.toISOString().split('T')[0];
    if (shortCreationTime === date) {
      acc.push(el);
    }
    return acc;
  }, []);

  if (!isEmpty(oneReportData)) {
    const {
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
    } = reportData[0].toObject();
    console.log('ka reportData');
    return {
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
    };
  }
  else {
    return 'Oops! You have no data';
  }
};

