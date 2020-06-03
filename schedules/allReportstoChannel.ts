import { User } from './../model/user';
import { reduce,isEmpty } from 'lodash';
import { Report, ReportInterface } from './../model/report';
const schedule = require('node-schedule');
const moment = require('moment')
const channelsId = process.env.CHANNEL_ID;

export const allReportsToChannel = (bot) => {
    schedule.scheduleJob(`30 50 18 * * 1-5`, async (ctx) => {
        const date = new Date().toISOString().split('T')[0];

        const reportModel = await Report();
        const reportData = await reportModel.find();

        const userModel = await User();
        const userData = await userModel.find();

        const oneReportData = reduce(reportData, (acc, el:ReportInterface) => {
            const shortCreationTime = el.createdAt.toISOString().split('T')[0];
            if (shortCreationTime === date) {

                const {
                    id,
                    fullName,
                    startingTime,
                    callsCounter,
                    callsLength,
                    tasksCount,
                    workedProjects,
                    blocksOrQuestions,
                    finishingTime,
                } = el.toObject() as ReportInterface

                acc.push({
                    id,
                    fullName,
                    startingTime,
                    workedProjects,
                    tasksCount,
                    callsCounter,
                    callsLength,
                    finishingTime,
                    blocksOrQuestions,
                });
            }
            return acc;
        }, []);
        bot.telegram.sendMessage(channelsId,oneReportData.join('\n'))
    })
};

